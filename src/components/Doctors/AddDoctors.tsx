import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  Row,
  Col,
  message,
  Avatar,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";
import dayjs from "dayjs";

const AddDoctors: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<any>({
    doctorName: "",
    phoneNo: "",
    department: "",
    roomNo: "",
    dateOfJoining: "",
    emailId: "",
    bloodGroup: "",
    dateOfBirth: "",
    specialist: "",
    doctorImage: null,
    address: "",
  });

  const [form] = Form.useForm();

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    setData(allValues);
  };

  const navigate = useNavigate();

  const handleAddDoctor = async () => {
    try {
      await form.validateFields();
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) => {
        if (value) {
          if (key === "doctorImage") {
            formData.append(key, value.file);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      await axios.post(`${api_url}/api/doctor`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      form.resetFields();
      setData({
        doctorName: "",
        phoneNo: "",
        department: "",
        roomNo: "",
        dateOfJoining: "",
        emailId: "",
        bloodGroup: "",
        dateOfBirth: "",
        specialist: "",
        doctorImage: null,
        address: "",
      });
      navigate("/doctors/doctors-management");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };



  const getDoctor = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/doctor/ById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const doctor = res.data.data.doctor;

      let fg={
        doctorName: doctor.doctorName,
        phoneNo: doctor.phoneNo,
        department: doctor.department,
        roomNo: doctor.roomNo,
        dateOfJoining: dayjs(doctor.dateOfJoining),
        emailId: doctor.emailId,
        bloodGroup: doctor.bloodGroup,
        dateOfBirth: dayjs(doctor.dateOfBirth),
        specialist: doctor.specialist,
        doctorImage: doctor.doctorImage,
        address: doctor.address,
      }

      form.setFieldsValue(fg);


      setData(fg)
      

    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) => {
        if (value) {
          if (key === "doctorImage"&&value.file) {
            formData.append(key, value.file);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      await axios.patch(`${api_url}/api/doctor/ById/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      form.resetFields();
      setData({
        doctorName: "",
        phoneNo: "",
        department: "",
        roomNo: "",
        dateOfJoining: "",
        emailId: "",
        bloodGroup: "",
        dateOfBirth: "",
        specialist: "",
        doctorImage: null,
        address: "",
      });
      navigate("/doctors/doctors-management");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  

  useEffect(() => {
    if (id) {
      getDoctor();
    }
  }, [id]);

  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <Link
            to="/doctors/doctors-management"
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

      <div className="doc-details-main-box p-3 mx-3 rounded my-4">
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          layout="vertical"
          requiredMark={false}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Upload Image 
                  </>
                }
                name="doctorImage"
                className="custom-input-doc-add"
              >
                <Upload beforeUpload={() => false} accept="image/*">
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </Form.Item>
              {data?.doctorImage!==""&&<Avatar style={{width:"50px",height:"50px"}} src={`${api_url}/public/images/${data?.doctorImage}`}/>}
            </Col>
            <Col span={6}>
              <Form.Item
                label="Blood Group"
                name="bloodGroup"
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                className="custom-input-doc-add"
              >
                <DatePicker style={{ height: 35, width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Full Name <span className="req">*</span>
                  </>
                }
                name="doctorName"
                rules={[{ required: true, message: "Doctor Name required!" }]}
                className="custom-input-doc-add"
                colon={false}
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Date of Joining <span className="req">*</span>
                  </>
                }
                name="dateOfJoining"
                rules={[
                  { required: true, message: "Date of joining required!" },
                ]}
                className="custom-input-doc-add"
              >
                <DatePicker style={{ width: "100%", height: 35 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Room No <span className="req">*</span>
                  </>
                }
                name="roomNo"
                className="custom-input-doc-add"
                rules={[{ required: true, message: "Room number required!" }]}
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Department <span className="req">*</span>
                  </>
                }
                name="department"
                rules={[{ required: true, message: "Department required!" }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Phone No <span className="req">*</span>
                  </>
                }
                name="phoneNo"
                rules={[{ required: true, message: "Phone Number required!" }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Specialist <span className="req">*</span>
                  </>
                }
                name="specialist"
                rules={[{ required: true, message: "Specialist required!" }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Email ID <span className="req">*</span>
                  </>
                }
                name="emailId"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Email Id required!",
                  },
                ]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Address <span className="req">*</span>
                  </>
                }
                name="address"
                rules={[{ required: true, message: "Address required!" }]}
                className="custom-input-doc-add"
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn my-4">
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button
          className="s-btn "
          onClick={id ? handleUpdate : handleAddDoctor}
        >
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default AddDoctors;
