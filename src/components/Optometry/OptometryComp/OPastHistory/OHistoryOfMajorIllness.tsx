import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { api_url } from "../../../../Config";
import moment from "moment";
import { useEffect, useState } from "react";

const HistoryOfMajorIllness = () => {
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
  const illnesses = [
    "Peptic Ulcer / Gastritis",
    "Diabetes",
    "Hypertension",
    "Renal Disease",
    "Ischaemic Heart Disease",
    "Thyroid",
    "Pulmonary disease/ Bronchial asthma",
    "CNS / Stroke",
    "Other Diseases",
  ];

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const values = await form.validateFields();

      const historyData = illnesses.map((illness) => {
        const fieldName = illness.replace(/\s+/g, "");
        return {
          typeName: illness,
          typeValue: values[fieldName] || "",
          nil: values[`${fieldName}_nil`] || false,
        };
      });

      const payload = {
        patientId,
        enteredDate: new Date().toISOString().split("T")[0],
        section: "historyOfMajorIllness",
        data: {
          patientId,
          enteredDate: new Date().toISOString().split("T")[0],
          HistoryOfMajorIllnessSchema: historyData,
        },
      };

      await axios.post(`${api_url}/api/past-history`, payload, {
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
        `${api_url}/api/past-history/getBy-section/?section=historyOfMajorIllness&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df =
        res.data.data.historyOfMajorIllness[0].HistoryOfMajorIllnessSchema;

      if (df && df.length > 0) {
        setIsUpdate(true);
        setUpdateId(res?.data?.data?.historyOfMajorIllness[0]?._id);
      } else {
        setIsUpdate(false);
      }
      const formValues: any = {};
      df.forEach((item: any) => {
        const fieldName = item.typeName.replace(/\s+/g, "");
        formValues[fieldName] = item.typeValue;
        formValues[`${fieldName}_nil`] = item.nil;
      });

      form.setFieldsValue(formValues);
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

      const historyData = illnesses.map((illness) => {
        const fieldName = illness.replace(/\s+/g, "");
        return {
          typeName: illness,
          typeValue: values[fieldName] || "",
          nil: values[`${fieldName}_nil`] || false,
        };
      });

      const payload = {
        patientId,
        sectionItemId: updateId,
        enteredDate: new Date().toISOString().split("T")[0],
        section: "historyOfMajorIllness",
        data: {
          patientId,
          enteredDate: new Date().toISOString().split("T")[0],
          HistoryOfMajorIllnessSchema: historyData,
        },
      };

      await axios.post(`${api_url}/api/past-history/edit-section`, payload, {
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
      {" "}
      <div className="emr-complaints-box mt-4 rounded p-4">
        <StyledForm>
          <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            {illnesses.map((illness, index) => {
              const fieldName = illness.replace(/\s+/g, "");

              return (
                <div
                  key={index}
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <Form.Item
                    label={<span className="emr-label">{illness}</span>}
                    name={fieldName}
                    style={{ marginBottom: 0, width: "100%" }}
                  >
                    <Input style={{ width: "268px", height: 40 }} />
                  </Form.Item>

                  <Form.Item
                    name={`${fieldName}_nil`}
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox>Nil</Checkbox>
                  </Form.Item>
                </div>
              );
            })}
          </Form>
        </StyledForm>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button
          className="s-btn "
          onClick={isUpdate ? handleUpdate : handleSave}
        >
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default HistoryOfMajorIllness;
