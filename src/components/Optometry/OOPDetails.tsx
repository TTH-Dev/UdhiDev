import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineReplay } from "react-icons/md";
import moment from "moment";
import axios from "axios";
import { api_url } from "../../Config";

const OPManagement: React.FC = () => {
  const handleAction = (record: any) => {
    sessionStorage.setItem("patientId", record)
    navigate(`/optometry-details`);
  };
  // const [rightarrow, setRightArrow] = useState(true);
  const selectedDate = moment();

  const formattedDate = selectedDate.format("DD MMM YYYY");
  const [data, setData] = useState([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [applied, setIsApplied] = useState(false);
  const [ismodalopen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [dmMenu, setDmmenu] = useState([]);
  const [filterValues, setFilterValue] = useState({
    doctorName: "",
    status: "",
    uhid: ""
  });


  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "UHID",
      dataIndex: "uhid",
      key: "uhid",
    },
    {
      title: "OP/AP No",
      dataIndex: "opapNo",
      key: "opapNo",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },


    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color: string;
        switch (status) {
          case "completed":
            color = "green";
            break;
          case "pending":
            color = "gold";
            break;
          default:
            color = "blue";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button type="primary" className="p-0" onClick={() => handleAction(record.key)} style={{ height: 40, width: 40, border: "none" }}>
          <img src="/assets/opt-act-btn.png" className="img-fluid" style={{ width: "20px" }} alt="img" loading="lazy" />
        </Button>

      ),
    },
  ];


  const handleStatusChange = (value: any) => {
    setFilterValue((prevState) => ({
      ...prevState,
      status: value,
    }));
  };


  const handleDoctorChange = (value: any) => {
    setFilterValue((prevState) => ({
      ...prevState,
      doctorName: value,
    }));
  };
  // const handleDateChange = (increment: number) => {
  //   const newDate = moment(selectedDate).add(increment, "days");
  //   setSelectedDate(newDate);
  // };



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

  const handleapply = () => {
    setIsApplied(true);
    setIsModalOpen(false);
  };
  const handleReset = () => {
    setFilterValue({
      doctorName: "",
      status: "",
      uhid: ""
  })
    setIsApplied(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFilterValue({
      doctorName: "",
      status: "",
      uhid: ""
  });
    setIsApplied(false);
  };


  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/opto-data?date=${selectedDate.format("YYYY-MM-DD")}&limit=${pageSize}&page=${currentPage}&doctorName=${filterValues.doctorName}&UHID=${filterValues.uhid}&status=${filterValues.status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data.mergedData.map((val: any) => {
        return {
          key: val.patientId._id,
          time: val.timeSlot || val.joiningDate.split("T")[1].split("Z")[0].split(".")[0],
          uhid: val.UHID,
          opapNo: val.patientId.opNo || val.appointmentNo,
          patientName: val.patientName,
          consultDoctor: val.doctorName,
          roomNo: val.doctorRoomNo,
          status: val.patientId.optoStatus,
          patientType:val.patientType
        }
      });
      setData(data);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching doctor data!");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFilterValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchdata();
  }, [applied, currentPage]);

  // useEffect(() => {
  //   const today = moment(new Date()).format("DD-MM-YYYY")
  //   const upday = selectedDate.format("DD-MM-YYYY");
  //   if (upday == today) {
  //     setRightArrow(false);
  //   } else {
  //     setRightArrow(true)
  //   }
  // });

  
  useEffect(() => {
    fetchDmdata();
  }, []);
  return (
    <>
      <div className="cont" style={{ marginTop: '7rem' }}>
        <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
          <div className="d-flex justify-content-between align-items-center my-3">
            <div>
              <p className="emr-search-text mb-0">Out Patient Details</p>
            </div>
            <div className="d-flex align-items-center">
              {/* <Button
                icon={<LeftOutlined style={{ color: "#3497F9" }} />}
                onClick={() => handleDateChange(-1)}
                className="arrow-btn"
              /> */}
              <p className="mx-3 date-da mt-3">{formattedDate}</p>
              {/* <Button
                icon={<RightOutlined style={{ color: "#3497F9" }} />}
                onClick={() => {
                  handleDateChange(1)
                }}
                style={{ display: rightarrow ? "block" : "none" }}
                className="arrow-btn"
              /> */}
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
                onClick={handleReset}
              >
                <MdOutlineReplay />
              </Button>

              {/* <Button className="s-btn ms-2" onClick={handleAddPatient}>
              Add
            </Button> */}
              <Modal
                modalRender={(modal) => <div>{modal}</div>}
                width={"28rem"}
                title={"Filter"}
                open={ismodalopen}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
                footer={
                  <div>
                    <div className="d-flex justify-content-between  my-4">
                      <Button className="c-btn me-3" onClick={handleCancel}>Cancel</Button>
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
                    onChange={handleDoctorChange}
                    value={filterValues.doctorName}
                  >
                    {dmMenu.map((val: any) => (
                      <Select.Option key={val.id} value={val.value}>
                        {val.label}
                      </Select.Option>
                    ))}
                  </Select>
                  <br />
                  <label className="mod-label mb-2">UHID</label>

                  <Input
                    type="text"
                    name="uhid"
                    placeholder="Enter UHID"
                    value={filterValues.uhid}
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
                  onChange={handleStatusChange}
                  value={filterValues.status}
                >
                  <Select.Option value="Waiting">Waiting</Select.Option>
                  <Select.Option value="Appointment">Appointment</Select.Option>
                  <Select.Option value="Not-Arrived">Not-Arrived</Select.Option>
                </Select>
                <br />
              </Modal>
            </div>
          </div>
          <div className="">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                current: currentPage,
                total: totalPages * pageSize,
                pageSize: pageSize,
                onChange: handlePageChange,
              }}
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

export default OPManagement;
