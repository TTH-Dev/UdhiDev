import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineReplay } from "react-icons/md";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { api_url } from "../../Config";

const OPManagement: React.FC = () => {
  const [dmMenu, setDmmenu] = useState([]);

  const [filervalue, seetFilterVaue] = useState({
    doctorName: "",
    opNo: "",
    status: "",
  });

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const columns = [
    {
      title: "UHID",
      dataIndex: "uhid",
      key: "uhid",
    },
    {
      title: "OP No",
      dataIndex: "opNo",
      key: "opNo",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Consult Doctor",
      dataIndex: "consultDoctor",
      key: "consultDoctor",
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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

  const handleDateChange = (increment: number) => {
    const newDate = selectedDate.add(increment, "day");
    setSelectedDate(newDate);
  };

  const [datass, setDatass] = useState([]);

  const formattedDate = selectedDate.format("DD MMM YYYY");

  const [applied, setIsApplied] = useState(false);

  const [ismodalopen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddPatient = () => {
    navigate("/out-patient/op-management/add-out-patient");
  };

  const handleapply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await fetchData();
  };
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
        `${api_url}/api/patient/op-filter?date=${selectedDate.format("YYYY-MM-DD")}&doctorName=${filervalue.doctorName}&opId=${filervalue.opNo}&status=${filervalue.status}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotalPages(res?.data?.totalPages);
   
      console.log(res,"ll");

      const datas = res?.data?.data?.patients.map((val: any) => {
      
        
        
        return {
          key: val._id,
          patientId: val.patientId._id,
          time: val.time,
          uhid: val.UHID,
          opNo: val?.patientId?.opNo||"-",
          patientName: val.patientName,
          consultDoctor: val.doctorName,
          roomNo: val.doctorRoomNo,
          status: val.status,
          patientType:val.patientType
        };
      });
      setDatass(datas);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectChange = (value: any, field: any) => {
    seetFilterVaue((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: any) => {
    seetFilterVaue((prev: any) => ({ ...prev, opNo: e.target.value }));
  };

  const handleReset = () => {
    seetFilterVaue({
      doctorName: "",
      opNo: "",
      status: "",
    });
    setIsApplied(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, applied, currentPage]);

  useEffect(() => {
    fetchDmdata();
  }, []);
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
        <div className="d-flex justify-content-between align-items-center my-3">
          <div>
            <p className="emr-search-text mb-0">Out Patient Details</p>
          </div>
          <div className="d-flex align-items-center">
            <Button
              icon={<LeftOutlined style={{ color: "#3497F9" }} />}
              onClick={() => handleDateChange(-1)}
              className="arrow-btn"
            />
            <p className="mx-3 date-da mt-3">{formattedDate}</p>
            <Button
              icon={<RightOutlined style={{ color: "#3497F9" }} />}
              onClick={() => handleDateChange(1)}
              className="arrow-btn"
            />
          </div>
          <div className="d-flex ">
            <Button
              className="doc-fil-btn mt-1"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaFilter />
              Filter{" "}
            </Button>
            <Button
              className="doc-fil-btn mx-2 mt-1"
              style={{ display: applied ? "block" : "none" }}
              onClick={() => handleReset()}
            >
              <MdOutlineReplay />
            </Button>

            <Button className="s-btn ms-2" onClick={handleAddPatient}>
              Add
            </Button>
            <Modal
              modalRender={(modal) => <div>{modal}</div>}
              width={"28rem"}
              title={"Filter"}
              open={ismodalopen}
              onCancel={() => {
                setIsModalOpen(false);
                seetFilterVaue({
                  doctorName: "",
                  opNo: "",
                  status: "",
                });
              }}
              footer={
                <div>
                  <div className="d-flex justify-content-between  my-4">
                    <Button
                      className="c-btn me-3"
                      onClick={() => {
                        setIsModalOpen(false);
                        seetFilterVaue({
                          doctorName: "",
                          opNo: "",
                          status: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button className="s-btn " onClick={handleapply}>
                      Apply
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="mt-3">
                <label className="mod-label mb-2">Consultant Doctor</label>
                <br />
                <Select
                  placeholder="Select an option"
                  style={{ width: "400px", borderRadius: "2px" }}
                  className="custom-select-doc"
                  value={filervalue.doctorName}
                  onChange={(value) => handleSelectChange(value, "doctorName")}
                >
                    {dmMenu.map((val: any) => (
                      <Select.Option key={val.id} value={val.value}>
                        {val.label}
                      </Select.Option>
                    ))}
                </Select>
                <br />
                <label className="mod-label mb-2">OP No</label>
                <Input
                  value={filervalue.opNo}
                  style={{ borderRadius: "3px" }}
                  onChange={handleInputChange}
                />
              </div>
              <label className="mod-label mb-2">Status</label>
              <br />
              <Select
                placeholder="Select an option"
                style={{ width: "400px", borderRadius: "2px" }}
                className="custom-select-doc"
                value={filervalue.status}
                onChange={(value) => handleSelectChange(value, "status")}
              >
                <Select.Option value="Waiting">Waiting</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
              <br />
            </Modal>
          </div>
        </div>
        <div className="">
          <Table
            columns={columns}
            dataSource={datass}
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
                  `/out-patient/op-management/patient-detail?id=${record?.patientId}`
                ),
            })}
          />
          
          {/* Pagination Component */}
          {datass.length>0&&
          <div className="d-flex justify-content-end mt-4">
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>}
        </div>
      </div>
    </>
  );
};

export default OPManagement;
