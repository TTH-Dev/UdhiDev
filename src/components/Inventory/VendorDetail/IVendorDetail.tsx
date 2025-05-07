import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Pagination, Select, Table } from "antd";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "../../../Config";
import axios from "axios";
import { GrPowerReset } from "react-icons/gr";

interface Vendor {
  id?: string;
  VendorName?: string;
  location?: string;

}

const { Option } = Select;

const IVendorDetail: React.FC = () => {
  const [originalData, setOriginalData] = useState([]);
  const [selectedtitle, setSelectedTitle] = useState("Vendor Name");
  const [selectedColumn, setSelectedColumn] = useState("vendorName");
  const [data, setData] = useState([]);
    const [isdelmodalopen, setIsDelModalOpen] = useState(false);
    const [deltext, setDelText] = useState<Vendor | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
  






  const navigate = useNavigate();

  const handledel = (record: any) => {
    setIsDelModalOpen(true);
    setDelText(record);
    console.log(record);
  };

 const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;



  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/pharmacy-vendor/filter?limit=${pageSize}&page=${currentPage}&${selectedColumn}=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const vendors =
        res.data?.data?.vendors?.map((vendor: any) => ({
          id: vendor._id,
          vendorName: vendor.vendorName,
          location: vendor.location,
        })) || [];

      setData(vendors);
      setOriginalData(vendors);
      setTotalPages(res.data.totalPages)
    } catch (error:any) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
      return
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handledelconfirm = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

     await axios.delete(`${api_url}/api/pharmacy-vendor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

   
    } catch (error:any) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
      return
    }
  };
  const columns = [
    {
      title: <span style={{ fontWeight: "400" }}>S.No</span>,
      dataIndex: "index",
      key: "index",
      render: (_text: any, _record: any, index: any) => (
        <>{(currentPage - 1) * pageSize + index + 1}</>
      ),
    },
    {
      title: <span style={{ fontWeight: "400" }}>Vendor Id</span>,
      dataIndex: "id",
      key: "id",
      render: (text: string) => <>{text.slice(-5)}</>,
    },
    {
      title: <span style={{ fontWeight: "400" }}>Vendor Name</span>,
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: <span style={{ fontWeight: "400" }}>Location</span>,
      dataIndex: "location",
      key: "location",
    },
    {
      title: <span style={{ fontWeight: "400" }}>Action</span>,
      key: "Action",
      width: 130,
      render: (_: any, record: any) => (
        <>
          <Button
            className="p-0 ms-1"
            style={{
              border: "none",
              width: "30px",
              height: "30px",
              color: "#fff",
              backgroundColor: "#3497F9",
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/inventory/vendor-detail/edit-vendor?id=${record.id}`);
            }}
          >
            <MdEdit style={{ fontSize: "18px" }} />
          </Button>

          <Button
            className="p-0 ms-1"
            style={{
              border: "none",
              width: "30px",
              height: "30px",
              color: "#fff",
              backgroundColor: "#3497F9",
            }}
            onClick={(e) => {
              e.stopPropagation();

              handledel(record);
            }}
          >
            <MdDeleteForever style={{ fontSize: "18px" }} />
          </Button>
        </>
      ),
    },
  ];

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "index":
        setSelectedTitle("S.No");
        break;
      case "id":
        setSelectedTitle("Vendor Id");
        break;
      case "vendorName":
        setSelectedTitle("Vendor Name");
        break;
      case "location":
        setSelectedTitle("Location");
        break;

      default:
        setSelectedTitle(value);
    }
    setSelectedColumn(value);
  };


  useEffect(() => {
    fetchData();
  }, [searchTerm]);
  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3 ">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Vendor List</p>
        <div className="d-flex">
          <span className="pt-2 emr-label">Search By</span>
          <div>
            <Select
              style={{ width: "150px", height: "40px" }}
              className="mx-3"
              placeholder="Vendor Name"
              value={selectedColumn}
              onChange={handleSelectChange}
            >
              {columns
                .filter((col) => col.key !== "index" && col.key !== "Action"&&col.key!=="id")
                .map((col) => (
                  <Option key={col.key} value={col.key}>
                    {col.title}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="mx-3">
            <Input style={{ height: "40px" }}  placeholder={`Enter ${selectedtitle}`}    value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                 
                }}/>
          </div>
          <div className=" me-3">
             <Button
                      className="me-3"
                      style={{ height: 38, color: "white", backgroundColor: "#3497F9" }}
                      onClick={() => {
                        setSearchTerm("");
                        setData(originalData);
                      }}
                    >
                      <GrPowerReset style={{ color: "white" }} />
                    </Button>
          </div>
          <Link to="/inventory/vendor-detail/add-vendor">
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
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
         
            navigate(`/inventory/vendor-detail/view-vendor?id=${record.id}`)
          },
          style: { cursor: "pointer" },
        })}
      />

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
        title="Delete ?"
        onCancel={() => setIsDelModalOpen(false)}
        onClose={() => setIsDelModalOpen(false)}
        open={isdelmodalopen}
        footer={
          <div className="d-flex justify-content-between">
            <Button className="c-btn" onClick={() => setIsDelModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="s-btn"
              onClick={() => handledelconfirm(deltext?.id ?? "Unknown Product")}
            >
              Delete
            </Button>
          </div>
        }
      >
        <>{deltext?.VendorName}</>
      </Modal>
    </div>
  );
};

export default IVendorDetail;
