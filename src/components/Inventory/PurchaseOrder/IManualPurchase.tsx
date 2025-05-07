import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, InputNumber, message, Select } from "antd";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { api_url } from "../../../Config";

const IManualPurchase = () => {
  const [data, setData] = useState({
    products: [
      {
        vendor: "",
        vendorId: "",
        productName: "",
        productId:"",
        unit: "",
        quantity: 0,
        rate: 0,
        mrp: 0,
        taxAmt: 0,
      },
    ],
    subTotal: 0,
    taxAmt: 0,
    total: 0,
  });

  const [dropData, setDropData] = useState({
    name: [],
    productName: [],
    id: [],
  });

  const [productName, setPraductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [vendorName, setVendorName] = useState("");
  const [allProduct, setAllProduct] = useState<any>([]);
  const [productDetail, setProductDetail] = useState<any>();

  const vendorDrop = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/pharmacy-vendor/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dfs = res?.data?.data?.vendor.map((val: any) => ({
        label: val,
        value: val,
      }));

      setDropData((prev) => ({
        ...prev,
        name: dfs,
      }));
    } catch (error: any) {
      console.log(error, "sdasf");
      message.error("Something went wrong!");
    }
  };

  const getproductDrop = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/pharmacy-product/filter?vendorName=${vendorName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllProduct(res.data.data.products);

      let dsl = res.data.data.products.map((val: any) => ({
        label: val.name,
        value: val.name,
      }));
      setDropData((prev) => ({
        ...prev,
        productName: dsl,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    if (!productDetail) {
      message.error("Please select a product first!");
      return;
    }

    const newProduct = {
      vendor: vendorName,
      vendorId: productDetail.vendorId || "",
      productId:productDetail._id,
      productName: productDetail.name,
      unit: productDetail.units,
      quantity: quantity,
      rate: productDetail.rate,
      mrp: productDetail.MRP,
      taxAmt: productDetail.purchaseTax1,
    };

    let updatedProducts = [...data.products, newProduct];

    // Remove the first empty object if it exists
    if (updatedProducts.length > 1 && !updatedProducts[0].productName) {
      updatedProducts = updatedProducts.slice(1);
    }

    // Calculate updated totals
    const updatedSubTotal = updatedProducts.reduce(
      (acc, item) => acc + item.mrp * item.quantity,
      0
    );
    const updatedTaxAmt = updatedProducts.reduce(
      (acc, item) => acc + Number(item.taxAmt || 0),
      0
    );
    const updatedTotal = updatedSubTotal + updatedTaxAmt;

    setData({
      ...data,
      products: updatedProducts,
      subTotal: updatedSubTotal,
      taxAmt: updatedTaxAmt,
      total: updatedTotal,
    });

    // Reset input fields after adding
    setPraductName("");
    setVendorName("");
    setQuantity(0);
    setProductDetail(null);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/pharmacy-purchase`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Added Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleDelete = (indexToDelete: number) => {
    const updatedProducts = data.products.filter(
      (_val: any, index: number) => index !== indexToDelete
    );

    // Recalculate totals after deleting the product
    const updatedSubTotal = updatedProducts.reduce(
      (acc, item) => acc + item.mrp * item.quantity,
      0
    );
    const updatedTaxAmt = updatedProducts.reduce(
      (acc, item) => acc + Number(item.taxAmt || 0),
      0
    );
    const updatedTotal = updatedSubTotal + updatedTaxAmt;

    setData({
      ...data,
      products: updatedProducts,
      subTotal: updatedSubTotal,
      taxAmt: updatedTaxAmt,
      total: updatedTotal,
    });
  };

  useEffect(() => {
    vendorDrop();
  }, []);

  useEffect(() => {
    if (vendorName) {
      getproductDrop();
    }
  }, [vendorName]);

  useEffect(() => {
    const ls = allProduct.filter((val: any) => val.name === productName);
    if (ls.length > 0) {
      // setUnit(ls[0].units);
      setProductDetail(ls[0]);
    }
  }, [productName]);

  console.log(data.products[0], "data");

  return (
    <>
      <div
        className="act-cont-c  ms-4"
        style={{ marginBottom: "16px", color: "#595959" }}
      >
        <Container
          fluid
          className="emr-doc-box py-3"
          style={{
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            border: "1px solid rgb(219, 225, 227)",
            borderTop: "none",
          }}
        >
          <p className="emr-search-text">Filter</p>
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div>
                <label
                  className="pb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#595959",
                  }}
                >
                  Vendor
                </label>
                <br />
                <Select
                  value={vendorName}
                  onChange={(value) => setVendorName(value)}
                  style={{ width: "100%", height: 40 }}
                  showSearch
                  options={dropData.name}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div>
                <label
                  className="pb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#595959",
                  }}
                >
                  Products Name
                </label>
                <br />
                <Select
                  value={productName}
                  onChange={(value) => setPraductName(value)}
                  options={dropData.productName}
                  style={{ width: "100%", height: 40 }}
                  disabled={!vendorName ? true : false}
                />
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-2">
              <div>
                <label
                  className="pb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#595959",
                  }}
                >
                  Units
                </label>
                <br />
                <Input
                  style={{ width: "100%", height: 40 }}
                  value={unit}
                  disabled
                />
              </div>
            </div> */}
            <div className="col-lg-2 col-md-2">
              <div>
                <label
                  className="pb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#595959",
                  }}
                >
                  Quantity
                </label>
                <br />
                <InputNumber
                  value={quantity || ""}
                  onChange={(value: any) => setQuantity(value)}
                  type="number"
                  style={{ width: "100%", height: 40 }}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div>
                <label className="pb-2" style={{ visibility: "hidden" }}>
                  Quantity
                </label>
                <br />
                <Button
                  onClick={handleAdd}
                  className="p-0"
                  style={{
                    backgroundColor: "#3497F9",
                    height: 40,
                    width: 40,
                    color: "#fff",
                  }}
                >
                  <IoIosAddCircle style={{ fontSize: "20px" }} />
                </Button>
              </div>
            </div>
          </div>
          <p className="emr-search-text pt-3">Item Table</p>
          <div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.no</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Qyt</TableCell>
                    {/* <TableCell>Unit</TableCell> */}
                    <TableCell>Rate</TableCell>
                    <TableCell>MRP</TableCell>
                    <TableCell>Tax Amt</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.products[0] &&
                    data.products.map((val: any, index: any) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={index}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{val.productName || "-"}</TableCell>
                        <TableCell>{val.quantity || "-"}</TableCell>
                        {/* <TableCell>{val.unit || "-"}</TableCell> */}
                        <TableCell>{val.rate || "-"}</TableCell>
                        <TableCell>{val.mrp || "-"}</TableCell>
                        <TableCell>{val.taxAmt || "-"}</TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            onClick={() => handleDelete(index)}
                            className="p-0"
                            style={{
                              backgroundColor: "#3497F9",
                              height: 40,
                              width: 40,
                              color: "#fff",
                            }}
                          >
                            <TiDelete style={{ fontSize: "20px" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="row">
            <div className="col-lg-7"></div>
            <div className="col-lg-3">
              <div>
                <TableRow>
                  <TableCell
                    className="py-1"
                    style={{ width: "200px", border: "none" }}
                  >
                    Sub Total
                  </TableCell>
                  <TableCell className="py-1" style={{ border: "none" }}>
                    {data.subTotal || 0}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-1" style={{ border: "none" }}>
                    Tax Amt
                  </TableCell>
                  <TableCell className="py-1" style={{ border: "none" }}>
                    {data.taxAmt || 0}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-1" style={{ border: "none" }}>
                    Total
                  </TableCell>
                  <TableCell className="py-1" style={{ border: "none" }}>
                    {data.total || 0}
                  </TableCell>
                </TableRow>
              </div>
            </div>
          </div>
        </Container>
        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          <Button className="s-btn" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default IManualPurchase;