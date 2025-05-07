import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { TableCell, TableRow } from "@mui/material";
import { Button, message, Pagination, Table } from "antd";
import axios from "axios";
import { api_url } from "../../Config";

const VendorProduct: React.FC = () => {
 

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [vendorData, setVendorData] = useState<any>({
    accountNumber: "",
    address: "",
    city: "",
    contactPersonName: "",
    emailId: "",
    phoneNo: "",
    pincode: 0,
    vendorName: "",
    vendorType: "",
    _id: "",
  });

  const [vendorProducts,setVendorProducts]=useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render:(_text:any,_record:any,index:any)=>{
        return(
            <>{(currentPage-1)*pageSize+index+1}</>
        )
      }
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },

    {
      title: "MRP",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Available Status",
      dataIndex: "availlableStocksStatus",
      key: "availlableStocksStatus",
    },
    {
      title: "Qnt",
      dataIndex: "stocks",
      key: "stocks",
    },
    {
      title: "Action",
      key: "Action",
      render: (_: any, record: any) => (
        <>
          <Link to={`/optical/product/edit-product-${vendorData.vendorType==="Frame"?"frame":"lens"}&id=${record._id}`}>
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
          onClick={()=>handleProductDelete(record._id)}
            className="p-0 ms-1"
            style={{
              border: "none",
              width: "30px",
              height: "30px",
              color: "#fff",
              backgroundColor: "#3497F9",
            }}
          >
            <MdDeleteForever style={{ fontSize: "18px" }} />
          </Button>
        </>
      ),
    },
  ];

  const handleProductDelete=async(ids:any)=>{
    try{
        const token=localStorage.getItem("authToken")
        if(!token){
            localStorage.clear()
            message.error("Login required!")
            return
        }

        await axios.delete(`${api_url}/api/optical-product/getById/${ids}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        message.success("Deleted successfully!")
        await getVendor(id)

    }catch(error:any){
        console.log(error);
        message.error("Something went wrong!")
    }
  }

  const getVendor = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/optical-vendor/getById/${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVendorData(res.data.data.opticalVendor);
      await getVendorProducts(res?.data?.data?.opticalVendor?.vendorName);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  
  const getVendorProducts = async (name: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      const res = await axios.get(
        `${api_url}/api/optical-product?vendorName=${name}&page=${currentPage}&limit=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.data.opticalproduct, "resres");
      setTotalPages(res?.data?.totalPages)
      setVendorProducts(res?.data?.data?.opticalproduct)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getVendor(id);
    }
  }, [id]);

  return (
    <>
      <div className="cont">
        <div className="mt-5 pt-5 ms-4 mb-0">
          <p className="back pb-2" style={{ color: "#414141" }}>
            <Link
              to="/optical/vendor"
              style={{ textDecoration: "none", color: "#414141" }}
            >
              <i
                className="fi fi-br-angle-left"
                style={{ cursor: "pointer" }}
              ></i>
              <span
                style={{
                  zIndex: "999",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "0",
                  color: "#414141",
                  cursor: "pointer",
                }}
                className="ms-2 "
              >
                Back
              </span>
            </Link>
          </p>
        </div>
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "60px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-4">
            <div className="d-flex justify-content-between align-items-center">
              <p className="emr-search-text mb-3">Vendor Detail</p>
              <Link
                to={`/optical/vendor/edit-vendor-${
                  vendorData?.vendorType === "Frame" ? "frame" : "lens"
                }?id=${vendorData?._id}`}
              >
                <MdEdit
                  style={{
                    fontSize: "20px",
                    color: "#3497F9",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div>
                  <TableRow>
                    <TableCell className="px-0" style={{ border: "none" }}>
                      Vendor Name
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.vendorName || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-0" style={{ border: "none" }}>
                      Contact person name{" "}
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.contactPersonName || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-0" style={{ border: "none" }}>
                      Phone No
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.phoneNo || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-0" style={{ border: "none" }}>
                      Email
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.emailId || "-"}
                    </TableCell>
                  </TableRow>
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Address</TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.address || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>City</TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.city || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Pin code</TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.pincode || "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Account No</TableCell>
                    <TableCell style={{ border: "none" }}>
                      : {vendorData?.accountNumber || "-"}
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="emr-complaints-box rounded py-4 px-3 mb-4 ms-4">
          <p className="emr-search-text mb-0">Product List</p>
          <div className=" my-3">
            <Table
              style={{ backgroundColor: "white" }}
              columns={columns}
              dataSource={vendorProducts}
              scroll={{ x: "max-content" }}
              pagination={false}
            />
              {/* Pagination Component */}
      {vendorProducts.length > 0 && (
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
        </div>
      </div>
    </>
  );
};

export default VendorProduct;
