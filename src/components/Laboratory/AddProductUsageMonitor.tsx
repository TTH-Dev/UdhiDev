import { TableCell, TableRow } from "@mui/material";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  message,
  Select,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "../../Config";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";

const AddProductUsageMonitor = () => {
  const [data, setData] = useState({
    productName: "",
    openDate: "",
    openTime: "",
    closeTime: "",
    closeDate: "",
    reconstituteExpDate: "",
    lotNo: "",
    productExpiryDate: "",
    status: "",
    testName: "",
    monitoredValues: {
      testDate: "",
      testTime: "",
      currentReading: 0,
      mineValue: 0,
      lowLevel: 0,
      highLevel: 0,
      qcRepeatValue: 0,
    },
  });

  const [nameDrop, setNameDrop] = useState<any>([]);

  const getDropDown = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/product/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let uniqueTests = Array.from(
        new Map(
          res.data.data.data.map((val: any) => [
            val.productName,
            { label: val.productName, value: val.productName },
          ])
        ).values()
      );
      setNameDrop(uniqueTests);
      await getTestdrop();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [testName, setTestName] = useState<any>([]);

  const getTestdrop = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/test/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let uniqueTest = Array.from(
        new Map(
          res.data.data.data.map((val: any) => [
            val.testName,
            { label: val.testName, value: val.testName },
          ])
        ).values()
      );

      setTestName(uniqueTest);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
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

      await axios.post(`${api_url}/api/product-usage-monitor`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Added Successfully!");

      navigate("/laboratory/quality-standard");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDropDown();
  }, []);

  return (
    <>
      <div className="cont">
        <div className="back-box-doc mt-5 ms-3">
          <p className="back pt-5 mb-3" style={{ color: "#414141" }}>
            <Link
              to="/laboratory/quality-standard"
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
          className="act-cont-c   ms-4"
          style={{ marginBottom: "10px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="emr-search-text mb-2"
                  style={{ fontSize: "18px" }}
                >
                  Product Usage Monitor Information
                </p>
                <p
                  className="emr-search-text mb-0"
                  style={{ fontSize: "18px" }}
                >
                  Details
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-6 px-0">
                <div>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        width: "200px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Product Name
                    </TableCell>
                    <TableCell className="py-1" style={{ border: "none" }}>
                      <Select
                        value={data.productName}
                        onChange={(value) =>
                          setData({ ...data, productName: value })
                        }
                        showSearch
                        style={{ height: 35, width: "100%" }}
                        options={nameDrop}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="pb-1 pt-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Open Date
                    </TableCell>
                    <TableCell className="pb-1 pt-2" style={{ border: "none" }}>
                      <DatePicker
                        value={data.openDate ? moment(data.openDate) : null}
                        onChange={(_date: any, datestring: any) =>
                          setData({ ...data, openDate: datestring })
                        }
                        className="me-1"
                        style={{ width: "49%", height: 35 }}
                      />
                      <TimePicker
                        use12Hours
                        format="h:mm a"
                        value={
                          data.openTime ? dayjs(data.openTime, "h:mm a") : null
                        }
                        onChange={(value) =>
                          setData({
                            ...data,
                            openTime: value ? value.format("h:mm a") : "",
                          })
                        }
                        style={{ width: "49%", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Close Date
                    </TableCell>
                    <TableCell className="py-2" style={{ border: "none" }}>
                      <DatePicker
                        className="me-1"
                        style={{ width: "49%", height: 35 }}
                        value={data.closeDate ? moment(data.closeDate) : null}
                        onChange={(_date: any, datestring: any) =>
                          setData({ ...data, closeDate: datestring })
                        }
                      />
                      <TimePicker
                        use12Hours
                        format="h:mm a"
                        style={{ width: "49%", height: 35 }}
                        value={
                          data.closeTime
                            ? dayjs(data.closeTime, "h:mm a")
                            : null
                        }
                        onChange={(value) =>
                          setData({
                            ...data,
                            closeTime: value ? value.format("h:mm a") : "",
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Reconstitute Exp.Date{" "}
                    </TableCell>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      <DatePicker
                        style={{ height: 35, width: "100%" }}
                        value={
                          data.reconstituteExpDate
                            ? moment(data.reconstituteExpDate)
                            : null
                        }
                        onChange={(_date: any, datestring: any) =>
                          setData({ ...data, reconstituteExpDate: datestring })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 px-0">
                <div>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Lot.No
                    </TableCell>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      <Input
                        style={{ height: 35, width: "100%" }}
                        value={data.lotNo}
                        onChange={(e) =>
                          setData({ ...data, lotNo: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Product Expiry Date
                    </TableCell>
                    <TableCell
                      className="py-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      <DatePicker
                        value={
                          data.productExpiryDate
                            ? moment(data.productExpiryDate)
                            : null
                        }
                        onChange={(_date: any, datestring: any) =>
                          setData({ ...data, productExpiryDate: datestring })
                        }
                        style={{ width: "100%", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="pt-1 pb-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell className="pt-1 pb-2" style={{ border: "none" }}>
                      <Input
                        value={data.status}
                        onChange={(e) =>
                          setData({ ...data, status: e.target.value })
                        }
                        style={{ height: 35, width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Test Name
                    </TableCell>
                    <TableCell className="py-1" style={{ border: "none" }}>
                      <Select
                        showSearch
                        style={{ height: 35, width: "100%" }}
                        options={testName}
                        value={data.testName}
                        onChange={(value) =>
                          setData({ ...data, testName: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div
          className="act-cont-c   ms-4"
          style={{ marginBottom: "10px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="emr-search-text mb-2"
                  style={{ fontSize: "18px" }}
                >
                  Add Monitored Value
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-6 px-0">
                <div>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "200px",
                      }}
                    >
                      Test Date & Time
                    </TableCell>
                    <TableCell className="pb-1 pt-2" style={{ border: "none" }}>
                      <DatePicker
                        className="me-1"
                        style={{ width: "49%", height: 35 }}
                        value={
                          data.monitoredValues.testDate
                            ? dayjs(data.monitoredValues.testDate)
                            : null
                        }
                        onChange={(_date: any, dateString: any) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              testDate: dateString,
                            },
                          })
                        }
                      />
                      <TimePicker
                        use12Hours
                        format="h:mm a"
                        style={{ width: "49%", height: 35 }}
                        value={
                          data.monitoredValues.testTime
                            ? dayjs(data.monitoredValues.testTime, "h:mm a")
                            : null
                        }
                        onChange={(value) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              testTime: value ? value.format("h:mm a") : "",
                            },
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="pb-1 pt-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Current Reading
                    </TableCell>
                    <TableCell className="pb-1 pt-2" style={{ border: "none" }}>
                      <InputNumber
                        type="number"
                        min={0}
                        onChange={(value: any) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              currentReading: value,
                            },
                          })
                        }
                        value={data.monitoredValues.currentReading||""}
                        className=""
                        style={{ width: "100%", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-2"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Mine Value
                    </TableCell>
                    <TableCell className="py-2" style={{ border: "none" }}>
                      <InputNumber
                        type="number"
                        min={0}
                        onChange={(value: any) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              mineValue: value,
                            },
                          })
                        }
                        value={data.monitoredValues.mineValue||""}
                        className=""
                        style={{ width: "100%", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Low Level
                    </TableCell>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      <InputNumber
                        type="number"
                        min={0}
                        onChange={(value: any) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              lowLevel: value,
                            },
                          })
                        }
                        value={data.monitoredValues.lowLevel||""}
                        style={{ height: 35, width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      High Level
                    </TableCell>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      <InputNumber
                        type="number"
                        min={0}
                        onChange={(value: any) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              highLevel: value,
                            },
                          })
                        }
                        value={data.monitoredValues.highLevel||""}
                        style={{ height: 35, width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      QC Repeat Value
                    </TableCell>
                    <TableCell
                      className="py-1"
                      style={{
                        border: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      <InputNumber
                        type="number"
                        min={0}
                        onChange={(value: any) =>
                          setData({
                            ...data,
                            monitoredValues: {
                              ...data.monitoredValues,
                              qcRepeatValue: value,
                            },
                          })
                        }
                        value={data.monitoredValues.qcRepeatValue||""}
                        style={{ height: 35, width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          <Button className="s-btn" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddProductUsageMonitor;
