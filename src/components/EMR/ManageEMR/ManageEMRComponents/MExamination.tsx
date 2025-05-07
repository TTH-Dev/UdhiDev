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

const MExaminations: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = [
    "Entered Date",
    "Heart Rate",
    "Rhythm",
    "BP",
    "Temp",
    "Resp. Rate",
    "SPO2",
    "In/Out",
  ];
  const rows = [
    {
      enteredDate: "2024-02-26",
      heartRate: "75 bpm",
      rhythm: "Normal",
      bp: "120/80",
      temp: "98.6°F",
      respRate: "16",
      spo2: "98%",
      inOut: "Balanced",
    },
    {
      enteredDate: "2024-02-27",
      heartRate: "80 bpm",
      rhythm: "Irregular",
      bp: "130/85",
      temp: "99.1°F",
      respRate: "18",
      spo2: "96%",
      inOut: "Deficit",
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
    doc.text("Patient Vitals", 14, 10);

    autoTable(doc, {
      head: [columns],
      body: rows.map((row) => [
        row.enteredDate,
        row.heartRate,
        row.rhythm,
        row.bp,
        row.temp,
        row.respRate,
        row.spo2,
        row.inOut,
      ]),
      startY: 20,
    });

    doc.save("patient_vitals.pdf");
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
        <p className="emr-search-text">General Examinations</p>
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
                    <TableCell>{row.heartRate}</TableCell>
                    <TableCell>{row.rhythm}</TableCell>
                    <TableCell>{row.bp}</TableCell>
                    <TableCell>{row.temp}</TableCell>
                    <TableCell>{row.respRate}</TableCell>
                    <TableCell>{row.spo2}</TableCell>
                    <TableCell>{row.inOut}</TableCell>
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

export default MExaminations;
