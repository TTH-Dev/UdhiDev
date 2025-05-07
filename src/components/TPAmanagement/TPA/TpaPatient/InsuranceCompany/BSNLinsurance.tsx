import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Col, DatePicker, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useRef, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const BSNLinsurance = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
    const printRef = useRef<HTMLDivElement>(null);
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
    <div ref={printRef}>
        <Row>

            <Col span={24}>
            <div className="emr-complaints-box">
        <div className="d-flex justify-content-between px-3">
          <div className="d-flex">
            <div className="m-auto">
              <img
                src="/assets/udhi-logo-edited 1.png"
                style={{ height: "130px", width: "220px" }}
                alt="Udhi-logo"
                className="print-logo"

                loading="lazy"
              />
            </div>
            <div className="p-3">
              <span className="ins-title">UDHI EYE HOSPITALS</span>
              <br />
              <span className="ins-sub-title">
                (Run by Udhi Eye Hospital Trust)
              </span>
              <br />
              <span className="ins-sub-text">
                No.9, Murrays Gate Road , Alwarpet, Chennai -600 018
              </span>
              <br />
              <span className="ins-sub-text">
                Landline : 044-4347 1111 / 4218 8847 / 4218 8842 / 4218 8843
              </span>
              <br />
              <span className="ins-sub-text">
                Mobile : 87545 74507 E-mail : admin@udhieyehospitals.com
              </span>
              <br />
              <span className="ins-sub-text">
                Visit us at : www.udhieyehospitals.com
              </span>
              <br />
              <span className="ins-sub-title">
                Approved under Income Tax exemption under Section 12A
              </span>
            </div>
          </div>
          <div className="m-auto">
            <img
              src="/assets/nabh.jpeg"
              style={{ height: "120px", width: "120px" }}
              alt="nabh-logo"
              className="print-logo"

              loading="lazy"
            />
          </div>
        </div>

        <div>
          <Row>
            <Col span={12}>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Bill No</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Patient Name</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">OP No</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Company Name</label>

                <div className="me-5 pe-5">
                  <span className="emr-doc-name " style={{ color: "#595959" }}>
                    BSNL
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Diagnosis</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">EMR Card No</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Date of Admission</label>
                <DatePicker style={{ width: "200px" }} />
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Bill Date</label>
                <DatePicker style={{ width: "200px" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Date of Surgery</label>
                <DatePicker style={{ width: "200px" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Employee</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>
              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Designation</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>

              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Pensioner No</label>
                <TextArea autoSize style={{ width: "50%" }} />
              </div>

              <div className="d-flex justify-content-between px-5 my-3">
                <label className="emr-doc-name">Date of Discharge</label>
                <DatePicker style={{ width: "200px" }} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
            
            </Col>
            <Col span={24}>
            <div className="mt-5 rounded">
        <TableContainer
          component={Paper}
          elevation={0}
          style={{ maxHeight: 400}}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <span className="emr-doc-name ">CGHS Code No</span>
                </TableCell>
                <TableCell className="b-lr " align="center">
                  <span className="emr-doc-name">Particulars</span>
                </TableCell>
                <TableCell align="center">
                  <span className="emr-doc-name">NABH Amount</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextArea autoSize style={{ width: "100%" }} />
                </TableCell>
                <TableCell className="b-lr">
                  <TextArea autoSize />
                </TableCell>
                <TableCell>
                  <TextArea autoSize />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextArea autoSize style={{ width: "100%" }} />
                </TableCell>
                <TableCell className="b-lr">
                  <TextArea autoSize />
                </TableCell>
                <TableCell>
                  <TextArea autoSize />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextArea autoSize style={{ width: "100%" }} />
                </TableCell>
                <TableCell className="b-lr">
                  <TextArea autoSize />
                </TableCell>
                <TableCell>
                  <TextArea autoSize />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextArea autoSize style={{ width: "100%" }} />
                </TableCell>
                <TableCell className="b-lr">
                  <TextArea autoSize />
                </TableCell>
                <TableCell>
                  <TextArea autoSize />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="b-lr">
                  <TextArea autoSize />
                </TableCell>
                <TableCell>
                  <TextArea autoSize />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
            
            </Col>
            <Col span={24}>
            
      <div className="mt-3">
        <div>
          <label className="emr-doc-name mb-2"> Doctor Signature</label>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
       
      </div>
            </Col>
        </Row>
   

   
    </div>
    
      <div className="text-end me-3">
        <Button className="s-btn" onClick={handlePrint}>
            Save
        </Button>
      </div>
    </>
  );
};

export default BSNLinsurance;
