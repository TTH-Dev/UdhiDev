import { Button, Col, Form, Input, message, Radio, Row } from "antd";
import axios from "axios";
import styled from "styled-components";
import { api_url } from "../../../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const ScreenUsage = () => {
  const StyledForm = styled.div`
    :where(.css-dev-only-do-not-override-1v613y0).ant-form-vertical
      .ant-form-item:not(.ant-form-item-horizontal)
      .ant-form-item-row {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 0px;
      align-items: center;
    }
  `;

  const [form] = Form.useForm();
  const patientId = sessionStorage.getItem("patientId");

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const values = await form.validateFields();

      const data = {
        patientId: patientId,
        enteredDate: Date.now,
        section: "screenUsage",
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          booleanBox: values.hours == 1,
          inputBox: values.inputBox,
        },
      };

      await axios.post(`${api_url}/api/past-history`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getData(patientId);
      message.success("Data saved successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to save data.");
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const getData = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/past-history/getBy-section/?section=screenUsage&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const df = res.data.data.screenUsage[0];

      if (df && Object.keys(df).length > 0) {
        setIsUpdate(true);
        setUpdateId(df._id);
        form.setFieldsValue({
          inputBox: df.inputBox,
          hours: df.booleanBox === true ? 1 : 2,
        });
      } else {
        setIsUpdate(false);
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
        message.error("Login required!");
        return;
      }

      const values = await form.validateFields();

      const data = {
        patientId: patientId,
        enteredDate: Date.now,
        section: "screenUsage",
        sectionItemId: updateId,
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          booleanBox: values.hours == 1,
          inputBox: values.inputBox,
        },
      };

      await axios.post(`${api_url}/api/past-history/edit-section`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getData(patientId);
      message.success("Updated successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to save data.");
    }
  };

  useEffect(() => {
    if (patientId) {
      getData(patientId);
    }
  }, [patientId]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <Form>
          <StyledForm>
            <Row>
              <Col span={6}>
                <Form
                  form={form}
                  layout="vertical"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item
                    className=""
                    label={<span className="emr-label">Hours</span>}
                    name="hours"
                  >
                    <Radio.Group
                      className="ms-4"
                      name="radiogroup"
                      options={[
                        { value: 1, label: "Yes" },
                        { value: 2, label: "No" },
                      ]}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  layout="vertical"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item name="inputBox">
                    <Input style={{ width: "170px", height: 40 }} />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </StyledForm>
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn " onClick={isUpdate?handleUpdate:handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default ScreenUsage;
