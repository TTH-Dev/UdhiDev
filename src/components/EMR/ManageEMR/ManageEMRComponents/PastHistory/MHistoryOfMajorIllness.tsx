import React, { useEffect, useRef, useState } from "react";
import { Button, message, Pagination } from "antd";
import * as XLSX from "xlsx";

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
import { api_url } from "../../../../../Config";
import moment from "moment";

const MHistoryOfMajorIllness: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
    // Format data for worksheet
    const exportData = rows.map((row) => {
      const formattedRow: Record<string, any> = {};
      columns.forEach((col) => {
        formattedRow[col] = row[col] || "-";
      });
      return formattedRow;
    });
  
    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "History");
  
    // Export Excel file
    XLSX.writeFile(workbook, "historyOfMajorIllness.xlsx");
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
        `${api_url}/api/past-history/getBy-section?section=historyOfMajorIllness&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const historyList = res.data.data?.historyOfMajorIllness || [];

      if (historyList.length === 0) {
       
        setRows([]);
        return;
      }

      const columnSet = new Set<string>();
      const rawRows: any[] = [];

      historyList.forEach((entry: any) => {
        const row: any = {
          "Entered Date": moment(entry.enteredDate).format("DD-MM-YYYY"),
        };

        entry.HistoryOfMajorIllnessSchema?.forEach((item: any) => {
          row[item.typeName] = item.typeValue;
          columnSet.add(item.typeName);
        });

        rawRows.push(row);
      });

      const finalColumns = ["Entered Date", ...Array.from(columnSet)];
      setColumns(finalColumns);
      setRows(rawRows); 
      setTotalPages(Math.ceil(rawRows.length / pageSize));
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch data");
    }
  };

  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");

    if (id) {
      fetchData(id);
    }
  }, []);
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button onClick={handleDownloadExcel} className="s-btn me-3 ">
          Download as Excel
        </Button>
      </div>

      <div className="emr-complaints-box mt-2 rounded p-4">
        <div ref={printRef}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row: any, i: any) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col}>{row[col] || "-"}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3 pb-4">
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

export default MHistoryOfMajorIllness;
