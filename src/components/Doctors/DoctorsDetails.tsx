import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";

interface Doctor {
  doctorId: string;
  doctorName: string;
  specialist: string;
  phoneNo: string;
  emailId: string;
  address: string;
  bloodGroup: string;
  dateOfBirth: string;
  dateOfJoining: string;
  department: string;
  roomNo: string;
  doctorImage: string;
}

const DoctorsDetails = () => {
  const columnsta: ColumnsType = [
    {
      title: "Timing",
      dataIndex: "timeSlot",
      key: "timeSlot",
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
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Consult Dr",
      dataIndex: "doctorName",
      key: "doctorName",
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

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<Doctor>();

  const getDoctorById = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login Required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/doctor/ById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAppointment();
      setData(res.data.data.doctor);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;

  const naviagte=useNavigate()

  const [columData, setColumData] = useState([
    {
      timeSlot: "",
      appointmentNo: "",
      patientName: "",
      visitType: "",
      reason: "",
      doctorName: "",
      status: "",
    },
  ]);

  const getAppointment = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login Required!");
      return;
    }
    try {
      const res = await axios.get(
        `${api_url}/api/appointment/filter?doctorId=${id}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}&limit=${pageLimit}&page=${currentPage}`
      ,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

    
      
      setTotalPages(res.data.totalPages);
      setColumData(res.data.data.appointments);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit=()=>{
    naviagte(`/doctors/doctors-management/add-doctor?id=${id}`)
  }

  useEffect(() => {
    getDoctorById();
  }, [currentPage]);

  return (
    <>
      <div className="cont">
        <div className="back-box-doc mt-5 ms-3">
          <p className="back  pt-5" style={{ color: "#414141" }}>
            <Link
              to="/doctors/doctors-management"
              style={{ color: "#414141", textDecoration: "none" }}
            >
              <i
                className="fi fi-br-angle-left"
                style={{ cursor: "pointer" }}
              ></i>
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
            </Link>
          </p>
        </div>

        <div className="mt-4 doc-details-main-box ms-3 rounded ">
          <p className="box-title p-3 pt-4 ps-4">Doctor Details</p>
          <div className="doc-details-img-name-box">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
              <div className="doc-details-img-box px-4 d-flex justify-content-center align-self-center">
                <img
                  src={`${api_url}/public/images/${data?.doctorImage}`}
                  className="doc-details-img"
                  alt="Doctor Image"
                  loading="lazy"
                />
              </div>
              <div className="doc-details-name-box  mt-0">
                <p className="head-title">{data?.doctorName}</p>
                <p className="cardio-text">{data?.specialist}</p>
              </div>
              </div>
              <div className="me-5">
                  <Button onClick={handleEdit}><MdModeEdit/>Edit</Button>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="doc-details-per-details p-4">
              <p className="box-title py-3">Personal Details</p>
              <p>
                <span className="emr-doc-text-dd">Doctor Id</span>
                <span className="emr-pat-text-dd ">: {data?.doctorId}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Phone Num</span>
                <span className="emr-pat-text-dd ">: {data?.phoneNo}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Email Id</span>
                <span className="emr-pat-text-dd ">: {data?.emailId}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Address</span>
                <span className="emr-pat-text-dd ">: {data?.address}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Blood Group</span>
                <span className="emr-pat-text-dd ">: {data?.bloodGroup}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">DOB</span>
                <span className="emr-pat-text-dd ">
                  : {moment(data?.dateOfBirth).format("DD-MM-YYYY")}
                </span>
              </p>
            </div>
            <div className="doc-details-per-details p-4">
              <p className="box-title py-3">Professional Detail</p>
              <p>
                <span className="emr-doc-text-dd">Date Of Joining</span>
                <span className="emr-pat-text-dd ">
                  : {moment(data?.dateOfJoining).format("DD-MM-YYYY")}
                </span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Department</span>
                <span className="emr-pat-text-dd ">: {data?.department}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Specialist</span>
                <span className="emr-pat-text-dd ">: {data?.specialist}</span>
              </p>
              <p>
                <span className="emr-doc-text-dd">Room No</span>
                <span className="emr-pat-text-dd ">: {data?.roomNo}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="emr-doc-details-box rounded p-4 ms-3 mb-4 mt-4">
          <div className="mt-2 hospitals-details  ">
            <p className="box-title pb-3">Today Appointment</p>

            <Table
              columns={columnsta}
              dataSource={columData}
              pagination={{
                current: currentPage,
                pageSize: pageLimit,
                total: totalPages * pageLimit,
                onChange: handlePageChange,
                showSizeChanger: false,
              }}
              rowClassName={(record:any) => {
                if (record.patientType === "General") return "inpatient-General";
                if (record.patientType === "Insurance") return "outpatient-Insurance";
                if (record.patientType === "Corporate") return "outpatient-Corporate";
                return ""; 
              }}
              bordered
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsDetails;
