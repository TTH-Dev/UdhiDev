import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Empty, InputNumber, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { api_url } from "../../Config";
import { RiResetRightFill } from "react-icons/ri";

const ManualPurchase = () => {
  const [vendorDrp, setVendorDrp] = useState<any>([]);
  const [productDrp, setProductDrp] = useState<any>([]);
  const [vendorName, setVendorName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState<any>(0);
  const [data, setData] = useState<any>([]);
  const [vendorId, setVendorId] = useState("");

  const handleGetVendors = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(`${api_url}/api/optical-vendor/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVendorDrp(res.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleGetVendorProduct = async (name: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-product/getByVendor?vendorName=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let df = res?.data?.data;
      setProductDrp(df);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-product/getById/${productName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let gh = res.data.data.opticalproduct;
      setData([...data, { ...gh, quantity }]);
      setProductName("");
      setQuantity(0);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getVendorDetails = async (venName: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-vendor?vendorName=${venName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data?.data?.opticalVendor[0]?._id) {
        setVendorId(res.data.data.opticalVendor[0]._id);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRemove = (index: any) => {
    let gg = data.filter((_val: any, i: any) => i !== index);
    setData(gg);
  };

  const handleReset = () => {
    setVendorName("");
    setProductName("");
    setQuantity(0);
    setData([]);
  };

  useEffect(() => {
    if (vendorName) {
      handleGetVendorProduct(vendorName);
      getVendorDetails(vendorName);
    }
    handleGetVendors();
  }, [vendorName]);

  const subtotal = data.reduce(
    (acc: any, item: any) => acc + (item.amount || 0) * item.quantity,
    0
  );

  const totalTaxAmount = data.reduce((acc: any, item: any) => {
    const totalItemValue = (item.amount || 0) * (item.quantity || 0);
    const tax = (totalItemValue * (item.salesTax1 || 0)) / 100;
    return acc + tax;
  }, 0);

  const total = subtotal + totalTaxAmount;

  const handleSave = async () => {
    try {
      let gf = data.map((val: any) => ({
        vendor: vendorName,
        vendorId: vendorId,
        productId: val._id,
        productName: val.productName,
        quantity: val.quantity,
        rate: val.cost,
        mrp: val.amount,
        taxAmt: ((val.amount * val.salesTax1) / 100) * val.quantity,
      }));
      let dg = {
        vendor: vendorName,
        vendorId: vendorId,
        products: gf,
        subTotal: subtotal,
        taxAmt: totalTaxAmount,
        total: total,
      };
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      await axios.post(`${api_url}/api/optical-purchase`, dg, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Saved successfully!");
      setData([]);
      setProductName("");
      setVendorName("");
      setVendorId("");
      setQuantity(0);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

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
          <p className="emr-search-text">Add Purchase</p>
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
                  disabled={vendorName ? true : false}
                  value={vendorName}
                  onChange={(value) => setVendorName(value)}
                  style={{ width: "100%", height: 40 }}
                  showSearch
                  options={vendorDrp}
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
                  onChange={(value) => setProductName(value)}
                  disabled={vendorName ? false : true}
                  options={productDrp}
                  style={{ width: "100%", height: 40 }}
                  showSearch
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
                  Quantity
                </label>
                <br />
                <InputNumber
                  value={quantity || ""}
                  min={1}
                  onChange={(value: any) => setQuantity(value)}
                  type="number"
                  style={{ width: "100%", height: 40 }}
                />
              </div>
            </div>
            <div className="col-lg-1 col-md-1">
              <div>
                <label className="pb-2" style={{ visibility: "hidden" }}>
                  Quantity
                </label>
                <br />
                <Button
                  className="p-0"
                  style={{
                    backgroundColor: "#3497F9",
                    height: 40,
                    width: 40,
                    color: "#fff",
                  }}
                  onClick={getProduct}
                >
                  <IoIosAddCircle style={{ fontSize: "20px" }} />
                </Button>
              </div>
            </div>
            <div className="col-lg-1 col-md-1">
              <div className="">
                <label className="pb-2" style={{ visibility: "hidden" }}>
                  Quantity
                </label>
                <br />
                <Button
                  className="p-0"
                  style={{
                    backgroundColor: "#3497F9",
                    height: 40,
                    width: 40,
                    color: "#fff",
                  }}
                  onClick={handleReset}
                >
                  <RiResetRightFill style={{ fontSize: "20px" }} />
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
                  {data.length > 0 &&
                    data.map((val: any, index: any) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={index}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{val?.productName || "-"}</TableCell>
                        <TableCell>{val?.quantity}</TableCell>
                        <TableCell>{val?.cost || 0}</TableCell>
                        <TableCell>{val?.amount || 0}</TableCell>
                        <TableCell>
                          {((val.amount * val.salesTax1) / 100) * val.quantity}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            className="p-0"
                            style={{
                              backgroundColor: "#3497F9",
                              height: 40,
                              width: 40,
                              color: "#fff",
                            }}
                            onClick={() => handleRemove(index)}
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
          {data.length > 0 ? (
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
                      {subtotal}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1" style={{ border: "none" }}>
                      Tax Amt
                    </TableCell>
                    <TableCell className="py-1" style={{ border: "none" }}>
                      {totalTaxAmount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1" style={{ border: "none" }}>
                      Total
                    </TableCell>
                    <TableCell className="py-1" style={{ border: "none" }}>
                      {total}
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Empty className="pt-3" />
            </>
          )}
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

export default ManualPurchase;
