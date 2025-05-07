import { Avatar, Button, message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import axios from "axios";
import { useEffect, useState } from "react";

const OutPatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [SearchParams]=useSearchParams()
  const id=SearchParams.get("id")
  const [datass, setData] = useState<any>();
  const isAppointment = location.pathname.includes("op-appointment");

  const columns: ColumnsType = [
    {
      title: "Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Consult Dr",
      dataIndex: "doctor",
      key: "doctor",
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
      title: "Prescription",
      dataIndex: "prescription",
      key: "prescription",
      render: () => {
        return <Button className="s-btn">Download</Button>;
      },
    },
  ];

  const data = [
    {
      key: "1",
      appointmentTime: "01:09 PM",
      doctor: "Dr. Karthik",
      visitType: "General",
      visitReason: "General Checkup",
      prescription: "N/A",
      status: "Waiting",
    },
  ];

  const handleBack = () => {
    navigate(
      isAppointment
        ? "/out-patient/op-appointment"
        : "/out-patient/op-management"
    );
  };


   const fetchdata = async () => {
     try {
       const token = localStorage.getItem("authToken");
       if (!token) {
         localStorage.clear();
         message.error("Login required!");
         return;
       }
 
       const res = await axios.get(`${api_url}/api/patient/${id}`, {
         headers: { Authorization: `Bearer ${token}` },
       });
       setData(res.data.data.patient);
     } catch (error: any) {
       console.error(error);
       message.error("Something went wrong while fetching doctor data!");
     }
   };

   


   useEffect(() => {
    fetchdata();
   },[])
  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <a onClick={handleBack}>
          <i className="fi fi-br-angle-left" style={{ cursor: "pointer" }}></i>
          <span
            style={{
              zIndex: "99",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "0",
              color: "#414141",
              cursor: "pointer",
            }}
            className="ms-2 "
          >
            Back
          </span>
          </a>
        </p>
      </div>

      <div className="mt-4 doc-details-main-box ms-3 rounded">
        <p className="box-title p-3 pt-4 ps-4">
          {isAppointment ? "Appointment Details" : "Patient Details"}
        </p>
        <div className="doc-details-img-name-box">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="doc-details-img-box px-4 d-flex justify-content-center align-self-center">
               
                <Avatar style={{width:"80px",height:"80px"}}>{datass?.PatientName}</Avatar>
              </div>
              <div className="doc-details-name-box mt-0">
                <p className="head-title">{datass?.PatientName}</p>
                <p className="cardio-text">{datass?.UHIDId}</p>
              </div>
            </div>

            <div className="text-center px-5">
              <span style={{ color: "#FFAE00" }} className="pd-wait-text">
                {datass?.outPatientId?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex ">
          <div className="doc-details-per-details p-4 me-5">
            <p className="box-title py-3">
              {isAppointment ? "Appointment Info" : "Patient Detail"}
            </p>
            <p>
              <span className="emr-doc-text-dd">UHIDId</span>
              <span className="emr-pat-text-dd">:{datass?.UHIDId}</span>
            </p>
            <p>
              <span className="emr-doc-text-dd">Doctor Id</span>
              <span className="emr-pat-text-dd">:  {datass?.doctorId?.doctorId}</span>
            </p>
            <p>
              <span className="emr-doc-text-dd">Phone Num</span>
              <span className="emr-pat-text-dd">:{datass?.phoneNo}</span>
            </p>
            <p>
              <span className="emr-doc-text-dd">Age</span>
              <span className="emr-pat-text-dd">: {datass?.age}</span>
            </p>
            <p>
              <span className="emr-doc-text-dd">Blood Grp</span>
              <span className="emr-pat-text-dd">
                :{datass?.bloodGroup}
              </span>
            </p>
          </div>

          <div className="doc-details-per-details p-4 ms-5">
            <p className="box-title py-3">Consult Detail</p>
            <p>
             
            
            </p>
            <p>
              <span className="emr-doc-text-dd">
             Slot Time 
              </span>
              <span className="emr-pat-text-dd">
                : {datass?.appointmentId?.timeSlot ? datass?.appointmentId?.timeSlot : datass?.outPatientId?.timeSlot}
              </span>
            </p>

            <p>
              <span className="emr-doc-text-dd">Patient Type</span>
              <span className="emr-pat-text-dd">: {datass?.patientType || "-"}</span>
            </p>
            {/* <p>
              <span className="emr-doc-text-dd">PatientType</span>
              <span className="emr-pat-text-dd">: General </span>
            </p> */}
            <p>
              <span className="emr-doc-text-dd">Reason</span>
              <span className="emr-pat-text-dd">: {datass?.appointmentId?.reason ? datass?.appointmentId?.reason:datass?.outPatientId?.reason}</span>
            </p>
            <p>
              <span className="emr-doc-text-dd">Doctor</span>
              <span className="emr-pat-text-dd">: {datass?.doctorId?.doctorName} ({datass?.doctorId?.roomNo})</span>
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="emr-doc-details-box rounded p-4 ms-3 mt-4 mb-5">
        <div className="mt-2 hospitals-details">
          <p className="box-title ps-3 pb-3">Last Visit</p>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default OutPatientDetails;
