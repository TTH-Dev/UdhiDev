import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Container } from "react-bootstrap";
import { Button, DatePicker, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";

const IProductAdd = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [vendors, setVendors] = useState<{ id: string; VendorName: string }[]>(
    []
  );

  const [formData, setFormData] = useState({
    vendorId: "",
    name: "",
    stripMRP: 0,
    MRP: 0,
    productInStrip: 0,
    genericName: "",
    rackNo: "",
    itemCode: "",
    hsnCode: "",
    salesTax1: 0,
    salesTax2: 0,
    salesTax3: 0,
    salesTax4: 0,
    salesReturnAccount: "",
    barcode: "",
    stripeRate: 0,
    rate: 0,
    sellingPriceDis: "",
    vendorName: "",
    displayType: "",
    salesAccount: "",
    purchaseAccount: "",
    purchaseTax1: 0,
    purchaseTax2: 0,
    purchaseTax3: 0,
    purchaseTax4: 0,
    purchaseReturnAccount: "",
    medicineType: "",
    orderQuantity: 0,
    minimumStock: 0,
    maximumStock: 0,
    packingType: "",
    expiryDate: "",
    note: "",
  });

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.patch(
        `${api_url}/api/pharmacy-product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(formData);
      if (res.status === 201 || res.status === 200) {
        message.success("Product added successfully!");
        navigate(-1);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add product. Please try again.");
    }
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.post(
        `${api_url}/api/pharmacy-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201 || res.status === 200) {
        message.success("Product added successfully!");
        navigate(-1);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add product. Please try again.");
      return;
    }
  };

  const handleChange = (e: any, name?: string) => {
    if (typeof e === "number" || e === null) {
      setFormData((prevData) => ({
        ...prevData,
        [name!]: e?.toString() || "",
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRetrieve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/pharmacy-product/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setFormData(res.data.data.product);
        console.log(res.data.data.product);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add product. Please try again.");
      return;
    }
  };
  const handleGetAllVendor = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/pharmacy-vendor`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const vendors = res.data?.data?.vendors?.map((vendor: any) => ({
        id: vendor._id,
        VendorName: vendor.vendorName,
      }));

      setVendors(vendors);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add product. Please try again.");
      return;
    }
  };

  useEffect(() => {
    if (id) {
      handleRetrieve();
    }
    handleGetAllVendor();
  }, [id]);
  return (
    <div className="cont pt-5 my-5 px-4">
      <form onSubmit={handleSubmit}>
        <Container fluid className="emr-doc-box py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
              <i className="fi fi-br-angle-left px-1"></i>
              <span className="emr-search-text mb-0 ">
                {" "}
                {id ? "Edit" : "Add New"} Product
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Name
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Strip MRP
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="stripMRP"
                    value={formData.stripMRP || ""}
                    onChange={(value) => handleChange(value, "stripMRP")}
                    type="number"
                    min={0}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  MRP
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="MRP"
                    value={formData.MRP || ""}
                    onChange={(value) => handleChange(value, "MRP")}
                    type="number"
                    min={0}

                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Product In Strip
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="productInStrip"
                    value={formData.productInStrip || ""}
                    onChange={(value) => handleChange(value, "productInStrip")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Generic Name
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="genericName"
                    value={formData.genericName}
                    onChange={handleChange}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Rack No
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="rackNo"
                    value={formData.rackNo}
                    onChange={handleChange}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Item Code
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleChange}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  HSN Code
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="hsnCode"
                    value={formData.hsnCode}
                    onChange={handleChange}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Sales Tax 1
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="salesTax1"
                    value={formData.salesTax1 || ""}
                    onChange={(value) => handleChange(value, "salesTax1")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Sales Tax 2
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="salesTax2"
                    value={formData.salesTax2 || ""}
                    onChange={(value) => handleChange(value, "salesTax2")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Sales Tax 3
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="salesTax3"
                    value={formData.salesTax3 || ""}
                    onChange={(value) => handleChange(value, "salesTax3")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Sales Tax 4
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="salesTax4"
                    value={formData.salesTax4 || ""}
                    onChange={(value) => handleChange(value, "salesTax4")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Sales Return Account
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="salesReturnAccount"
                    value={formData.salesReturnAccount}
                    onChange={handleChange}
                    style={{ width: "150px", height: 35 }}
                  />
                </TableCell>
              </TableRow>
            </div>

            <div className="col-lg-4 col-md-4">
              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Barcode
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Stripe Rate
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="stripeRate"
                    value={formData.stripeRate || ""}
                    onChange={(value) => handleChange(value, "stripeRate")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Rate
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="rate"
                    value={formData.rate || ""}
                    onChange={(value) => handleChange(value, "rate")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Selling Price Dis
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="sellingPriceDis"
                    value={formData.sellingPriceDis}
                    onChange={(value) => handleChange(value, "sellingPriceDis")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Vendor Name
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Select
                    style={{ width: "100%" }}
                    labelInValue
                    value={{
                      value: formData.vendorId,
                      label: formData.vendorName,
                    }}
                    onChange={(selected) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        vendorId: selected.value,
                        vendorName: selected.label,
                      }));
                    }}
                  >
                    {vendors.map((vendor) => (
                      <Select.Option key={vendor.id} value={vendor.id}>
                        {vendor.VendorName}
                      </Select.Option>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Display Type
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="displayType"
                    value={formData.displayType}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Sales Account
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="salesAccount"
                    value={formData.salesAccount}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Purchase Account
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="purchaseAccount"
                    value={formData.purchaseAccount}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Purchase Tax 1
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="purchaseTax1"
                    value={formData.purchaseTax1 || ""}
                    onChange={(value) => handleChange(value, "purchaseTax1")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Purchase Tax 2
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="purchaseTax2"
                    value={formData.purchaseTax2 || ""}
                    onChange={(value) => handleChange(value, "purchaseTax2")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Purchase Tax 3
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="purchaseTax3"
                    value={formData.purchaseTax3 || ""}
                    onChange={(value) => handleChange(value, "purchaseTax3")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Purchase Tax 4
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="purchaseTax4"
                    value={formData.purchaseTax4 || ""}
                    onChange={(value) => handleChange(value, "purchaseTax4")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Purchase Return Account
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="purchaseReturnAccount"
                    value={formData.purchaseReturnAccount}
                    onChange={handleChange}
                    style={{ width: "150px", height: 35 }}
                  />
                </TableCell>
              </TableRow>
            </div>

            <div className="col-lg-4 col-md-4">
              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Medicine Type
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="medicineType"
                    value={formData.medicineType}
                    onChange={handleChange}
                    style={{ width: "150px", height: 35 }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Order Quantity
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="orderQuantity"
                    value={formData.orderQuantity || ""}
                    onChange={(value) => handleChange(value, "orderQuantity")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Minimum Stock
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="minimumStock"
                    value={formData.minimumStock || ""}
                    onChange={(value) => handleChange(value, "minimumStock")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Maximum Stock
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <InputNumber
                    name="maximumStock"
                    value={formData.maximumStock || ""}
                    onChange={(value) => handleChange(value, "maximumStock")}
                    type="number"
                    style={{ height: 35, width: "150px" }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Package Type
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Input
                    name="packingType"
                    value={formData.packingType}
                    onChange={handleChange}
                    style={{ width: "150px", height: 35 }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Expiry Date
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <DatePicker
                    name="expiryDate"
                    value={
                      formData.expiryDate ? moment(formData.expiryDate) : null
                    }
                    onChange={(_, dateString) =>
                      setFormData({
                        ...formData,
                        expiryDate: dateString as string,
                      })
                    }
                    style={{ width: "150px", height: 35 }}
                    format="DD-MM-YYYY"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "none", width: "200px" }}>
                  Note
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <TextArea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    style={{ width: "150px" }}
                  />
                </TableCell>
              </TableRow>
            </div>
          </div>
        </Container>
      </form>
      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="s-btn" onClick={id ? handleUpdate : handleSubmit}>
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default IProductAdd;
