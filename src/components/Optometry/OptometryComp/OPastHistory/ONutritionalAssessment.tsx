import { Button, Checkbox, Form, message } from "antd";
import styled from "styled-components";
import { api_url } from "../../../../Config";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const NutritionalAssessment = () => {
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
        section: "nutritionalAssessment",
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          normal:values.normal,
          diabetic: values.diabetic,
          renalFailure: values.renalFailure,
          cirrhosis: values.cirrhosis,
          hypertensive: values.hypertensive,
          jaundice: values.jaundice,
          special: values.special,
          anyOther: values.anyOther,
        }
      }
      
      await axios.post(`${api_url}/api/past-history`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getData(patientId)
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
          `${api_url}/api/past-history/getBy-section/?section=nutritionalAssessment&patientId=${ids}&enteredDate=${moment(
            new Date()
          ).format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        const df = res.data.data.nutritionalAssessment[0];
    
        if (df && Object.keys(df).length > 0) { 
          setIsUpdate(true);
          setUpdateId(df._id);
          form.setFieldsValue({
            anyOther: df.anyOther,
            cirrhosis: df.cirrhosis,
            diabetic: df.diabetic,
            hypertensive: df.hypertensive,
            jaundice: df.jaundice,
            normal: df.normal,
            renalFailure: df.renalFailure,
            special: df.special,
          });
        } else {
          setIsUpdate(false);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    const handleUpdate=async()=>{
      try{
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
          section: "nutritionalAssessment",
          data: {
            patientId: patientId,
            enteredDate: Date.now,
            normal:values.normal,
            diabetic: values.diabetic,
            renalFailure: values.renalFailure,
            cirrhosis: values.cirrhosis,
            hypertensive: values.hypertensive,
            jaundice: values.jaundice,
            special: values.special,
            anyOther: values.anyOther,
          }
        }
        
        await axios.post(`${api_url}/api/past-history/edit-section`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Updated successfully!")
        await getData(patientId)
        
      }catch(error:any){
        console.log(error);
        message.error("Something went wrong!")
      }
    }


    useEffect(()=>{
      if(patientId){
        getData(patientId)
      }

    },[patientId])

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <StyledForm>
          <Form
            layout="vertical"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
          >
            {[
              { label: "Normal", name: "normal" },
              { label: "Diabetic", name: "diabetic" },
              { label: "Renal Failure", name: "renalFailure" },
              { label: "Chirrhosis", name: "cirrhosis" },
              { label: "Hypertensive", name: "hypertensive" },
              { label: "Special", name: "jaundice" },
              { label: "Jaundice", name: "special" },
              {
                label: "Any other",
                name: "anyOther",
              },

            ].map((field) => (
              <Form.Item
                key={field.name}
                label={<span className="emr-label">{field.label}</span>}
                name={field.name}
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            ))}
          </Form>
        </StyledForm>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn " onClick={isUpdate?handleUpdate:handleSave}>{isUpdate?"Update":"Save"}</Button>
      </div>
    </>
  );
};

export default NutritionalAssessment;
