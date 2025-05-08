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
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import dayjs from "dayjs";

interface PatientData {
  opNo: string;
  patientName: string;
  operationDate: string;
}

const PreOperation = () => {
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
        `${api_url}/api/patient/pre-ot?patientStatus=Patient&limit=${pageSize}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTotalPages(res.data.totalPages);
      const datas = res.data.data.patient.map((val: any) => {
        return {
          key: val._id,
          opNo: val.opNo,
          patientName: val.PatientName,
          surgeryName: val.surgeryName || "-",
          operationDate: val.surgeryDate || "-",
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

  const handleNav = () => {
    navigate("pre-operation-setup");
  };
  return (
    <>
      <div className="emr-complaints-box mx-3 rounded">
        <div>
          <p className="emr-search-text mb-0 ps-2 p-4">Patient Details</p>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="surgery table">
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Operation Date</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.opNo}</TableCell>
                  <TableCell>{row.patientName}</TableCell>
                  <TableCell>
                    {dayjs(row.operationDate).format("DD-MM-YYYY & HH:mm")}
                  </TableCell>
                  <TableCell>
                    <Button className="i-btn" onClick={handleNav}>
                      <MdEdit />
                    </Button>
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
    </>
  );
};

export default PreOperation;
