import React, { useEffect, useState } from "react";
import { Button, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";
import dayjs from "dayjs";
import moment from "moment";


const OPbills: React.FC = () => {
  const [applied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dmMenu, setDmmenu] = useState({
    uhids: [],
    phoneNos: [],
  });

  const [filervalue, seetFilterVaue] = useState({
    uuhid: "",
    phoeNo: "",
    status: "",
  });


  const getBillingData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login Required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/billing/filter?UHID=${filervalue.uuhid}&phoneNo=${filervalue.phoeNo}&status=${filervalue.status}&limit=${pageSize}&page=${currentPage}&date=${moment(new Date()).format("YYYY-MM-DD")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const datass = res.data.data.patients.map((val: any, index: number) => {
        return {
          SNo: index + 1,
          key: val._id,
          billId: val.billId,
          UHID: val.UHID || "-",
          patientName: val.patientName,
          createdAt: dayjs(val.createdAt).format("YYYY-MM-DD"),
          BillAmount: val.billAmount,
          Status: val.status,
          patientType: val.patientType
        }
      })
      setData(datass);

      setTotalPages(res.data.totalPages);

    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const fetchDmdata = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/dm-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uhid = res.data.data.uhids.map((val: any) => {
        return {
          label: val,
          value: val
        }
      });

      const phone = res.data.data.phoneNos.map((val: any) => {
        return {
          label: val,
          value: val
        }
      })
      setDmmenu({
        uhids: uhid,
        phoneNos: phone
      });
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching doctor data!");
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApply = () => {
    setIsApplied(true);
    setIsModalOpen(false);
  };

  const appointmentColumns = [
    {
      title: "S.No",
      dataIndex: "SNo",
      key: "SNo",
      render: (_text: any, _record: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    { title: "Bill Id", dataIndex: "billId", key: "BillId" },
    {
      title: "UHID",
      dataIndex: "UHID",
      key: "UHID",
    },
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "CreatedDate",
    },
    { title: "Bill Amount", dataIndex: "BillAmount", key: "BillAmount" },
    { title: "Status", dataIndex: "Status", key: "Status", render: (text: string) => (<>{text === "Paid" ? <span style={{ color: "#00BE4F" }}>Paid</span> : <span style={{ color: "#FFAE00" }}>UnPaid</span>}</>) },
    {
      title: "Action",
      dataIndex: "Key",
      key: "Key",
      render: (text: string, record: any) => (
        <>
          {text === "paid" ? (
            <Button className="p-0" style={{ width: "40px", height: "40px", background: "#3497F9", color: "#fff", border: "none" }}>
              <IoPrintSharp style={{ fontSize: "20px" }} />
            </Button>
          ) : (
            <Link to={`/billing/op-bills/add-op-bills?id=${record.key}`}>
              <Button className="p-0" style={{ width: "40px", height: "40px", background: "#3497F9", color: "#fff", border: "none" }}>
                <GiReceiveMoney style={{ fontSize: "20px" }} />
              </Button>
            </Link>
          )}
        </>
      ),
    },
  ];

  const handleSelectChange = (value: any, field: any) => {

    seetFilterVaue((prev: any) => ({ ...prev, [field]: value }));
  };


  const handleReset = () => {
    seetFilterVaue({
      uuhid: "",
      phoeNo: "",
      status: "",
    });
    setIsApplied(false);
  };



  useEffect(() => {
    fetchDmdata();
  }, []);
  useEffect(() => {
    getBillingData();
  }, [currentPage, applied]);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Billing Details</p>
        <div className="d-flex">
          <Button
            className="doc-fil-btn mt-1"
            onClick={() => setIsModalOpen(true)}
          >
            <FaFilter /> Filter
          </Button>
          {applied && (
            <Button onClick={handleReset} className="doc-fil-btn mx-2 mt-1">
              <MdOutlineReplay />
            </Button>
          )}
        </div>
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
      {data.length > 0 &&
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
          <label className="mod-label mb-2">UHID</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
            showSearch
            value={filervalue.uuhid}
            options={dmMenu.uhids}
            onChange={(value) => handleSelectChange(value, "uuhid")}
          >
          </Select>

          <label className="mod-label mb-2">Phone No</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
            options={dmMenu.phoneNos}
            value={filervalue.phoeNo}
            showSearch
            onChange={(value) => handleSelectChange(value, "phoeNo")}

          >
          </Select>
          <label className="mod-label mb-2">Bill Status</label>
          <Select
            placeholder="Select an option"
            style={{ width: "100%", height: 40 }}
            value={filervalue.status}
            onChange={(value) => handleSelectChange(value, "status")}
          >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="unPaid">UnPaid</Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default OPbills;