import React, { useEffect, useRef, useState } from "react";
import { Button, message, Modal } from "antd";

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

interface Attachment {
  attachment: any;
  enteredDate: string;
  testNames: string[];
  fileNames: string[];
}

const MAttachments: React.FC = () => {
  const [data, setData] = useState<Attachment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const columns = ["Entered Date", "Download"];

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

  const handleDownloadImage = async (fileName: string) => {
    try {
      const imgUrl = `${api_url}/public/images/${fileName}`;

      const response = await fetch(imgUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
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
        `${api_url}/api/patient/get-attachments?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const attachments = res?.data?.data?.attachments.map((att: any) => ({
        enteredDate: att.enteredDate
          ? moment(att.enteredDate).format("DD-MM-YYYY")
          : "-",
        attachment: att.attachment,
      }));

      console.log(attachments);
      setData(attachments);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      return;
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
      </div>

      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Attachments</p>
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
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.enteredDate}</TableCell>
                      {/* <TableCell>
                      <Button onClick={()=>handleView()}>
                        <MdPreview />
                        </Button>
                        <Button>
                          <FaRegArrowAltCircleDown />
                        </Button>
                       
                      </TableCell> */}

                      <TableCell>
                        <Button
                          type="link"
                          onClick={() =>
                            handleDownloadImage(item?.attachment[0])
                          }
                          icon={<FaRegArrowAltCircleDown />}
                        >
                          {item?.attachment[0].slice(-10)}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
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
      ></Modal>
    </>
  );
};

export default MAttachments;
