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
import { api_url } from "../../../../../Config";
import axios from "axios";
import moment from "moment";

const MNonContactTonoMetry: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = ["Entered Date", "IOP", "OD", "OS"];

  const handleDownloadExcel = (id: string) => {
    const exportData = data.map((row: any) => ({
      "Entered Date": row.enteredDate,
      IOP: row.iop,
      OD: row.od,
      OS: row.os,
      MMGHO: row.mmgho,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Non Contact TonoMetry");

    XLSX.writeFile(workbook, `Non Contact TonoMetry ${id.slice(-5)}.xlsx`);
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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDatas = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/other-routine-test?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const routineTests = res.data.data.otherRoutineTests;

      const nonContactData = routineTests.flatMap(
        (test: any) =>
          test.nonContactTonoMetry?.flatMap((entry: any) =>
            entry.nonContactTonoMetry?.map((detail: any) => ({
              enteredDate: entry.enteredDate
                ? moment(entry.enteredDate).format("DD-MM-YYYY")
                : "-",
              iop: detail.iop || "-",
              od: detail.od || "-",
              os: detail.os || "-",
            }))
          ) || []
      );

      setData(nonContactData);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      getDatas(id);
    }
  }, [currentPage]);
  return (
    <>
      <div className="d-flex justify-content-end button-container-ort">
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

      <div className="emr-complaints-box mt-1 rounded p-4">
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
                      <TableCell>{row.iop || "-"}</TableCell>
                      <TableCell>{row.od || "-"}</TableCell>
                      <TableCell>{row.os || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: "center" }}>
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

export default MNonContactTonoMetry;
