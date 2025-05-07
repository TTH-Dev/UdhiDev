import { Avatar, Col, message, Row } from "antd";
import axios from "axios";
import { Container } from "react-bootstrap";
import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";


const IPpmPatientDetailsMain = () => {
  const navigate = useNavigate();
  const nav = [
    {
      name: "Personal Info",
      path: "personal-info",
    },
    {
      name: "Bed Management",
      path: "bed-management",
    },
    {
      name: "Procedure",
      path: "procedure",
    },
    {
      name: "Summary",
      path: "summary",
    },
  ];


  const [searchParam]=useSearchParams()
  const id=searchParam.get("id")
  const [data,setData]=useState<any>()

  const getData=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        message.error("Login required!")
        localStorage.clear()
        return
      }

      const res=await axios.get(`${api_url}/api/patient/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      console.log(res.data.data.patient,"pp");
      let df=res?.data?.data?.patient
      if(df){
        setData(df)
      }
    

    }catch(error:any){
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <>
      <div className="  mb-2 ">
        <span onClick={() => navigate(-1)}>
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
              className="ms-1 "
            >
              Back
            </span>
          </p>
        </span>
      </div>
      <div className="mx-3 ">
        <Container fluid className="emr-doc-box py-2 ">
          <Row className="justify-content-between pb-5 mb-3 pt-2">
            <Col className="d-flex " span={7}>
              <div className="me-3">
                <Avatar style={{ height: "75px", width: "75px" }}>{data?.PatientName || "-"}</Avatar>
              </div>

              <div className="mt-2">
                <p className="emr-doc-name mb-1">{data?.PatientName || "-"}</p>
                <p className="emr-doc-id">{data?.UHIDId||"-"}</p>
              </div>
            </Col>

            <Col span={16} className="text-start emr-visit-details">
              <p>
                <span className="emr-doc-text">Surgery Name</span>
                <span className="emr-pat-text ">{data?.surgeryDetailsId?.surgeryName||"-"}</span>
              </p>
              <p>
                <span className="emr-doc-text">Admitted Date</span>
                <span className="emr-pat-text "> {data?.emrCompleteDate?moment(data?.emrCompleteDate).format("DD-MM-YYYY"):"-"}</span>
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        className="emr-section-nav pt-4 mh-nav-m"
        style={{ backgroundColor: "transparent" }}
      >
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/in-patient/patient-management/patient-details/${item.path}?id=${id}`}
            className="emr-link-mh ms-3"
          >
            <span className="mx-3 my-3 create-emr-nav text-wrap d-inline-block">
              {item.name}
            </span>
          </NavLink>
        ))}
        <div className="dynamic-content mt-1 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default IPpmPatientDetailsMain;
