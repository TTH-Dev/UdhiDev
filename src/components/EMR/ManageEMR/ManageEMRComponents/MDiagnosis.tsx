import React, { useRef } from "react";
import { Button } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const MDiagnosis: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = [
    "Entered Date",
    "Name",
    "Since",
    "Is it Chronic",
    "Is it Primary Diagnosis",
  ];

  const rows = [
    {
      enteredDate: "2024-02-26",
      name: "Diabetes",
      since: "5 years",
      chronic: "Yes",
      primary: "Yes",
    },
    {
      enteredDate: "2024-02-27",
      name: "Hypertension",
      since: "3 years",
      chronic: "Yes",
      primary: "No",
    },
    {
      enteredDate: "2024-02-28",
      name: "Asthma",
      since: "10 years",
      chronic: "Yes",
      primary: "Yes",
    },
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Diagnosis Report", 14, 10);

    autoTable(doc, {
      head: [columns],
      body: rows.map((row) => [
        row.enteredDate,
        row.name,
        row.since,
        row.chronic,
        row.primary,
      ]),
      startY: 20,
    });

    doc.save("diagnosis_table.pdf");
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button onClick={handleDownloadPDF} className="s-btn me-3">
          Download as PDF
        </Button>
      </div>

      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Diagnosis</p>
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
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.since}</TableCell>
                    <TableCell>{row.chronic}</TableCell>
                    <TableCell>{row.primary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

  
    </>
  );
};

export default MDiagnosis;
