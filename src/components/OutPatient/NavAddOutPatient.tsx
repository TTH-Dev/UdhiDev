import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { api_url } from "../../Config";

const NavAddOutPatient: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [form] = Form.useForm();

  const [data, setData] = useState<any>()

  const getDetails = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      form.setFieldsValue(res.data.data.patient);
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

  const handeValueChange = (_values: any, allValues: any) => {
    setData(allValues)
  }

  const updateDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

       await axios.patch(`${api_url}/api/patient/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      form.resetFields()
      navigate("/out-patient/patient-details")
      message.success("Updated Successfully!")

    } catch (error: any) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (id) {
      getDetails(id);
    }
  }, [id]);

  const navigate = useNavigate();

  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <Link
            to="/out-patient/patient-details"
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
          layout="vertical"
          onValuesChange={handeValueChange}
          form={form}
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
                name="PatientName"
                rules={[{ required: true }]}
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
                    Patient Type <span className="req">*</span>
                  </>
                }
                name="patientType"
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Select
                  style={{ height: 35 }}
                  options={[
                    {
                      value: "General",
                      label: (
                        <>
                          <span>General</span>
                          <GoDotFill style={{ color: "#00BE4F" }} />
                        </>
                      ),
                    },
                    {
                      value: "Corporate",
                      label: (
                        <>
                          <span>Corporate</span>
                          <GoDotFill style={{ color: "#FFAE00" }} />
                        </>
                      ),
                    },
                    {
                      value: "Insurance",
                      label: (
                        <>
                          <span>Insurance</span>
                          <GoDotFill style={{ color: "#3497F9" }} />
                        </>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </Col>


          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={<>Occupation</>}
                name="occupation"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input style={{ width: "100%", height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Handicap Id</>}
                name="handicapId"
                rules={[{ required: false }]}
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
                    UHID <span className="req">*</span>
                  </>
                }
                name="UHIDId"
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Aadhar No 
                  </>
                }
                name="aadharNo"
                rules={[{ required: false }]}
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
                rules={[{ required: true }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Insurance Id</>}
                name="insuranceId"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={<>Language of communication</>}
                name="languageofcommunication"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input  style={{ height: 35 }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<>Family Dr</>}
                name="familyDr"
                rules={[{ required: false }]}
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
                    Email Id 
                  </>
                }
                name="emailId"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<>Age</>}
                name="age"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<>Blood Group</>}
                name="bloodGroup"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
          </Row>

         
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item
                label={<>Sex</>}
                name="sex"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Select  style={{ height: 35,width:"100%" }} options={[{
                  label:"Male",
                  value:"Male"
                },{
                  label:"Female",
                  value:"Female"
                },{
                  label:"Transgender",
                  value:"Transgender"
                },]}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<>Ref.By</>}
                name="refBy"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input style={{ height: 35 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Area/Location 
                  </>
                }
                name="areaLocation"
                rules={[{ required: false }]}
                className="custom-input-doc-add"
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn my-4">
        <Button className="c-btn me-3" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button className="s-btn" onClick={updateDetails}>Save</Button>
      </div>
    </div>
  );
};

export default NavAddOutPatient;
