import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  message,
  Select,
} from "antd";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";

const EditServiceBilling = () => {
  const [searchParams] = useSearchParams();
  const patientID = searchParams.get("id");
  const idBill = searchParams.get("billid");
  const [patientData, setPatientData] = useState<any>({});

  const getPatient = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${patientID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatientData(res?.data?.data?.patient);
      await getPrecs();
    } catch (error: any) {
      console.log(error);
    }
  };

  const [precsData, setPrecsData] = useState<any>([]);

  const getPrecs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formatDate = patientData?.appointmentId?.createdAt
        ? moment(patientData?.appointmentId?.createdAt).format("YYYY-MM-DD")
        : patientData?.outPatientId?.createdAt
        ? moment(patientData?.outPatientId?.createdAt).format("YYYY-MM-DD")
        : "";
      const res = await axios.get(
        `${api_url}/api/prescription?patientId=${patientID}&date=${formatDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.data?.prescriptions[0]?.medicine) {
        setPrecsData(res?.data?.data?.prescriptions[0]?.medicine);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const [rowsData, setRowsData] = useState(
    precsData.map(() => ({ quantity: 1, discount: 0, total: 0 }))
  );

  const handleQuantityChange = (index: number, value: number) => {
    const updatedRows = [...rowsData];
    if (!updatedRows[index]) updatedRows[index] = { quantity: 1, discount: 0 };
    updatedRows[index].quantity = value;
    setRowsData(updatedRows);
  };

  const handleDiscountChange = (index: number, value: number | null) => {
    const updatedRows = [...rowsData];
    if (!updatedRows[index]) updatedRows[index] = { quantity: 1, discount: 0 };
    updatedRows[index].discount = value || 0;
    setRowsData(updatedRows);
  };

  const totalSummary = useMemo(() => {
    return precsData.reduce(
      (acc: any, val: any, index: any) => {
        const quantity = rowsData[index]?.quantity || 1;
        const discount = rowsData[index]?.discount || 0;
        const mrp = val?.medicineId?.MRP || 0;
        const taxRate = val?.medicineId?.salesTax1 || 0;

        const subTotalBeforeDiscount = mrp * quantity;
        const taxAmt = (subTotalBeforeDiscount * taxRate) / 100;
        const subTotal = subTotalBeforeDiscount;
        const total = subTotal + taxAmt - discount;

        acc.subTotal += subTotal;
        acc.discount += discount;
        acc.tax += taxAmt;
        acc.total += total;

        return acc;
      },
      { subTotal: 0, discount: 0, tax: 0, total: 0 }
    );
  }, [rowsData, precsData]);

  

  const [data, setData] = useState({
    patientId: patientData._id,
    UHID: patientData.UHIDId,
    patientName: patientData.PatientName,
    patientType: patientData.patientType,
    billAmount: totalSummary.total,
    billDetails: [
      {
        medicineName: "",
        medicineType: "",
        quantity: 0,
        quantityType: "",
        amount: 0,
        taxAmount: 0,
        tax: 0,
        discount: 0,
        totalAmount: 0,
      },
    ],
    subTotal: 0,
    discount: 0,
    taxAmount: 0,
    total: 0,
    paymentDate:"",
    paymentMode: "",
    amount: 0,
    pendingAmount: 0,
    prescriptionId: idBill,
  });

  const handleUpdatePrecs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      const payload = {
        ...data,
        billAmount: totalSummary.total,
        subTotal: totalSummary.subTotal,
        discount: totalSummary.discount,
        taxAmount: totalSummary.tax,
        total: totalSummary.total,
        patientId: patientData._id,
        UHID: patientData.UHIDId,
        patientName: patientData.PatientName,
        patientType: patientData.patientType,
        status:"Paid",
        billDetails:precsData.map((val:any,i:any)=>({
          medicineName: val?.medicineName,
          medicineType: val?.medicineType,
          quantity: rowsData[i]?.quantity,
          quantityType: val?.quantityType,
          amount: (val?.medicineId?.MRP ?? 0) *
          (rowsData[i]?.quantity ?? 1) +
        ((val?.medicineId?.MRP ?? 0) *
          (rowsData[i]?.quantity ?? 1) *
          (val?.medicineId?.salesTax1 ?? 0)) /
          100 -
        (rowsData[i]?.discount ?? 0),
          taxAmount: (
           ( (val?.medicineId?.MRP *
              val?.medicineId?.salesTax1) /
            100)*rowsData[i].quantity
          ).toFixed(2),
          tax: Number(val?.medicineId?.salesTax1).toFixed(),
          discount: rowsData[i]?.discount,
          totalAmount: (val?.medicineId?.MRP ?? 0) *
          (rowsData[i]?.quantity ?? 1) +
        ((val?.medicineId?.MRP ?? 0) *
          (rowsData[i]?.quantity ?? 1) *
          (val?.medicineId?.salesTax1 ?? 0)) /
          100 -
        (rowsData[i]?.discount ?? 0),
        }))
      };

      await axios.patch(`${api_url}/api/prescription/edit/${idBill}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      billAmount: totalSummary.total,
      subTotal: totalSummary.subTotal,
      discount: totalSummary.discount,
      taxAmount: totalSummary.tax,
      total: totalSummary.total,
    }));

    console.log(totalSummary);
    
  }, [totalSummary]);
  

  useEffect(() => {
    if (patientID) {
      getPatient();
    }
  }, [patientID]);

  useEffect(() => {
    if (precsData.length > 0) {
      const initializedRows = precsData.map(() => ({
        quantity: 1,
        discount: 0,
      }));
      setRowsData(initializedRows);
    }
  }, [precsData]);

  return (
    <>
      <div className="cont">
        <div className="ms-3">
          <div className="back-box-doc mt-5">
            <p className="back pt-5 pb-3" style={{ color: "#414141" }}>
              <Link
                to="/pharmacy/service-billing"
                style={{ color: "#414141", textDecoration: "none" }}
              >
                <i
                  className="fi fi-br-angle-left"
                  style={{ cursor: "pointer" }}
                ></i>
                <span
                  className="ms-2"
                  style={{
                    zIndex: "99",
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "0",
                    color: "#414141",
                    cursor: "pointer",
                  }}
                >
                  Back
                </span>
              </Link>
            </p>
          </div>

          <Container fluid className="emr-doc-box py-3">
            <Row className="justify-content-start ">
              <Col xs={12} md={1}>
                <Avatar style={{ height: "75px", width: "75px" }}>
                  {" "}
                  {patientData?.PatientName
                    ? patientData?.PatientName.slice(0, 1)
                    : "-"}
                </Avatar>
              </Col>

              <Col xs={12} md={2}>
                <p className="emr-doc-name mb-1">
                  {patientData?.PatientName || "-"}
                </p>
                <p className="emr-doc-id">{patientData?.UHIDId || "-"}</p>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">Consult Doctor</span>
                  <span className="emr-pat-text ">
                    {" "}
                    : {patientData?.doctorId?.doctorName || "-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Date & Time</span>
                  <span className="emr-pat-text ">
                    :{" "}
                    {patientData?.appointmentId?.createdAt
                      ? moment(patientData?.appointmentId?.createdAt).format(
                          "YYYY-MM-DD"
                        ) +
                        "&" +
                        patientData?.appointmentId?.timeSlot
                      : moment(patientData?.outPatientId?.createdAt).format(
                          "YYYY-MM-DD"
                        ) +
                        "&" +
                        patientData?.outPatientId?.timeSlot}
                  </span>
                </p>

                <p>
                  <span className="emr-doc-text">Visit Type</span>
                  <span className="emr-pat-text">
                    : {patientData?.visitType || "-"}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Reason</span>
                  <span className="emr-pat-text">
                    :{" "}
                    {patientData?.appointmentId?.reason
                      ? patientData?.appointmentId?.reason
                      : patientData?.outPatientId?.reason}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>

          <Container fluid className="emr-doc-box py-3 mt-3">
            <div>
              <h6
                className="ms-3 py-3"
                style={{ fontSize: "16px", fontWeight: 600, color: "#595959" }}
              >
                Prescribed Medicine{" "}
              </h6>
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
                        S. No
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Medication
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Dosage
                        <TableRow>
                          <TableCell
                            className="py-0"
                            style={{ border: "none", color: "#595959" }}
                          >
                            M
                          </TableCell>
                          <TableCell
                            className="py-0"
                            style={{ border: "none", color: "#595959" }}
                          >
                            A
                          </TableCell>
                          <TableCell
                            className="py-0"
                            style={{ border: "none", color: "#595959" }}
                          >
                            E
                          </TableCell>
                          <TableCell
                            className="py-0"
                            style={{ border: "none", color: "#595959" }}
                          >
                            N
                          </TableCell>
                        </TableRow>
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Instruction
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Duration
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {precsData.length > 0 &&
                      precsData.map((val: any, i: any) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.medicineName || "-"}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <TableRow>
                              {["M", "A", "E", "N"].map((time) => (
                                <TableCell
                                  key={time}
                                  style={{
                                    border: "none",
                                    color: "#595959",
                                    textAlign: "center",
                                  }}
                                >
                                  {val?.Timing.includes(time)
                                    ? val?.quantity
                                    : "-"}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.tabletTiming.length &&
                              val?.tabletTiming.map((val: any) => (
                                <span>{val},</span>
                              ))}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.duration || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Container>

          <Container fluid className="emr-doc-box py-3 mt-3">
            <div>
              <h6
                className="ms-3 py-3"
                style={{ fontSize: "16px", fontWeight: 600, color: "#595959" }}
              >
                Medicine Detail
              </h6>
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
                        S. No
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Mrp
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Tax
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Tax Amt
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Quantity
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
                        className=""
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
                    {precsData.length > 0 &&
                      precsData.map((val: any, i: any) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.medicineId?.medicineType || "-"}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.medicineId?.name || "-"}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            ₹{val?.medicineId?.MRP || "-"}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            {val?.medicineId?.salesTax1 || "-"}%
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "#595959",
                            }}
                          >
                            ₹{" "}
                            {val?.medicineId?.MRP && val?.medicineId?.salesTax1
                              ? (
                                  (val?.medicineId?.MRP *
                                    val?.medicineId?.salesTax1) /
                                  100
                                ).toFixed(2)
                              : "-"}
                          </TableCell>
                          <TableCell width={100}>
                            <InputNumber
                              type="number"
                              style={{ height: 35, width: "100%" }}
                              className="mb-2"
                              value={rowsData[i]?.quantity}
                              min={1}
                              onChange={(val) => handleQuantityChange(i, val)}
                            />
                            <Select
                              style={{ height: 35, width: "100%" }}
                              options={[
                                {
                                  label: "NOS",
                                  value: "nos",
                                },
                                {
                                  label: "ML",
                                  value: "ml",
                                },
                              ]}
                            />
                          </TableCell>
                          <TableCell>
                            <InputNumber
                              type="number"
                              value={rowsData[i]?.discount}
                              onChange={(val) => handleDiscountChange(i, val)}
                              style={{ height: 35 }}
                              suffix={"₹"}
                              min={1}
                            />
                          </TableCell>
                          <TableCell>
                            <InputNumber
                              value={
                                (val?.medicineId?.MRP ?? 0) *
                                  (rowsData[i]?.quantity ?? 1) +
                                ((val?.medicineId?.MRP ?? 0) *
                                  (rowsData[i]?.quantity ?? 1) *
                                  (val?.medicineId?.salesTax1 ?? 0)) /
                                  100 -
                                (rowsData[i]?.discount ?? 0)
                              }
                              style={{ height: 35 }}
                              suffix="₹"
                              disabled
                            />

                            {/* <MdOutlineCancel
                              className="ms-2"
                              style={{
                                color: "red",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                            /> */}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="row px-3">
                <div className="col-lg-6">
                  <Checkbox>Enable Insurance</Checkbox>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                  <div className="me-5">
                    <TableRow>
                      <TableCell
                        className="py-2"
                        style={{ border: "none", width: "180px" }}
                      >
                        Sub Total
                      </TableCell>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        ₹ {totalSummary.subTotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        Total Discount
                      </TableCell>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        ₹ {totalSummary.discount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        Tax Amt
                      </TableCell>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        ₹ {totalSummary.tax || 0}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        Total
                      </TableCell>
                      <TableCell className="py-2" style={{ border: "none" }}>
                        ₹ {totalSummary.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </div>
                </div>
              </div>

              <div className="row pt-3 px-3">
                <div className="col-lg-6">
                  <div className="d-flex">
                    <div className="me-3">
                      <label
                        className="pb-2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Date
                      </label>
                      <br />
                      <DatePicker onChange={(_date:any,dateString:any)=>setData({...data,paymentDate:dateString})} style={{ height: 35, width: "150px" }} />
                    </div>
                    <div>
                      <label
                        className="pb-2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Mode
                      </label>
                      <br />
                      <Select value={data.paymentMode} onChange={(value)=>setData({...data,paymentMode:value})} style={{ height: 35, width: "150px" }} options={[{
                        label:"Cash",
                        value:"Cash"
                      },{
                        label:"Card",
                        value:"Card"
                      },
                      {
                        label:"UPI",
                        value:"UPI"
                      }]}/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                  <div className="d-flex">
                    <div className="me-3">
                      <label
                        className="pb-2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Amount
                      </label>
                      <br />
                      <InputNumber
                        value={data.amount}
                        onChange={(value:any)=>setData({...data,amount:value})}
                        suffix={"₹"}
                        style={{ height: 35, width: "150px" }}
                      />
                    </div>
                    <div>
                      <label
                        className="pb-2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Pending Amount
                      </label>
                      <br />
                      <InputNumber
                      type="number"
                      min={1}
                      value={data.pendingAmount}
                      onChange={(value:any)=>setData({...data,pendingAmount:value})}
                        suffix={"₹"}
                        style={{ height: 35, width: "150px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          <Button className="c-btn me-3">Save & Print</Button>
          <Button className="s-btn" onClick={handleUpdatePrecs}>Save</Button>
        </div>
      </div>
    </>
  );
};

export default EditServiceBilling;
