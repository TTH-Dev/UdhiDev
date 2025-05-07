import { Button, Col, message, Row } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../../../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const MPastVisit = () => {

  const navigate = useNavigate();
  const handlePastVisit = (visit: any) => {
    navigate(`/emr/manage-emr/manage-summary-print/visit-details?date=${visit}`);
  };
  const itemsPerRow = 4;
  
  const colSpan = 24 / itemsPerRow;

const id=sessionStorage.getItem("patientId")

const [dates,setDates]=useState<any>([])

  const getHistory=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        message.error("Login required!")
        localStorage.clear
        return
      }
      const res=await axios.get(`${api_url}/api/patient/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(res?.data?.data.patient.visitDates.length){
      setDates(res?.data?.data.patient.visitDates)}
      
      
    }catch(error:any){
      console.log(error);
    }
  }

useEffect(() => {
  getHistory();
},[]);

  return (
    <>
      {dates.map((_:any, index:any) => {
        if (index % itemsPerRow === 0) {
          return (
            <Row key={index} gutter={[16, 16]} className="ms-5">
              {dates.slice(index, index + itemsPerRow).map((visit:any, i:any) => (
                <Col key={i} span={colSpan}>
                  <Button
                    className="c-btn my-3"
                    onClick={() => handlePastVisit(visit)}
                  >
                    {moment(visit).format("YYYY-MM-DD")}
                  </Button>
                </Col>
              ))}
            </Row>
          );
        }
        return null;
      })}
    </>
  );
};

export default MPastVisit;
