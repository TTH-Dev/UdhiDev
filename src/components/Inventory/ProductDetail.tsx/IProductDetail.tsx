import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";
import dayjs from "dayjs";

interface Product {
  id?: string;
  productName?: string;
  medicineType?: string;
  vendorName?: string;
  mrp?: number;
  stock?: number;
  expDate?: string;
}

const { Option } = Select;

const IProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedtitle, setSelectedTitle] = useState("Product Name");
  const [selectedColumn, setSelectedColumn] = useState("name");
  const [isExpDateSelected, setIsExpDateSelected] = useState(false);
  const [data, setData] = useState([]);
  const [isdelmodalopen, setIsDelModalOpen] = useState(false);
  const [deltext, setDelText] = useState<Product | null>(null);
  const [originalData, setOriginalData] = useState([]);


  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      width: 80,
      render: (_: any, _record: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
      width: 120,
      render: (id: string) => <>{id.slice(-5)}</>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Medicine Type",
      dataIndex: "medicineType",
      key: "medicineType",
      width: 150,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
      width: 180,
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
      width: 120,

      render: (record: any) => <>{`₹ ${record}`}</>,
    },
    { title: "Stock Avl", dataIndex: "stock", key: "stock", width: 130 },
    { title: "Exp Date", dataIndex: "expDate", key: "expDate", width: 150 },
    {
      title: "Action",
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
            onClick={() =>
              navigate(`/inventory/product-detail/edit-product?id=${record.productId}`)
            }
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
    setIsExpDateSelected(value === "expDate");
    switch (value) {
      case "index":
        setSelectedTitle("S.No");
        break;
      case "productId":
        setSelectedTitle("Product Id");
        break;
      case "name":
        setSelectedTitle("Product Name");
        break;
      case "medicineType":
        setSelectedTitle("Medicine Type");
        break;
      case "vendorName":
        setSelectedTitle("Vendor Name");
        break;
      case "mrp":
        setSelectedTitle("MRP");
        break;
      case "stock":
        setSelectedTitle("Stock Available");
        break;
      case "expDate":
        setSelectedTitle("Expiry Date");
        break;
      case "Action":
        setSelectedTitle("Action");
        break;
      default:
        setSelectedTitle(value);
    }
    setSelectedColumn(value);
  };

  const handledelconfirm = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.delete(`${api_url}/api/pharmacy-product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 204) {
        message.success("Deleted Successfully");
        await fetchData();
        setIsDelModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
    }
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [date,setDate]=useState<any>()

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      
      let formatDate=date?moment(date).format("YYYY-DD-MM"):""

      const res = await axios.get(`${api_url}/api/pharmacy-product/filter?limit=${pageSize}&page=${currentPage}&expiryDate=${formatDate}&${selectedColumn}=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const products =
        res.data?.data?.products?.map((product: any) => ({
          productId: product._id,
          name: product.name,
          medicineType: product.medicineType,
          vendorName: product.vendorName,
          mrp: product.MRP,
          stock: product.stock,
          expDate: product.expiryDate
            ? moment(product.expiryDate).format("DD-MM-YYYY")
            : "NO Date",
        })) || [];

      setData(products);
      setOriginalData(products);

      setTotalPages(res.data.totalPages)
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handledel = (record: any) => {
    setIsDelModalOpen(true);
    setDelText(record);
  };
 



  useEffect(() => {
    fetchData();
  }, [searchTerm,date]);

  return (
    <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0">Product Details</p>
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
              .filter((col) => col.key !== "index" && col.key !== "Action"&&col.key!=="stock"&&col.key!=="mrp"&&col.key!=="productId")
              .map((col) => (
                <Option key={col.key} value={col.key}>
                  {col.title}
                </Option>
              ))}
          </Select>
          <div className="mx-3">
            {isExpDateSelected ? (
              <DatePicker
                style={{ height: "40px", width: "200px" }}
                placeholder="Select Date"
                onChange={(date:any,_datestring:any) => {
                  setDate(date)
                }}
                value={date ? dayjs(date, "DD-MM-YYYY") : null}
                format="DD-MM-YYYY"
              />
            ) : (
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                style={{ height: "40px", width: "200px" }}
                placeholder={`Enter ${selectedtitle}`}
              />
            )}
          </div>
          <Button
            className="me-3"
            style={{ height: 38, color: "white", backgroundColor: "#3497F9" }}
            onClick={() => {
              setSearchTerm("");
              setDate("")
              setData(originalData);
              fetchData()
            }}
          >
            <GrPowerReset style={{ color: "white" }} />
          </Button>
          <Link to="/inventory/product-detail/add-product">
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
        <>{deltext?.productName}</>
      </Modal>
    </div>
  );
};

export default IProductDetail;
