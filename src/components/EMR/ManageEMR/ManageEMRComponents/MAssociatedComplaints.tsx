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
import moment from "moment";
import axios from "axios";
import { api_url } from "../../../../Config";
import * as XLSX from "xlsx";

type ComplaintRow = {
  admissionReason: string;
  enteredDate: string;

  duration: string;
  hurt: string;
};

const MAssociatedComplaints: React.FC = () => {
    const [data, setData] = useState<ComplaintRow[]>([]);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10;
      const paginatedData = data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
  
  const printRef = useRef<HTMLDivElement>(null);

  const columns = ["Entered Date", "Reason", "Duration", "Hurt Level"];


  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

const handleDownloadExcel = (id: string) => {
    const exportData = data.map((row) => ({
      "Entered Date": row.enteredDate,
      "Reason": row.admissionReason,
        "Hurt": row.hurt,

        "Duration":row.duration
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Associated Complaints");

    XLSX.writeFile(workbook, `Associated Complaints ${id.slice(-5)}.xlsx`);
  };
  const fetchData = async (id:string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/associated-complaints?patientId=${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      

      const response = res?.data?.data?.associatedComplaints?.map((asso: any) => ({
        enteredDate: asso.enteredDate
          ? moment(asso.enteredDate).format("DD-MM-YYYY")
          : "-",

        admissionReason: asso.admissionReason || "-",
        hurt: asso.reactionName || "-",

        duration:
          ` ${asso.since.day}D ${asso.since.month}M ${asso.since.year}Y ` ||
          "-",
      }));


      setData(response);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add product. Please try again.");
      return;
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, [currentPage]);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className=" c-btn me-3">
          Print
        </Button>
         <Button
                       onClick={() => {
                         const id = sessionStorage.getItem("patientId");
                         if (id) handleDownloadExcel(id);
                       }}
                       className="s-btn me-3"
                     >
                       Download as Excel
                     </Button>
      </div>

      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Associated Complaints</p>
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
  {Array.isArray(paginatedData) && paginatedData.map((_row, index) => (
    <TableRow key={index}>
      <TableCell>{_row.enteredDate}</TableCell>
      <TableCell>{_row.admissionReason}</TableCell> 
      <TableCell>{_row.duration}</TableCell>
      <TableCell>{_row.hurt}</TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </TableContainer>
        </div>
      </div>
     {paginatedData.length > 0 && (
     <div className="d-flex justify-content-end mt-3 pb-4">
       <Pagination
         current={currentPage}
         total={data.length}
         pageSize={pageSize}
         onChange={handlePageChange}
         showSizeChanger={false}
       />
     </div>
   )}
    
    </>
  );
};

export default MAssociatedComplaints;
