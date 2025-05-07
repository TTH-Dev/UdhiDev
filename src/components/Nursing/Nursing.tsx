import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const Nursing: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [ismodalopen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleDateChange = (increment: number) => {
    const newDate = selectedDate.add(increment, "day");
    setSelectedDate(newDate);
  };

  const getBillingData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {

      localStorage.clear();
      message.error("Login Required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/prescription/nurse?limit=10&page=${page}&date=${dayjs(selectedDate).format("YYYY-MM-DD")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data.nurseStation.map(
        (val: any, index: number) => {
          return {
            key: index + 1,
            id: val._id,
            opNo: val.opNo || "-",
            UHID: val.patientId.UHIDId,
            PatientName: val.patientId.PatientName,
            Time: dayjs(val.createdAt).format("HH:mm"),
            Status: val.status,
          };
        }
      );
      setData(data);
      setTotal(res.data.data.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const formattedDate = selectedDate.format("DD MMM YYYY");

  const columns: any[] = [
    {
      title: "Time",
      dataIndex: "Time",
      key: "Time",
    },
    {
      title: "UHID",
      dataIndex: "UHID",
      key: "uhid",
    },
    {
      title: "OP/AP No",
      dataIndex: "opNo",
      key: "opNo",
    },
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      key: "patientName",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (text: any) => {
        return (
          <>
            <Link to={`/nurse-station/nursing-procedure?id=${text}`}>
              <Button
                type="primary"
                className="p-0"
                style={{ height: 40, width: 40, border: "none" }}
              >
                <img
                  src="/assets/opt-act-btn.png"
                  className="img-fluid"
                  style={{ width: "20px" }}
                  alt="img"
                  loading="lazy"
                />
              </Button></Link>
          </>)
      },
    },
  ];

  useEffect(() => {
    getBillingData();
  }, [page, selectedDate])

  return (
    <>
      <div className="cont">
        <div
          className="act-cont mt-3 ms-3 rounded"
          style={{
            marginBottom: "100px",
            color: "#595959",
            background: "#fff",
          }}
        >
          <div className="mt-4 ">
            <div className="d-flex justify-content-between align-items-center my-3 px-3">
              <div>
                <p className="emr-search-text mb-0">Patient Detail</p>
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
                <Button className="doc-fil-btn mx-2 mt-1">
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
                        <Button className="s-btn">Apply</Button>
                      </div>
                    </div>
                  }
                >
                  <div className="mt-3">
                    <label className="mod-label mb-2">Patient Name</label>
                    <br />
                    <Select
                      placeholder="Select an option"
                      style={{ width: "400px", borderRadius: "2px" }}
                      className="custom-select-doc"
                    />

                    <br />
                    <label className="mod-label mb-2">OP/AP No</label>
                    <Input style={{ borderRadius: "3px" }} />
                  </div>
                  <label className="mod-label mb-2">Status</label>
                  <br />
                  <Select
                    placeholder="Select an option"
                    style={{ width: "400px", borderRadius: "2px" }}
                    className="custom-select-doc"
                  />

                  <br />
                </Modal>
              </div>
            </div>
            <div className="">
              <Table columns={columns} dataSource={data}
                pagination={{
                  current: page,
                  pageSize: 10,
                  total: total,
                  onChange: (p) => setPage(p),
                }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nursing;