import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import axios from "axios";
import moment from "moment";

const AddOPBills = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [patientData, setPatientData] = useState<any>({});
  const [billData, setBillData] = useState<any>({});

  const [searchValue] = useSearchParams();
  const id = searchValue.get("id");

  const [discount, setDiscount] = useState(0);

  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/billing/getById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let fhId = res?.data?.data?.billing?.patientId._id;

      const ress = await axios.get(`${api_url}/api/patient/${fhId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDiscount(ress?.data?.data?.patient?.discount);
      setBillData(res?.data?.data?.billing);
      setPatientData(ress?.data?.data?.patient);
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching doctor data!");
    }
  };

  const [updateDatas, setUpdateDatas] = useState({
    paymentDate: "",
    paymentMode: "",
    status: "Paid",
    total: 0,
    amount: "",
  });

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      let total = discount > 0 ? billData.total - discount : billData.total;
      await axios.patch(
        `${api_url}/api/billing/getById/${billData._id}`,
        { ...updateDatas, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <div className="cont">
        <div className="back-box-doc mt-5 ms-3">
          <p className="back pt-5" style={{ color: "#414141" }}>
            <Link
              to="/billing/op-bills"
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
        <div
          className="act-cont-c mt-2 ms-4"
          style={{ marginBottom: "16px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <Row className="align-items-start justify-content-start">
              <Col xs={12} md={1}>
                <img
                  src="/assets/user.png"
                  style={{ height: "75px", width: "75px" }}
                />
              </Col>

              <Col xs={12} md={2} className="ps-3">
                <p className="emr-doc-name mb-1">{patientData?.PatientName}</p>
                <p className="emr-doc-id">{patientData?.UHIDId}</p>
              </Col>

              <Col xs={12} md={5} className="text-start emr-visit-details">
                <p>
                  <span className="emr-doc-text">Consult Doctor</span>
                  <span className="emr-pat-text ">
                    {patientData?.doctorId?.doctorName}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Visit Date & Time</span>
                  <span className="emr-pat-text ">
                    :{" "}
                    {patientData.appointmentId
                      ? patientData?.appointmentId?.createdAt &&
                        moment(patientData?.appointmentId?.createdAt).format(
                          "YYYY-MM-DD"
                        ) +
                          "&" +
                          patientData?.outPatientId?.timeSlot
                      : patientData?.outPatientId?.createdAt &&
                        moment(patientData?.outPatientId?.createdAt).format(
                          "YYYY-MM-DD"
                        ) +
                          "&" +
                          patientData.outPatientId.timeSlot}
                  </span>
                </p>

                <p>
                  <span className="emr-doc-text">Visit Type</span>
                  <span className="emr-pat-text">
                    : {patientData?.visitType}
                  </span>
                </p>
                <p>
                  <span className="emr-doc-text">Reason</span>
                  <span className="emr-pat-text">
                    :{" "}
                    {patientData?.appointmentId?.reason ||
                      patientData?.outPatientId?.reason}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "16px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <p className="emr-search-text">Bill Details</p>

            <div>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Service Name</TableCell>
                      <TableCell>Qyt</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Total Amt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billData?.billDetails?.length > 0 &&
                      billData?.billDetails.map((val: any, index: any) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{val?.serviceName || "-"}</TableCell>
                          <TableCell>{val?.quantity || 0}</TableCell>
                          <TableCell>₹{val?.amount || 0}</TableCell>
                          <TableCell>₹{val.totalAmount || 0}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="mt-3">
                    <Checkbox onChange={() => setIsChecked(!isChecked)}>
                      Enable Insurance
                    </Checkbox>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex justify-content-end">
                  <div className="me-5 pe-3">
                    <TableRow>
                      <TableCell style={{ border: "none", width: "200px" }}>
                        Sub Total
                      </TableCell>
                      <TableCell style={{ border: "none" }}>
                        ₹ {billData?.subTotal || 0}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell style={{ border: "none" }}>Discount</TableCell>
                      <TableCell style={{ border: "none" }}>
                        ₹ {discount || 0}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ border: "none" }}>Total</TableCell>
                      <TableCell style={{ border: "none" }}>
                        ₹{" "}
                        {discount > 0
                          ? billData?.total - discount
                          : billData?.total}
                      </TableCell>
                    </TableRow>
                  </div>
                </div>

                <div className="col-lg-6 col-mg-6">
                  <div className="d-flex">
                    <div className="me-3">
                      <label
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Date
                      </label>
                      <br />
                      <DatePicker
                        onChange={(_date: any, dateString: any) =>
                          setUpdateDatas({
                            ...updateDatas,
                            paymentDate: dateString,
                          })
                        }
                        style={{ height: 40 }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        Mode
                      </label>
                      <br />
                      <Select
                        style={{ width: 150, height: 40 }}
                        value={updateDatas.paymentMode}
                        onChange={(value) =>
                          setUpdateDatas({ ...updateDatas, paymentMode: value })
                        }
                        options={[
                          { value: "cash", label: "Cash" },
                          { value: "card", label: "Card" },
                          { value: "upi", label: "UPI" },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-mg-6 d-flex justify-content-end">
                  <div className="d-flex">
                    <div className="me-3">
                      <label
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
                        style={{ width: 150, height: 40 }}
                        suffix="₹"
                        value={updateDatas.amount}
                        onChange={(value: any) =>
                          setUpdateDatas({ ...updateDatas, amount: value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {isChecked && (
          <div
            className="act-cont-c  ms-4"
            style={{ marginBottom: "20px", color: "#595959" }}
          >
            <Container fluid className="emr-doc-box py-3">
              <p className="emr-search-text">Insurance Details</p>
              <div className="row">
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Insurance Name
                    </label>
                    <br />
                    <Select
                      defaultValue="lucy"
                      style={{ width: "100%", height: 40 }}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Company Code
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Expiry Date
                    </label>
                    <br />
                    <DatePicker style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Payment Date
                    </label>
                    <br />
                    <DatePicker style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Policy Id
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Policy Holder
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Policy number
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Insurance Paid
                    </label>
                    <br />
                    <InputNumber style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      TPA Provider
                    </label>
                    <br />
                    <Select
                      defaultValue="lucy"
                      style={{ width: "100%", height: 40 }}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />{" "}
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      TPA Id
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      TPA Auth Id
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Emp Id
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      Claim Id
                    </label>
                    <br />
                    <Input style={{ width: "100%", height: 40 }} />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        <div className="d-flex justify-content-end save-cancel-btn mt-1 pb-4">
          <Button className="c-btn me-3" onClick={handleSave}>
            Save
          </Button>
          {/* <Button className="s-btn">Save&Print</Button> */}
        </div>
      </div>
    </>
  );
};

export default AddOPBills;