import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Avatar, Button, message } from "antd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { api_url } from "../../Config";
import moment from "moment";

const NursingDetails: React.FC = () => {
  const [patientData, setPatientData] = useState<any>({});
  const [precsData, setPrecsData] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const getPrecs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/prescription/nurse/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrecsData(res?.data?.data?.nurseStation?.medicine);
      await getPatient(res?.data?.data?.nurseStation.patientId);
    } catch (error: any) {
      console.log(error);
    }
  };
  const getPatient = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientData(res?.data?.data?.patient);
      console.log(res?.data?.data?.patient);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrecs();
    console.log(patientData, "patientData");
  }, []);

  return (
    <>
      <div className="cont">
        <div className="mt-5 pt-5 ms-4 mb-0">
          <p className="back pb-2" style={{ color: "#414141" }}>
            <Link
              to="/nurse-station"
              style={{ textDecoration: "none", color: "#414141" }}
            >
              <i
                className="fi fi-br-angle-left"
                style={{ cursor: "pointer" }}
              ></i>
              <span
                style={{
                  zIndex: "999",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "0",
                  color: "#414141",
                  cursor: "pointer",
                }}
                className="ms-2 "
              >
                Back
              </span>
            </Link>
          </p>
        </div>
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "60px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <Row className="">
              <Col xs={12} md={1}>
                <Avatar style={{ height: "75px", width: "75px" }}>
                  {patientData?.PatientName}
                </Avatar>
              </Col>
              <Col xs={12} md={1}>
                <div>
                  <p className="emr-doc-name mb-0">
                    {patientData?.PatientName}
                  </p>
                  <p className="emr-doc-id">{patientData?.UHIDId}</p>
                </div>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details ps-5">
                <p>
                  <span className="emr-doc-text">Consult Doctor</span>
                  <span className="emr-pat-text ">
                    : {patientData?.doctorId?.doctorName}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Date & Time</span>
                  <span className="emr-pat-text ">
                    {" "}
                    : :{" "}
                    {patientData?.appointmentId?.createdAt
                      ? moment(patientData?.appointmentId?.createdAt).format(
                          "YYYY-MM-DD"
                        ) +
                        "&" +
                        patientData?.appointmentId?.timeSlot
                      : moment(patientData?.outPatientId?.createdAt).format(
                          "YYYY-MM-DD"
                        ) +
                        "&" +
                        patientData?.outPatientId?.timeSlot}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Patient Type</span>
                  <span className="emr-pat-text">
                    : {patientData?.patientType}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Reason</span>
                  <span className="emr-pat-text">
                    {" "}
                    :{" "}
                    {patientData?.appointmentId?.reason
                      ? patientData?.appointmentId?.reason
                      : patientData?.outPatientId?.reason}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>

          <>
            <div style={{ background: "#fff" }} className="mt-3 rounded">
              <div className="px-3">
                <p className="emr-search-text pt-3">Procedure</p>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          S. No
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Medication
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Dosage
                          <TableRow>
                            <TableCell
                              className="py-0"
                              style={{ border: "none", color: "#595959" }}
                            >
                              M
                            </TableCell>
                            <TableCell
                              className="py-0"
                              style={{ border: "none", color: "#595959" }}
                            >
                              A
                            </TableCell>
                            <TableCell
                              className="py-0"
                              style={{ border: "none", color: "#595959" }}
                            >
                              E
                            </TableCell>
                            <TableCell
                              className="py-0"
                              style={{ border: "none", color: "#595959" }}
                            >
                              N
                            </TableCell>
                          </TableRow>
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Instruction
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Duration
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {precsData?.map((val: any, i: any) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.medicineName || "-"}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <TableRow>
                              {["M", "A", "E", "N"].map((time: any) => (
                                <TableCell
                                  key={time}
                                  style={{
                                    border: "none",
                                    color: "#595959",
                                    textAlign: "center",
                                  }}
                                >
                                  {val?.Timing.includes(time)
                                    ? val?.quantity
                                    : "-"}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.tabletTiming.length &&
                              val?.tabletTiming.map((val: any) => (
                                <span>{val},</span>
                              ))}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.duration || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </>
        </div>
        <div className="d-flex justify-content-end save-cancel-btn my-4">
          <Link to="/nurse-station">
            <Button className="c-btn me-3">Cancel</Button>
          </Link>
          <Button className="s-btn">Completed</Button>
        </div>
      </div>
    </>
  );
};

export default NursingDetails;
