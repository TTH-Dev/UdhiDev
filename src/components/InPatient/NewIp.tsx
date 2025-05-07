import { LeftOutlined, RightOutlined } from "@ant-design/icons";
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
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdEdit, MdOutlineReplay } from "react-icons/md";
import { api_url } from "../../Config";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface PatientData {
  key: string;
  opNo: string;
  surgeryName: string;
  PatientName: string;
  operationDate: string;
}

const NewIp = () => {
  const [data, setData] = useState<PatientData[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filervalue, setFilterVaue] = useState({
    patientName: "",
    opNo: "",
    surgeryName: "",
  });
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        `${api_url}/api/patient/ip-filter?newIp=true&patientStatus=Patient&surgeryDate=${selectedDate.format(
          "YYYY-MM-DD"
        )}&surgeryName=${filervalue.surgeryName}&opNo=${
          filervalue.opNo
        }&PatientName=${
          filervalue.patientName
        }&limit=${pageSize}&page=${currentPage}`,
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
          operationDate: val.operationDate || "-",
        };
      });
      setData(datas);
      setFilterVaue({
        patientName: "",
        opNo: "",
        surgeryName: "",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    setCurrentPage(1);
    await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [selectedDate, currentPage]);

  return (
    <>
      <div className="emr-complaints-box mx-3 rounded pb-3">
        <div className="d-flex justify-content-between align-items-center my-3">
          <p className="emr-search-text mb-0 ps-3">Out Patient Details</p>
          <div className="d-flex align-items-center">
            <Button
              className="arrow-btn"
              icon={<LeftOutlined style={{ color: "#3497F9" }} />}
              onClick={() => setSelectedDate((prev) => prev.subtract(1, "day"))}
            />
            <p className="mx-3 date-da mt-3">
              {selectedDate.format("DD MMM YYYY")}
            </p>
            <Button
              // disabled={selectedDate.isSameOrAfter(dayjs(), 'day')}
              className="arrow-btn"
              icon={<RightOutlined style={{ color: "#3497F9" }} />}
              onClick={() => setSelectedDate((prev) => prev.add(1, "day"))}
            />
          </div>
          <div className="d-flex">
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
          <Table aria-label="surgery table">
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Operation Date</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.opNo}</TableCell>
                  <TableCell>{row.PatientName}</TableCell>
                  <TableCell>{row.surgeryName}</TableCell>
                  <TableCell>
                    {row.operationDate
                      ? dayjs(row.operationDate).format("DD MM YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Link to={`edit-new-ip?id=${row?.key}`}>
                    <Button className="i-btn">
                      <MdEdit />
                    </Button>
                    </Link>
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
                fetchData();
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

export default NewIp;
