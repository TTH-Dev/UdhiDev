import { Button, IconButton } from "@mui/material";
import { Input, message, Pagination, Select, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { RiResetRightLine } from "react-icons/ri";
import moment from "moment";
import { api_url } from "../../../Config";
import { MdEdit } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
interface PatientData {
  key: number;
  patientName: string;
  insuranceCompany: string;
  phoneNo: string;
  totalAmount: number;
  status: string;
  patientType: "General" | "Insurance" | "Corporate";
}

const TPApatient = () => {
  const sampleData: PatientData[] = [
    {
      key: 1,
      patientName: "Ravi Kumar",
      insuranceCompany: "Star Health",
      phoneNo: "9876543210",
      totalAmount: 25000,
      status: "Approved",
      patientType: "General",
    },
    {
      key: 2,

      patientName: "Priya Sharma",
      insuranceCompany: "ICICI Lombard",
      phoneNo: "9123456780",
      totalAmount: 32000,
      status: "Pending",
      patientType: "Corporate",
    },
    {
      key: 3,

      patientName: "Ankit Mehta",
      insuranceCompany: "HDFC Ergo",
      phoneNo: "9988776655",
      totalAmount: 15000,
      status: "Rejected",
      patientType: "Insurance",
    },
    {
      key: 4,

      patientName: "Neha Verma",
      insuranceCompany: "Religare",
      phoneNo: "9090909090",
      totalAmount: 42000,
      status: "Approved",
      patientType: "Insurance",
    },
    {
      key: 5,

      patientName: "Aman Joshi",
      insuranceCompany: "Bajaj Allianz",
      phoneNo: "9876512345",
      totalAmount: 18000,
      status: "Approved",
      patientType: "Insurance",
    },
    {
      key: 6,

      patientName: "Sonal Gupta",
      insuranceCompany: "Max Bupa",
      phoneNo: "9123984712",
      totalAmount: 30000,
      status: "Pending",
      patientType: "Insurance",
    },
  ];
  const columns = [
    {
      title: "Sl. No",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
    },
    {
      title: "Insurance Company",
      dataIndex: "insuranceCompany",
    },
    {
      title: "Contact No",
      dataIndex: "phoneNo",
    },
    {
      title: "Total Amt",
      dataIndex: "totalAmount",
      render: (amount: number) => `₹${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
     
    },
    {
      title: "Action",
    render: (_: any, record: any) => (
      <div className="d-flex mb-3">
        {record.status?.toLowerCase() === "approved" && (
          <Tooltip placement="top" title={"Print Bill"}>
            <IconButton
              className="mx-2"
              style={{
                backgroundColor: "#3497F9",
                width: "40px",
                height: "40px",
                borderRadius: "6px",
              }}
            >
              <IoPrint style={{ fontSize: "18px", color: "white" }} />
            </IconButton>
          </Tooltip>
        )}
        <IconButton
          className="mx-2"
          style={{
            backgroundColor: "#3497F9",
            width: "40px",
            height: "40px",
            borderRadius: "6px",
          }}
        >
          <MdEdit style={{ fontSize: "18px", color: "white" }} />
        </IconButton>
      </div>
    ),
      
    },
  ];

  const [doctorName, setDoctorName] = useState<
    { label: string; value: string }[]
  >([]);

  const [filterValues, setFlterValues] = useState({
    name: "",
    number: "",
  });

  const handleReset = () => {
    setFlterValues({
      name: "",
      number: "",
    });
  };

  const getDropDown = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/doctor/d-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dropdownDoctor = res.data.data.dmMenu.map((val: any) => ({
        label: val.label,
        value: val.value,
      }));

      setDoctorName(dropdownDoctor);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPatientData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(
        `${api_url}/api/patient/emr-data?limit=${pageSize}&doctorName=${
          filterValues.name
        }&phoneNo=${filterValues.number}&date=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let dns = res.data.data.mergedData.map((val: any) => {
        return {
          createdAt: val.createdAt,
          UHID: val.UHID,
          patientName: val.patientName,
          phoneNo: val.phoneNo,
          status: val.status,
          patientId: val.patientId._id,
          patientType: val.patientType,
        };
      });
      setData(dns);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDropDown();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterValues.name, filterValues.number]);

  useEffect(() => {
    getPatientData();
  }, [filterValues, currentPage]);

  const navigate = useNavigate();
  const handleTpaNav = () => {
    navigate(`/tpa/tpa-patient`);
  };
  return (
    <>
      <div className="emr-search-box mt-4 rounded">
        <p className="emr-search-text pt-4 ps-4">Search</p>
        <Form>
          <Row className="pt-4 px-4">
            <Col xs={12} md={5}>
              <Form.Group controlId="patientId">
                <Form.Label className="emr-label">Company Name</Form.Label>
                <br />
                <Select
                  showSearch
                  value={filterValues.name}
                  options={doctorName}
                  onChange={(value) =>
                    setFlterValues({ ...filterValues, name: value })
                  }
                  style={{ borderRadius: "4px", height: 40, width: "100%" }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="doctorName">
                <Form.Label className="emr-label">Patient Ph Number</Form.Label>
                <br />
                <Input
                  value={filterValues.number}
                  onChange={(e) =>
                    setFlterValues({ ...filterValues, number: e.target.value })
                  }
                  style={{ borderRadius: "4px", height: 40, width: "100%" }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <div className="pt-4 mt-2 text-centere search-btn-box">
                <Button className="search-btn" style={{ height: 38 }}>
                  <RiResetRightLine
                    style={{ fontSize: "18px" }}
                    onClick={handleReset}
                  />
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="mt-4">
        <div className="emr-complaints-box mt-4 rounded p-4">
          <p className="emr-search-text">Patient Details</p>
          <Table
            columns={columns}
            dataSource={sampleData}
            pagination={false}
            className="emr-table2"
            rowClassName={(record: any) => {
              if (record.patientType === "General") return "inpatient-General";
              if (record.patientType === "Insurance")
                return "inpatient-Insurance";
              if (record.patientType === "Corporate")
                return "inpatient-Corporate";
              return "";
            }}
            onRow={(_record) => ({
              onClick: () => {
                handleTpaNav();
              },
            })}
          />
          {/* Pagination Component */}
          {data.length > 0 && (
            <div className="d-flex justify-content-end mt-4">
              <Pagination
                current={currentPage}
                total={totalPages * pageSize}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TPApatient;
