import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Button, Input, message, Modal, Pagination, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { api_url } from "../../Config";
import { useNavigate } from "react-router-dom";

interface PatientData {
  key: string;
  opNo: string;
  admDate: string;
  PatientName: string;
  billAmount: string;
  billStatus: string;
  balanceAmt: string;
}

const PatientManagement = () => {
  const [data, setData] = useState<PatientData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applied, setIsApplied] = useState(false);

  const [filtervalue, setFilterVaue] = useState({
    PatientName: "",
    opNo: "",
    billStatus: "",
  });

  const navigate = useNavigate();
  const handleNav = (id: any) => {
    navigate(`patient-details/personal-info?id=${id}`);
  };
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlechange = (value: any) => {
    setFilterVaue({ ...filtervalue, billStatus: value });
  };
  const handleApply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await fetchData();
  };

  const handleReset = async () => {
    setIsApplied(false);
    setFilterVaue({
      PatientName: "",
      opNo: "",
      billStatus: "",
    });
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/ip-filter?patientManagement=true&patientStatus=Inpatient&surgeryDate=&surgeryName=&opNo=${filtervalue.opNo}&PatientName=${filtervalue.PatientName}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTotalPages(res.data.totalPages);
      const datas = res.data.data.patient.map((val: any) => {
        return {
          key: val._id,
          opNo: val.opNo,
          PatientName: val.PatientName,
          surgeryName: val.surgeryName || "-",
          billAmount: val.billAmount || "-",
          billStatus: "paid",
          admDate: "10-02-2025",
          balanceAmt: "20,000",
        };
      });
      setData(datas);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, applied]);

  return (
    <>
      <div className="emr-complaints-box mx-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 p-3">Patient Details</p>
          </div>
          <div className="text-end py-3 pe-3">
            <Button
              className="doc-fil-btn mt-1"
              onClick={() => setIsModalOpen(true)}
            >
              <FaFilter />
              Filter{" "}
            </Button>
            {applied && (
              <Button className="doc-fil-btn mx-2 mt-1" onClick={handleReset}>
                <MdOutlineReplay />
              </Button>
            )}
          </div>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Adm Date</TableCell>
                <TableCell className="emr-label">Bill Amt</TableCell>
                <TableCell className="emr-label">Balance Amt</TableCell>
                <TableCell className="emr-label">Bill Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNav(row?.key)}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.opNo}</TableCell>
                  <TableCell>{row.PatientName}</TableCell>
                  <TableCell>{row.admDate}</TableCell>
                  <TableCell> ₹ {row.billAmount}</TableCell>
                  <TableCell>₹ {row.balanceAmt}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={{
                        color:
                          row.billStatus === "Paid" ? "lightgreen" : "gold",
                        borderRadius: 4,
                        padding: "4px 8px",
                        display: "inline-block",
                        fontWeight: 500,
                      }}
                    >
                      {row.billStatus}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {data.length > 0 && (
          <div className="d-flex justify-content-end mt-4">
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <Modal
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setFilterVaue({
            PatientName: "",
            opNo: "",
            billStatus: "",
          });
        }}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button
              className="c-btn me-3"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="s-btn" onClick={handleApply}>
              Apply
            </Button>
          </div>
        }
      >
        <div>
          <label className="mb-2 emr-label">OP No</label>
          <br />
          <Input
            style={{ height: "35px" }}
            className="mb-2"
            onChange={(e) =>
              setFilterVaue((filtervalue) => ({
                ...filtervalue,
                opNo: e.target.value,
              }))
            }
            value={filtervalue.opNo}
          />
        </div>
        <div>
          <label className="mb-2 emr-label">Patient Name</label>
          <br />
          <Input
            style={{ height: "35px" }}
            className="mb-2"
            onChange={(e) =>
              setFilterVaue((filtervalue) => ({
                ...filtervalue,
                PatientName: e.target.value,
              }))
            }
            value={filtervalue.PatientName}
          />
        </div>
        <div>
          <label className="mb-2 emr-label">Bill Status</label>
          <br />
          <Select
            onChange={(value) => handlechange(value)}
            className="mb-2"
            style={{ height: "35px", width: "100%" }}
            options={[
              { label: "paid", value: "paid" },
              { label: "unpaid", value: "unpaid" },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default PatientManagement;
