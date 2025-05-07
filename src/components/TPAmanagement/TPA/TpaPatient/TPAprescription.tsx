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
import axios from "axios";
import { api_url } from "../../../../Config";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TPAprescription: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const columns = ["Entered Date", "Prescription", "Download"];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
  const fetchData = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/prescription?patientId=${id}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = res?.data?.data?.prescriptions?.map((presc: any) => ({
        enteredDate: presc.enteredDate
          ? moment(presc.enteredDate).format("DD-MM-YYYY")
          : "-",
        prescriptions: presc.prescriptions || "-",
        attachment: presc.attachment || "",
      }));

      setTotalPages(res.data.totalPages);
      setData(response);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load prescriptions. Please try again.");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, [currentPage]);

  const handleDownloadPdf = async () => {
    const input = printRef.current;
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("prescriptions.pdf");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">
            <Button onClick={handlePrint} className="c-btn me-3">
              Print
            </Button>
            <Button className="s-btn" onClick={handleDownloadPdf}>
               Download PDF
            </Button>
          </div>
      <div className="emr-complaints-box mt-4 rounded p-4">
    

        <div ref={printRef} style={{ backgroundColor: "#fff", padding: "20px" }}>
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
                {data.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    <TableCell>{row.prescriptions}</TableCell>
                    <TableCell>
                      {row.attachment ? (
                        <a
                          href={`/${row.attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
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

export default TPAprescription;
