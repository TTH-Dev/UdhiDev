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

const MHistoryOfPresentIllness: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = ["Entered Date", "History Of Present Illness"];

  const rows = [
    {
      enteredDate: "2024-02-26",
      history:
        "Patient has been experiencing mild fever and cough for the past 3 days.",
    },
    {
      enteredDate: "2024-02-27",
      history:
        "Complaints of dizziness and nausea, started after meal consumption.",
    },
    {
      enteredDate: "2024-02-28",
      history: "Severe headache and body pain, possibly viral infection.",
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
    doc.text("History Of Present Illness", 14, 10);

    autoTable(doc, {
      head: [columns],
      body: rows.map((row) => [row.enteredDate, row.history]),
      startY: 20,
    });

    doc.save("history_of_present_illness.pdf");
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
                    <TableCell>{row.history}</TableCell>
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

export default MHistoryOfPresentIllness;
