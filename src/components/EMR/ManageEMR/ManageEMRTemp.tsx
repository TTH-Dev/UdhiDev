import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Avatar, message } from "antd";
import axios from "axios";
import { api_url } from "../../../Config";

const ManageEMR: React.FC = () => {

  const nav = [
    { name: "Chief Complaint", path: "manage-chief-complaint?id=" },
    { name: "Associated Complaints", path: "manage-associated-complaints" },
    { name: "Past Ocular History", path: "manage-past-ocular-history" },
    { name: "Past History", path: "manage-past-history" },
    { name: "Refraction Sheet", path: "manage-refraction-sheet" },
    // { name: "Provisional Diagnosis", path: "manage-provisional-diagnosis" },
    { name: "Plan Of Management", path: "manage-plan-of-management" },
    { name: "Other Routine Test", path: "manage-other-routine-test" },
    { name: "Prescribe Tests", path: "manage-prescribe-tests" },
    { name: "Lab Results", path: "manage-lab-results" },
    { name: "Attachments", path: "manage-attachments" },
    { name: "Doctor Notes", path: "manage-doctor-notes" },
    { name: "Sheets", path: "manage-sheets" },
    // { name: "IP Admission", path: "manage-ip-Admission" },
    { name: "Prescriptions", path: "manage-prescriptions" },
    { name: "Summary & Print", path: "manage-summary-print" },



    // { name: "Vitals", path: "manage-vitals" },
    // { name: "Allergies", path: "manage-allergies" },
    // { name: "Diagnosis", path: "manage-diagnosis" },
    // { name: "Medical History", path: "manage-medical-history" },
    // { name: "Examination", path: "manage-examination" },
  ];
    const [data, setData] = useState<any>();

  const naviagte = useNavigate();
  const handleback = () => {
    naviagte("/emr");
  };

  const fetchData = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

     const res =  await axios.get(
        `${api_url}/api/patient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

     setData(res?.data?.data?.patient)
     

    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load complaints. Please try again.");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, []);
  return (
    <>
      <div className="cont">
        <div className="mt-5 pt-5 ms-4 mb-0" onClick={handleback}>
          <p className="back" style={{ color: "#414141" }}>
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
          </p>
        </div>
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "100px", color: "#595959" }}
        >
          <div className="emr-section-nav ">
            {nav.map((item, index) => (
              <NavLink
                key={index}
                to={`/emr/manage-emr/${item.path}`}
                className="emr-link ms-3"
              >
                <span className="ms-1 me-5 my-3 create-emr-nav text-wrap d-inline-block">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>

          <Container fluid className="emr-doc-box py-3">
            <Row className="justify-content-between">
              <Col xs={12} md={1}>
              
                <Avatar  style={{ height: "75px", width: "75px" }}>{data?.PatientName.slice(0,1)}</Avatar>
              </Col>

              <Col xs={12} md={2}>
                <p className="emr-doc-name mb-0">{data?.PatientName||"-"}</p>
                <p className="emr-doc-id">{data?.UHIDId||"-"}</p>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">Phone Number</span>
                  <span className="emr-pat-text ">: {data?.phoneNo||"-"}</span>
                </p>
                <p>
                  <span className="emr-doc-text">Age</span>
                  <span className="emr-pat-text "> : {data?.age||"-"}Years</span>
                </p>
                <p>
                  <span className="emr-doc-text">Blood Group</span>
                  <span className="emr-pat-text">
                    : {data?.bloodGroup||"-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Area / Location</span>
                  <span className="emr-pat-text">: {data?.areaLocation||"-"}</span>
                </p>
              </Col>

              <Col xs={12} md={4} className="emr-dis-sec align-self-start ">
                <p>
                  <span className="emr-doc-text">Current Status</span>
                  <span className="emr-pat-text ms-4">: {data?.optoStatus||"-"}</span>
                </p>
              </Col>
            </Row>
          </Container>

          <div className="dynamic-content mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEMR;
