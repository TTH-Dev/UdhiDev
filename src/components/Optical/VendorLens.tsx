import React, { useEffect, useState } from "react";
import { Button, Input, message, Pagination, Select, Table } from "antd";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { api_url } from "../../Config";

const { Option } = Select;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const VendorLens: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedtitle, setSelectedTitle] = useState("vendorName");
  const [selectedColumn, setSelectedColumn] = useState("vendorName");

  const handleSelectChange = (value: string) => {
    setSelectedTitle(value);
    setSelectedColumn(value);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      width: 80,
      render: (_text: any, _record: any, index: any) => {
        return <>{(currentPage - 1) * pageSize + index + 1}</>;
      },
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
      width: 120,
    },
    {
      title: "Ph Number",
      dataIndex: "phoneNo",
      key: "phoneNo",
      width: 120,
    },
    {
      title: "Contact Person Name",
      dataIndex: "contactPersonName",
      key: "contactPersonName",
      width: 180,
    },
    {
      title: "No .of Products",
      dataIndex: "numProducts",
      key: "numProducts",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 150,
      render: (_text: any, record: any) => {
        return (
          <>
            <span>
              {record?.address + "," + record?.city + "," + record?.pincode}
            </span>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          <Link to={`/optical/vendor/vendor-details?id=${record._id}`}>
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
            onClick={() => handleDeleteVendor(record._id)}
          >
            <MdDeleteForever style={{ fontSize: "18px" }} />
          </Button>
        </>
      ),
    },
  ];

  const [isAddnew, setIsAddnew] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsAddnew("");
  };
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getVendor = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-vendor?vendorType=Lens&${selectedColumn}=${searchTerm}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalPages(res.data.totalPages);
      setData(res.data.data.opticalVendor);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleDeleteVendor = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }
      await axios.delete(`${api_url}/api/optical-vendor/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Vendor deleted successfully!");
      await getVendor();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected File:", file);
    }
  };

  const handleImportData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
  
      if (!selectedFile) {
        message.error("Please select a file!");
        return;
      }
  
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ];
  
      if (!allowedTypes.includes(selectedFile.type)) {
        message.error("Only Excel files (.xls, .xlsx) are allowed!");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      await axios.post(`${api_url}/api/optical-vendor/import-data`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });
  
      message.success("Imported successfully!");
      await getVendor();
      handleClose();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  

  const handleReset = async () => {
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedColumn("vendorName");
    setSelectedTitle("vendorName");
    await getVendor();
  };

  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
    getVendor();
  }, [searchTerm,currentPage]);

  useEffect(() => {
    if (isAddnew === "addnew") {
      navigate("/optical/vendor/add-vendor-lens");
    } else if (isAddnew === "importdata") {
      handleOpen();
    }
  }, [isAddnew]);

  return (
    <div className="emr-complaints-box rounded p-4 ms-4">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Vendor List</p>
        <div className="d-flex">
          <span className="pt-2 emr-label">Search By</span>
          <Select
            style={{ width: "150px", height: "40px" }}
            className="mx-3"
            placeholder="Product Name"
            value={selectedColumn}
            onChange={handleSelectChange}
          >
            {columns
              .filter(
                (col) =>
                  col.key !== "index" &&
                  col.key !== "Action" &&
                  col.key !== "numProducts"
              )
              .map((col) => (
                <Option key={col.key} value={col.key}>
                  {col.title}
                </Option>
              ))}
          </Select>
          <div className="mx-3">
            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              style={{ height: "40px", width: "200px" }}
              placeholder={`Enter ${selectedtitle}`}
            />
          </div>
          <Button
            className="me-3"
            style={{ height: 38, color: "white", backgroundColor: "#3497F9" }}
            onClick={handleReset}
          >
            <GrPowerReset style={{ color: "white" }} />
          </Button>
          <Select
            value={isAddnew}
            className="custom-select-bg"
            onChange={(value) => setIsAddnew(value)}
            style={{ width: "140px", height: 40, color: "#fff" }}
            options={[
              {
                label: "Add New",
                value: "addnew",
              },
              {
                label: "Import Data",
                value: "importdata",
              },
            ]}
          />
        </div>
      </div>
      <Table
        style={{ backgroundColor: "white" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
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
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-between align-items-center pb-3">
            <h6>Import Excel Data</h6>
            <IoMdClose
              onClick={handleClose}
              style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
            />
          </div>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <div className="text-center pt-4">
            <Button className="s-btn" onClick={handleImportData}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VendorLens;
