import React, { useEffect, useState } from "react";
import { Button, message, Modal, Pagination, Select, Table } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdDeleteForever, MdEdit, MdOutlineReplay } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const Vendor: React.FC = () => {
  const [applied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await getVendor();
  };

  const appointmentColumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Vendor Id",
      dataIndex: "vendorId",
      key: "vendorId",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Action",
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          <Link to={`/laboratory/vendor/edit-vendor?id=${record._id}`}>
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

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [vendorData, setVendorData] = useState<any>([]);

  const [filterValues, setFilterValues] = useState({
    name: "",
    id: "",
    location: "",
  });

  const getVendor = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/vendor/filter?limit=${pageSize}&page=${currentPage}&vendorId=${filterValues.id}&vendorName=${filterValues.name}&location=${filterValues.location}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalPages(res.data.totalPages);

      let fdg = res.data.data.vendors.map((val: any, index: any) => ({
        vendorId: val.vendorId,
        vendorName: val.vendorName,
        location: val.location,
        _id: val._id,
        key: (currentPage - 1) * pageSize + index + 1,
      }));

      setVendorData(fdg);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [dropData, setDropData] = useState({
    name: [],
    location: [],
  });

  const vendorDrop = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/vendor/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dfs = res.data.data.data.map((val: any) => ({
        label: val.vendorName,
        value: val.vendorName,
      }));
      const dfg = res.data.data.data.map((val: any) => ({
        label: val.vendorLocation,
        value: val.vendorLocation,
      }));

      setDropData({
        name: dfs,
        location: dfg,
      });
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.delete(`${api_url}/api/vendor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getVendor();
      message.success("Deleted Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleReset = async () => {
    setFilterValues({
      name: "",
      id: "",
      location: "",
    });
    await getVendor();
  };

  useEffect(() => {
    getVendor();
  }, [currentPage]);

  useEffect(() => {
    vendorDrop();
  }, []);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Vendor List</p>

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
          <Link to="/laboratory/vendor/add-vendor">
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
        dataSource={vendorData}
        pagination={false}
      />

      {/* Pagination Component */}
      {vendorData.length > 0 && (
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
            id: "",
            location: "",
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
                  id: "",
                  location: "",
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
          <label className="mod-label mb-2">Vendor Name</label>
          <Select
            value={filterValues.name}
            onChange={(value) =>
              setFilterValues({ ...filterValues, name: value })
            }
            showSearch
            options={dropData.name}
            style={{ width: "100%" }}
          />

          <label className="mod-label mb-2">Vendor Location</label>
          <Select
          showSearch
            style={{ width: "100%" }}
            options={dropData.location}
            value={filterValues.location}
            onChange={(value) =>
              setFilterValues({ ...filterValues, location: value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default Vendor;
