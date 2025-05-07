import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { api_url } from "../../Config";
import moment from "moment";

const PurchaseRecieved: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    onChange: (selectedKeys: React.Key[], selectedRows: any[]) => {
      console.log("Selected Row Keys:", selectedKeys);
      console.log("Selected Rows:", selectedRows);
      setSelectedRowKeys(selectedKeys);
    },
  };

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
      dataIndex: "purchaseNo",
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
      title: "Tax",
      dataIndex: "taxAmt",
    },
  ];

  const [data, setData] = useState<any>([]);
  
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/purchase/filter?status=Accepted`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedData = res.data.data.purchase.map((item: any) => ({
        ...item,
        key: item._id,
      }));
      setData(formattedData);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleUpdateStatus = async (value: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      await axios.post(
        `${api_url}/api/purchase/bulk-edit`,
        { ids: selectedRowKeys, statusValue: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Updated Successfully!");
      await getData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="emr-complaints-box rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Purchase Received Details</p>

        <div className="d-flex">
          <Button
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#3497F9",
              color: "#fff",
            }}
            className="p-0 mx-2"
            onClick={() => handleUpdateStatus("Recieved")}
          >
            <TiTick style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>

      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default PurchaseRecieved;
