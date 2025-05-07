import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  DatePicker,
  message,
  Modal,
  Select,
  Descriptions,
  Row,
  Col,
} from "antd";
import { Table as AntdTable } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoPrint } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { api_url } from "../../Config";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { MdDownload } from "react-icons/md";
import moment from "moment";

const Servicebilling: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);
  const [isreceipt, setIsReceipt] = useState(false);
  const [isprecription, setIsPrescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);

  const getBillingData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login Required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/prescription/get-Bill`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data.prescriptions.map(
        (val: any, index: number) => {
          return {
            key: index + 1,
            id: val._id,
            OPAPNo: val.patientId.UHIDId,
            UHID: val.UHID,
            PatientName: val.patientId.PatientName,
            ConsultDate: dayjs(val.createdAt).format("YYYY-MM-DD"),
            ConsultDoctor: val.patientId.doctorId.doctorName || "-",
            Status: val.status,
            patientType: val.patientId.patientType,
            patientId: val.patientId._id,
          };
        }
      );
      setData(data);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const handleApply = () => {
    setIsModalOpen(false);
  };
  const handlePrintpresc = async () => {
    if (contentRef2.current) {
      const canvas = await html2canvas(contentRef2.current);
      const imageData = canvas.toDataURL("image/png");

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  text-align: center;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <img src="${imageData}" />
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };

  const handlePrint = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imageData = canvas.toDataURL("image/png");

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  text-align: center;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <img src="${imageData}" />
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (contentRef2.current) {
      const canvas = await html2canvas(contentRef2.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("download.pdf");
    }
  };
  const handleDownloadPDFpresc = async () => {
    if (contentRef2.current) {
      const canvas = await html2canvas(contentRef2.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("download.pdf");
    }
  };

  const [pharmacyBill,setPharmacyBill]=useState({
    UHID:"",
    discount:0,
    billDetails:[{
      amount:0,
      discount:0,
      medicineName:"",
      medicineType:"",
      quantity:0,
      quantityType:"",
      taxAmount:0,
      totalAmount:0
    }],
    billId:"",
    createdAt:"",
    paymentMode:"",
    patientId:{
      PatientName:"",
      UHIDId:"",
      age:"",
      bloodGroup:"",
      phoneNo:"",
      doctorId:{
        doctorName:""
      }
    },
    patientName:"",
    patientType:"",
    paymentDate:"",
    prescriptionId:"",
    status:"",
    subTotal:0,
    total:0
  })

  const hanldeBill = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/prescription/getBillById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.data.prescriptionBilling);
      setPharmacyBill(res?.data?.data?.prescriptionBilling)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  function numberToWords(num?: number): string {
    if (num === undefined || isNaN(num)) return 'ZERO';
  
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
      'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
  
    const whole = Math.floor(num);
  
    if (whole < 20) return (a[whole] || '').toUpperCase();
    if (whole < 100) {
      const tens = Math.floor(whole / 10);
      const units = whole % 10;
      return `${b[tens]}${units ? ' ' + a[units] : ''}`.toUpperCase();
    }
    if (whole < 1000) {
      return `${a[Math.floor(whole / 100)]} hundred${whole % 100 !== 0 ? ' ' + numberToWords(whole % 100) : ''}`.toUpperCase();
    }
    if (whole < 1000000) {
      return `${numberToWords(Math.floor(whole / 1000))} thousand${whole % 1000 !== 0 ? ' ' + numberToWords(whole % 1000) : ''}`.toUpperCase();
    }
  
    return 'NUMBER TOO LARGE';
  }
  
  


  const prescriptionData = [
    {
      sno: "01",
      name: "Paracetamol ",
      type: "Tab",
      dosage: "1 - - 1",
      doseTime: "After Food",
      duration: "5 Days",
      medCount: "10 Tabs",
    },
    {
      sno: "02",
      name: "Paracetamol ",
      type: "Tab",
      dosage: "1 - - 1",
      doseTime: "After Food",
      duration: "5 Days",
      medCount: "10 Tabs",
    },
    {
      sno: "03",
      name: "Paracetamol ",
      type: "Tab",
      dosage: "1 - - 1",
      doseTime: "After Food",
      duration: "5 Days",
      medCount: "10 Tabs",
    },
  ];

  const appointmentColumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "OP/AP No",
      dataIndex: "OPAPNo",
      key: "OPAPNo",
    },
    {
      title: "UHID",
      dataIndex: "UHID",
      key: "UHID",
    },
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      key: "PatientName",
    },
    {
      title: "Consult Date",
      dataIndex: "ConsultDate",
      key: "ConsultDate",
    },
    {
      title: "Consult Doctor",
      dataIndex: "ConsultDoctor",
      key: "ConsultDoctor",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (text: string) => (
        <>
          {text === "Paid" ? (
            <span style={{ color: "#00BE4F" }}>{text}</span>
          ) : (
            <span style={{ color: "#FFAE00" }}>{text}</span>
          )}
        </>
      ),
    },

    {
      title: "Action",
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          {record.Status === "Paid" ? (
            <>
              {" "}
              <Button
                className="p-0 ms-1"
                style={{
                  border: "none",
                  width: "30px",
                  height: "30px",
                  color: "#fff",
                  backgroundColor: "#3497F9",
                }}
              >
                <IoPrint
                  style={{ fontSize: "18px" }}
                  onClick={() => {
                    setIsReceipt(true);
                    hanldeBill(record.id);
                  }}
                />
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Link
                to={`/pharmacy/service-billing/edit-service-billing?id=${record.patientId}&billid=${record.id}`}
              >
                {" "}
                <Button
                  className="p-0 ms-1"
                  style={{
                    border: "none",
                    width: "30px",
                    height: "30px",
                    color: "#fff",
                    backgroundColor: "#3497F9",
                  }}
                >
                  <GiReceiveMoney style={{ fontSize: "18px" }} />
                </Button>
              </Link>
            </>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    getBillingData();
  }, []);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Service Billing</p>

        {/* <div className="d-flex">
          <Button
            className="doc-fil-btn me-2"
            style={{ height: 38 }}
            onClick={() => setIsModalOpen(true)}
          >
            <FaFilter /> Filter
          </Button>

          {applied && (
            <Button className="doc-fil-btn mx-2" style={{ height: 38 }}>
              <MdOutlineReplay />
            </Button>
          )}

        </div> */}
      </div>

      <AntdTable
        columns={appointmentColumns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowClassName={(record: any) => {
          if (record.patientType === "General") return "inpatient-General";
          if (record.patientType === "Insurance") return "inpatient-Insurance";
          if (record.patientType === "Corporate") return "inpatient-Corporate";
          return "";
        }}
      />

      <Modal
        width={"28rem"}
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button
              className="c-btn me-3"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="s-btn" onClick={handleApply}>
              Apply
            </Button>
          </div>
        }
      >
        <div className="mt-3">
          <label className="mod-label mb-2">Date</label>
          <DatePicker style={{ height: 40, width: "100%" }} />
          <label className="mod-label mb-2">Report Status</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
          >
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select>
          <label className="mod-label mb-2">Patient Name</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
          >
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select>
        </div>
      </Modal>

      {/* Pharma Billing Dowmload */}

      <Modal
        onCancel={() => setIsReceipt(false)}
        open={isreceipt}
        width={"75%"}
        footer={false}
      >
        <div className="d-flex justify-content-between pt-5 px-4">
          <div>
            <span className="box-title"> Pharmacy Billing</span>
          </div>
          <div className="d-flex mb-3">
            <Button
              className=" mx-4 py-3"
              onClick={handlePrint}
              style={{ backgroundColor: "#3497F9" }}
            >
              <IoPrint style={{ fontSize: "18px", color: "white" }} />
            </Button>
            <Button
              className="py-3"
              onClick={handleDownloadPDF}
              style={{ backgroundColor: "#3497F9" }}
            >
              <MdDownload style={{ fontSize: "18px", color: "white" }} />
            </Button>
          </div>
        </div>
        <div className="ph-rec-img">
          <div className="ph-receipt m-4  mt-5 rounded" ref={contentRef}>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="p-3 pt-4">
                  <img
                    src="/assets/udhi-logo-edited 1.png"
                    style={{ height: "60px", width: "100px" }}
                    alt="Udhi-logo"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <span className="ph-rc-title">UDHI EYE HOSPITALS</span>
                  <br />
                  <span className="ph-rc-l2-txt">
                    (Run by Udhi Eye Hospital Trust)
                  </span>
                  <br />
                  <span className="ph-rc-l3-txt">
                    No.9, Murrays Gate Road , Alwarpet, Chennai -600 018
                  </span>
                  <br />
                  <span className="ph-rc-l3-txt">
                    Landline : 044-4347 1111 / 4218 8847 / 4218 8842 / 4218 8843
                  </span>
                  <br />
                  <span className="ph-rc-l4-txt">
                    Approved under Income Tax exemption under Section 12A
                  </span>
                </div>
              </div>
              <div className="p-5">
                <img
                  src="/assets/nabh.jpeg"
                  style={{ height: "60px", width: "60px" }}
                  alt="nabh-logo"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="d-flex justify-content-around ph-rc-bl-line mt-3">
              <div>
                <span>Mobile : 87545 74507</span>
              </div>
              <div>
                <span>E-mail : admin@udhieyehospitals.com</span>
              </div>
              <div>
                <span>Website : udhieyehospitals.com</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="my-3">
                <Descriptions
                  title=""
                  column={1}
                  className="custom-description ps-5"
                >
                  <Descriptions.Item label=" Name" className="summary-text ">
                    {" "}
                    <span className="">: {pharmacyBill?.patientName||"-"}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="UHID" className="summary-text">
                    <span className="">: {pharmacyBill?.UHID||"-"}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Age" className="summary-text">
                    <span className="">: {pharmacyBill?.patientId?.age||"-"} yrs</span>
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className="my-3">
                <Descriptions
                  title=""
                  column={1}
                  className="custom-description "
                >
                  <Descriptions.Item label="Date" className="summary-text">
                    {" "}
                    <span className="">: {moment(pharmacyBill?.paymentDate).format("YYYY-MM-DD")}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Bill No" className="summary-text">
                    <span className="">: {pharmacyBill?.billId||"-"}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Consult Doctor"
                    className="summary-text"
                  >
                    <span className="">: {pharmacyBill?.patientId?.doctorId?.doctorName||"-"}</span>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
            <p className="ph-rc-rctxt">Receipt</p>
            <TableContainer
              component={Paper}
              elevation={0}
              style={{ backgroundColor: "transparent" }}
            >
              <MuiTable>
                <TableHead>
                  <TableRow>
                    <TableCell className="tabl-heading">S. No</TableCell>
                    <TableCell className="tabl-heading">
                      Medicine Name
                    </TableCell>
                    <TableCell className="tabl-heading">Qyt</TableCell>
                    <TableCell className="tabl-heading">Amount</TableCell>
                    <TableCell className="tabl-heading">Discount</TableCell>
                    <TableCell className="tabl-heading">Tax Amount</TableCell>
                    <TableCell className="tabl-heading">Total Amt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pharmacyBill?.billDetails.length>0&&pharmacyBill?.billDetails.map((row:any, index:any) => (
                    <TableRow key={index}>
                      <TableCell className="tabl-content">{index+1}</TableCell>
                      <TableCell className="tabl-content">
                        <TableRow>{row?.medicineName||"-"} </TableRow>
                        <TableRow className="text-center">
                          {row?.medicineType||"-"}
                        </TableRow>
                      </TableCell>
                      <TableCell className="tabl-content">
                        {row?.quantity||"-"}
                      </TableCell>
                      <TableCell className="tabl-content">
                        {row?.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="tabl-content">
                        {row?.discount.toFixed(2)}
                      </TableCell>
                      <TableCell className="tabl-content">
                        {row?.taxAmount.toFixed(2)}
                      </TableCell>
                      <TableCell className="tabl-content">
                        {row?.totalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
            <div>
              <Row className="d-flex justify-content-between">
                <Col span={12}>
                  <div className="ps-3 mt-2">
                    <Descriptions column={1} className="custom-description ">
                      <Descriptions.Item
                        label="Amount in words"
                        className="summary-text"
                      >
                        {" "}
                        <span className="">: {numberToWords(pharmacyBill?.total)}</span>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Payment Mode"
                        className="summary-text"
                      >
                        <span className="">: {pharmacyBill?.paymentMode||"-"}</span>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className="d-flex justify-content-around ps-5 my-2">
                      <div className="text-start">
                        <span className="tabl-heading">Sub Total </span>
                      </div>
                      <div>
                        <span className="pe-5 tabl-content">{pharmacyBill?.subTotal||"-"}</span>
                        <br />
                      </div>
                    </div>
                    <div className="d-flex justify-content-around ps-5 my-2">
                      <div>
                        <span className="tabl-heading">Discount</span>
                      </div>
                      <div>
                        <span className="pe-5 tabl-content">{pharmacyBill?.discount||"-"}</span>
                        <br />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-around ps-5 my-2">
                    <div>
                      <span className="tabl-heading">Total</span>
                    </div>
                    <div>
                      <span className="pe-5 tabl-heading">{(pharmacyBill?.total).toFixed(2)||"-"}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <p
              className="tabl-content text-center "
              style={{ marginTop: "100px" }}
            >
              The above payment is made as per my requirement and with my full
              consent .{" "}
            </p>

            <div
              className="d-flex text-end m-5 py-5 "
              style={{ flexDirection: "column" }}
            >
              <span className="tabl-heading pe-3">For Udhi Eye Hospitals </span>
              <br />
              <span className="tabl-content pe-5">(Signature)</span>
            </div>
            <div
              className="ph-rc-bl-line py-3 "
              style={{ borderRadius: "0 0 5px 5px" }}
            ></div>
          </div>
        </div>
      </Modal>

      {/* Precps Download */}

      <Modal
        onCancel={() => setIsPrescription(false)}
        open={isprecription}
        width={"75%"}
        footer={false}
      >
        <div className="d-flex justify-content-between pt-5 px-4">
          <div>
            <span className="box-title"> Prescription</span>
          </div>
          <div className="d-flex mb-3">
            <Button
              className=" mx-4 py-3"
              onClick={handlePrintpresc}
              style={{ backgroundColor: "#3497F9" }}
            >
              <IoPrint style={{ fontSize: "18px", color: "white" }} />
            </Button>
            <Button
              className="py-3"
              onClick={handleDownloadPDFpresc}
              style={{ backgroundColor: "#3497F9" }}
            >
              <MdDownload style={{ fontSize: "18px", color: "white" }} />
            </Button>
          </div>
        </div>
        <div className="ph-receipt m-4  mt-5 rounded" ref={contentRef2}>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="p-5 ">
                <img
                  src="/assets/udhi-logo-edited 1.png"
                  style={{ height: "60px", width: "100px" }}
                  alt="Udhi-logo"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="ph-rc-title">UDHI EYE HOSPITALS</span>
                <br />
                <span className="ph-rc-l2-txt">
                  (Run by Udhi Eye Hospital Trust)
                </span>
                <br />
                <span className="tabl-heading">
                  Approved under Income Tax exemption under Section 12A
                </span>
                <br />
              </div>
            </div>
            <div className="p-5">
              <img
                src="/assets/Mask group 1 (1).png"
                style={{ height: "60px", width: "60px" }}
                alt="nabh-logo"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mx-5 px-5">
            <p className="text-center text-justify ph-rc-l2-txt text-black">
              Kindly buy prescribed medicines from your corporate organization
              only . Kindly get your corporate organization’s consent before
              buying the medicines as prescribed below :{" "}
            </p>
            <p className="text-center text-justify tabl-content text-black">
              In case of Eye / General Emergency . Please contact a hospital
              nearest to you if unable to come to Udhi Eye Hospitals{" "}
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <div className="my-3">
              <Descriptions
                title=""
                column={1}
                className="custom-description ps-5"
              >
                <Descriptions.Item label=" Name" className="summary-text ">
                  {" "}
                  <span className="">: Karthik</span>
                </Descriptions.Item>
                <Descriptions.Item label="OP No" className="summary-text">
                  <span className="">: OP1001</span>
                </Descriptions.Item>
                <Descriptions.Item label="Age/Sex" className="summary-text">
                  <span className="">: Male / 25 yrs</span>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className="my-3">
              <Descriptions title="" column={1} className="custom-description ">
                <Descriptions.Item label="Date" className="summary-text">
                  {" "}
                  <span className="">: 10-02-2025</span>
                </Descriptions.Item>
                <Descriptions.Item label="Optometrist" className="summary-text">
                  <span className="">: Kalai</span>
                </Descriptions.Item>
                <Descriptions.Item
                  label="Consult Doctor"
                  className="summary-text"
                >
                  <span className="">: Dr. Karthik</span>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
          <p className="ph-rc-rctxt">PRESCRIPTION</p>
          <TableContainer component={Paper} elevation={0}>
            <MuiTable>
              <TableHead>
                <TableRow>
                  <TableCell className="tabl-heading">S. No</TableCell>
                  <TableCell className="tabl-heading">Medicine Name</TableCell>
                  <TableCell className="tabl-heading">Dosage</TableCell>
                  <TableCell className="tabl-heading">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptionData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="tabl-content">{row.sno}</TableCell>
                    <TableCell className="tabl-content">
                      <TableRow>{row.name} </TableRow>
                      <TableRow className="text-center">({row.type})</TableRow>
                    </TableCell>
                    <TableCell className="tabl-content">
                      <TableRow>{row.dosage} </TableRow>
                      <TableRow className="text-center">
                        ({row.doseTime})
                      </TableRow>
                    </TableCell>
                    <TableCell className="tabl-content">
                      <TableRow>{row.duration} </TableRow>
                      <TableRow className="text-center">
                        ({row.medCount})
                      </TableRow>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
          <div>
            <Row className="d-flex justify-content-between">
              <Col span={12}>
                <div className="ps-3 mt-2">
                  <Descriptions column={1} className="custom-description ">
                    <Descriptions.Item
                      label="Description"
                      className="summary-text"
                    >
                      {" "}
                      <span className="">Advise to take the glass </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Col>
            </Row>
          </div>

          <div
            className="d-flex text-end m-5 py-5 "
            style={{ flexDirection: "column" }}
          >
            <span className="tabl-heading pe-1">Dr. M. Muthu Kumar., MD </span>
            <br />
            <span className="tabl-content pe-5">(Pathologist)</span>
          </div>
          <div className="text-center">
            <span className="ph-rc-l3-txt ">
              No.9, Murrays Gate Road , Alwarpet, Chennai -600 018
            </span>
          </div>
          <div className="text-center">
            <span className="ph-rc-l3-txt ">
              Landline : 044-4347 1111 / 4218 8847 / 4218 8842 / 4218 8843
            </span>
          </div>

          <div className="d-flex justify-content-around ph-rc-bl-line mt-3">
            <div>
              <span>Mobile : 87545 74507</span>
            </div>
            <div>
              <span>E-mail : admin@udhieyehospitals.com</span>
            </div>
            <div>
              <span>Website : udhieyehospitals.com</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Servicebilling;
