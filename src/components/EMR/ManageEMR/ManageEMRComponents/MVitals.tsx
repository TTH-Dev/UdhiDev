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

const MVitals: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const columns = [
    "Entered Date",
    "Height",
    "BP Systolic",
    "Weight",
    "BP Diastolic",
    "BMI",
    "Pulse",
    "Waist Circumference",
    "HC",
    "Temp",
  ];

  const rows = [
    {
      enteredDate: "2024-02-26",
      height: "170 cm",
      bpSystolic: "120 mmHg",
      weight: "70 kg",
      bpDiastolic: "80 mmHg",
      bmi: "24.2",
      pulse: "72 bpm",
      waistCircumference: "85 cm",
      hc: "50 cm",
      temp: "36.5°C",
    },
    {
      enteredDate: "2024-02-27",
      height: "165 cm",
      bpSystolic: "130 mmHg",
      weight: "65 kg",
      bpDiastolic: "85 mmHg",
      bmi: "23.8",
      pulse: "75 bpm",
      waistCircumference: "88 cm",
      hc: "52 cm",
      temp: "37°C",
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
        row.height,
        row.bpSystolic,
        row.weight,
        row.bpDiastolic,
        row.bmi,
        row.pulse,
        row.waistCircumference,
        row.hc,
        row.temp,
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
        <p className="emr-search-text"> Vitals</p>
        <div ref={printRef}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        backgroundColor: "transparent",
                        color: "#595959",
                        fontWeight: "400",
                        fontSize: "13px",
                      }}
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
                    <TableCell>{row.height}</TableCell>
                    <TableCell>{row.bpSystolic}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.bpDiastolic}</TableCell>
                    <TableCell>{row.bmi}</TableCell>
                    <TableCell>{row.pulse}</TableCell>
                    <TableCell>{row.waistCircumference}</TableCell>
                    <TableCell>{row.hc}</TableCell>
                    <TableCell>{row.temp}</TableCell>
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

export default MVitals;
