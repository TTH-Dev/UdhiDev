import { Button, DatePicker, message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../Config";
import dayjs from "dayjs";
import moment from "moment";
import { RiResetRightFill } from "react-icons/ri";

const PurchaseUsage = () => {
  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      render: (_text: string, _record: any, index: any) => <>{index + 1}</>,
    },
    {
      title: "Barcode",
      dataIndex: "barCode",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
    },
  ];
  const [data, setData] = useState<any>([]);
  const [dates, setDates] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)),
    to: new Date(),
  });
  const getReports = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-billing/salesReport?startDate=${moment(
          dates?.from
        ).format("YYYY-MM-DD")}&endDate=${moment(dates?.to).format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data, "res");
      setData(res.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setDates({
      from: new Date(new Date().setDate(new Date().getDate() - 1)),
      to: new Date(),
    });
  };

  useEffect(() => {
    getReports();
  }, [dates.from, dates.to]);
  return (
    <>
      <div className="emr-complaints-box rounded p-4 ms-4">
        <div className="d-flex justify-content-between align-items-center my-3">
          <p className="emr-search-text mb-0">Product Usage</p>
          <div>
            <DatePicker
              value={dayjs(dates.from)}
              className="me-2"
              placeholder="From"
              onChange={(value) => setDates({ ...dates, from: value.toDate() })}
            />
            to
            <DatePicker
              value={dayjs(dates.to)}
              className="ms-2"
              placeholder="To"
              onChange={(value) => setDates({ ...dates, to: value.toDate() })}
            />
            <Button className="ms-2" onClick={handleReset}>
              <RiResetRightFill />
            </Button>
          </div>
        </div>

        <div>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </>
  );
};

export default PurchaseUsage;
