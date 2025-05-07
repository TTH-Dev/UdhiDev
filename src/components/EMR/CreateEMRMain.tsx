import { Button } from "@mui/material";
import { Input, message, Pagination, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { api_url } from "../../Config";
import { RiResetRightLine } from "react-icons/ri";
import moment from "moment";
import { Link } from "react-router-dom";

const CreateEMRMain = () => {
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => (
        <>{text ? <span>{new Date(text).toLocaleString()}</span> : "-"}</>
      ),
    },
    {
      title: "UHID",
      dataIndex: "UHID",
      key: "UHID",
    },

    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Phone Num",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Patient",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      dataIndex: "patientId",
      key: "patientId",
      render: (text: string) => (
        <>
          <Link to={`/emr/create-emr/optometry`}>
            <Button
              variant="contained"
              className="emr-btn"
              size="small"
              onClick={() => {
                sessionStorage.setItem("patientId", text);
              }}
            >
              View
            </Button>
          </Link>
        </>
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
          phoneNo: val.patientId.phoneNo,
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

  return (
    <>
      <div className="emr-search-box mt-4 rounded">
        <p className="emr-search-text pt-4 ps-4">Search</p>
        <Form>
          <Row className="pt-4 px-4">
            <Col xs={12} md={5}>
              <Form.Group controlId="patientId">
                <Form.Label className="emr-label">Doctor Name</Form.Label>
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
                <Form.Label className="emr-label">Phone Number</Form.Label>
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
                <Button onClick={handleReset} className="search-btn" style={{ height: 38 }}>
                  <RiResetRightLine
                    style={{ fontSize: "18px" }}
                   
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
            dataSource={data}
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

export default CreateEMRMain;
