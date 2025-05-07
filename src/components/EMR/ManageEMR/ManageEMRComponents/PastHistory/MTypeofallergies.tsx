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

type Allergies = {
  injections: string;
  enteredDate: string;
  tablets: string;
  eyeDrops: string;
  anyOthers: string;
};

const MTypeofallergies: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Allergies[]>([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = [
    "Entered Date",
    "Injections",
    "Tablets",
    "Eye Drops",
    "Any Others",
  ];

  const [paginatedData, setPaginatedData] = useState<Allergies[]>([]);

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
    const exportData = data.map((row) => ({
      "Entered Date": row.enteredDate,
      Injections: row.injections,
      Tablets: row.tablets,
      "Eye Drops": row.eyeDrops,
      "Any Others": row.anyOthers,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Allergies");

    XLSX.writeFile(workbook, "Allergies_Report.xlsx");
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
        `${api_url}/api/past-history/getBy-section?section=typeOfAllergies&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = res?.data?.data?.typeOfAllergies?.map(
        (allergies: any) => ({
          enteredDate: allergies.enteredDate
            ? moment(allergies.enteredDate).format("DD-MM-YYYY")
            : "-",
          injections: allergies.injections || "-",
          tablets: allergies.tablets || "-",
          eyeDrops: allergies.eyeDrops || "-",
          anyOthers: allergies.anyOthers || "-",
        })
      );
      setData(response);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load allergies. Please try again.");
    }
  };
  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / pageSize));
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [currentPage, data]);
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button onClick={handleDownloadExcel} className="s-btn me-3">
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
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.enteredDate}</TableCell>
                      <TableCell>{row.injections}</TableCell>
                      <TableCell>{row.tablets}</TableCell>
                      <TableCell>{row.eyeDrops}</TableCell>
                      <TableCell>{row.anyOthers}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3 pb-3">
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

export default MTypeofallergies;
