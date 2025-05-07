import React, { useEffect, useState } from "react";
import { Button, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdEdit, MdOutlineReplay } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const TestSetup: React.FC = () => {
  const [applied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await handleGetData();
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const appointmentColumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (_text: any, _record: any, index: any) => (
        <>{(currentPage - 1) * pageSize + index + 1}</>
      ),
    },
    {
      title: "Test Name",
      dataIndex: "testName",
      key: "testName",
    },
    {
      title: "Sample Type",
      dataIndex: "sampleType",
      key: "sampleType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          <Link to={`/laboratory/test-setup/edit-test-setup?id=${record._id}`}>
            <Button
              className="p-0"
              style={{
                border: "none",
                width: "30px",
                height: "30px",
                color: "#fff",
                backgroundColor: "#3497F9",
              }}
            >
              <MdEdit style={{ fontSize: "18px" }} />
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const [data, setData] = useState<any>([]);
  const [testName, setTestName] = useState([]);
  const [filterValues, setFilterValues] = useState({
    name: "",
    price: "",
  });

  const handleReset = async () => {
    setFilterValues({
      name: "",
      price: "",
    });
    await handleGetData();
  };

  const handleGetData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/test/filter?limit=${pageSize}&page=${currentPage}&priceRange=${filterValues.price}&testName=${filterValues.name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.data.tests);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getTestdrop = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/test/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let gfd = res.data.data.data.map((val: any) => ({
        label: val.testName,
        value: val.testName,
      }));

      setTestName(gfd);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    getTestdrop();
  }, []);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Test Detail</p>

        <div className="d-flex">
          <Button
            className="doc-fil-btn me-2"
            style={{ height: 38 }}
            onClick={() => setIsModalOpen(true)}
          >
            <FaFilter /> Filter
          </Button>

          {applied && (
            <Button
              className="doc-fil-btn mx-2"
              style={{ height: 38 }}
              onClick={handleReset}
            >
              <MdOutlineReplay />
            </Button>
          )}
          <Link to={`/laboratory/test-setup/add-test-setup`}>
            <Button
              style={{
                backgroundColor: "#3497F9",
                height: 40,
                width: "140px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 500,
                border: "none",
              }}
            >
              Add
            </Button>
          </Link>
        </div>
      </div>

      <Table
        columns={appointmentColumns}
        dataSource={data}
        pagination={false}
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

      <Modal
        width={"28rem"}
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setFilterValues({
            name: "",
            price: "",
          });
        }}
        footer={
          <div className="d-flex justify-content-between my-4">
            <Button
              className="c-btn me-3"
              onClick={() => {
                setIsModalOpen(false);
                setFilterValues({
                  name: "",
                  price: "",
                });
              }}
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
          <label className="mod-label mb-2">Test Name</label>
          <Select
            style={{ width: "100%", height: 40 }}
            value={filterValues.name}
            options={testName}
            onChange={(value) =>
              setFilterValues({ ...filterValues, name: value })
            }
            showSearch
          />

          <label className="mod-label mb-2">Price</label>
          <Select
            value={filterValues.price}
            onChange={(value) =>
              setFilterValues({ ...filterValues, price: value })
            }
            options={[
              {
                label: "0 - 100",
                value: "0-100",
              },
              {
                label: "200 - 500",
                value: "200-500",
              },
              {
                label: "500 - 1000",
                value: "500-1000",
              },
              {
                label: "1000 above",
                value: "1000-99999",
              },
            ]}
            style={{ width: "100%", height: 40 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TestSetup;
