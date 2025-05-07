import { Avatar, message, Modal, TimePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
  Outlet,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { api_url } from "../../../Config";
import dayjs from "dayjs";

const DisChargeMain: React.FC = () => {
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [data, setData] = useState<any>();
  const [times, setTimes] = useState({
    inTime: "",
    outTime: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getPatient = async () => {
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

  const handleOk = async() => {
    setIsModalOpen(false);
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login required!")
        return
      }
      let wardId=data?.bedManagement?.wardId
      let roomId=data?.bedManagement?.roomId
      let bedNo=data?.bedManagement?.bedno

      await axios.patch(`${api_url}/api/ward/${wardId}/room/${roomId}/bed/${bedNo}/clear`,{outTime:times?.outTime,patientId:data?._id},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Successfully removed!")
      navigate("ward/ward-management")

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
      
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (times?.outTime) {
      setIsModalOpen(true);
    }
  }, [times?.outTime]);

  useEffect(() => {
    if (id) {
      getPatient();
    }
  }, [id]);
  return (
    <>
      <div className="cont" style={{ marginTop: "5rem" }}>
        <div className=" ms-1 mb-2 ">
          <p className="back" style={{ color: "#414141" }}>
            <span onClick={() => navigate(-1)}>
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
                className="ms-1 "
              >
                Back
              </span>
            </span>
          </p>
        </div>
        <div className="me-3">
          <Container fluid className="emr-doc-box pt-3 ms-3 ">
            <Row className="justify-content-between">
              <Col xs={12} md={1}>
                <Avatar style={{ height: "75px", width: "75px" }}>
                  {data?.PatientName || "-"}
                </Avatar>
              </Col>

              <Col xs={12} md={2}>
                <p className="emr-doc-name mb-1">{data?.PatientName || "-"}</p>
                <p className="emr-doc-id">{data?.UHIDId || "-"}</p>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">Consult Doctor</span>
                  <span className="emr-pat-text ">
                    {" "}
                    : {data?.doctorId?.doctorName || ""}
                  </span>
                </p>

                <p>
                  <span className="emr-doc-text">Patient Type</span>
                  <span className="emr-pat-text">
                    : {data?.patientType || "-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">OP Number</span>
                  <span className="emr-pat-text">: {data?.opNo || "-"}</span>
                </p>
              </Col>

              <Col xs={12} md={2}>
               
              </Col>
              <Col xs={12} md={2}>
                <Form.Group className="text-start">
                  <Form.Label className="emr-label mb-2">
                    Ward Out Time
                  </Form.Label>
                  <br />
                  <TimePicker
                    style={{ width: "100%", height: 35 }}
                    value={
                      times?.outTime ? dayjs(times?.outTime, "hh:mm A") : null
                    }
                    use12Hours
                    format="hh:mm A"
                    onChange={(time: any) =>
                      setTimes({
                        ...times,
                        outTime: time ? time.format("hh:mm A") : null,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </div>
        <Modal
          title="Are you sure ?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Ward Out Time: {times?.outTime || "-"}</p>
        </Modal>

        <div
          className="act-cont mt-0 ms-4"
          style={{ marginBottom: "100px", color: "#595959" }}
        >
          <div className="emr-nav-doc ps-3">
            <NavLink
              to={`/ward/ward-management/doctor-activity?patientId=${id}`}
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              Doctor Activity
            </NavLink>
            <NavLink
              to={`/ward/ward-management/nurse-activity?patientId=${id}`}
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Nurse Activity
            </NavLink>
            <NavLink
              to={`/ward/ward-management/medicine?patientId=${id}`}
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Medicine
            </NavLink>
            <NavLink
              to={`/ward/ward-management/discharge-note?patientId=${id}`}
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Discharge Note{" "}
            </NavLink>
            <NavLink
              to={`/ward/ward-management/ot-note?patientId=${id}`}
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              OT Note
            </NavLink>
          </div>
        </div>

        <div className="dynamic-content mt-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DisChargeMain;
