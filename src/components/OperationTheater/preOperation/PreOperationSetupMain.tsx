import { Col, Row } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const PreOperationSetupMain: React.FC = () => {
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
              to="/operation-theater/pre-operation/pre-operation-setup/optometry"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Optometry
            </NavLink>
          <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/doctor-notes"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Doctor Notes
            </NavLink>
          <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/plan-of-management"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Plan of Management
            </NavLink>
          <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/counsellor-report"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Counsellor Report
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list"
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              Check List
            </NavLink>
          
          </div>
        </div>

        <div className="dynamic-content mt-1">
          <div className="mx-3 ">
            <Container fluid className="emr-doc-box py-2 ">
              <Row className="justify-content-between pb-5 mb-3 pt-2">
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

                <Col span={16} className="text-start emr-visit-details">
                  <p>
                    <span className="emr-doc-text">Surgery Name</span>
                    <span className="emr-pat-text "> Catract</span>
                  </p>
                  <p>
                    <span className="emr-doc-text">Admitted Date</span>
                    <span className="emr-pat-text "> 10-02-2025</span>
                  </p>
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

export default PreOperationSetupMain;
