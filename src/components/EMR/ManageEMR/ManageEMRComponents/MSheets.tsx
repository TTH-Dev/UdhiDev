import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button, message, Modal } from "antd";
import axios from "axios";
import { api_url } from "../../../../Config";

const MSheets: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sheetData, setSheetData] = useState<any[]>([]);

  const fetchSheet = async () => {
    try {
      const id =sessionStorage.getItem("patientId");
      const token = localStorage.getItem("authToken");

      if (!token || !id) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [lasik, squint, glaucoma, contactLens] = await Promise.all([
        axios.get(`${api_url}/api/lasik?patientId=${id}`, { headers }),
        axios.get(`${api_url}/api/squint?patientId=${id}`, { headers }),
        axios.get(`${api_url}/api/glaucoma?patientId=${id}`, { headers }),
        axios.get(`${api_url}/api/contact-lens-test?patientId=${id}`, {
          headers,
        }),
      ]);


      

      const sheetData = [
        {
          title: "Lasik Sheet",
          images: lasik.data.data.lasiks.map((val: any) => val.lasikWorkSheet),
        },
        {
          title: "Squint Sheet",
          images: squint.data.data.squints.map(
            (val: any) => val.squintWorkSheet
          ),
        },
        {
          title: "Glaucoma Sheet",
          images: glaucoma.data.data.glaucomas.map(
            (val: any) => val.glaucomaWorkSheet
          ),
        },
        {
          title: "Contact Lens Sheet",
          images: contactLens.data.data.contactLensTests.map(
            (val: any) => val.contactLensTestWorkSheet
          ),
        },
      ];

      setSheetData(sheetData);
    } catch (error) {
      console.error(error);
      message.error(`Failed to load sheet`);
    }
  };

  const handleView = (base64: string) => {
    setPreviewImage(base64);
    setIsModalVisible(true);
  };

  const handleDownload = (base64: string) => {
    const link = document.createElement("a");
    link.href = base64;
    const id=sessionStorage.getItem("patientId");
    link.download = `${id}.png`;
    link.click();

  };

  useEffect(() => {
    fetchSheet();
  }, []);

  return (
    <div className="workup-tables">
      {sheetData.map((val: any) => (
        <div
          key={""}
          style={{ backgroundColor: "white" }}
          className="rounded mb-4"
        >
          <p className="emr-search-text p-3 mb-0">{val.title}</p>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="emr-label text-start">
                    Actions
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="emr-label text-start">
                    <>
                      {val.images.map((image: string, index: number) => (
                        <div key={index}>
                          <Button
                            className="s-btn me-2"
                            onClick={() => handleView(image)}
                          >
                            View
                          </Button>
                          <Button
                            className="s-btn my-3"
                            onClick={() => handleDownload(image)}
                          >
                            Download
                          </Button>
                        </div>
                      ))}
                    </>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      ))}

      <Modal
        onCancel={() => setIsModalVisible(false)}
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <div
        
        >
          <img
            src={previewImage || ""}
            alt="Sheet Preview"
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              background: "#fff",
              padding: "10px",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MSheets;
