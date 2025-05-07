import { Col, Input, Row } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const SurgeryManagementMain: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="cont">
        <div className=" ms-3 " style={{ marginTop: "90px" }}>
          <span className="" style={{ cursor: "pointer", fontSize: "18px" }} onClick={()=>navigate(-1)}>
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
                    <img
                      src="/assets/user.png"
                      style={{ height: "75px", width: "75px" }}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="emr-doc-name mb-1">{"-"}</p>
                    <p className="emr-doc-id">{"-"}</p>
                  </div>
                </Col>

                <Col span={6} className="text-start emr-visit-details">
                  <p>
                    <span className="emr-doc-text">Surgery Name</span>
                    <span className="emr-pat-text "> Catract</span>
                  </p>
                  <p>
                    <span className="emr-doc-text">Admitted Date</span>
                    <span className="emr-pat-text "> 10-02-2025</span>
                  </p>
                  <div className="me-4">
                    <label className="emr-label mb-2">Block room in Time</label><br/>
                    <span className="text-secondary">Pending</span>
                  </div>
                </Col>
                <Col span={10} className="text-start emr-visit-details">
                <div className="d-flex ">
                  <div className="me-4">
                    <label className="emr-label mb-2">Block room in Time</label><br/>
                    <Input style={{height:"35px"}}/>
                  </div>
                  <div className="me-4">
                    <label className="emr-label mb-2">Ot Out time</label><br/>
                    <Input style={{height:"35px"}}/>
                  </div>
                </div>
                <div className="d-flex mt-4">
                  <div className="me-4">
                    <label className="emr-label mb-2">Ot Out time</label><br/>
                    <Input style={{height:"35px"}}/>
                  </div>
                  <div className="me-4">
                    <label className="emr-label mb-2">Out Time</label><br/>
                    <Input style={{height:"35px"}}/>
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
