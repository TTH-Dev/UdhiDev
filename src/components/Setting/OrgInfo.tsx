import { Button, Col, Form, Input, message, Row, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../Config";
import { UploadOutlined } from "@ant-design/icons";

const OrgInfo = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState({
    organizationLogo: "",
    organizationName: "",
    websiteLink: "",
    gstNumber: "",
    organizationContactNo: "",
    organizationEmailId: "",
    organizationWorkingsDays: "",
    organizationTiming: "",
    tanNumber: "",
    panNumber: "",
    salaryStampSignature: "",
    form16Signature: "",
    form16ResponsibleUser: "",
    branchName: "",
  });

  const handleValueChanges = (_newValue: any, allValues: any) => {
    setData(allValues);
  };

  const handlePostOrg = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) => {
        if (value) {
          if (
            key === "organizationLogo" ||
            key === "salaryStampSignature" ||
            key === "form16Signature"
          ) {
            formData.append(key, value.file);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

     await axios.post(`${api_url}/api/organization`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Saved Successfully!")

    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [id, setId] = useState("");

  const getMe = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/admin/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.admin);
      setId(res.data.admin.organizationId);
      await getOrg(res.data.admin.organizationId);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [ogImages, setOgImages] = useState<any>({
    organizationLogo: "",
    salaryStampSignature: "",
    form16Signature: "",
  });

  const getOrg = async (ids: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/organization/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data.organization);
      setOgImages(res.data.data.organization);
      form.setFieldsValue(res.data.data.organization);
    } catch (error: any) {
      console.log(error);
      // message.error("Something went wrong!");
    }
  };

  const handleUpdateOrg = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) => {
        if (value) {
          if (
            [
              "organizationLogo",
              "form16Signature",
              "salaryStampSignature",
            ].includes(key)
          ) {
            // Check if value.file exists and has changed
            if (value.file && ogImages[key] !== value.file) {
              formData.append(key, value.file);
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      await axios.patch(`${api_url}/api/organization/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Updated successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
        <div className=" my-3">
          <p className="emr-search-text mb-0 pb-3">Organization</p>

          <Form
            layout="vertical"
            form={form}
            onValuesChange={handleValueChanges}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Upload Logo</span>}
                  name={"organizationLogo"}
                  rules={[{ message: "Please Upload Logo" }]}
                >
                  <Upload beforeUpload={() => false} accept="image/*">
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                {data?.organizationLogo && (
                  <img
                    className="img-fluid"
                    style={{ width: "80px" }}
                    src={`${api_url}/public/images/${data.organizationLogo}`}
                  />
                )}
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">GST Number</span>}
                  name={"gstNumber"}
                  rules={[{ message: "Please enter GST number" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">organizationName</span>}
                  name={"organizationName"}
                  rules={[{ message: "Please enter Organization Name" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">PAN</span>}
                  name={"panNumber"}
                  rules={[{ message: "Please enter PAN" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Website Link</span>}
                  name={"websiteLink"}
                  rules={[{ message: "Please enter Website Link" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">TAN</span>}
                  name={"tanNumber"}
                  rules={[{ message: "Please enter TAN" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="emr-label">Salary Stamp / Signature</span>
                  }
                  name={"salaryStampSignature"}
                  rules={[
                    { message: "Please Upload Salary Stamp / Signature" },
                  ]}
                >
                  <Upload beforeUpload={() => false} accept="image/*">
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                {data?.salaryStampSignature && (
                  <img
                    style={{ width: "80px" }}
                    className="img-fluid"
                    src={`${api_url}/public/images/${data.salaryStampSignature}`}
                  />
                )}
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="emr-label">Organization Contact No</span>
                  }
                  name={"organizationContactNo"}
                  rules={[{ message: "Please enter Organization Contact No" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Form 16 Signature</span>}
                  name={"form16Signature"}
                  rules={[{ message: "Please Upload Form 16 Signature" }]}
                >
                  <Upload beforeUpload={() => false} accept="image/*">
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                {data?.form16Signature && (
                  <img
                    style={{ width: "80px" }}
                    className="img-fluid"
                    src={`${api_url}/public/images/${data.form16Signature}`}
                  />
                )}
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="emr-label">Organization Email id</span>
                  }
                  name={"organizationEmailId"}
                  rules={[{ message: "Please enter Organization Email id" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="emr-label">Form16 Responsible user</span>
                  }
                  name={"form16ResponsibleUser"}
                  rules={[{ message: "Please enter Form16 Responsible user" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="emr-label">
                      Organization Workings Days
                    </span>
                  }
                  name={"organizationWorkingsDays"}
                  rules={[
                    { message: "Please enter Organization Workings Days" },
                  ]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Branch Name</span>}
                  name={"branchName"}
                  rules={[{ message: "Please enter Branch Name" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Organization Timing</span>}
                  name={"organizationTiming"}
                  rules={[{ message: "Please enter Organization Timing" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn pb-4">
        <Button
          className="s-btn "
          onClick={id ? handleUpdateOrg : handlePostOrg}
        >
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default OrgInfo;
