import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button, message, Pagination } from "antd";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface PatientData {
  key: string;
  opNo: string;
  patientName: string;
  operationTime: string;
  surgeonName: string;
  status: string;
}

const OTSurgeryManagement = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<PatientData[]>([]);
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
        `${api_url}/api/patient/filter?&limit=${pageSize}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      

      setTotalPages(res.data.totalPages);
      const datas = res.data.data.patients.map((val: any) => {
        return {
          key: val._id,
          opNo: val.opNo,
          patientName: val.PatientName,
          operationTime: val?.surgeryDetailsId?.surgeryDate || "-",
          status:val?.surgeryDetailsId?.status,
          surgeonName: val?.surgeryDetailsId?.surgertData?.surgeon
        
        };
      });
      setData(datas);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleNav = (id:any) => {
    sessionStorage.setItem("patientId",id)

    navigate("surgery-management-setup");
  };


  return (
    <div className="emr-complaints-box mx-3 rounded">
      <div>
        <p className="emr-search-text mb-0 p-3">Patient Details</p>
      </div>

      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="surgery table">
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">S.No</TableCell>
              <TableCell className="emr-label">OP No</TableCell>
              <TableCell className="emr-label">Patient Name</TableCell>
              <TableCell className="emr-label">Operation Time</TableCell>
              <TableCell className="emr-label">Surgeon Name</TableCell>
              <TableCell className="emr-label">Status</TableCell>
              <TableCell className="emr-label">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{(currentPage-1)*pageSize+1+index}</TableCell>
                <TableCell>{row.opNo}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>
                  {row.operationTime && dayjs(row.operationTime).isValid()
                    ? dayjs(row.operationTime).format("hh:mm A")
                    : "-"}
                </TableCell>
                <TableCell>{row.surgeonName}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        (row.status || "-").toLowerCase() === "pending"
                          ? "#FFB617"
                          : "#00BE4F",
                    }}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button className="i-btn" onClick={() => handleNav(row?.key)}>
                    <MdEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <div className="d-flex justify-content-end mt-4 pb-4">
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
  );
};

export default OTSurgeryManagement;
