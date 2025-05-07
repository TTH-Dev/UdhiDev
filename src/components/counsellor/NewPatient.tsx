import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Empty, Input, message, Modal, Pagination, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import moment from "moment";

const NewPatient = () => {
  const navigate = useNavigate();
  const handleRowClick = (ids: number) => {
    navigate(
      `/counsellor/new-patient/patient-details/plan-of-management?id=${ids}`
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [filterData, setFilterData] = useState({
    patientName: "",
    opNo: "",
    status: "",
  });

  const getPatients = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/filter?emrStatus=completed&opNo=${filterData?.opNo}&PatientName=${filterData?.patientName}&cousellingStatus=${filterData?.status}&emrdate=${moment(new Date()).format("YYYY-MM-DD")}&page=${currentPage}&limit=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data?.patients);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset=()=>{
    setCurrentPage(1)
    getPatients()
    setFilterData({
      patientName: "",
      opNo: "",
      status: "",
    })
  }

  useEffect(() => {
    getPatients();
  }, [currentPage]);

  return (
    <>
      <div className="emr-complaints-box mx-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 p-4">Patient Details</p>
          </div>
          <div className=" text-end  py-3 pe-3">
            <Button
              className="doc-fil-btn mt-1"
              onClick={() => setIsOpen(true)}
            >
              <FaFilter />
              Filter{" "}
            </Button>
            <Button className="doc-fil-btn mx-2 mt-1" onClick={handleReset}>
              <MdOutlineReplay />
            </Button>
          </div>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Time</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Consult Dr</TableCell>
                <TableCell className="emr-label">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, i: any) => (
                <TableRow
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(row?._id)}
                >
                  <TableCell>{(currentPage - 1) * pageSize + i + 1}</TableCell>
                  <TableCell>
                    {moment(row?.emrCompleteDate).format("HH:MM:SS a")}
                  </TableCell>
                  <TableCell>{row?.opNo}</TableCell>
                  <TableCell>{row?.PatientName}</TableCell>
                  <TableCell>{row?.doctorId?.doctorName}</TableCell>
                  <TableCell
                    style={{
                      color:
                        row.cousellingStatus === "pending"
                          ? "#F44336"
                          : row.cousellingStatus === "waiting"
                          ? "#FFB617"
                          : "#17C35F",
                    }}
                  >
                    {row?.cousellingStatus
                      ? row.cousellingStatus.charAt(0).toUpperCase() +
                        row.cousellingStatus.slice(1)
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Pagination Component */}
      {data.length > 0 ? (
        <div className="d-flex justify-content-end mt-4">
          <Pagination
            current={currentPage}
            total={totalPages * pageSize}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      ):<><Empty className="pt-2"/></>}

      <Modal
        title={"Filter"}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button className="c-btn me-3" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              className="c-btn"
              type="primary"
              onClick={() => {
                setCurrentPage(1);
                getPatients();
                setIsOpen(false)
              }}
            >
              Search
            </Button>
          </div>
        }
      >
        <label className="mb-2">
          Patient Name<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <Input
          onChange={(e) =>
            setFilterData({ ...filterData, patientName: e.target.value })
          }
          value={filterData.patientName}
          style={{ width: "100%", height: 35 }}
        />
        <label className="mb-2 mt-1">
          OP Number<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <Input
          onChange={(e) =>
            setFilterData({ ...filterData, opNo: e.target.value })
          }
          value={filterData.opNo}
          style={{ width: "100%", height: 35 }}
        />
        <label className="mb-2 mt-1">
          Status<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <Select
          onChange={(value) => setFilterData({ ...filterData, status: value })}
          value={filterData.status}
          options={[
            {
              label: "Pending",
              value: "pending",
            },
            {
              label: "Waiting",
              value: "waiting",
            },
            {
              label: "Completed",
              value: "completed",
            },
          ]}
          style={{ width: "100%", height: 35 }}
        />
      </Modal>
    </>
  );
};

export default NewPatient;
