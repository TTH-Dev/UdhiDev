import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, Input, InputNumber, message, Select } from "antd";
import axios from "axios";
import { api_url } from "../../Config";

const AddLens: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({
    vendorName: "",
    productName: "",
    type: "Lens",
    brand: "",
    status: "",
    salesTax1: 0,
    salesTax2: 0,
    hsnCode: "",
    amount: 0,
    cost: 0,
    barcode: "",
    stocks: 0,
  });

  const [vendorDrp, setVendorDrp] = useState<any[]>([]);

  const getVendorName = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/optical-vendor/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVendorDrp(res?.data?.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      if (!data.vendorName || !data.productName) {
        message.error("Vender and Product name required!");
        return;
      }
      await axios.post(`${api_url}/api/optical-product`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Added successfully!");
      navigate("/optical/product");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const getProductById = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-product/getById/${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data?.opticalproduct);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      if (!data.vendorName || !data.productName) {
        message.error("Vender and Product name required!");
        return;
      }
      await axios.patch(`${api_url}/api/optical-product/getById/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Updated successfully!");
      navigate("/optical/product");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  useEffect(() => {
    getVendorName();
  }, []);
  return (
    <>
      <div className="cont">
        <div className="mt-5 pt-5 ms-4 mb-0">
          <p className="back pb-2" style={{ color: "#414141" }}>
            <Link
              to="/optical/product"
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
            <p className="emr-search-text mb-3">
              {id ? "Edit" : "Add New"} Product ( Lens )
            </p>
            <div className="row">
              <div className="col-lg-6">
                <label className="mb-2 label-style">
                  Vendor Name <span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  showSearch
                  style={{ height: 40, width: "100%" }}
                  value={data.vendorName}
                  options={vendorDrp}
                  onChange={(value: any) =>
                    setData({ ...data, vendorName: value })
                  }
                />
                <label className="mb-2 label-style">
                  Product Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  style={{ height: 40 }}
                  value={data.productName}
                  onChange={(e) =>
                    setData({ ...data, productName: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Brand</label>
                <Input
                  style={{ height: 40 }}
                  value={data.brand}
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
                <label className="mb-2 label-style">Status</label>
                <Select
                  options={[
                    {
                      label: "Active",
                      value: "Active",
                    },
                    {
                      label: "InActive",
                      value: "InActive",
                    },
                  ]}
                  style={{ height: 40, width: "100%" }}
                  value={data.status}
                  onChange={(value) => setData({ ...data, status: value })}
                />
              </div>
              <div className="col-lg-6">
                <div className="d-flex justify-content-between">
                  <div className="me-2">
                    <label className="mb-2 label-style">Sales Tax 1</label>
                    <InputNumber
                      min={1}
                      type="number"
                      style={{ height: 40, width: "100%" }}
                      value={data.salesTax1 || ""}
                      onChange={(value) =>
                        setData({ ...data, salesTax1: value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-2 label-style">Sales Tax 2</label>
                    <InputNumber
                      min={1}
                      type="number"
                      style={{ height: 40, width: "100%" }}
                      value={data.salesTax2 || ""}
                      onChange={(value) =>
                        setData({ ...data, salesTax2: value })
                      }
                    />
                  </div>
                </div>
                <label className="mb-2 label-style">HSN Code</label>
                <br />
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.hsnCode}
                  onChange={(e) =>
                    setData({ ...data, hsnCode: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Amount</label>
                <br />
                <InputNumber
                  min={1}
                  type="number"
                  style={{ height: 40, width: "100%" }}
                  value={data.amount || ""}
                  onChange={(value) => setData({ ...data, amount: value })}
                />
                <br />
                <label className="mb-2 label-style">Cost</label>
                <br />
                <InputNumber
                  min={1}
                  type="number"
                  style={{ height: 40, width: "100%" }}
                  value={data.cost || ""}
                  onChange={(value) => setData({ ...data, cost: value })}
                />
              </div>
            </div>
          </Container>
        </div>
        <div className="d-flex justify-content-end save-cancel-btn my-4">
          <Link to="/optical/product">
            <Button className="c-btn me-3">Cancel</Button>
          </Link>
          <Button className="s-btn" onClick={id ? handleUpdate : handleSave}>
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddLens;
