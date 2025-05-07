import React, { useEffect, useRef, useState } from "react";
import { Button, message, Pagination } from "antd";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { api_url } from "../../../../Config";
import moment from "moment";


const MPrescriptions: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const columns = ["Entered Date", "Prescription", "Download"];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const fetchData = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

     const res =  await axios.get(
        `${api_url}/api/prescription?patientId=${id}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

         const response = res?.data?.data?.prescriptions?.map((presc: any) => ({
              enteredDate: presc.enteredDate
                ? moment(presc.enteredDate).format("DD-MM-YYYY")
                : "-",
      
                prescriptions: presc.prescriptions || "-",
             
            }));
      setTotalPages(res.data.totalPages);
      setData(response)

    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load complaints. Please try again.");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, []);

  return (
    <>
    

      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Prescriptions</p>
        <div ref={printRef}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      sx={{ backgroundColor: "transparent", color: "#595959" }}
                      className="emr-label"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row:any, index:any) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    <TableCell>{row.prescriptions}</TableCell>
                    <TableCell>
                      <Button type="link" href={`/${row.attachment}`} download>
                        {row.download}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default MPrescriptions;
