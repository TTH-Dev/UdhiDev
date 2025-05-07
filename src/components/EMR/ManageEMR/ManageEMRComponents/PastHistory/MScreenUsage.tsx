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

type screen = {
  Hours: string;
  enteredDate: string;
  inputBox: string;
};

const MScreenUsage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<screen[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = ["Entered Date", "Hours"];

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
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDownloadExcel = (id: string) => {
    const exportData = data.map((row) => ({
      "Entered Date": row.enteredDate,
      "Hours": row.Hours,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Screen Usage");

    XLSX.writeFile(workbook, `Screen Usage ${id.slice(-5)}.xlsx`);
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
        `${api_url}/api/past-history/getBy-section?section=screenUsage&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = res?.data?.data?.screenUsage?.map((screen: any) => ({
        enteredDate: screen.enteredDate
          ? moment(screen.enteredDate).format("DD-MM-YYYY")
          : "-",
        Hours: screen?.inputBox,
      }));
      setData(response);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load Screen Usage. Please try again.");
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
        <Button onClick={handlePrint} className="c-btn me-3">
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

      <div className="emr-complaints-box mt-2 rounded p-4">
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
                {paginatedData.length > 0 ? (
                  paginatedData.map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{row.enteredDate || "-"}</TableCell>
                      <TableCell>{row.Hours || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
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

export default MScreenUsage;
