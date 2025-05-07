import React, { useEffect, useRef, useState } from "react";
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
import { api_url } from "../../../../Config";
import * as XLSX from "xlsx";
import moment from "moment";

interface DataRow {
  name: string;
  value: string;
}

const MPlanOfManagement: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const printRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
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

  const handleDownloadExcel = () => {
    const exportData = data.map((row: any) => ({
      "Entered Date":moment(row.enteredDate).format("YYYY-MM-DD"),
      Investigation: row.investigation || "-",
      "Medical Sheet": row.medicalSheet || "-",
      "Glass Prescription": row.glassPrescription || "-",
      Procedure: row.procedure || "-",
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plan of Management");
  
    XLSX.writeFile(workbook, "Plan_of_Management_Report.xlsx");
  };
  

  const fetchData = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/plan-of-management?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const plan = res?.data?.data?.planOfManageMents;

      if (!plan) return;

      setData(plan);
      setTotalPages(
        Math.ceil(res.data.data.planOfManageMents.length / pageSize)
      );
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load plan of management. Please try again.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, [currentPage]);

  return (
    <>
      <div className="d-flex justify-content-end pb-3">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button onClick={handleDownloadExcel} className="s-btn me-3">
          Download as Excel
        </Button>
      </div>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell className="emr-label">Entered Date</TableCell>
              <TableCell className="emr-label">Investigation </TableCell>
              <TableCell className="emr-label">Medical Sheet </TableCell>
              <TableCell className="emr-label">Glass Prescription </TableCell>
              <TableCell className="emr-label">Procedure </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 &&
              paginatedData.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{moment(row.enteredDate).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{row.investigation}</TableCell>
                  <TableCell>{row.medicalSheet}</TableCell>
                  <TableCell>{row.glassPrescription}</TableCell>
                  <TableCell>{row.procedure}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default MPlanOfManagement;
