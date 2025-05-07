import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, message, Pagination } from "antd";
import { Modal } from "antd";

import jsPDF from "jspdf";
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
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";

type ref = {
  refractionSheet: string;
  enteredDate: string;
};

const MRefractionSheet: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ref[]>([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = (base64: string) => {
    setPreviewImage(base64);
    setIsModalVisible(true);
  };

  const columns = ["Entered Date", "Sheet"];

  const handlePrint = (base64Image: string, date: string) => {
    const originalContent = document.body.innerHTML;

    const printContent = `
      <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
        <h3>Refraction Sheet - ${date}</h3>
        <img src="${base64Image}" alt="Refraction Sheet" style="max-width: 100%; height: auto;" />
      </div>
    `;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleDownloadPDF = (base64Image: string, date: string) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: false, 
    });
  
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 10);
  
    const img = new Image();
    img.src = base64Image;
  
    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - 30; 
      const aspectRatio = img.width / img.height;
      const imgWidth = Math.min(img.width * 0.264583, maxWidth); 
      const imgHeight = imgWidth / aspectRatio;
  
      doc.addImage(img, "PNG", 15, 20, imgWidth, imgHeight);
  
      const id = sessionStorage.getItem("patientId") || "unknown";
      const safeDate = date.replace(/[\/\\:]/g, "-").replace(/\s/g, "_");
      const fileName = `refraction_sheet_${id}_${safeDate}.pdf`;
  
      doc.save(fileName);
    };
  
    img.onerror = () => {
      console.error("Failed to load image for PDF.");
    };
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
        `${api_url}/api/refraction-sheet?patentId=${id}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = res?.data?.data?.refractionSheets?.map((sur: any) => ({
        enteredDate: sur.enteredDate
          ? moment(sur.enteredDate).format("DD-MM-YYYY")
          : "-",
        refractionSheet: sur?.refractionSheet,
      }));
     
      setTotalPages(res.data.totalPages);
      setData(response);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load Screen Usage. Please try again.");
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

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p style={{ fontWeight: 600, color: "#595959" }}>Refraction Sheet</p>
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
                {data && data.length > 0 ? (
                  data.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{row.enteredDate || "-"}</TableCell>
                        <TableCell>
                          {
                            <div className="d-flex">
                              <Avatar
                                shape="square"
                                size={64}
                                src={`${row.refractionSheet}`}
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleImageClick(row.refractionSheet)
                                }
                              />
                              <div className="d-flex">
                                <div className="pt-3  text-centere search-btn-box mx-4">
                                  <Button
                                    onClick={() =>
                                      handleDownloadPDF(
                                        row.refractionSheet,
                                        row.enteredDate
                                      )
                                    }
                                  >
                                    <FaRegArrowAltCircleDown />
                                  </Button>
                                </div>
                                <div className="pt-3  text-centere search-btn-box mx-3">
                                  <Button
                                    onClick={() =>
                                      handlePrint(
                                        row.refractionSheet,
                                        row.enteredDate
                                      )
                                    }
                                  >
                                    <IoPrint />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <img
          src={previewImage || ""}
          alt="Preview"
          className=""
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Modal>
      <div>
          <div className="d-flex justify-content-end mt-3">
                      <Pagination
                        current={currentPage}
                        total={totalPages * pageSize}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                      />
                    </div>
      </div>
    </>
  );
};

export default MRefractionSheet;
