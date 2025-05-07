import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Form, Row, Col, Container } from "react-bootstrap";
import { InputNumber, message } from "antd";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";

const CreateEMR: React.FC = () => {
  const nav = [
    { name: "Optometry", path: "optometry" },
    { name: "Doctor Notes", path: "doctor-notes" },
    { name: "Plan of Management", path: "plan-of-management" },
    // { name: "Prescribe Tests", path: "prescribe-tests" },

    { name: "Summary & Print", path: "summary-print" },
    // { name: "Chief Complaint", path: "chief-complaint" },
    // { name: "Associated Complaints", path: "associated-complaints" },
    // { name: "Vitals", path: "create-vitals" },
    // { name: "Past Ocular History", path: "past-ocular-history" },
    // { name: "Past History", path: "past-history" },
    // { name: "Refraction Sheet", path: "refraction-sheet" },
    // { name: "Provisional Diagnosis", path: "provisional-diagnosis" },
    // { name: "Plan Of Management", path: "plan-of-management" },
    // { name: "Other Routine Test", path: "other-routine-test" },
    // { name: "Lab Results", path: "lab-results" },
    // { name: "Attachments", path: "attachments" },
    // { name: "IP Admission", path: "ip-Admission" },
 

    // { name: "Allergies", path: "create-allergies" },
    // { name: "Diagnosis", path: "create-diagnosis" },
    // { name: "Medical History", path: "create-medical-history" },
    // { name: "Examination", path: "create-examination" },
  ];

  const naviagte = useNavigate();
  const handleback = () => {
    naviagte("/emr");
  };

  const [data, setData] = useState<any>();

  const handleGetPaitent = async (id: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data.patient);
      setDiscount(res.data.data.patient.discount)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  const [discount,setDiscount]=useState(0)

  const handleUpdateDiscount=async()=>{
    const id = sessionStorage.getItem("patientId");
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(`${api_url}/api/patient/${id}`,{discount},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Updated Successfully!")
      await handleGetPaitent(id);

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      handleGetPaitent(id);
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
                to={`/emr/create-emr/${item.path}`}
                className="emr-link ms-3"
              >
                <span className="ms-1 me-5 my-3 create-emr-nav text-wrap d-inline-block">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>

          <Container fluid className="emr-doc-box py-3">
            <Row className="justify-content-between ">
              <Col xs={12} md={1}>
                <img
                  src="/assets/user.png"
                  style={{ height: "75px", width: "75px" }}
                />
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
                    : {data?.doctorId?.doctorName || "-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Date & Time</span>
                  <span className="emr-pat-text ">
                    :{" "}
                    {moment(data?.appointmentId?.createdAt).format(
                      "DD-MM-YYYY"
                    )}
                    &{data?.outPatientId?.timeSlot}
                  </span>
                </p>

                <p>
                  <span className="emr-doc-text">Patient Type</span>
                  <span className="emr-pat-text">
                    : {data?.patientType || "-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Reason</span>
                  <span className="emr-pat-text">
                    : {data?.outPatientId?.reason || ""}
                  </span>
                </p>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group className="text-start">
                  <Form.Label className="emr-label mb-2">
                    Discount (₹)
                  </Form.Label>
                  <br />
                  <InputNumber value={discount||""} onChange={(value:any)=>setDiscount(value)} style={{ width: "70%", height: 35 }} /><a onClick={handleUpdateDiscount} className="ms-1">Update</a>
                </Form.Group>
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

export default CreateEMR;
