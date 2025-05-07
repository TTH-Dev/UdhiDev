import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdDeleteForever, MdEdit, MdOutlineReplay } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const Products: React.FC = () => {
  const [applied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await handleGetProduct();
  };

  const appointmentColumns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (_text: any, _record: any, index: any) => (
        <>{(currentPage - 1) * pageSize + index + 1}</>
      ),
    },
    {
      title: "Product Id",
      dataIndex: "_id",
      key: "_id",
      render: (text: any) => <>{text.slice(-5)}</>,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturerName",
      key: "manufacturerName",
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Stock Status",
      dataIndex: "stockStatus",
      key: "stockStatus",
      render: (text: any) => <>{text ? "IN" : "OUT"}</>,
    },
    {
      title: "Action",
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          <Link to={`/laboratory/products/edit-product?id=${record._id}`}>
            <Button
              className="p-0 ms-1"
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

          <Button
            className="p-0 ms-1"
            style={{
              border: "none",
              width: "30px",
              height: "30px",
              color: "#fff",
              backgroundColor: "#3497F9",
            }}
            onClick={() => handleDelete(record._id)}
          >
            <MdDeleteForever style={{ fontSize: "18px" }} />
          </Button>
        </>
      ),
    },
  ];

  const [filterValues, setFilterValues] = useState({
    name: "",
    type: "",
    stockStatus: "",
  });

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [data, setData] = useState<any>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGetProduct = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(
        `${api_url}/api/product/filter?limit=${pageSize}&page=${currentPage}&productName=${
          filterValues.name
        }&productType=${filterValues.type}&stockstatus=${
          filterValues.stockStatus === "true"
            ? true
            : filterValues.stockStatus === "false"
            ? false
            : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalPages(res.data.totalPages);
      setData(res.data.data.products);
      await getDropDown();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [nameDrop, setNameDrop] = useState<any>([]);

  const getDropDown = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/product/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dfs = res.data.data.data.map((val: any) => ({
        label: val.productName,
        value: val.productName,
      }));
      setNameDrop(dfs);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.delete(`${api_url}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await handleGetProduct();

      message.success("Deleted successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleRest = async () => {
    setFilterValues({
      name: "",
      type: "",
      stockStatus: "",
    });
    await handleGetProduct();
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Product Details</p>

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
              onClick={handleRest}
            >
              <MdOutlineReplay />
            </Button>
          )}
          <Link to="/laboratory/products/add-product">
            <Button
              style={{
                backgroundColor: "#3497F9",
                height: 40,
                width: "140px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 500,
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
            type: "",
            stockStatus: "",
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
                  type: "",
                  stockStatus: "",
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
          <label className="mod-label mb-2">Product Name</label>
          <Select
            style={{ height: 40, width: "100%" }}
            value={filterValues.name}
            showSearch
            options={nameDrop}
            onChange={(value) =>
              setFilterValues({ ...filterValues, name: value })
            }
          />
          <label className="mod-label mb-2">Product Type</label>
          <Input
            style={{ width: "100%", height: 40 }}
            value={filterValues.type}
            onChange={(e) =>
              setFilterValues({ ...filterValues, type: e.target.value })
            }
          />
          <label className="mod-label mb-2">Stock Status</label>
          <Select
            style={{ width: "100%", height: 40 }}
            options={[
              {
                label: "IN",
                value: "true",
              },
              {
                label: "OUT",
                value: "false",
              },
            ]}
            value={filterValues.stockStatus}
            onChange={(value) =>
              setFilterValues({ ...filterValues, stockStatus: value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default Products;
