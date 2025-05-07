import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, message, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { api_url } from "../../Config";

const CReport: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));

  const surgeryColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_text: any, _record: any, index: any) => (
        <>{(currentPage - 1) * index + 1 + index}</>
      ),
    },
    { title: "OP No", dataIndex: "opNo", key: "opNo" },
    { title: "Patient Name", dataIndex: "PatientName", key: "PatientName" },
    {
      title: "Visit Date",
      dataIndex: "emrCompleteDate",
      key: "emrCompleteDate",
      render: (text: any) => <>{moment(text).format("YYYY-MM-DD")}</>,
    },
    {
      title: "Operation Date",
      dataIndex: "operationDate",
      key: "operationDate",
      render: (_text: any, record: any) => (
        <>
          {record?.surgeryDetailsId?.surgeryDate
            ? moment(record?.surgeryDetailsId?.surgeryDate).format("YYYY-MM-DD")
            : "-"}
        </>
      ),
    },
    {
      title: "Consult DR",
      dataIndex: "consultDr",
      key: "consultDr",
      render: (_text: any, record: any) => (
        <>{record?.doctorId?.doctorName || "-"}</>
      ),
    },
    {
      title: "Status",
      dataIndex: "cousellingStatus",
      key: "cousellingStatus",
      render: (status: string) => {
        const color = status === "waiting" ? "green" : "red";
        return (
          <span style={{ color }}>
            {status === "waiting" ? "Willing" : "Not Willing"}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (text: any) => {
        return (
          <div>
            <Link to={`edit-report?id=${text}`}>
              <Button className="i-btn">
                <MdEdit />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevDate = () => {
    setSelectedDate((prev) => moment(prev).subtract(1, "day"));
  };

  const handleNextDate = () => {
    setSelectedDate((prev) => moment(prev).add(1, "day"));
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
        `${api_url}/api/patient/filter?emrdate=${moment(selectedDate).format(
          "YYYY-MM-DD"
        )}&page=${currentPage}&limit=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data?.patients);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage, selectedDate]);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0"> Patient Details</p>
        <div className="d-flex align-items-center">
          <Button
            className="arrow-btn"
            onClick={handlePrevDate}
            icon={<LeftOutlined style={{ color: "#3497F9" }} />}
          />
          <p className="mx-3 date-da mt-3">
            {selectedDate.format("DD MMM YYYY")}
          </p>
          <Button
            className="arrow-btn"
            onClick={handleNextDate}
            icon={<RightOutlined style={{ color: "#3497F9" }} />}
          />
        </div>
      </div>
      <Table
        columns={surgeryColumns}
        dataSource={data}
        pagination={false}
        bordered
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
  );
};

export default CReport;
