import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  message,
} from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";
import dayjs from "dayjs";

const AddSubAdmin: React.FC = () => {
  const navData = [
    "Doctor",
    "EMR",
    "Out Patient",
    "Optometry",
    "Billing",
    "Laboratory",
    "Pharmacy",
  ];

  const [data, setData] = useState({
    email: "",
    phoneNo: "",
    dateOfBirth: "",
    age: "",
    fullName: "",
    emloyeeType: "",
    access: [],
  });

  const handleValueChange = (_newValue: any, allValues: any) => {
    setData(allValues);
  };

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const handleAddSubadmin = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await form.validateFields();
      await axios.post(`${api_url}/api/subadmin`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.resetFields();
      navigate("/setting/sub-admin");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getSubadmin = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/subadmin/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let subadminData = res.data.data.gallery;

      // Convert dateOfBirth to a dayjs object
      if (subadminData.dateOfBirth) {
        subadminData.dateOfBirth = dayjs(subadminData.dateOfBirth);
      }

      form.setFieldsValue(subadminData);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleUpdateSubadmin = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await form.validateFields();

      let fd=form.getFieldsValue()
      
      await axios.patch(`${api_url}/api/subadmin/getById/${id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.resetFields();
      message.success("Updated successfully!");
      navigate("/setting/sub-admin");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getSubadmin();
    }
  }, [id]);

  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <Link
            to="/setting/sub-admin"
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
          layout="vertical"
          onValuesChange={handleValueChange}
          requiredMark={false}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Full Name <span className="req">*</span>
                  </>
                }
                name="fullName"
                style={{ fontSize: "16px", fontWeight: 600 }}
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={
                  <>
                    DOB <span className="req">*</span>
                  </>
                }
                name="dateOfBirth"
                style={{ fontSize: "16px", fontWeight: 600 }}
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <DatePicker style={{ height: 40, width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={
                  <>
                    Age <span className="req">*</span>
                  </>
                }
                name="age"
                style={{ fontSize: "16px", fontWeight: 600 }}
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Email ID <span className="req">*</span>
                  </>
                }
                name="email"
                style={{ fontSize: "16px", fontWeight: 600 }}
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Employee Type <span className="req">*</span>
                  </>
                }
                name="emloyeeType"
                style={{ fontSize: "16px", fontWeight: 600 }}
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Select
                  style={{ height: 40 }}
                  options={[
                    {
                      label: "Admin",
                      value: "Admin",
                    },
                    {
                      label: "SubAdmin",
                      value: "SubAdmin",
                    },
                    {
                      label: "Doctor",
                      value: "Doctor",
                    },
                    {
                      label: "Optometriest",
                      value: "Optometriest",
                    },
                    {
                      label: "Billing",
                      value: "Billing",
                    },
                    {
                      label: "Lab Incharge",
                      value: "Lab Incharge",
                    },
                    {
                      label: "Pharmacy",
                      value: "Pharmacy",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <>
                    Access <span className="req">*</span>
                  </>
                }
                name="access"
                style={{ fontSize: "16px", fontWeight: 600 }}
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Checkbox.Group>
                  <Row>
                    {navData.map((val) => (
                      <Col span={6} key={val}>
                        <Checkbox
                          value={val}
                          className="p-2"
                          style={{
                            color: "#7F8F98",
                            fontWeight: 400,
                            fontSize: "16px",
                          }}
                        >
                          {val}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn my-4">
        <Button
          className="s-btn "
          onClick={id ? handleUpdateSubadmin : handleAddSubadmin}
        >
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default AddSubAdmin;
