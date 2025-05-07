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

const MDiabetesandItsComplication: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = [
    "Entered Date",
    "Duration Of DM",
    "Glycemic Control",
    "Hyperglycemic Episodes",
  ];

  const rows = [
    {
      enteredDate: "2024-02-26",
      duration: "10 years",
      glycemicControl: "Moderate",
      episodes: "Rare",
    },
    {
      enteredDate: "2024-02-27",
      duration: "5 years",
      glycemicControl: "Good",
      episodes: "Occasional",
    },
    {
      enteredDate: "2024-02-28",
      duration: "15 years",
      glycemicControl: "Poor",
      episodes: "Frequent",
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
    doc.text("Diabetes and Its Complications", 14, 10);

    autoTable(doc, {
      head: [columns],
      body: rows.map((row) => [
        row.enteredDate,
        row.duration,
        row.glycemicControl,
        row.episodes,
      ]),
      startY: 20,
    });

    doc.save("diabetes_complications.pdf");
  };

  return (
    <>
      <div className="d-flex justify-content-end button-container">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button onClick={handleDownloadPDF} className="s-btn me-3">
          Download as PDF
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
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>{row.glycemicControl}</TableCell>
                    <TableCell>{row.episodes}</TableCell>
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

export default MDiabetesandItsComplication;
