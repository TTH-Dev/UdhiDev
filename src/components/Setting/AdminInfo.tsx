import { Button, Col, Form, Input, message, Row, Upload } from "antd";
import axios from "axios";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const AdminInfo = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState({
    email: "",
    phoneNo: "",
    role: "",
    name: "",
    profileImage: null,
    position: "",
  });
  const [originalImage, setOriginalImage] = useState<string>("");

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
      form.setFieldsValue(res.data.admin);
      setOriginalImage(res.data.admin.profileImage);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    setData(allValues);
  };

  const handleUpdateAdmin = async () => {
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
          if (key === "profileImage") {
            if (value.file && value.file !== originalImage) {
              formData.append(key, value.file);
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      await axios.patch(`${api_url}/api/admin/update-admin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Admin info updated successfully!");
      await getMe();
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
          <p className="emr-search-text mb-0 pb-3">Admin Info</p>

          <Form
            layout="vertical"
            form={form}
            onValuesChange={handleValuesChange}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Profile Photo</span>}
                  name="profileImage"
                >
                  <Upload beforeUpload={() => false} accept="image/*">
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                {data.profileImage && (
                  <img
                    className="img-fluid pb-3"
                    width={"150px"}
                    src={`${api_url}/public/images/${data.profileImage}`}
                  />
                )}
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Name</span>}
                  name={"name"}
                  rules={[{ message: "Please enter Name" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Position</span>}
                  name={"position"}
                  rules={[{ message: "Please enter Position" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Email Id</span>}
                  name={"email"}
                  rules={[{ message: "Please enter Email Id" }]}
                >
                  <Input style={{ width: "90%", height: 40 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Phone No</span>}
                  name={"phoneNo"}
                  rules={[{ message: "Please enter Phone No" }]}
                >
                  <Input
                    value={data?.phoneNo}
                    style={{ width: "90%", height: 40 }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn pb-4">
        <Button className="s-btn " onClick={handleUpdateAdmin}>
          Save
        </Button>
      </div>
    </>
  );
};

export default AdminInfo;
