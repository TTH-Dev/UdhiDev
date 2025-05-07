import React, { useEffect, useState } from "react";
import { Button, DatePicker, message, Modal, Pagination, Select, Table } from "antd";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";
import dayjs from "dayjs";



const OPIPTest: React.FC = () => {
  // const [applied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);

  const handleApply = () => {
    // setIsApplied(true);
    setIsModalOpen(false);
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const getTests = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/prescribe-test?limit=${pageSize}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalPages(res.data.totalPages)

      const data = res.data.data.prescribeTests.map((val: any) => {
        return {
          key: val._id,
          CreatedDateTime: dayjs(val.enteredDate).format("YYYY-MM-DD"),
          OPIPNo: val?.patientId?.opNo,
          patientName: val.patientId.PatientName,
          ConsultDoctor: val.patientId.doctorId.doctorName,
          BillingHistory: val.billStatus || "-",
          TPAType: val.patientId.patientType,
          ReportStatus: val.status || "-",
          patientType: val.patientId.patientType

        }
      });

      setData(data);

    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  const appointmentColumns = [
    {
      title: "Created Date & Time",
      dataIndex: "CreatedDateTime",
      key: "CreatedDateTime",
    },
    {
      title: "OP No",
      dataIndex: "OPIPNo",
      key: "OPIPNo",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Consult Doctor",
      dataIndex: "ConsultDoctor",
      key: "ConsultDoctor",
    },
    {
      title: "Billing History",
      dataIndex: "BillingHistory",
      key: "BillingHistory",
    },
    {
      title: "TPA Type",
      dataIndex: "TPAType",
      key: "TPAType",
      render: (_text: string, record: any) => (
        <>
          {record.TPAType === "General" ? (
            <>
              <span
                style={{
                  background: "#00BE4F",
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  borderRadius: "50%",
                }}
              ></span>
            </>
          ) : record.TPAType === "Corporate" ? (
            <>
              <span
                style={{
                  background: "#FFAE00",
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  borderRadius: "50%",
                }}
              ></span>
            </>
          ) : (
            <>
              <span
                style={{
                  background: "#3497F9",
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  borderRadius: "50%",
                }}
              ></span>
            </>
          )}
        </>
      ),
    },
    {
      title: "Report Status",
      dataIndex: "ReportStatus",
      key: "ReportStatus",
    },
    {
      title: "Action",
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          {record.ReportStatus === "Completed" ? (
            <Button
              className="p-0"
              style={{
                border: "none",
                width: "30px",
                height: "30px",
                color: "#fff",
                backgroundColor: "#3497F9",
              }}
            >
              <IoPrint style={{ fontSize: "18px" }} />
            </Button>
          ) : (
            <Link to={`/laboratory/op-ip-test/edit-op-ip-test?id=${record.key}`}>
              <Button
                className="p-0"
                style={{
                  border: "none",
                  width: "30px",
                  height: "30px",
                  color: "#fff",
                  backgroundColor: "#3497F9",
                }}
              >
                <MdEdit style={{ fontSize: "18px" }} />
              </Button>
            </Link>
          )}

          <Button
            className="p-0 ms-1"
            style={{
              border: "none",
              width: "30px",
              height: "30px",
              color: "#fff",
              backgroundColor: "#3497F9",
            }}
          >
            <FaEye style={{ fontSize: "18px" }} />
          </Button>
        </>
      ),
    },
  ];


  useEffect(() => {
    getTests();
  }, []);
  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">OP/ IP Test</p>

        {/* <div className="d-flex">
          <Button
            className="doc-fil-btn mt-1"
            onClick={() => setIsModalOpen(true)}
          >
            <FaFilter /> Filter
          </Button>
          {applied && (
            <Button className="doc-fil-btn mx-2 mt-1">
              <MdOutlineReplay />
            </Button>
          )}
        </div> */}
      </div>

      <Table
        columns={appointmentColumns}
        dataSource={data}
        pagination={false}
        rowClassName={(record: any) => {
          if (record.patientType === "General") return "inpatient-General";
          if (record.patientType === "Insurance") return "inpatient-Insurance";
          if (record.patientType === "Corporate") return "inpatient-Corporate";
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

      <Modal
        width={"28rem"}
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button
              className="c-btn me-3"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="s-btn" onClick={handleApply}>
              Apply
            </Button>
          </div>
        }
      >
        <div className="mt-3">
          <label className="mod-label mb-2">Date</label>
          <DatePicker style={{ height: 40, width: "100%" }} />
          <label className="mod-label mb-2">Report Status</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
          >
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select>
          <label className="mod-label mb-2">Patient Name</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
          >
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default OPIPTest;