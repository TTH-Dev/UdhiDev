import { message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaHourglassHalf } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { api_url } from "../Config";
import moment from "moment";

interface AppointmentData {
  key: string;
  appointmentTime: string;
  appointmentNo: string;
  patientName: string;
  visitType: string;
  visitReason: string;
  doctor: string;
  status: string;
}

const Home: React.FC = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (available: boolean) =>
        available ? (
          <p style={{ color: "green" }}>Yes</p>
        ) : (
          <p style={{ color: "red" }}>No</p>
        ),
    },

  
    {
      title: "Total Patients",
      key: "patientCount",
      dataIndex: "patientCount",
    },
  ];


  const columnsta: ColumnsType<AppointmentData> = [
    {
      title: "Timing",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Appointment No",
      dataIndex: "appointmentNo",
      key: "appointmentNo",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Visit Type",
      dataIndex: "visitType",
      key: "visitType",
    },

    {
      title: "Reason",
      dataIndex: "visitReason",
      key: "visitReason",
    },
    {
      title: "Consult Dr",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color: string;
        switch (status) {
          case "Complete":
            color = "green";
            break;
          case "Waiting":
            color = "gold";
            break;
          case "Not Arrived":
            color = "red";
            break;
          default:
            color = "blue";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];



  const [datata,setDatata]=useState<any>([])

  const getTodayAppointment=async()=>{
    const token=localStorage.getItem("authToken")
    if(!token){
      localStorage.clear()
      message.error("Login Required!")
      return
    }
    try{
      const res=await axios.get(`${api_url}/api/appointment/filter?date=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        let df=res.data.data.appointments.map((val:any,i:any)=>({
          key:i ,
          appointmentTime: val.timeSlot||"-",
          appointmentNo: val.appointmentNo||"-",
          visitType: val.patientType||"-",
          patientName: val.patientName||"-",
          doctor: val.doctorName||"-",
          visitReason: val.reason||"-",
          status:val.status,
          patientType:val.patientType
        }))

        setDatata(df)

        await getAvail()
        
    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  const [data,setData]=useState<any>([])

  const getAvail=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login Required!")
        return
      }
      const res=await axios.get(`${api_url}/api/doctor/home-data`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })


      let fg=res.data.data.map((val:any,i:any)=>({
        key: i,
      name: val.doctorName,
      availability: val.isAvailableToday,
      patientCount:val.patientCount,
      }))

      setData(fg)
      

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(()=>{
    getTodayAppointment()
  },[])

  return (
    <>
      <div className="cont">
        <div className="act-cont mt-3 ms-4 " style={{ marginBottom: "100px" }}>
          <Row className="align-items-stretch">
            <Col xs={12} md={8} lg={8}>
              <div className="h-100 hospitals-details rounded">
                <p className="box-title ps-3 pt-3">Doctors Availability</p>
                <Table columns={columns} dataSource={data} pagination={false} />
              </div>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <div className="hospitals-details rounded h-100">
                <p className="box-title ps-3 pt-3">Hospital Details</p>
                <div className="box-cover pt-5">
                  <div className="">
                    <p className="box-head text-center">Work Days</p>
                    <div className="home-hospitals-details-minibox d-flex justify-content-center align-items-center rounded">
                      <div className="text-center">
                        <SlCalender />
                        <p
                          className="box-text pe-1"
                          style={{ width: "4rem", fontSize: "14px" }}
                        >
                          Mon-Sun
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="box-head text-center">Timing</p>
                    <div className="home-hospitals-details-minibox rounded  d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <FaHourglassHalf />
                        <p className="box-text">24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* <Row className="align-items-stretch my-3 ">
            <Col xs={12} md={4} lg={5}>
              <div className="patient-details rounded h-100">
                <p className="box-title ps-3 pt-3">Patient Details</p>
                <div className="box-cover-patient pt-2">
                  <div className="d-flex justify-content-around">
                    <div>
                      <p className=" patient-details-head text-center px-2">
                        Total No of Patient
                      </p>
                      <div className="home-patient-details-minibox rounded d-flex  justify-content-center align-items-center ">
                        <p className="box-text mb-0">152</p>
                      </div>
                    </div>

                    <div>
                      <div>
                        <p className=" patient-details-head text-center">
                          Total No of Appointment
                        </p>
                        <div className="home-patient-details-minibox rounded d-flex  justify-content-center align-items-center ">
                          <p className="box-text mb-0">34</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around ">
                    <div>
                      <p className=" patient-details-head text-center px-2">
                        Total No of OP
                      </p>
                      <div className="home-patient-details-minibox rounded d-flex  justify-content-center align-items-center ">
                        <p className="box-text mb-0">23</p>
                      </div>
                    </div>

                    <div>
                      <div>
                        <p className=" patient-details-head text-center">
                          Total No of IP
                        </p>
                        <div className="home-patient-details-minibox rounded  d-flex  justify-content-center align-items-center ">
                          <p className="box-text mb-0">29</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={8} lg={7}>
              <div className="h-100 hospitals-details rounded">
                <p className="box-title ps-3 pt-3">Ward Management</p>
                <Table
                  columns={columnswm}
                  dataSource={datawm}
                  pagination={false}
                />
              </div>
            </Col>
          </Row> */}
          <div className="mt-2 hospitals-details">
            <p className="box-title ps-3 pt-3">Today Appointment</p>

            <Table
              columns={columnsta}
              dataSource={datata}
              pagination={false}
              bordered
              rowClassName={(record:any) => {
                if (record.patientType === "General") return "inpatient-General";
                if (record.patientType === "Insurance") return "inpatient-Insurance";
                if (record.patientType === "Corporate") return "inpatient-Corporate";
                return ""; 
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
