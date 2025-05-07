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
import { api_url } from "../../../../../Config";
import * as XLSX from "xlsx";

type Nut = {
  enteredDate: string;
  normal: string;
  diabetic: string;
  renalFailure: string;
  cirrhosis: string;
  hypertensive: string;
  special: string;
  jaundice: string;
  anyOther: string;
};

const MNutritionalAssessment: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Nut[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = [
    "Entered Date",
    "Normal",
    "Diabetic",
    "Renal Failure",
    "Chirrhosis",
    "Hypertensive",
    "Special",
    "Jaundice",
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
      Normal: row.normal,
      Diabetic: row.diabetic,
      "Renal Failure": row.renalFailure,
      Cirrhosis: row.cirrhosis,
      Hypertensive: row.hypertensive,
      Special: row.special,
      Jaundice: row.jaundice,
      "Any Other": row.anyOther,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nutritional Assessment");

    XLSX.writeFile(workbook, "Nutritional_Assessment_Report.xlsx");
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
        `${api_url}/api/past-history/getBy-section?section=nutritionalAssessment&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = res?.data?.data?.nutritionalAssessment?.map(
        (ocu: any) => ({
          enteredDate: ocu.enteredDate
            ? moment(ocu.enteredDate).format("DD-MM-YYYY")
            : "-",
          normal:
            ocu.normal !== undefined && ocu.normal !== null
              ? ocu.normal
                ? "Yes"
                : "No"
              : "-",
          diabetic:
            ocu.diabetic !== undefined && ocu.diabetic !== null
              ? ocu.diabetic
                ? "Yes"
                : "No"
              : "-",
          renalFailure:
            ocu.renalFailure !== undefined && ocu.renalFailure !== null
              ? ocu.renalFailure
                ? "Yes"
                : "No"
              : "-",
          cirrhosis:
            ocu.cirrhosis !== undefined && ocu.cirrhosis !== null
              ? ocu.cirrhosis
                ? "Yes"
                : "No"
              : "-",
          hypertensive:
            ocu.hypertensive !== undefined && ocu.hypertensive !== null
              ? ocu.hypertensive
                ? "Yes"
                : "No"
              : "-",
          special:
            ocu.special !== undefined && ocu.special !== null
              ? ocu.special
                ? "Yes"
                : "No"
              : "-",
          jaundice:
            ocu.jaundice !== undefined && ocu.jaundice !== null
              ? ocu.jaundice
                ? "Yes"
                : "No"
              : "-",
          anyOther:
            ocu.anyOther !== undefined && ocu.anyOther !== null
              ? ocu.anyOther
                ? "Yes"
                : "No"
              : "-",
        })
      );
      setData(response);
     
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load NutritionalAssessment. Please try again.");
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

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button className="s-btn me-3" onClick={handleDownloadExcel}>
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
                  paginatedData.map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{row.enteredDate}</TableCell>
                      <TableCell>{row.normal}</TableCell>
                      <TableCell>{row.diabetic}</TableCell>
                      <TableCell>{row.renalFailure}</TableCell>
                      <TableCell>{row.cirrhosis}</TableCell>
                      <TableCell>{row.hypertensive}</TableCell>
                      <TableCell>{row.special}</TableCell>
                      <TableCell>{row.jaundice}</TableCell>
                      <TableCell>{row.anyOther}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} style={{ textAlign: "center" }}>
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
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default MNutritionalAssessment;
