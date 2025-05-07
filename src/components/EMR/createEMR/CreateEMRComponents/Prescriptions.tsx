import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import {
  Select,
  Input,
  Checkbox,
  Form,
  Col,
  Row,
  Button,
  message,
  DatePicker,
} from "antd";
import axios from "axios";
import { api_url } from "../../../../Config";
import { IoIosAddCircleOutline } from "react-icons/io";

const { Option } = Select;

const Prescriptions = () => {
  const [dropDownValue, setDropDownValue] = useState<any>({
    name: [],
    type: [],
    id: [],
  });
  const timing = ["M", "A", "E", "N"];
  const tabletTiming = ["Before Food", "After Food", "With food"];
  const id = sessionStorage.getItem("patientId");
  const [data, setData] = useState<any>({
    patientId: id,
    enteredDate: new Date(),
    medicine: [
      {
        medicineType: "",
        medicineName: "",
        medicineId: "",
        Timing: [],
        quantity: 0,
        quantityType: "",
        tabletTiming: [],
        duration: "",
      },
    ],
    description: "",
    admitNow: false,
    followUpCheckup: {
      FollowUpPeriod: "",
      chooseDate: "",
      testPrescriptionForFollowUp: "",
    },
  });

  const getDropDown = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/pharmacy-product?fields=name,medicineType`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dname = res.data.data.products.map((val: any) => ({
        label: val.name,
        value: val.name,
      }));
      const dtype = res.data.data.products.map((val: any) => ({
        label: val.medicineType,
        value: val.medicineType,
      }));
      const dId = res.data.data.products.map((val: any) => ({
        label: val.name,
        value: val._id,
      }));

      setDropDownValue({
        name: dname,
        type: dtype,
        id: dId,
      });
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleMedicineChange = (index: number, key: string, value: any) => {
    const updatedMedicine = [...data.medicine];

    if (key === "medicineName") {
      updatedMedicine[index]["medicineName"] = value;
      let df = dropDownValue.id.filter((val: any) => val.label === value);
      updatedMedicine[index]["medicineId"] = df[0].value;
    } else {
      updatedMedicine[index][key] = value;
    }

    setData((prev: any) => ({ ...prev, medicine: updatedMedicine }));
  };

  const handleTimingChange = (index: number, val: string) => {
    const updatedMedicine = [...data.medicine];
    const timingArray = updatedMedicine[index].Timing;
    const isChecked = timingArray.includes(val);

    updatedMedicine[index].Timing = isChecked
      ? timingArray.filter((t: string) => t !== val)
      : [...timingArray, val];

    setData((prev: any) => ({ ...prev, medicine: updatedMedicine }));
  };

  const handleTabletTimingChange = (
    index: number,
    value: string,
    checked: boolean
  ) => {
    const updatedMedicine = [...data.medicine];
    const timingArray = updatedMedicine[index].tabletTiming;

    if (checked) {
      // Add value if it's not already in the array
      if (!timingArray.includes(value)) {
        timingArray.push(value);
      }
    } else {
      // Remove value if it's unchecked
      updatedMedicine[index].tabletTiming = timingArray.filter(
        (item: any) => item !== value
      );
    }

    setData((prev: any) => ({
      ...prev,
      medicine: updatedMedicine,
    }));
  };

  const handleAddrow = () => {
    setData({
      ...data,
      medicine: [
        ...data.medicine,
        {
          medicineType: "",
          medicineName: "",
          medicineId: "",
          Timing: [],
          quantity: 0,
          quantityType: "",
          tabletTiming: [],
          duration: "",
        },
      ],
    });
  };

  const handleSave = async () => {
    console.log(data);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/prescription`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Saved Successfully!");
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
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text ps-2">Medicine</p>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ boxShadow: "none" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="medicine table">
            <TableHead>
              <TableRow>
                {[
                  "Medicine Name",
                  "Medicine Type",
                  "Timing",
                  "Quantity",
                  "Duration",
                ].map((head) => (
                  <TableCell
                    className="py-4"
                    key={head}
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#666666",
                      textAlign: "start",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.medicine.map((med: any, i: any) => (
                <React.Fragment key={i}>
                  <TableRow
                    sx={{ borderBottom: "none" }}
                    className="rad-row-pres"
                  >
                    <TableCell>
                      <Select
                        value={med.medicineName}
                        style={{ width: "100%", height: 40 }}
                        className="select-opt"
                        showSearch
                        options={dropDownValue.name}
                        onChange={(value) =>
                          handleMedicineChange(i, "medicineName", value)
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Select
                        value={med.medicineType}
                        style={{ width: "100%", height: 40 }}
                        className="select-opt"
                        showSearch
                        options={dropDownValue.type}
                        onChange={(value) =>
                          handleMedicineChange(i, "medicineType", value)
                        }
                      />
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }}>
                      {timing.map((val, tIndex) => (
                        <label key={tIndex} style={{ margin: "0 5px" }}>
                          <input
                            type="checkbox"
                            checked={med.Timing.includes(val)}
                            onChange={() => handleTimingChange(i, val)}
                          />
                          <span className="ms-1">{val}</span>
                        </label>
                      ))}
                    </TableCell>

                    <TableCell
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Input
                        type="number"
                        value={med.quantity}
                        onChange={(e) =>
                          handleMedicineChange(i, "quantity", e.target.value)
                        }
                        style={{
                          width: "60px",
                          marginRight: "8px",
                          height: 40,
                        }}
                      />
                      <Select
                        value={med.quantityType}
                        style={{ width: "80px", height: 40 }}
                        onChange={(value) =>
                          handleMedicineChange(i, "quantityType", value)
                        }
                      >
                        <Option value="mg">mg</Option>
                        <Option value="ml">ml</Option>
                        <Option value="tablet">tablet</Option>
                      </Select>
                    </TableCell>

                    {/* Duration Input */}
                    <TableCell>
                      <Input
                        value={med.duration}
                        onChange={(e) =>
                          handleMedicineChange(i, "duration", e.target.value)
                        }
                        style={{ height: 40 }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <FormGroup
                        row
                        style={{ marginTop: "-20px", marginLeft: "10px" }}
                      >
                        {tabletTiming.map((item, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                className="me-2"
                                checked={med.tabletTiming.includes(item)}
                                onChange={(e) =>
                                  handleTabletTimingChange(
                                    i,
                                    item,
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={
                              <span
                                className="me-1"
                                style={{ fontSize: "14px", fontWeight: 500 }}
                              >
                                {item}
                              </span>
                            }
                          />
                        ))}
                      </FormGroup>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <span
          onClick={handleAddrow}
          className="mt-1"
          style={{ cursor: "pointer", color: "#3497F9" }}
        >
          <IoIosAddCircleOutline className="mb-1" />
          Add More
        </span>
      </div>

      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text ps-2">Description</p>
        <div>
          <Input.TextArea
            rows={4}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
        <div className="mt-3">
          <label></label>
          <Checkbox
            value={data.admitNow}
            onChange={(e) => setData({ ...data, admitNow: e.target.checked })}
          >
            Admit Now
          </Checkbox>
        </div>
      </div>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text ps-2">Description</p>

        <Form layout="vertical" className="p-2">
          <div style={{ position: "relative", paddingBottom: "1rem" }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Follow Up Period</span>}
                  name={`admissionReason`}
                >
                  <Input
                    style={{ width: "100%", height: 40 }}
                    value={data.followUpCheckup.FollowUpPeriod}
                    onChange={(e) =>
                      setData({
                        ...data,
                        followUpCheckup: {
                          ...data.followUpCheckup,
                          FollowUpPeriod: e.target.value,
                        },
                      })
                    }
                  />{" "}
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Choose Date</span>}
                  name={`admissionReason`}
                >
                  <DatePicker
                    onChange={(_date: any, dateString: any) =>
                      setData({
                        ...data,
                        followUpCheckup: {
                          ...data.followUpCheckup,
                          chooseDate: dateString,
                        },
                      })
                    }
                    style={{ width: "100%", height: 40 }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="emr-label">
                      Test Prescription for Follow Up
                    </span>
                  }
                  name={`admissionReason`}
                >
                  <Input
                    style={{ width: "100%", height: 40 }}
                    value={data.followUpCheckup.testPrescriptionForFollowUp}
                    onChange={(e) =>
                      setData({
                        ...data,
                        followUpCheckup: {
                          ...data.followUpCheckup,
                          testPrescriptionForFollowUp: e.target.value,
                        },
                      })
                    }
                  />{" "}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn pb-5" style={{backgroundColor:"#fff"}}>
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Prescriptions;
