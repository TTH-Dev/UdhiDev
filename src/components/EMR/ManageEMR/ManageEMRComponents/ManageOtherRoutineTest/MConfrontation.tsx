import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import jsPDF from "jspdf";
import { Image as  Button } from "antd";

import { message, Modal, Pagination } from "antd";
import axios from "axios";
import { api_url } from "../../../../../Config";
import moment from "moment";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";

const MConfrontation: React.FC = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [data, setData] = useState<any>([]);
  const columns = ["Entered Date", "Image"];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImagePreview = (url: string) => {
    setPreviewUrl(url);
    setModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDatas = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/other-routine-test?patientId=${id}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const routineTests = res.data.data.otherRoutineTests;

      const colorvision = routineTests.flatMap(
        (test: any) =>
          test.confrontation?.map((entry: any) => ({
            enteredDate: entry.enteredDate
              ? moment(entry.enteredDate).format("DD-MM-YYYY")
              : "-",
            confrontationImage: entry.confrontationImage || "-",
          })) || []
      );

      setData(colorvision);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const handleDownloadPDF = (Img: string, date: string) => {
    const doc = new jsPDF();
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 14, 10);
        doc.addImage(image, "PNG", 15, 20, 180, 160);

        const id = sessionStorage.getItem("patientId");
        const safeDate = date.replace(/\//g, "-").replace(/\s/g, "_");
        doc.save(`Confrontation_${id}_${safeDate}.pdf`);
      } catch (err) {
        console.error("PDF generation error:", err);
        message.error("Error generating PDF");
      }
    };

    image.onerror = () => {
      console.error("Image failed to load");
      message.error("Image could not be loaded for PDF");
    };

    image.src = Img;
  };

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
  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      getDatas(id);
    }
  }, [currentPage]);

  return (
    <>
      <div className="emr-complaints-box mt-1 rounded p-4">
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
                  <TableCell>
                    {row.confrontationImage !== "-" ? (
                      <div className="d-flex">
                        <img
                        className="mt-4"
                          src={`${api_url}/public/images/${row.confrontationImage}`}
                          alt="preview"
                          style={{ width: 40, height: 40, cursor: "pointer" }}
                          onClick={() =>
                            handleImagePreview(
                              `${api_url}/public/images/${row.confrontationImage}`
                            )
                          }
                        />
                        <div className="d-flex">
                          <div className="pt-4 mt-2 text-centere search-btn-box mx-5">
                            <Button
                              onClick={() =>
                                handleDownloadPDF(
                                  `${api_url}/public/images/${row.confrontationImage}`,

                                  row.enteredDate
                                )
                              }
                            >
                              <FaRegArrowAltCircleDown />
                            </Button>
                          </div>
                          <div className="pt-4 mt-2 text-centere search-btn-box mx-3">
                            <Button
                              onClick={() =>
                                handlePrint(
                                  `${api_url}/public/images/${row.confrontationImage}`,
                                  row.enteredDate
                                )
                              }
                            >
                              <IoPrint />
                            </Button>
                          </div>
                        </div>
                      </div>
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

      <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <Modal
        style={{ top: 20 }}
        title="Confrontation Image"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={false}
      >
        <img
          src={previewUrl || ""}
          alt="Preview"
          style={{ width: "100%", borderRadius: 8 }}
        />
      </Modal>
    </>
  );
};

export default MConfrontation;
