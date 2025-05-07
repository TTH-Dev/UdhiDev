import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Avatar, Button, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { LuRepeat } from "react-icons/lu";
import { PiPlayBold } from "react-icons/pi";
import { TbPlayerStop } from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import axios from "axios";
import dayjs from "dayjs";

const EditOPIPtest = () => {
  const [patientDate, setPatientData] = useState<any>({});
  const [testData, setTestData] = useState([]);
  const [data, setData] = useState<any>([
    {
      sno: "",
      testName: "",
      testVitals: "",
      values: "",
      referenceValue: "",
    },
  ]);
  const [testStartTime, setTestStartTime] = useState("00.00");
  const [testEndTime, setTestEndTime] = useState("00.00");

  const [ids, setId] = useState("");
  const [searchValue] = useSearchParams();
  const id = searchValue.get("id");

  const handleRepeat = (index: number) => {
    const newRow = { ...data[index] };
    setData((prev: any) => [...prev, newRow]);
  };
  const handleTestedBy = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/testedBy-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let vsf = res?.data?.data?.testedBy.map((val: any) => ({
        label: val,
        value: val,
      }));

      setTestData(vsf);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleChange = async (value: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      setPatientData({ ...data, testedBy: value[0] });

      if (value[0]) {
        await axios.post(
          `${api_url}/api/patient/add-testedBy/${ids}`,
          { testedBy: value[0] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Updated Successfully!");
      }

      await handleTestedBy();
    
     
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getTests = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/prescribe-test/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data.prescribeTest.testId.map(
        (val: any, index: number) => {
          return {
            sno: index + 1,
            testName: val.testName,
            testVitals: val.values[0].testVitals,
            value: "",
            referenceValue: val.values[0].referenceValues,
          };
        }
      );
      const ids = res?.data?.data?.prescribeTest?.patientId;
      setId(ids);
      setData(data);
      await getDetails(ids);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDetails = async (id: any) => {
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
      const patient = res.data.data.patient;
      setPatientData(patient);
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

  const postData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.post(
        `${api_url}/api/prescribe-test/lap-report`,
        {
          patientId: ids,
          testData: data,
          testEndTime: testEndTime,
          testStartTime: testStartTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const patient = res.data.data.patient;
      setPatientData(patient);
      message.success("LapReport Created Successfully!");
      // navigate() use the lapRpoet format Address
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };
  useEffect(() => {
    getTests();
  }, []);
  useEffect(() => {
    handleTestedBy();
  }, []);
  return (
    <>
      <div className="cont">
        <div className="back-box-doc mt-5 ms-3">
          <p className="back pt-5 pb-3" style={{ color: "#414141" }}>
            <Link
              to="/laboratory/op-ip-test"
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
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "16px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <Row className="align-items-start justify-content-start">
              <Col xs={12} md={1}>
             
                <Avatar  style={{ height: "75px", width: "75px" }}>{patientDate?.PatientName}</Avatar>
              </Col>

              <Col xs={12} md={2} className="ps-3">
                <p className="emr-doc-name mb-1">{patientDate?.PatientName}</p>
                <p className="emr-doc-id">{patientDate?.UHIDId}</p>
              </Col>

              <Col xs={12} md={4} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">Consult Doctor</span>
                  <span className="emr-pat-text ">
                    {" "}
                    :{patientDate?.doctorId?.doctorName}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Date & Time</span>
                  <span className="emr-pat-text">
                    :{" "}
                    {patientDate?.appointmentId?.createdAt
                      ? `${dayjs(patientDate?.appointmentId?.createdAt).format(
                          "YYYY-MM-DD"
                        )} ${patientDate?.appointmentId?.timeSlot || ""}`
                      : patientDate?.outPatientId?.createdAt
                      ? `${dayjs(patientDate?.outPatientId?.createdAt).format(
                          "YYYY-MM-DD"
                        )} ${patientDate?.outPatientId?.timeSlot || ""}`
                      : "No Appointment Info"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Type</span>
                  <span className="emr-pat-text">
                    :{patientDate?.visitType}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Reason</span>
                  <span className="emr-pat-text">
                    :{" "}
                    {patientDate?.outPatientId?.reason ||
                      patientDate?.appointmentId?.reason}
                  </span>
                </p>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">AGE</span>
                  <span className="emr-pat-text "> : {patientDate?.age}</span>
                </p>
                <p>
                  <span className="emr-doc-text">Test Start Time</span>
                  <span className="emr-pat-text ">: {testStartTime}</span>
                </p>

                <p>
                  <span className="emr-doc-text">Test Stop Time</span>
                  <span className="emr-pat-text">: {testEndTime}</span>
                </p>
                <p>
                  <span className="emr-doc-text">Tested By</span>
                 
                    :{" "}
                    <Select
                      value={patientDate?.testedBy}
                      showSearch
                      mode="tags"
                      maxCount={1}
                      options={testData}
                      onChange={handleChange}
                      style={{ width: "50%", height: 35 }}
                    />
              
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "16px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="emr-search-text mb-0">Test Result</p>
              </div>
              <div className="me-5">
                <Button
                  onClick={() => setTestStartTime(dayjs().format("HH:mm"))}
                  className="p-0"
                  style={{
                    width: "24px",
                    backgroundColor: "#3497F9",
                    border: "none",
                    color: "#fff",
                    height: "24px",
                  }}
                >
                  <PiPlayBold />
                </Button>
                <Button
                  onClick={() => setTestEndTime(dayjs().format("HH:mm"))}
                  className="p-0 ms-2"
                  style={{
                    width: "24px",
                    backgroundColor: "#3497F9",
                    border: "none",
                    color: "#fff",
                    height: "24px",
                  }}
                >
                  <TbPlayerStop />
                </Button>
              </div>
            </div>
            <div>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#595959",
                        }}
                      >
                        S.No
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#595959",
                        }}
                      >
                        Test Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#595959",
                        }}
                      >
                        Test Vitals
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#595959",
                        }}
                      >
                        Values
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#595959",
                        }}
                      >
                        Reference Value{" "}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#595959",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((val: any, i: any) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell>{val?.testName}</TableCell>
                        <TableCell>{val?.testVitals}</TableCell>
                        <TableCell>
                          <Input
                            style={{ width: "100px" }}
                            value={val?.value}
                            onChange={(e) => {
                              const newData = [...data];
                              newData[i].value = e.target.value;
                              setData(newData);
                            }}
                          />{" "}
                        </TableCell>
                        <TableCell>{val?.referenceValue}</TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            className="p-0 ms-2"
                            style={{
                              width: "24px",
                              backgroundColor: "#3497F9",
                              border: "none",
                              color: "#fff",
                              height: "24px",
                            }}
                            onClick={() => handleRepeat(i)}
                          >
                            <LuRepeat />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Container>
        </div>
        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          {/* <Button className="c-btn me-3">Save&Print</Button> */}
          <Button onClick={postData} className="s-btn">
            Complete
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditOPIPtest;
