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

const IPAdmission: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = ["Entered Date", "Admit Reason", "Tentative Days", "Notes"];
  const rows = [
    {
      enteredDate: "2024-02-26",
      admitReason: "Fever",
      tentativeDays: "3",
      notes: "Monitor temperature regularly.",
    },
    {
      enteredDate: "2024-02-27",
      admitReason: "Surgery",
      tentativeDays: "7",
      notes: "Post-op care required.",
    },
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Patient Admission Details", 14, 10);

    autoTable(doc, {
      head: [columns],
      body: rows.map((row) => [
        row.enteredDate,
        row.admitReason,
        row.tentativeDays,
        row.notes,
      ]),
      startY: 20,
    });

    doc.save("admission_details.pdf");
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
        <p className="emr-search-text">Admission Details</p>
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
                    <TableCell>{row.admitReason}</TableCell>
                    <TableCell>{row.tentativeDays}</TableCell>
                    <TableCell>{row.notes}</TableCell>
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

export default IPAdmission;
