import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Avatar, Button, InputNumber, message, Select } from "antd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { api_url } from "../../Config";
import moment from "moment";

const OpticalPatientDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const date = searchParams.get("date");
  const [patientData, setPatientData] = useState<any>();
  const getPatient = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientData(res.data.data.patient);
      await getValues(ids);
    } catch (error: any) {
      console.log(error);
    }
  };

  const [values, setValues] = useState<any>();

  const getValues = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-values?patientId=${ids}&date=${moment(
          date
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data?.data?.opticalValues?.length > 0) {
        setValues(res.data.data.opticalValues[0]);
      }
      await getproductDrop();
    } catch (error: any) {
      console.log(error);
    }
  };

  const [productDrp, setProductDrp] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const getproductDrop = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      const res = await axios.get(`${api_url}/api/optical-product/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductDrp(res.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const [productDetails, setProductDetails] = useState<any>();
  const [discount, setDiscount] = useState<any>(0);

  const getProductByName = async (selectedProduct: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      const res = await axios.get(
        `${api_url}/api/optical-product?productName=${selectedProduct}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.data?.opticalproduct[0]) {
        setProductDetails(res?.data?.data?.opticalproduct[0]);
      }
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [fData, setFdata] = useState({
    pendingAmount: 0,
    amount: 0,
    mode: "",
    total: 0,
  });


  const navigate=useNavigate()

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      let ff = {
        billData: [
          {
            barCode: productDetails?.barcode,
            productName: selectedProduct,
            productId: productDetails?._id,
            quantity: 1,
            rate: productDetails?.amount,
            discount: discount,
            totalAmount: productDetails?.amount - discount,
          },
        ],
        subTotal: productDetails?.amount,
        discount: discount,
        total: productDetails?.amount - discount,
        mode: fData.mode,
        amount: fData.amount,
        pendingAmount: fData.pendingAmount,
        patientId: id,
      };

      await axios.post(`${api_url}/api/optical-billing`, ff, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
navigate("/optical/patient")
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };



  useEffect(() => {
    if (id) {
      getPatient(id);
    }
    if (selectedProduct) {
      getProductByName(selectedProduct);
    }
  }, [id,selectedProduct]);
  return (
    <>
      <div className="cont">
        <div className="mt-5 pt-5 ms-4 mb-0">
          <p className="back pb-2" style={{ color: "#414141" }}>
            <Link
              to="/optical/patient"
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
          <Container fluid className="emr-doc-box py-3">
            <Row className="justify-content-between">
              <Col xs={12} md={1}>
                <Avatar style={{ height: "75px", width: "75px" }}>
                  {patientData?.PatientName || "-"}
                </Avatar>
              </Col>

              <Col xs={12} md={2}>
                <p className="emr-doc-name mb-0">
                  {patientData?.PatientName || "-"}
                </p>
                <p className="emr-doc-id">{patientData?.UHIDId || "-"}</p>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">Consult Doctor</span>
                  <span className="emr-pat-text ">
                    : {patientData?.doctorId?.doctorName}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Date & Time</span>
                  <span className="emr-pat-text">
                    {" "}
                    :{" "}
                    {patientData?.visitDates?.length > 0 &&
                      moment(patientData?.visitDates.at(-1)).format(
                        "DD/MM/YYYY hh:mm:ss A"
                      )}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Patient Type</span>
                  <span className="emr-pat-text">
                    : {patientData?.patientType || "-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Reason</span>
                  <span className="emr-pat-text">
                    : {patientData?.outPatientId?.reason || "-"}
                  </span>
                </p>
              </Col>

              <Col xs={12} md={4} className="emr-dis-sec align-self-start ">
                <p>
                  <span className="emr-doc-text">Optometrist </span>
                  <span className="emr-pat-text">
                    : {patientData?.testedBy || "-"}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>

          <>
            <div style={{ background: "#fff" }} className="mt-3 rounded">
              <div className="px-3">
                <p className="emr-search-text pt-3">Instructions:</p>

                <TableRow>
                  <TableCell style={{ border: "none" }}></TableCell>
                  <TableCell style={{ border: "none" }}>
                    :{values?.mmt && "M.M.T,"}
                    {values?.wt && "W.T,"} {values?.ca && "C.A,"}{" "}
                    {values?.pge && "P.G.E,"} {values?.c39 && "C 39"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>Bifocal</TableCell>
                  <TableCell style={{ border: "none" }}>
                    :{values?.bifocal?.kryptok && "Kryptok,"}
                    {values?.bifocal?.executive && "Executive,"}
                    {values?.bifocal?.univisD && "Univis D"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>Progressive</TableCell>
                  <TableCell style={{ border: "none" }}>
                    : {values?.progressive || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>PG Condition</TableCell>
                  <TableCell style={{ border: "none" }}>
                    : {values?.pgCondition?.good && "Good,"}
                    {values?.pgCondition?.notGood && "Not Good"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    For Constant Use
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    : {values?.forConstantUse || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    For Reading Only
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    : {values?.forReadingOnly || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    Inter Pupillary Distance
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    : {values?.interPupillaryDistance || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    Tint to patient's Choice
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    : {values?.TintToPatientChoice || "-"}
                  </TableCell>
                </TableRow>
                <p className="emr-search-text pt-3">Values</p>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        ></TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          RE
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        ></TableCell>
                        <TableCell
                          className="py-0 "
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                            borderRight: "1px solid #CFCFCF",
                          }}
                        ></TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          LE
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        ></TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        ></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        ></TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          SPH
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          CYL
                        </TableCell>
                        <TableCell
                          className="py-0 "
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                            borderRight: "1px solid #CFCFCF",
                          }}
                        >
                          AXIS
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          SPH
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          CYL
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          AXIS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Dist.</TableCell>
                        <TableCell>
                          {values?.values?.re?.dist?.sph || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.re?.dist?.cyl || "-"}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #CFCFCF" }}>
                          {values?.values?.re?.dist?.axis || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.le?.dist?.sph || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.le?.dist?.cyl || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.le?.dist?.axis || "-"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Near.</TableCell>
                        <TableCell>
                          {values?.values?.re?.near?.sph || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.re?.near?.cyl || "-"}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #CFCFCF" }}>
                          {values?.values?.re?.near?.axis || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.le?.near?.sph || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.le?.near?.cyl || "-"}
                        </TableCell>
                        <TableCell>
                          {values?.values?.le?.near?.axis || "-"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="pb-3">
                  <p className="emr-search-text pt-3">Notes</p>
                  <span>With the low power</span>
                </div>
              </div>
            </div>
          </>

          <>
            <div style={{ background: "#fff" }} className="mt-3 rounded">
              <div className="px-3">
                <p className="emr-search-text pt-3">Billing Detail</p>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          S.No
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Barcode
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Product Name
                        </TableCell>
                        <TableCell
                          className="py-0 "
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Qyt
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Rate
                        </TableCell>
                        <TableCell
                          className="py-0"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Discount
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#595959",
                          }}
                        >
                          Total Amt
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>{productDetails?.barcode || "-"}</TableCell>
                        <TableCell>
                          <Select
                            value={selectedProduct}
                            onChange={(value) => setSelectedProduct(value)}
                            options={productDrp}
                            showSearch
                            style={{ width: "260px", height: 35 }}
                          />
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>{productDetails?.amount || 0}</TableCell>
                        <TableCell>
                          <InputNumber
                            style={{ width: "100px", height: 35 }}
                            type="number"
                            min={0}
                            value={discount || ""}
                            onChange={(value) => setDiscount(value)}
                          />
                        </TableCell>
                        <TableCell className="d-flex justify-content-between  mt-3">
                          <span>{productDetails?.amount - discount || 0}</span>{" "}
                         
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}>
                          Sub Total
                        </TableCell>
                        <TableCell style={{ border: "none" }}>
                          {productDetails?.amount || 0}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}>
                          Discount
                        </TableCell>
                        <TableCell style={{ border: "none" }}>
                          {discount || 0}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}></TableCell>
                        <TableCell style={{ border: "none" }}>Total</TableCell>
                        <TableCell style={{ border: "none" }}>
                          {productDetails?.amount - discount || 0}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="py-3">
                  <div className="row">
                    <div className="col-lg-6 d-flex justify-content-start">
                      <div>
                        <label>Mode</label>
                        <br />
                        <Select
                          options={[
                            {
                              label: "UPI",
                              value: "Upi",
                            },
                            {
                              label: "Cash",
                              value: "Cash",
                            },
                            {
                              label: "Card",
                              value: "Card",
                            },
                          ]}
                          value={fData?.mode}
                          onChange={(value: any) =>
                            setFdata({ ...fData, mode: value })
                          }
                          style={{ width: "150px", height: 35 }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                      <div className="me-3">
                        <label>Amount</label>
                        <br />
                        <InputNumber
                          value={fData?.amount}
                          onChange={(value: any) =>
                            setFdata({ ...fData, amount: value })
                          }
                          type="number"
                          suffix="₹"
                          style={{ width: "150px", height: 35 }}
                        />
                      </div>
                      <div>
                        <label>Pending Amount</label>
                        <br />
                        <InputNumber
                          value={fData?.pendingAmount}
                          onChange={(value: any) =>
                            setFdata({ ...fData, pendingAmount: value })
                          }
                          type="number"
                          suffix="₹"
                          style={{ width: "150px", height: 35 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
        <div className="d-flex justify-content-end save-cancel-btn my-4">
          <Button className="s-btn" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default OpticalPatientDetails;
