import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineReplay } from "react-icons/md";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { api_url } from "../../Config";
import { IoPrint } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";

const OpticalPatient: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const columns = [
    {
      title: "Time",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "UHID",
      dataIndex: "UHID",
      key: "UHID",
    },
    {
      title: "OP No",
      dataIndex: "opId",
      key: "opId",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },

    {
      title: "Status",
      dataIndex: "opticalStatus",
      key: "opticalStatus",
      render: (_text: any,record:any) => {
        let color: string;
        switch (record?.patientId?.opticalStatus) {
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
        return <span style={{ color }}>{record?.patientId?.opticalStatus}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_text: any, record: any) => (
        <>
          {record.status === "Waiting" ? (
            <Link to={`/optical/patient/patient-details?id=${record.patientId._id}&date=${selectedDate}`}>
            <Button
              type="primary"
              className="p-0"
              style={{ height: 40, width: 40, border: "none" }}
            >
              <GiReceiveMoney style={{fontSize:"20px"}}/>
            </Button></Link>
          ) : (
            <Button
              type="primary"
              className="p-0"
              style={{ height: 40, width: 40, border: "none" }}
            >
              <IoPrint style={{fontSize:"20px"}}/>
            </Button>
          )}
        </>
      ),
    },
  ];

  const formattedDate = selectedDate.format("DD MMM YYYY");

  const [applied, setIsApplied] = useState(false);

  const [ismodalopen, setIsModalOpen] = useState(false);

  const handleDateChange = (increment: number) => {
    const newDate = selectedDate.add(increment, "day");
    setSelectedDate(newDate);
  };

  const handleapply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await fetchData();
  };
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/emr-data?date=${selectedDate.format(
          "YYYY-MM-DD"
        )}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotalPages(res?.data?.totalPages);
      setData(res.data.data.mergedData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setIsApplied(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, applied, currentPage]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
        <div className="d-flex justify-content-between align-items-center my-3">
          <div>
            <p className="emr-search-text mb-0">Patient Details</p>
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
                    <Button
                      className="c-btn me-3"
                      onClick={() => {
                        setIsModalOpen(false);
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
                />

                <br />
                <label className="mod-label mb-2">OP No</label>
                <Input style={{ borderRadius: "3px" }} />
              </div>
              <label className="mod-label mb-2">Status</label>
              <br />
              <Select
                placeholder="Select an option"
                style={{ width: "400px", borderRadius: "2px" }}
                className="custom-select-doc"
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
            dataSource={data}
            pagination={false}
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

export default OpticalPatient;
