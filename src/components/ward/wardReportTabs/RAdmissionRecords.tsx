import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { message, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../../Config";
import dayjs from "dayjs";

interface PatientData {
  key: string;
  opNo: string;
  surgeryName: string;
  patientName: string;
  roomNo: string;
  admitDate: string;
  admitTime: string;
  dischargeDate: string;
  dischargeTime: string;
}

const RAdmissionRecords = () => {
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
      const datas = res.data?.data?.patients?.map((val: any) => {
        return {
          key: val._id,
          opNo: val.opNo,
          roomNo: val.bedManagement?.bed?.roomNo||"-",
          patientName: val.PatientName||"-",
          admittedDate: val.admittedDate ||"-",
          dischargeDate: val.dischargeDate ||"-",
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
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Op No</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Admit Date</TableCell>
              <TableCell>Admit Time</TableCell>
              <TableCell>Discharge Date</TableCell>
              <TableCell>Discharge Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, i: any) => (
              <TableRow key={row.sno}>
                <TableCell>{(currentPage-1)*pageSize+1+i}</TableCell>
                <TableCell>{row.opNo}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.roomNo}</TableCell>
                <TableCell>
                {dayjs(row.admittedDate).isValid()
    ? dayjs(row.admittedDate).format("DD-MM-YYYY")
    : "-"}
                </TableCell>
                <TableCell>
                  {dayjs(row.admittedDate).isValid()?dayjs(row.admittedDate).format("h:mm A"):"-"}
                </TableCell>
                <TableCell>
                  {dayjs(row.dischargeDate).isValid()?dayjs(row.dischargeDate).format("DD-MM-YYYY"):"-"}
                </TableCell>
                  <TableCell>
                    {dayjs(row.dischargeDate).isValid()?dayjs(row.dischargeDate).format("h:mm A"):"-"}
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
    </>
  );
};

export default RAdmissionRecords;