import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineReplay } from "react-icons/md";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { FaUserDoctor } from "react-icons/fa6";
import { api_url } from "../../Config";
import axios from "axios";

interface Appointment {
  key: string;
  time: string;
  uhid: string;
  appointmentNo: string;
  patientName: string;
  consultDoctor: string;
  status: string;
  arrivedStatus: string;
}

const OPAppointment: React.FC = () => {
  const [dmMenu, setDmmenu] = useState([]);
  const [filervalue, seetFilterVaue] = useState({
    doctorName: "",
    apNo: "",
    status: "",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys.map((key) => String(key)));
      setRowSelect(keys.length > 0);
    },
  };

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [applied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDocOpen, setIsDocModalOpen] = useState(false);
  const [rowselect, setRowSelect] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const handleDoctorChange = (_value: string, key: string) => {
    setSelectedDoctor(key);
  };

  const navigate = useNavigate();

  const handleDateChange = (increment: number) => {
    setSelectedDate((prevDate) => prevDate.add(increment, "day"));
  };

  const handleApply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await fetchData();
  };

  const fetchDmdata = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/doctor/d-menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDmmenu(res.data.data.dmMenu);
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching doctor data!");
    }
  };

  const appointmentColumns = [
    { title: "Timing", dataIndex: "time", key: "time" },
    { title: "UHID", dataIndex: "uhid", key: "uhid" },
    {
      title: "Appointment No",
      dataIndex: "appointmentNo",
      key: "appointmentNo",
    },
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    {
      title: "Consult Doctor",
      dataIndex: "consultDoctor",
      key: "consultDoctor",
      render: (_: string, record: Appointment) => (
        <span>{record.consultDoctor}</span>
      ),
    },
    { title: "Source", dataIndex: "source", key: "source" },
    { title: "Status", dataIndex: "status", key: "status",

      render: (status: string) => {
        let color: string;
        switch (status) {
          case "Completed":
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

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/appointment/filter?date=${selectedDate.format(
          "YYYY-MM-DD"
        )}&doctorName=${filervalue.doctorName}&appointmentNo=${
          filervalue.apNo
        }&status=${filervalue.status}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTotalPages(res.data.totalPages);
      const datas = res.data.data.appointments.map((val: any) => {
        return {
          key: val._id,
          patientId: val.patientId,
          time: val.timeSlot,
          uhid: val.UHID || "-",
          appointmentNo: val.appointmentNo,
          patientName: val.patientName,
          consultDoctor: val.doctorName,
          status: val.status || "-",
          patientType:val.patientType,
          source:val.source||"-"
        };
      });
      setData(datas);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectChange = (value: any, field: any) => {
    seetFilterVaue((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: any) => {
    seetFilterVaue((prev: any) => ({ ...prev, apNo: e.target.value }));
  };

  const changeDoctor = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await Promise.all(
        selectedRowKeys.map((id) =>
          axios.patch(
            `${api_url}/api/appointment/getById/${id}`,
            { doctorId: selectedDoctor },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      setIsDocModalOpen(false);
      setSelectedRowKeys([]);
      message.success(`Doctor  assigned successfully!`);
      await fetchData();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    seetFilterVaue({
      doctorName: "",
      apNo: "",
      status: "",
    });
    setIsApplied(false);
  };
  useEffect(() => {
    fetchData();
  }, [selectedDate, applied, currentPage]);

  useEffect(() => {
    fetchDmdata();
  }, []);
  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Out Patient Details</p>
        <div className="d-flex align-items-center">
          <Button
            className="arrow-btn"
            icon={<LeftOutlined style={{ color: "#3497F9" }} />}
            onClick={() => handleDateChange(-1)}
          />
          <p className="mx-3 date-da mt-3">
            {selectedDate.format("DD MMM YYYY")}
          </p>
          <Button
            className="arrow-btn"
            icon={<RightOutlined style={{ color: "#3497F9" }} />}
            onClick={() => handleDateChange(1)}
          />
        </div>
        <div className="d-flex">
          {rowselect && (
            <Button
              className="doc-fil-btn mx-2 mt-1"
              onClick={() => {
                setIsDocModalOpen(true);
              }}
            >
              <FaUserDoctor />
            </Button>
          )}

          <Button
            className="doc-fil-btn mt-1"
            onClick={() => setIsModalOpen(true)}
          >
            <FaFilter /> Filter
          </Button>
          {applied && (
            <Button
              className="doc-fil-btn mx-2 mt-1"
              onClick={() => handleReset()}
            >
              <MdOutlineReplay />
            </Button>
          )}
        </div>
      </div>
      <Table
        columns={appointmentColumns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
        rowClassName={(record:any) => {
          if (record.patientType === "General") return "inpatient-General";
          if (record.patientType === "Insurance") return "inpatient-Insurance";
          if (record.patientType === "Corporate") return "inpatient-Corporate";
          return ""; 
        }}
        onRow={(record: any) => ({
          onClick: () =>
            navigate(
              `/out-patient/op-appointment/patient-detail?id=${record.patientId}`
            ),
        })}
      />
      {/* Pagination Component */}
      {data.length>0&&
      <div className="d-flex justify-content-end mt-4">
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>}
      <Modal
        width={"28rem"}
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => {setIsModalOpen(false)
          seetFilterVaue({
            doctorName: "",
            apNo: "",
            status: "",
          });
        }}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button
              className="c-btn me-3"
              onClick={() => {setIsModalOpen(false)  
                seetFilterVaue({
                doctorName: "",
                apNo: "",
                status: "",
              });}}
            >
              Cancel
            </Button>
            <Button className="s-btn" onClick={() => handleApply()}>
              Apply
            </Button>
          </div>
        }
      >
        <div className="mt-3">
          <label className="mod-label mb-2">Consult Doctor</label>
          <Select
            value={filervalue.doctorName}
            placeholder="Select an option"
            style={{ width: "100%" }}
            onChange={(value) => handleSelectChange(value, "doctorName")}
          >
            {dmMenu.map((val: any) => (
              <Select.Option key={val.id} value={val.value}>
                {val.label}
              </Select.Option>
            ))}
          </Select>
          <label className="mod-label mb-2">AP No</label>
          <Input onChange={handleInputChange} value={filervalue.apNo} />
          <label className="mod-label mb-2">Status</label>
          <Select
            value={filervalue.status}
            placeholder="Select an option"
            style={{ width: "100%" }}
            onChange={(value) => handleSelectChange(value, "status")}
          >
            <Select.Option value="Waiting">Waiting</Select.Option>
            <Select.Option value="Appointment">Appointment</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Not-Arrived">Not-Arrived</Select.Option>
          </Select>
        </div>
      </Modal>
      <Modal
        title={"Assign to"}
        open={isModalDocOpen}
        onCancel={() => setIsDocModalOpen(false)}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button
              className="c-btn me-3"
              onClick={() => setIsDocModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="c-btn" type="primary" onClick={changeDoctor}>
              Assign
            </Button>
          </div>
        }
      >
        <label className="mb-2">
          Doctor Names<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <Select
          style={{ width: "100%" }}
          onChange={(value, option: any) =>
            handleDoctorChange(value, option.key)
          }
        >
          {dmMenu.map((val: any) => (
            <Select.Option key={val.id} value={val.value}>
              {val.label}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default OPAppointment;
