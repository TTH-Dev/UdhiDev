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
  TableRow,
} from "@mui/material";

const MTayerOraganInvolvement: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const data = [
    { label: "Name", value: "Answer" },
    { label: "Answer", value: "Yes" },
    { label: "Eyes - Retinopathy", value: "NPDR" },
    { label: "Eyes - Laser Photocoagulation", value: "RE" },
    { label: "Eyes - Vision", value: "Impaired" },
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
      head: [["Category", "Details"]],
      body: data.map((item) => [item.label, item.value]),
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
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        backgroundColor: "transparent",
                        width: "18rem",
                        color: "#595959",
                      }}
                      className="emr-label"
                    >
                      {item.label}
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "transparent", color: "#595959" }}
                      className="emr-label"
                    >
                      {item.value}
                    </TableCell>
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

export default MTayerOraganInvolvement;
