import { Button, Form, Input, message } from "antd";
import styled from "styled-components";
import { api_url } from "../../../../Config";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const Typeofallergies = () => {
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
        section: "typeOfAllergies",
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          injections: values.injections,
          tablets: values.tablets,
          eyeDrops: values.eyeDrops,
          anyOthers: values.anyOthers,
        },
      };
      await axios.post(`${api_url}/api/past-history`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        `${api_url}/api/past-history/getBy-section/?section=typeOfAllergies&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const df = res.data.data.typeOfAllergies[0];
  
      if (df && Object.keys(df).length > 0) { 
        setIsUpdate(true);
        setUpdateId(df._id);
        form.setFieldsValue({
          injections: df.injections,
          tablets: df.tablets,
          eyeDrops: df.eyeDrops,
          anyOthers: df.anyOthers,
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
        sectionItemId: updateId,
        enteredDate: Date.now,
        section: "typeOfAllergies",
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          injections: values.injections,
          tablets: values.tablets,
          eyeDrops: values.eyeDrops,
          anyOthers: values.anyOthers,
        },
      };
      await axios.post(`${api_url}/api/past-history/edit-section`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Updated successfully!");
      await  getData(patientId);
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
        <StyledForm>
          <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label={<span className="emr-label">Injections</span>}
              name="injections"
            >
              <Input style={{ width: "268px", height: 40 }} />
            </Form.Item>
            <Form.Item
              label={<span className="emr-label">Tablets</span>}
              name="tablets"
            >
              <Input style={{ width: "268px", height: 40 }} />
            </Form.Item>
            <Form.Item
              label={<span className="emr-label">Eye Drops</span>}
              name="eyeDrops"
            >
              <Input style={{ width: "268px", height: 40 }} />
            </Form.Item>
            <Form.Item
              label={<span className="emr-label">Any Others</span>}
              name="anyOthers"
            >
              <Input style={{ width: "268px", height: 40 }} />
            </Form.Item>
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

export default Typeofallergies;
