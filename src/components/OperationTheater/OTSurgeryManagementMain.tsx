import { Avatar, Col, message, Row, Select, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import dayjs from "dayjs";

const SurgeryManagementMain: React.FC = () => {
  const navigate = useNavigate();
  const patientId = sessionStorage.getItem("patientId");
  const [data, setData] = useState<any>();
  const [postData, setPostData] = useState({
    blockRoomInTime: "",
    otOutTime: "",
    inTime: "",
    outTime: "",
    status:""
  });

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.data.patient, "resss");
      setData(res?.data?.data?.patient);
      let df=res.data.data.patient.surgeryDetailsId
      let hf={
        blockRoomInTime: df?.blockRoomInTime,
        otOutTime: df?.otOutTime,
        inTime: df?.inTime,
        outTime: df?.outTime,
        status:df?.status
      }
      console.log(hf,df);
      
      setPostData(hf)
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
   
      await axios.patch(`${api_url}/api/surgery-details/${data?.surgeryDetailsId?._id}`,postData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      message.success("Updated Successfully!")
    }catch(error:any){
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (patientId) {
      getData();
    }
  }, [patientId]);

  useEffect(()=>{
    handleUpdate()
  },[postData.blockRoomInTime,postData.inTime,postData.otOutTime,postData.outTime,postData.status])

  return (
    <>
      <div className="cont">
        <div className=" ms-3 " style={{ marginTop: "90px" }}>
          <span
            className=""
            style={{ cursor: "pointer", fontSize: "18px" }}
            onClick={() => navigate(-1)}
          >
            {" "}
            <i
              className="fi fi-br-angle-left "
              style={{ fontSize: "14px" }}
            ></i>
            Back{" "}
          </span>
        </div>

        <div
          className="act-cont-ot  ms-4"
          style={{ marginBottom: "50px", color: "#595959" }}
        >
          <div className="emr-nav-doc ps-3">
            <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/assign"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Assign
            </NavLink>
            <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/operation-management"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Operation Management
            </NavLink>

            <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/check-list"
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              Check List
            </NavLink>

            <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/prescription"
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              Prescription
            </NavLink>

            <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/ot-notes"
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              OT Notes
            </NavLink>
          </div>
        </div>

        <div className="dynamic-content mt-1">
          <div className="mx-3 ">
            <Container fluid className="emr-doc-box py-2 ">
              <Row className="justify-content-between  mb-3 pt-2">
                <Col className="d-flex " span={3}>
                  <div className="me-3">
                    <Avatar style={{ height: "75px", width: "75px" }}>
                      {data?.PatientName || "-"}
                    </Avatar>
                  </div>

                  <div className="mt-2">
                    <p className="emr-doc-name mb-1">
                      {data?.PatientName || "-"}
                    </p>
                    <p className="emr-doc-id">{data?.UHIDId || "-"}</p>
                  </div>
                </Col>

                <Col span={6} className="text-start emr-visit-details">
                  <p>
                    <span className="emr-doc-text">Surgery Name</span>
                    <span className="emr-pat-text ">
                      {data?.surgeryDetailsId?.surgeryName || "-"}
                    </span>
                  </p>
                  <p>
                    <span className="emr-doc-text">Admitted Date</span>
                    <span className="emr-pat-text ">
                      {" "}
                      {moment(data?.admittedDate).format("DD-MM-YYYY")}
                    </span>
                  </p>
                  <div className="me-4">
                    <label className="emr-label mb-2">Block room in Time</label>
                    <br />

                    <Select
                      style={{ width: "100%" }}
                      value={postData?.status}
                      onChange={(value)=>setPostData({...postData,status:value})}
                      options={[
                        { label: "Pending", value: "pending" },
                        { label: "Completed", value: "completed" },
                      ]}
                    />
                  </div>
                </Col>
                <Col span={10} className="text-start emr-visit-details">
                  <div className="d-flex ">
                    <div className="me-4">
                      <label className="emr-label mb-2">
                        Block room in Time
                      </label>
                      <br />
                      <TimePicker
                        style={{ height: "35px" }}
                        use12Hours
                        value={
                          postData.blockRoomInTime
                            ? dayjs(postData.blockRoomInTime, "hh:mm A")
                            : null
                        }
                        onChange={(time) =>
                          setPostData({
                            ...postData,
                            blockRoomInTime: time ? time.format("hh:mm A") : "",
                          })
                        }
                      />
                    </div>
                    <div className="me-4">
                      <label className="emr-label mb-2">Ot Out time</label>
                      <br />
                      <TimePicker
                        style={{ height: "35px" }}
                        use12Hours
                        value={
                          postData.otOutTime
                            ? dayjs(postData.otOutTime, "hh:mm A")
                            : null
                        }
                        onChange={(time) =>
                          setPostData({
                            ...postData,
                            otOutTime: time ? time.format("hh:mm A") : "",
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-4">
                    <div className="me-4">
                      <label className="emr-label mb-2">In time</label>
                      <br />
                      <TimePicker
                        style={{ height: "35px" }}
                        use12Hours
                        value={
                          postData.inTime
                            ? dayjs(postData.inTime, "hh:mm A")
                            : null
                        }
                        onChange={(time) =>
                          setPostData({
                            ...postData,
                            inTime: time ? time.format("hh:mm A") : "",
                          })
                        }
                      />
                    </div>
                    <div className="me-4">
                      <label className="emr-label mb-2">Out Time</label>
                      <br />
                      <TimePicker
                        style={{ height: "35px" }}
                        use12Hours
                        value={
                          postData.outTime
                            ? dayjs(postData.outTime, "hh:mm A")
                            : null
                        }
                        onChange={(time) =>
                          setPostData({
                            ...postData,
                            outTime: time ? time.format("hh:mm A") : "",
                          })
                        }
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SurgeryManagementMain;
