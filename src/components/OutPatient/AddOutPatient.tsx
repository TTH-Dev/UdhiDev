import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const AddOutPatient: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [dmMenu, setDmmenu] = useState([]);
  const [data, setData] = useState({
    fullName: "",
    phoneNo: "",
    age: "",
    patientType: "",
    reason: "",
    doctorId: "",
    specialilty: "",
    bloodGroup: "",
    areaLocation: "",
    visitType: "",
    date: "",
    languageofcommunication: "",
    sex: "",
    refBy: "",
    familyDr: "",
  });

  useEffect(() => {
    fetchDmdata();
  }, []);

  const fetchDmdata = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/doctor/d-menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDmmenu(res.data.data.dmMenu);
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching doctor data!");
    }
  };

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    setData(allValues);
    console.log(allValues, "allValues");
  };

  const handleAddOp = async () => {
    try {
      await form.validateFields();
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/patient/add-op`, data, {
        headers: { Authorization: `Bearer ${token} ` },
      });

      message.success("Patient added successfully!");
      await handleReset();
      navigate("/out-patient/op-management");
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while adding the patient!");
    }
  };

  const handleReset = () => {
    form.resetFields();
    setData({
      fullName: "",
      phoneNo: "",
      age: "",
      patientType: "",
      reason: "",
      doctorId: "",
      specialilty: "",
      bloodGroup: "",
      areaLocation: "",
      visitType: "",
      date: "",
      languageofcommunication: "",
      sex: "",
      refBy: "",
      familyDr: "",
    });
  };
  const handleBack = () => {
    navigate("/out-patient/op-management");
  };
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };
  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3" onClick={handleBack}>
        <p className="back pt-5" style={{ color: "#414141" }}>
          <i className="fi fi-br-angle-left" style={{ cursor: "pointer" }}></i>
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
        </p>
      </div>

      <div className="doc-details-main-box p-3 mx-3 rounded my-4">
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          layout="vertical"
          onFinish={onFinish}
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
                rules={[{ required: true }]}
                className="custom-input-doc-add emr-label"
                colon={false}
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Patient Type <span className="req">*</span>
                  </>
                }
                name="patientType"
                rules={[{ required: true }]}
                className="custom-input-doc-addemr-label  emr-label"
              >
                <Select style={{ height: 40 }}>
                  {["General", "Insurance", "Corporate"].map((type) => (
                    <Select.Option key={type} value={type}>
                      {type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<>Visit Type</>}
                name="visitType"
                className="custom-input-doc-addemr-label  emr-label"
              >
                <Select
                  style={{ height: 35 }}
                  options={[
                    {
                      value: "General",
                      label: (
                        <>
                          <span>General</span>
                        </>
                      ),
                    },
                    {
                      value: "Follow-Up",
                      label: (
                        <>
                          <span>F0llow Up</span>
                        </>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<>Date</>}
                name="date"
                className="custom-input-doc-add emr-label"
              >
                <DatePicker style={{ height: 40, width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<>Language of communication</>}
                name="languageofcommunication"
                className="custom-input-doc-add emr-label"
              >
                <Input style={{ height: 40 }} />
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
                rules={[{ required: true }]}
                className="custom-input-doc-add emr-label"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Reason</>}
                name="reason"
                className="custom-input-doc-add emr-label"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={6}>
              <Form.Item
                label={<>Age</>}
                name="age"
                className="custom-input-doc-add emr-label"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<>Sex</>}
                name="sex"
                className="custom-input-doc-add emr-label"
              >
                <Select
                  style={{ height: 40, width: "100%" }}
                  options={[
                    {
                      label: "Male",
                      value: "Male",
                    },
                    {
                      label: "Female",
                      value: "Female",
                    },
                    {
                      label: "Transgender",
                      value: "Transgender",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Specialilty</>}
                name="specialilty"
                className="custom-input-doc-add emr-label"
              >
                <Select style={{ height: 40 }}>
                  {dmMenu.map((val: any) => (
                    <Select.Option key={val.id} value={val.specialties}>
                      {val.specialties}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={<>Area/Location</>}
                name="areaLocation"
                className="custom-input-doc-add emr-label"
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Doctor <span className="req">*</span></>}
                name="doctorId"
                rules={[{ required: true }]}
                className="custom-input-doc-add emr-label"
              >
                <Select style={{ height: 40 }}>
                  {dmMenu.map((val: any) => (
                    <Select.Option key={val.id} value={val.id}>
                      {val.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={<>Ref.By</>}
                name="refBy"
                className="custom-input-doc-add emr-label"
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Family Dr</>}
                name="familyDr"
                className="custom-input-doc-add emr-label"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn my-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn " onClick={handleAddOp}>
          Save & Assign
        </Button>
      </div>
    </div>
  );
};

export default AddOutPatient;
