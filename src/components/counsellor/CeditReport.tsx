import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Avatar, Button, message } from "antd";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";


const CeditReport = () => {
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res?.data?.data?.patient);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
      <div className=" ms-1 mb-2 " onClick={() => navigate(-1)}>
        <p className="back" style={{ color: "#414141" }}>
          <i className="fi fi-br-angle-left" style={{ cursor: "pointer" }}></i>
          <span
            style={{
              zIndex: "999",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "0",
              color: "#414141",
              cursor: "pointer",
            }}
            className="ms-1 "
          >
            Back
          </span>
        </p>
      </div>
      <Container fluid className="emr-complaints-box rounded  py-3 ms-2">
        <Row className="g-4 flex-wrap">
          <Col xs={12} md={3} className="d-flex flex-shrink-0">
            <div className="me-3">
              <Avatar style={{ height: "75px", width: "75px" }}>
                {data?.PatientName}
              </Avatar>
            </div>
            <div className="mt-2">
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p className="emr-doc-name mb-1">{data?.PatientName || "-"}</p>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p className="emr-doc-id">{data?.UHIDId || "-"}</p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={4} className="emr-visit-details">
            <div
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <div className="emr-doc-text">Phone Number</div>
                <div className="emr-pat-text-new">: {data?.phoneNo || "-"}</div>
              </p>
            </div>

            <div
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <div className="emr-doc-text">OP Number</div>
                <div className="emr-pat-text-new">: {data?.opNo || "-"}</div>
              </p>
            </div>
            <div
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <div className="emr-doc-text">Reason</div>
                <div className="emr-pat-text-new">
                  : {data?.outPatientId?.reason || "-"}
                </div>
              </p>
            </div>
          </Col>

          <Col xs={12} md={4} className="emr-visit-details">
            <div
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <div className="emr-doc-text">Age</div>
                <div className="emr-pat-text-new">: {data?.age || "-"}</div>
              </p>
            </div>
            <div
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <div className="emr-doc-text">Sex</div>
                <div className="emr-pat-text-new">: {data?.sex || "-"}</div>
              </p>
            </div>
            <div
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <div className="emr-doc-text">Patient Type</div>
                <div className="emr-pat-text-new">
                  : {data?.patientType || "-"}
                </div>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="mx-2 mt-5 emr-complaints-box rounded ">
        <TableContainer component={Paper} elevation={0}>
          <div className="d-flex justify-content-between">
            <div>
              <p className="emr-search-text mb-0 ps-3 p-4">Surgery Details</p>
            </div>
            <div className="p-4">
              <Link
                to={`/counsellor/new-patient/patient-details/surgery-management?editId=${data?.surgeryDetailsId?._id}&id=${data?._id}`}
              >
                <Button className="i-btn">
                  <MdEdit />
                </Button>
              </Link>
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Type</TableCell>
                <TableCell className="emr-label">Categories</TableCell>
                <TableCell className="emr-label">Name</TableCell>
                <TableCell className="emr-label">Amount</TableCell>
                <TableCell className="emr-label">Total Amt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.surgeryDetailsId?.surgeryDetails.length > 0 &&
                data?.surgeryDetailsId?.surgeryDetails.map(
                  (row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.surgeryType}</TableCell>
                      <TableCell>{row?.categories}</TableCell>
                      <TableCell>{row?.surgeryName || "-"}</TableCell>
                      <TableCell>{row?.amount}</TableCell>
                      <TableCell>{row?.totalAmount}</TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>
              <TableCell className="b-n user-text">Subl Total</TableCell>
              <TableCell className="b-n">
                {data?.surgeryDetailsId?.subTotal || "-"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>

              <TableCell className="b-n user-text">Discount</TableCell>
              <TableCell className="b-n">10,000.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>

              <TableCell className="b-n box-title"> Total</TableCell>
              <TableCell className="b-n">
                {" "}
                {data?.surgeryDetailsId?.total || "-"}
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>

      <div className="emr-complaints-box mx-2 mt-3 rounded mb-5">
        <p className="emr-search-text mb-0 ps-3 p-4">Date and Time</p>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Surgery Date</TableCell>
                <TableCell className="emr-label">Surgery Time</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {data?.surgeryDetailsId?.surgeryName || "-"}
                </TableCell>
                <TableCell>
                  {moment(data?.surgeryDetailsId?.surgeryDate).format(
                    "YYYY-MM-DD"
                  ) || "-"}
                </TableCell>
                <TableCell>
                  {data?.surgeryDetailsId?.surgeryTime || "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CeditReport;
