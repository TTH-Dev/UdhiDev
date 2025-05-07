import React, { useEffect, useState } from "react";
import { Avatar, Button, message } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
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
import { api_url } from "../../Config";

const AddOutPatient: React.FC = () => {
  const naviagte = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [patientData, setPatientData] = useState<any>();

  const getPatientDetails = async () => {
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
      setPatientData(res.data.data.patient);
      await getConFees(res.data.data.patient);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [amount, setAmount] = useState(0);

  const getConFees = async (patientDatas: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/consulty-fees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (
        patientDatas?.patientType === "General"
      ) {
        const rfs = res.data.data.consultingFees.filter(
          (val: any) => val.feesType === patientDatas.patientType
        );
        setAmount(rfs[0]?.feesAmount);


      } else if (
        patientDatas?.patientType === "Corporate"
      ) {
        const rfs = res.data.data.consultingFees.filter(
          (val: any) => val.feesType === patientDatas.patientType
        );

        setAmount(rfs[0]?.feesAmount);
      } else if (
        patientDatas?.patientType === "Insurance"
      ) {
        const rfs = res.data.data.consultingFees.filter(
          (val: any) => val.feesType === patientDatas.patientType
        );
        setAmount(rfs[0]?.feesAmount);
      } else if (patientDatas?.visitType === "Follow-Up") {
        const rfs = res.data.data.consultingFees.filter(
          (val: any) => val.feesType === patientDatas.patientType
        );
        setAmount(rfs[0]?.feesAmount);
      }
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      let dgs = {
        patientId: id,
        patientName: patientData.patientName,
        status: "Unpaid",
        billStatus: "Generated",
        billAmount: amount,
        apStatus: patientData.patientStatus === "Appointment" ? "Waiting" : "",
        opStatus: patientData.patientStatus === "Outpatient" ? "Waiting" : "",
        billDetails: [
          {
            serviceName: "Consultation",
            quantity: 1,
            totalAmount: amount,
            amount: amount,
            discount: 0
          },
        ],
        subTotal: amount,
        total: amount,
        amount: amount,
      };

      console.log(dgs, "gsdsd");

      await axios.post(`${api_url}/api/billing`, dgs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Created Successfully!");
      naviagte("/out-patient/op-billing");
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getPatientDetails();
    }
  }, [id]);

  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <Link
            to="/out-patient/op-billing"
            style={{ color: "#414141", textDecoration: "none" }}
          >
            <i
              className="fi fi-br-angle-left"
              style={{ cursor: "pointer" }}
            ></i>
            <span
              className="ms-2"
              style={{
                zIndex: "99",
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "0",
                color: "#414141",
                cursor: "pointer",
              }}
            >
              Back
            </span>
          </Link>
        </p>
      </div>

      <Container
        fluid
        className="emr-doc-box py-3 mx-3 mt-4"
        style={{ width: "98%" }}
      >
        <Row className="align-items-start justify-content-between ">
          <Col xs={12} md={1}>
            <Avatar style={{ height: "75px", width: "75px" }}>{patientData?.PatientName.slice(0, 1)}</Avatar>
          </Col>

          <Col xs={12} md={2} className="">
            <p className="emr-doc-name mb-1">
              {patientData?.PatientName || "-"}
            </p>
            <p className="emr-doc-id">{patientData?.UHIDId || "-"}</p>
          </Col>

          <Col xs={12} md={5} className="text-start emr-visit-details">
            <p>
              <span className="emr-doc-text">Phone Number</span>
              <span className="emr-pat-text ">
                : {patientData?.phoneNo || "-"}
              </span>
            </p>
            <p>
              <span className="emr-doc-text">Age</span>
              <span className="emr-pat-text ">
                {" "}
                : {patientData?.age || "0"} Years
              </span>
            </p>
            <p>
              <span className="emr-doc-text">Blood Group</span>
              <span className="emr-pat-text">
                : {patientData?.bloodGroup || "-"}
              </span>
            </p>
            <p>
              <span className="emr-doc-text">Reason</span>
              <span className="emr-pat-text">
                :{" "}
                {patientData?.outPatientId?.reason ||
                  patientData?.appointmentId?.reason}
              </span>
            </p>
          </Col>

          <Col xs={12} md={4} className="emr-dis-sec align-self-start ">
            <p>
              <span className="emr-doc-text">Current Status</span>
              <span className="emr-pat-text ms-4">
                {" "}
                :{" "}
                {patientData?.outPatientId?.status ||
                  patientData?.appointmentId?.status}
              </span>
            </p>
          </Col>
        </Row>
      </Container>
      <div className="ms-3 mt-3 emr-complaints-box rounded">
        <p className="emr-search-text p-4">Bill Details</p>

        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="invoice table ">
            <TableHead>
              <TableRow>
                {["S.No", "Service Name", "Qty", "Amount", "Total Amt"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#666666",
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>{1}</TableCell>
                <TableCell style={cellStyle}>Consulting fees</TableCell>
                <TableCell style={cellStyle}>1</TableCell>

                <TableCell style={cellStyle}>₹ {amount || "-"}</TableCell>
                <TableCell style={cellStyle}>₹ {amount || "-"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#353535",
                    textAlign: "right",
                  }}
                >
                  Sub Total:
                </TableCell>
                <TableCell className="" style={cellStyle}>
                  ₹ {amount || "-"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#353535",
                    textAlign: "right",
                  }}
                >
                  Total:
                </TableCell>
                <TableCell className="" style={cellStyle}>
                  ₹ {amount || "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn my-4">
        <Button className="c-btn me-3" onClick={() => naviagte(-1)}>
          Cancel
        </Button>
        <Button className="s-btn" onClick={handleSave}>
          Save{" "}
        </Button>
      </div>
    </div>
  );
};
const cellStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  width: "200px",
  color: "#353535",
};

export default AddOutPatient;