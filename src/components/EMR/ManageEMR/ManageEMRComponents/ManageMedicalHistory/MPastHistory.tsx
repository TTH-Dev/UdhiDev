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

const MPastHistory: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = [
    "Entered Date",
    "Tuberculosis",
    "Thyroid Problem",
    "Jaundice",
    "Asthma / COPD",
    "Blood Transfusions",
  ];

  const rows = [
    {
      enteredDate: "2024-02-26",
      tuberculosis: "No",
      thyroid: "Yes",
      jaundice: "No",
      asthma: "No",
      bloodTransfusions: "Yes",
    },
    {
      enteredDate: "2024-02-27",
      tuberculosis: "Yes",
      thyroid: "No",
      jaundice: "No",
      asthma: "Yes",
      bloodTransfusions: "No",
    },
    {
      enteredDate: "2024-02-28",
      tuberculosis: "No",
      thyroid: "No",
      jaundice: "Yes",
      asthma: "No",
      bloodTransfusions: "No",
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
    doc.text("Past Medical History", 14, 10);

    autoTable(doc, {
      head: [columns],
      body: rows.map((row) => [
        row.enteredDate,
        row.tuberculosis,
        row.thyroid,
        row.jaundice,
        row.asthma,
        row.bloodTransfusions,
      ]),
      startY: 20,
    });

    doc.save("past_medical_history.pdf");
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
                    <TableCell>{row.tuberculosis}</TableCell>
                    <TableCell>{row.thyroid}</TableCell>
                    <TableCell>{row.jaundice}</TableCell>
                    <TableCell>{row.asthma}</TableCell>
                    <TableCell>{row.bloodTransfusions}</TableCell>
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

export default MPastHistory;
