import React, { useEffect, useState } from "react";
import { Button, Input, message, Table } from "antd";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import moment from "moment";
import axios from "axios";
import { api_url } from "../../Config";
import { RiResetRightFill } from "react-icons/ri";

const ApprovalPurchase: React.FC = () => {
  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      render: (_text: string, _record: any, index: any) => <>{index + 1}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text: any) => <>{moment(text).format("DD-MM-YYYY")}</>,
    },
    {
      title: "Purchase No",
      dataIndex: "opticalPurchaseNo",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
    },

    {
      title: "Total Value",
      dataIndex: "total",
    },
    {
      title: "Total Tax",
      dataIndex: "taxAmt",
    },
  ];

  const [data, setData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [name, setName] = useState("");

  const rowSelection = {
    onChange: (selectedKeys: React.Key[], _selectedRows: any[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/optical-purchase/filter?status=Requested&vendor=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data.purchase);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(
        `${api_url}/api/optical-purchase/bulk-edit`,
        { ids: selectedRowKeys, statusValue: "Accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(
        `${api_url}/api/optical-purchase/bulk-edit`,
        { ids: selectedRowKeys, statusValue: "Rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleReset = async () => {
    setName("");
    await getData();
  };

  useEffect(() => {
    getData();
  }, [name]);

  return (
    <div className="emr-complaints-box rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Purchase Order Detials</p>

        <div className="d-flex">
          <div className="me-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search By vendor"
              style={{ height: 38 }}
            />
          </div>
          <Button
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#3497F9",
              color: "#fff",
            }}
            className="p-0"
            onClick={handleReset}
          >
            <RiResetRightFill style={{ fontSize: "20px" }} />
          </Button>
          <Button
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#3497F9",
              color: "#fff",
            }}
            className="p-0  mx-2"
            onClick={handleReject}
          >
            <MdCancel style={{ fontSize: "20px" }} />
          </Button>
          <Button
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#3497F9",
              color: "#fff",
            }}
            className="p-0"
            onClick={handleAccept}
          >
            <TiTick style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>

      <div>
        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ApprovalPurchase;
