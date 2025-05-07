import { Button } from "@mui/material";
import { Button as AntButton, Input, Modal, Select, Upload } from "antd";
import { Table } from "antd";
import { Col, Form, Row } from "react-bootstrap";
import { useMemo, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaCircle } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";

interface PatientData {
  key: number;
  patientName: string;
  insuranceCompany: string;
  contactNo: string;
  totalAmt: string;
  status: string;
}

const TPAmanagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    phoneNo: "",
    UHIDId: "",
  });
  const sampleData: PatientData[] = [
    {
      key: 1,
      patientName: "John Doe",
      insuranceCompany: "ABC Insurance",
      contactNo: "9876543210",
      totalAmt: "₹15,000",
      status: "Approved",
    },
    {
      key: 2,
      patientName: "Jane Smith",
      insuranceCompany: "XYZ Health",
      contactNo: "9123456780",
      totalAmt: "₹22,500",
      status: "Pending",
    },
    {
      key: 3,
      patientName: "Mike Johnson",
      insuranceCompany: "MediCover",
      contactNo: "9988776655",
      totalAmt: "₹18,200",
      status: "Rejected",
    },
  ];

  const columns = useMemo(
    () => [
      {
        title: "Sl.no",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
      },
      {
        title: "Insurance Company",
        dataIndex: "insuranceCompany",
        key: "insuranceCompany",
      },
      {
        title: "Contact No",
        dataIndex: "contactNo",
        key: "contactNo",
      },
      {
        title: "Total Amt",
        dataIndex: "totalAmt",
        key: "totalAmt",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      // {
      //   title: "Action",
      //   key: "action",
      //   render: () => (
      //     <div className="d-flex mb-3">
      //       <IconButton
      //         className="mx-2"
      //         style={{
      //           backgroundColor: "#3497F9",
      //           width: "40px",
      //           height: "40px",
      //           borderRadius: "6px",
      //         }}
      //       >
      //         <IoPrint style={{ fontSize: "18px", color: "white" }} />
      //       </IconButton>
      //       <IconButton
      //         className="mx-2"
      //         style={{
      //           backgroundColor: "#3497F9",
      //           width: "40px",
      //           height: "40px",
      //           borderRadius: "6px",
      //         }}
      //       >
      //         <MdEdit style={{ fontSize: "18px", color: "white" }} />
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  return (
    <div className="emr-in">
      {/* <div className="text-end ">
        <AntButton
          className="s-btn"
          style={{ width: "180px", height: "38px" }}
          onClick={() => setIsModalOpen(true)}
        >
          Add TPA Company
        </AntButton>
      </div> */}
      <div className="emr-search-box mt-4 rounded">
        <p className="emr-search-text pt-4 ps-4">Search</p>
        <Form>
          <Row className="pt-4 px-4">
            <Col xs={12} md={5}>
              <Form.Group controlId="phoneNumber">
                <Form.Label className="emr-label">Company Name</Form.Label>
                <Form.Control
                  type="text"
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
                <Form.Label className="emr-label">Coad</Form.Label>
                <Form.Control
                  type="text"
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
            dataSource={sampleData}
            pagination={false}
            rowKey="key"
          />
        </div>
      </div>

      <Modal
        style={{ top: "4%" }}
        width={"80%"}
        title="Add Company"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="text-end ">
            <AntButton className="c-btn me-5">Cancel</AntButton>
            <AntButton className="s-btn">Save</AntButton>
          </div>
        }
      >
        <>
          <div>
            <Row className="g-3">
              <Col md={6} className="mb-1">
                <label className="emr-label mb-1">
                  Insurance Company Name <span className="text-danger">*</span>
                </label>
                <br />
                <Input style={{ height: "40px" }} />
              </Col>
              <Col md={6} className="mb-1">
                <label className="emr-label mb-1">
                  TPA Type<span className="text-danger">*</span>
                </label>
                <br />
                <Select
                  style={{ height: "40px", width: "50%" }}
                  defaultValue={"Corporates"}
                  options={[
                    {
                      label: (
                        <span>
                          <FaCircle
                            style={{ color: "#FFAE00" }}
                            className="me-2 mb-1"
                          />
                          Corporates
                        </span>
                      ),
                      value: "Corporates",
                    },
                    {
                      label: (
                        <span>
                          <FaCircle
                            style={{ color: "#3497F9" }}
                            className="me-2 mb-1"
                          />
                          Insurance company
                        </span>
                      ),
                      value: "Insurance company ",
                    },
                    {
                      label: (
                        <span>
                          <FaCircle
                            style={{ color: "#00BE4F" }}
                            className="me-2 mb-1"
                          />
                          General ( Cash )
                        </span>
                      ),
                      value: "General  ( Cash )",
                    },
                  ]}
                />
              </Col>
              <br />

              <Col md={12} className="mb-1">
                <label className="emr-label mb-1">
                  Insurance Company Coad <span className="text-danger">*</span>
                </label>
                <br />
                <Input style={{ height: "40px", width: "50%" }} />
              </Col>
              <Col md={12} className="mb-1">
                <label className="emr-label mb-1">Contact Person Name</label>
                <br />
                <Input style={{ height: "40px", width: "50%" }} />
              </Col>
              <Col md={12} className="mb-1">
                <label className="emr-label mb-1">
                  Contact Number<span className="text-danger">*</span>
                </label>
                <br />
                <Input style={{ height: "40px", width: "50%" }} />
              </Col>
              <Col md={12} className="mb-1">
                <label className="emr-label mb-1">
                  Upload Form<span className="text-danger">*</span>
                </label>
                <br />
                <Upload>
                  <AntButton icon={<UploadOutlined />}>
                    Click to Upload
                  </AntButton>
                </Upload>
              </Col>
            </Row>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default TPAmanagement;
