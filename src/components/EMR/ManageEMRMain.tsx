import { Button } from "@mui/material";
import { message, Table, Pagination } from "antd";
import axios from "axios";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { GrPowerReset } from "react-icons/gr";

interface PatientData {
  id: string;
  createdDate: string;
  uhid: string;
  patientName: string;
  phoneNo: string;
  lastVisit: string;
  status: string;
}

const ManageEMRMain = () => {
  const [data, setData] = useState<PatientData[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState({
    phoneNo: "",
    UHIDId: "",
  });

  const navigate = useNavigate();

  const handleEMRnav = (record: PatientData) => {
    navigate(`/emr/manage-emr?id=${record.id}`);
    
    sessionStorage.setItem("patientId", record.id);
  };

  const columns = useMemo(
    () => [
      {
        title: "Created Date",
        dataIndex: "createdDate",
        key: "createdDate",
      },
      {
        title: "UHID",
        dataIndex: "uhid",
        key: "uhid",
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
      },
      {
        title: "Phone No",
        dataIndex: "phoneNo",
        key: "phoneNo",
      },
      {
        title: "Last Visit",
        dataIndex: "lastVisit",
        key: "lastVisit",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    ],
    []
  );

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/emr-filter-data?limit=${pageSize}&page=${currentPage}&phoneNo=${searchTerm.phoneNo}&UHIDId=${searchTerm.UHIDId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const patients = res.data?.data?.patients?.map((patient: any) => ({
        id: patient._id,
        createdDate: moment(patient.createdAt).format("DD-MM-YYYY"),
        uhid: patient.UHIDId,
        patientName: patient.PatientName,
        phoneNo: patient.phoneNo,
        lastVisit: moment(patient.updatedAt).format("DD-MM-YYYY"),
        status: patient.patientStatus,
        patientType:patient.patientType
      }));
      setTotalPages(res.data.totalPages);

      setData(patients);
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching patient data!");
      return;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm.phoneNo, searchTerm.UHIDId]);

  useEffect(() => {
 
    fetchData();

  }, [currentPage, searchTerm]);

  return (
    <div className="emr-in">
      <div className="emr-search-box mt-4 rounded">
        <p className="emr-search-text pt-4 ps-4">Search</p>
        <Form>
          <Row className="pt-4 px-4">
            <Col xs={12} md={5}>
              <Form.Group controlId="phoneNumber">
                <Form.Label className="emr-label">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  style={{ borderRadius: "4px" }}
                  value={searchTerm.phoneNo}
                  onChange={(e) =>
                    setSearchTerm((prev) => ({
                      ...prev,
                      phoneNo: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="uhid">
                <Form.Label className="emr-label">UHID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter UHID"
                  style={{ borderRadius: "4px" }}
                  value={searchTerm.UHIDId}
                  onChange={(e) =>
                    setSearchTerm((prev) => ({
                      ...prev,
                      UHIDId: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <div className="pt-4 mt-2 text-center search-btn-box">
                <Button
                  className="search-btn"
                  style={{ height: 38 }}
                  onClick={() => {
                    setSearchTerm({ phoneNo: "", UHIDId: "" });

                    setCurrentPage(currentPage);
                  }}
                >
                  <GrPowerReset />
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
            style={{ cursor: "pointer" }}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleEMRnav(record),
            })}

            rowClassName={(record:any) => {
              if (record.patientType === "General") return "inpatient-General";
              if (record.patientType === "Insurance") return "inpatient-Insurance";
              if (record.patientType === "Corporate") return "inpatient-Corporate";
              return ""; 
            }}
          />
          <div className="d-flex justify-content-end mt-3">
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEMRMain;
