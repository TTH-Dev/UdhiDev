import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Input, message, Modal, Pagination } from "antd";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const IpReports = () => {
  const navigate = useNavigate();

  const handleRowClick = (id: any) => {
    navigate(`report-details?id=${id}`);
  };

  const [data, setData] = useState<any>([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filervalue, setFilterVaue] = useState({
    patientName: "",
    opNo: "",
    surgeryName: "",
  });

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/patient/filter?patientStatus=Inpatient&&surgeryName=${filervalue.surgeryName}&opNo=${filervalue.opNo}&PatientName=${filervalue.patientName}&limit=${pageSize}&page=${currentPage}&ipBillPaymentStatus=paid`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res?.data?.data?.patients);
      setTotalPages(res?.data?.totalPages);
      setFilterVaue({
        patientName: "",
        opNo: "",
        surgeryName: "",
      })
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset=async()=>{
    setFilterVaue({
      patientName: "",
      opNo: "",
      surgeryName: "",
    })
    await getData()
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="emr-complaints-box mx-3 rounded">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 ps-2 p-4">Patient Details</p>
          </div>
          <div className="p-3">
            <Button
              className="doc-fil-btn mt-1"
              onClick={() => setIsModalOpen(true)}
            >
              <FaFilter /> Filter
            </Button>
            <Button className="doc-fil-btn mx-2 mt-1" onClick={handleReset}>
              <MdOutlineReplay />
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="patient details table">
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Surgery Date</TableCell>
                <TableCell className="emr-label">Admitted Date</TableCell>
                <TableCell className="emr-label">Discharge Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map((row: any, i: any) => (
                  <TableRow
                    key={i}
                    hover
                    onClick={() => handleRowClick(row?._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {(currentPage - 1) * pageSize + 1 + i}
                    </TableCell>
                    <TableCell>{row?.opNo || "-"}</TableCell>
                    <TableCell>{row?.PatientName || "-"}</TableCell>
                    <TableCell>
                      {row?.surgeryDetailsId?.surgeryName || "-"}
                    </TableCell>
                    <TableCell>
                      {row?.surgeryDetailsId?.surgeryDate
                        ? moment(row?.surgeryDetailsId?.surgeryDate).format(
                            "YYYY-MM-DD"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {row?.admittedDate
                        ? moment(row?.admittedDate).format("YYYY-MM-DD")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {row?.dischargeDate
                        ? moment(row?.dischargeDate).format("YYYY-MM-DD")
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {data?.length > 0 && (
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

      <Modal
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setFilterVaue({
            patientName: "",
            opNo: "",
            surgeryName: "",
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
            <Button
              className="s-btn"
              onClick={() => {
                getData();
                setIsModalOpen(false);
              }}
            >
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
            value={filervalue.opNo}
            onChange={(e) =>
              setFilterVaue({ ...filervalue, opNo: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-2 emr-label">Patient Name</label>
          <br />
          <Input
            style={{ height: "35px" }}
            className="mb-2"
            value={filervalue.patientName}
            onChange={(e) =>
              setFilterVaue({ ...filervalue, patientName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-2 emr-label">Surgery Name</label>
          <br />
          <Input
            value={filervalue.surgeryName}
            onChange={(e) =>
              setFilterVaue({ ...filervalue, surgeryName: e.target.value })
            }
            style={{ height: "35px" }}
            className="mb-2"
          />
        </div>
      </Modal>
    </>
  );
};

export default IpReports;
