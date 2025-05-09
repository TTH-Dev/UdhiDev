import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { api_url } from "../../../../Config";
import axios from "axios";
import moment from "moment";

const AdmissionForm: React.FC = () => {
  const [form] = Form.useForm();

  const [postData, setPostData] = useState({
    admissionDate: "",
    admissionTime: "",
    admissionReason: "",
    dischargeDate: "",
    dischargeTime: "",
    consultationName: "",
    phoneNum: "",
    shiftedtoWard: "",
    mobileNo: "",
    eyeCondition: "",
    typeOfAdmission: "",
  });

  const onFinish = (values: any) => {
    // Format date and time to string
    const formattedData = {
      ...values,
      admissionDate: values.admissionDate
        ? dayjs(values.admissionDate).format("YYYY-MM-DD")
        : "",
      admissionTime: values.admissionTime
        ? dayjs(values.admissionTime).format("HH:mm")
        : "",
      dischargeDate: values.dischargeDate
        ? dayjs(values.dischargeDate).format("YYYY-MM-DD")
        : "",
      dischargeTime: values.dischargeTime
        ? dayjs(values.dischargeTime).format("HH:mm")
        : "",
    };

    // Update the postData state
    setPostData(formattedData);
  };
  const patientId = sessionStorage.getItem("patientId");
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      const formData = new FormData();
      formData.append("patientId", patientId || "-");
      formData.append("admissionFormData", JSON.stringify(postData));
      await axios.post(`${api_url}/api/admissionForm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState("");
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/admissionForm?patientId=${patientId}&date=${moment().format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let df = res.data.data.admissionForms[0];

      if (df) {
        const formattedData = {
          ...df.admissionFormData,
          admissionDate: df.admissionFormData.admissionDate
            ? dayjs(df.admissionFormData.admissionDate)
            : null,
          admissionTime: df.admissionFormData.admissionTime
            ? dayjs(df.admissionFormData.admissionTime, "hh:mm")
            : null,
          dischargeDate: df.admissionFormData.dischargeDate
            ? dayjs(df.admissionFormData.dischargeDate)
            : null,
          dischargeTime: df.admissionFormData.dischargeTime
            ? dayjs(df.admissionFormData.dischargeTime, "hh:mm")
            : null,
        };
        form.setFieldsValue(formattedData);
        setPostData(df?.admissionFormData);
        setIsUpdate(true);
        setIsUpdateId(df?._id);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      let gg = form.getFieldsValue();
      const formData = new FormData();
      formData.append("patientId", patientId || "-");
      formData.append("admissionFormData", JSON.stringify(gg));
      await axios.patch(
        `${api_url}/api/admissionForm/${isUpdateId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
    if (patientId) {
      getData();
    }
  }, [patientId]);

  return (
    <>
      <div className="emr-complaints-box mx-3 p-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 py-3">Admission Form</p>
          </div>
          <div className="p-3">
            <span>QF/0T/F/09</span>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item
                name="admissionDate"
                label="Admission Date"
                className="emr-label"
              >
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="admissionTime"
                label="Admission Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="admissionReason"
                label="Admission Reason"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="dischargeDate"
                label="Discharge Date"
                className="emr-label"
              >
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="dischargeTime"
                label="Discharge Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="consultationName"
                label="Consultation Name"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNum"
                label="Phone Num"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="shiftedtoWard"
                label="Shifted To OT/ Ward At"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="mobileNo"
                label="Mobile No"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="eyeCondition"
                label="Eye Condition"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="typeOfAdmission"
                label="Type of Admission"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="dayCare">Day Care Admission</Radio>
                  <Radio value="inpatient">Inpatient Admission</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Form.Item>
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button
            className="s-btn me-3"
            onClick={isUpdate ? handleUpdate : handleSave}
          >
            {isUpdate ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default AdmissionForm;
