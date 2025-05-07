import { Button, Col, DatePicker, Descriptions, message, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api_url } from "../../Config";
import dayjs from "dayjs";
import moment from "moment";
import { RiResetRightFill } from "react-icons/ri";
import { IoPrint } from "react-icons/io5";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow , Table as MuiTable} from "@mui/material";
import { MdDownload } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SalesDetails = () => {
  const [dataD,setDataD]=useState<any>()
  console.log(dataD,"dataD");
  

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      render: (_text: string, _record: any, index: any) => <>{index + 1}</>,
    },
    { title: "Patient Name", dataIndex: "Patient Name",render:(_text:any,record:any)=>(
        <>{record?.patientId?.PatientName}</>
    ) },
    { title: "Bill Date", dataIndex: "enteredDate",render:(text:any)=>(
        <>{moment(text).format("YYYY-MM-DD")}</>
    ) },
    { title: "Bill No", dataIndex: "billNo" },
    { title: "Bill Amount", dataIndex: "total" },
    { title: "Payment mode", dataIndex: "mode" },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_text: any,record:any) => (
        <>
          {" "}
          {/* <Button
            className="me-2"
            style={{
              width: "40px",
              height: "40px",
              padding: "0px",
              background: "#3497F9",
            }}
          >
            {" "}
            <TbRepeat style={{ fontSize: "20px", color: "#fff" }} />{" "}
          </Button> */}
          <Button
            style={{
              width: "40px",
              height: "40px",
              padding: "0px",
              background: "#3497F9",
            }}
            onClick={()=>{
            setIsPrescription(true)
            setDataD(record)
            }}
          >
            {" "}
            <IoPrint style={{ fontSize: "20px", color: "#fff" }} />{" "}
          </Button>{" "}
        </>
      ),
    },
  ];
  const [data, setData] = useState<any>([]);
  const [dates, setDates] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)),
    to: new Date(),
  });

  const [isprecription,setIsPrescription]=useState(false)
  const getReports = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-billing?date=${moment(dates?.to).format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    setData(res.data.data.opticalBilling)
    } catch (error: any) {
      console.log(error);
    }
  };
 const contentRef2 = useRef<HTMLDivElement>(null);
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

  const handleReset = () => {
    setDates({
      from: new Date(new Date().setDate(new Date().getDate() - 1)),
      to: new Date(),
    });
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


  useEffect(() => {
    getReports();
  }, [ dates.to]);
  return (
    <>
      <div className="emr-complaints-box rounded p-4 ms-4">
        <div className="d-flex justify-content-between align-items-center my-3">
          <p className="emr-search-text mb-0">Sales Details</p>
          <div>
          
            <DatePicker
              value={dayjs(dates.to)}
              className="ms-2"
              placeholder="To"
              onChange={(value) => setDates({ ...dates, to: value.toDate() })}
            />
            <Button className="ms-2" onClick={handleReset}>
              <RiResetRightFill />
            </Button>
          </div>
        </div>

        <div>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>


        <>
           {/* Precps Download */}

      <Modal
        onCancel={() => setIsPrescription(false)}
        open={isprecription}
        width={"75%"}
        footer={false}
      >
        <div className="d-flex justify-content-between pt-5 px-4">
          <div>
            <span className="box-title"> Optical Bill</span>
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
        <div className="ph-rec-img">
                <div className="ph-receipt m-4  mt-5 rounded" ref={contentRef2}>
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
                         {dataD?.patientId?.PatientName||"-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="UHID" className="summary-text">
                        {dataD?.patientId?.UHIDId||"-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Age" className="summary-text">
                        {dataD?.patientId?.age||"-"}
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
                        {moment(dataD?.enteredDate).format("YYYY-MM-DD")}
                        </Descriptions.Item>
                        <Descriptions.Item label="Bill No" className="summary-text">
                          {dataD?.billNo||"-"}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Blood Group"
                          className="summary-text"
                        >
                          {dataD?.patientId?.bloodGroup||"-"}
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
                          Product name
                          </TableCell>
                          <TableCell className="tabl-heading">Qyt</TableCell>
                          <TableCell className="tabl-heading">Amount</TableCell>
                          <TableCell className="tabl-heading">Discount</TableCell>
                          <TableCell className="tabl-heading">Total Amt</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataD?.billData.length>0&&dataD?.billData.map((val:any,index:any)=>(
                          <TableRow key={index}>
                            <TableCell className="tabl-content">{index+1}</TableCell>
                            <TableCell className="tabl-content">
                             {val?.productName||"-"}
                            </TableCell>
                            <TableCell className="tabl-content">
                             {val?.quantity||"-"}
                            </TableCell>
                            <TableCell className="tabl-content">
                             {val?.rate||"-"}
                            </TableCell>
                            <TableCell className="tabl-content">
                            {val?.discount||"-"}
                            </TableCell>
                            <TableCell className="tabl-content">
                          {val?.totalAmount||"-"}
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
                              <span className="">:  {numberToWords(dataD?.total)}</span>
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Payment Mode"
                              className="summary-text"
                            >
                              <span className="">: {dataD?.mode||"-"}</span>
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
                              <span className="pe-5 tabl-content"> {dataD?.subTotal||0}</span>
                              <br />
                            </div>
                          </div>
                          <div className="d-flex justify-content-around ps-5 my-2">
                            <div>
                              <span className="tabl-heading">Discount</span>
                            </div>
                            <div>
                              <span className="pe-5 tabl-content"> {dataD?.discount||0}</span>
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
                            <span className="pe-5 tabl-heading"> {dataD?.total||0}</span>
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
        </>
      </div>
    </>
  );
};

export default SalesDetails;
