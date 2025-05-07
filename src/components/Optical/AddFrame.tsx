import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, Input, InputNumber, message, Select } from "antd";
import axios from "axios";
import { api_url } from "../../Config";

const AddFrame: React.FC = () => {
  const [data, setData] = useState({
    vendorName: "",
    productName: "",
    type: "Frame",
    brand: "",
    salesTax1: 0,
    salesTax2: 0,
    hsnCode: "",
    amount: 0,
    cost: 0,
    barcode: "",
    stocks: 0,
    productType: "",
    productMaterial: "",
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
      await getProductTypeName();
    } catch (error: any) {
      console.log(error);
    }
  };

  const [productTypeDrp, setProductTypeDrp] = useState<any[]>([]);

  const getProductTypeName = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-product?fields=productType&type=Frame`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data.opticalproduct, "res");
      let df = res?.data?.data?.opticalproduct || [];
      const uniqueProductTypes = Array.from(
        new Set(df.map((val: any) => val.productType))
      );

      const gg = uniqueProductTypes.map((type) => ({
        label: type,
        value: type,
      }));

      setProductTypeDrp(gg);
    } catch (error: any) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      if (!data.vendorName || !data.productName) {
        message.error("Product name and vendor name required!");
        return;
      }
      await axios.post(`${api_url}/api/optical-product`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Added Successfully!");
      navigate("/optical/product");
      setData({
        vendorName: "",
        productName: "",
        type: "Frame",
        brand: "",
        salesTax1: 0,
        salesTax2: 0,
        hsnCode: "",
        amount: 0,
        cost: 0,
        barcode: "",
        stocks: 0,
        productType: "",
        productMaterial: "",
      });
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
        localStorage.clear();
        message.error("Login required!");
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
      console.log(res.data.data.opticalproduct, "resd");
      setData(res?.data?.data?.opticalproduct);
    } catch (error: any) {
      console.log(error);
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
        message.error("Product name and vendor name required!");
        return;
      }
      await axios.patch(`${api_url}/api/optical-product/getById/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Updated Successfully!");
      navigate("/optical/product");
      setData({
        vendorName: "",
        productName: "",
        type: "Frame",
        brand: "",
        salesTax1: 0,
        salesTax2: 0,
        hsnCode: "",
        amount: 0,
        cost: 0,
        barcode: "",
        stocks: 0,
        productType: "",
        productMaterial: "",
      });
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
              {id ? "Edit" : "Add New"} Product ( Frame )
            </p>
            <div className="row">
              <div className="col-lg-6">
                <label className="mb-2 label-style">
                  Product Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.productName}
                  onChange={(e) =>
                    setData({ ...data, productName: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Barcode</label>
                <Input
                  style={{ height: 40 }}
                  value={data.barcode}
                  onChange={(e) =>
                    setData({ ...data, barcode: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Brand</label>
                <Input
                  style={{ height: 40 }}
                  value={data.brand}
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
                <label className="mb-2 label-style">Product Type</label>
                <Select
                  onChange={(value) =>
                    setData({ ...data, productType: value[0] })
                  }
                  maxCount={1}
                  mode="tags"
                  value={data.productType ? [data.productType] : []}
                  style={{ height: 40, width: "100%" }}
                  options={productTypeDrp}
                />
                <label className="mb-2 label-style">Product Material</label>
                <Input
                  style={{ height: 40 }}
                  value={data.productMaterial}
                  onChange={(e) =>
                    setData({ ...data, productMaterial: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Available Stocks</label>
                <InputNumber
                  type="number"
                  min={1}
                  style={{ height: 40, width: "100%" }}
                  value={data.stocks || ""}
                  onChange={(value: any) => setData({ ...data, stocks: value })}
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
                      onChange={(value: any) =>
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
                      onChange={(value: any) =>
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
                <label className="mb-2 label-style">
                  Vendor name <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <Select
                  showSearch
                  style={{ height: 40, width: "100%" }}
                  value={data.vendorName}
                  onChange={(value) => setData({ ...data, vendorName: value })}
                  options={vendorDrp}
                />
                <br />
                <label className="mb-2 label-style">Amount</label>
                <br />
                <InputNumber
                  min={1}
                  type="number"
                  style={{ height: 40, width: "100%" }}
                  value={data.amount || ""}
                  onChange={(value: any) => setData({ ...data, amount: value })}
                />
                <label className="mb-2 label-style">Cost</label>
                <br />
                <InputNumber
                  min={1}
                  type="number"
                  style={{ height: 40, width: "100%" }}
                  value={data.cost || ""}
                  onChange={(value: any) => setData({ ...data, cost: value })}
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

export default AddFrame;
