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

type imm = {
  enteredDate: string;
  influenza: true;
  pneumococcal: true;
  HepatitisA: true;
  HepatitisB: true;
  MeaslesMumps: true;
  Rubella: true;
  InjectionTetanusToxoid: true;
  Pediatrics: true;
  anyOther: true;
};

const MImmunizationForAdults: React.FC = () => {
  const [data, setData] = useState<imm[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const printRef = useRef<HTMLDivElement>(null);

  const columns = [
    "Entered Date",
    "Influenza",
    "Pneumococcal",
    "Hepatitis A",
    "Hepatitis B",
    "Measles, Mumps",
    "Rubella",
    "Injection Tetanus Toxoid",
    "For Pediatrics As Per Vaccination Schedule",
    "Any other",
  ];

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
      Influenza: row.influenza,
      Pneumococcal: row.pneumococcal,
      "Hepatitis A": row.HepatitisA,
      "Hepatitis B": row.HepatitisB,
      "Measles, Mumps": row.MeaslesMumps,
      Rubella: row.Rubella,
      "Injection Tetanus Toxoid": row.InjectionTetanusToxoid,
      "For Pediatrics As Per Vaccination Schedule": row.Pediatrics,
      "Any other": row.anyOther,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Immunization Report");

    XLSX.writeFile(workbook, "Immunization_For_Adults_Report.xlsx");
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
        `${api_url}/api/past-history/getBy-section?section=immunizationForAdults&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const formatValue = (val: any) => (val === true ? "Yes" : "No");
      console.log(res, "kl");

      const response = res?.data?.data?.immunizationForAdults?.map(
        (immu: any) => ({
          enteredDate: immu.enteredDate
            ? moment(immu.enteredDate).format("DD-MM-YYYY")
            : "-",
          Pediatrics: formatValue(
            immu?.forAdults.ForPediatricsAsPerVaccinationSchedule
          ),
          anyOther: formatValue(immu?.forAdults?.anyOther),
          HepatitisA: formatValue(immu?.forAdults?.hepatitisA),
          HepatitisB: formatValue(immu?.forAdults?.hepatitisB),
          influenza: formatValue(immu?.forAdults?.influenza),
          InjectionTetanusToxoid: formatValue(
            immu?.forAdults?.injectionTetanusToxoid
          ),
          MeaslesMumps: formatValue(immu?.forAdults?.measlesMumps),
          pneumococcal: formatValue(immu?.forAdults?.pneumococcal),
          Rubella: formatValue(immu?.forAdults?.rubella),
        })
      );

      setData(response);
      setTotalPages(Math.ceil(response.length / pageSize));
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load immunizationForAdults. Please try again.");
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
        <Button onClick={handleDownloadExcel} className="s-btn me-3">
          Download as Excel
        </Button>
      </div>

      <div className="emr-complaints-box mt-2 rounded p-4">
        <div className="ms-3">
          <span style={{ fontSize: "18px", fontWeight: 500 }}>For Adults</span>
        </div>
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
                  paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.enteredDate}</TableCell>
                      <TableCell>{row.influenza}</TableCell>
                      <TableCell>{row.pneumococcal}</TableCell>
                      <TableCell>{row.HepatitisA}</TableCell>
                      <TableCell>{row.HepatitisB}</TableCell>
                      <TableCell>{row.MeaslesMumps}</TableCell>
                      <TableCell>{row.Rubella}</TableCell>
                      <TableCell>{row.InjectionTetanusToxoid}</TableCell>
                      <TableCell>{row.Pediatrics}</TableCell>
                      <TableCell>{row.anyOther}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} style={{ textAlign: "center" }}>
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
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

export default MImmunizationForAdults;
