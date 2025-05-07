import { Avatar, message } from "antd";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { api_url } from "../../Config";
import { eventEmitter } from "../../../EventEmitter";
import { useEffect, useState } from "react";

const CnewPatientDetailsMain = () => {
  const navigate = useNavigate();
  const nav = [
    {
      name: "Plan of Management",
      path: "plan-of-management",
    },
    {
      name: "Suggest Test",
      path: "suggest-test",
    },
    {
      name: "Test Result",
      path: "test-result",
    },
    {
      name: "Surgery Mangement",
      path: "surgery-management",
    },
  ];

  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState("");

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

      const df = res?.data?.data?.patient;

      if (df) {
        setData(df);
        setStatus(df?.cousellingStatus);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // const handleUpdate = async () => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       localStorage.clear();
  //       message.error("Login required!");
  //       return;
  //     }

  //     await axios.patch(
  //       `${api_url}/api/patient/${id}`,
  //       { cousellingSiscount: discount },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     message.success("Updated Successfully!");
  //     await getPatient();
  //   } catch (error: any) {
  //     console.log(error);
  //     message.error("Something went wrong!");
  //   }
  // };

  useEffect(() => {
    if (id) {
      getPatient();
    }
  }, [id]);

  useEffect(() => {
    eventEmitter.on("isWilling", getPatient);

    return () => {
      eventEmitter.off("isWilling", getPatient);
    };
  }, []);

  return (
    <>
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
        <Container fluid className="emr-doc-box py-3 ms-3 ">
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
                  : {data?.doctorId?.doctorName || "-"}
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
                  : {data?.outPatientId?.reason}
                </span>
              </p>
            </Col>

            <Col xs={12} md={4}></Col>
          </Row>
        </Container>
      </div>
      <div
        className="emr-section-nav pt-4 mh-nav-m"
        style={{ backgroundColor: "transparent" }}
      >
        {status === "completed" || status === "pending" ? (
          <>
            <NavLink
              to={`/counsellor/new-patient/patient-details/plan-of-management?id=${id}`}
              className="emr-link-mh ms-3"
            >
              <span className="mx-3 my-3 create-emr-nav text-wrap d-inline-block">
                Plan of Management
              </span>
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            {nav.map((item, index) => (
              <NavLink
                key={index}
                to={`/counsellor/new-patient/patient-details/${item.path}?id=${id}`}
                className="emr-link-mh ms-3"
              >
                <span className="mx-3 my-3 create-emr-nav text-wrap d-inline-block">
                  {item.name}
                </span>
              </NavLink>
            ))}{" "}
          </>
        )}
        <div className="dynamic-content mt-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CnewPatientDetailsMain;
