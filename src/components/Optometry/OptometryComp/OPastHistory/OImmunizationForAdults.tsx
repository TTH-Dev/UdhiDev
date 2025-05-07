import { Button, Checkbox, Form, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { api_url } from "../../../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const ImmunizationForAdults = () => {
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

  const patientId = sessionStorage.getItem("patientId");
  const [adultForm] = Form.useForm();
  const [childForm] = Form.useForm();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const adultValues = await adultForm.validateFields();
      const childValues = await childForm.validateFields();

      const data = {
        patientId: patientId,
        enteredDate: Date.now(),
        section: "immunizationForAdults",
        data: {
          patientId: patientId,
          enteredDate: Date.now(),
          forAdults: {
            influenza: adultValues.influenza,
            pneumococcal: adultValues.pneumococcal,
            hepatitisA: adultValues.hepatitisA,
            hepatitisB: adultValues.hepatitisB,
            measlesMumps: adultValues.measlesMumps,
            rubella: adultValues.rubella,
            anyOther: adultValues.anyOther,
            injectionTetanusToxoid: adultValues.injectionTetanusToxoid,
          },
          forChildrens: {
            influenza: childValues.influenza,
            pneumococcal: childValues.pneumococcal,
            hepatitisA: childValues.hepatitisA,
            hepatitisB: childValues.hepatitisB,
            measlesMumps: childValues.measlesMumps,
            rubella: childValues.rubella,
            anyOther: childValues.anyOther,
            injectionTetanusToxoid: childValues.injectionTetanusToxoid,
            ForPediatricsAsPerVaccinationSchedule:
              childValues.pediatricsSchedule,
          },
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
        `${api_url}/api/past-history/getBy-section/?section=immunizationForAdults&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df = res.data.data.immunizationForAdults[0];
      console.log(df);

      if (df) {
        setIsUpdate(true);
        setUpdateId(df?._id);
        adultForm.setFieldsValue({
          influenza: df?.forAdults?.influenza,
          pneumococcal: df?.forAdults?.pneumococcal,
          hepatitisA: df?.forAdults?.hepatitisA,
          hepatitisB: df?.forAdults?.hepatitisB,
          measlesMumps: df?.forAdults?.measlesMumps,
          rubella: df?.forAdults?.rubella,
          anyOther: df?.forAdults?.anyOther,
          injectionTetanusToxoid: df?.forAdults?.injectionTetanusToxoid,
        });
        childForm.setFieldsValue({
          influenza: df?.forChildrens?.influenza,
          pneumococcal: df?.forChildrens?.pneumococcal,
          hepatitisA: df?.forChildrens?.hepatitisA,
          hepatitisB: df?.forChildrens?.hepatitisB,
          measlesMumps: df?.forChildrens?.measlesMumps,
          rubella: df?.forChildrens?.rubella,
          anyOther: df?.forChildrens?.anyOther,
          injectionTetanusToxoid: df?.forChildrens?.injectionTetanusToxoid,
          pediatricsSchedule:
            df?.forChildrens?.ForPediatricsAsPerVaccinationSchedule,
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

      const adultValues = await adultForm.validateFields();
      const childValues = await childForm.validateFields();

      const data = {
        patientId: patientId,
        enteredDate: Date.now(),
        section: "immunizationForAdults",
        sectionItemId: updateId,
        data: {
          patientId: patientId,
          enteredDate: Date.now(),
          forAdults: {
            influenza: adultValues.influenza,
            pneumococcal: adultValues.pneumococcal,
            hepatitisA: adultValues.hepatitisA,
            hepatitisB: adultValues.hepatitisB,
            measlesMumps: adultValues.measlesMumps,
            rubella: adultValues.rubella,
            anyOther: adultValues.anyOther,
            injectionTetanusToxoid: adultValues.injectionTetanusToxoid,
          },
          forChildrens: {
            influenza: childValues.influenza,
            pneumococcal: childValues.pneumococcal,
            hepatitisA: childValues.hepatitisA,
            hepatitisB: childValues.hepatitisB,
            measlesMumps: childValues.measlesMumps,
            rubella: childValues.rubella,
            anyOther: childValues.anyOther,
            injectionTetanusToxoid: childValues.injectionTetanusToxoid,
            ForPediatricsAsPerVaccinationSchedule:
              childValues.pediatricsSchedule,
          },
        },
      };

      await axios.post(`${api_url}/api/past-history/edit-section`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Update successfully!");
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
      <div className="row">
        <div className="col-lg-6">
          <div className="emr-complaints-box mt-4 rounded p-4">
            <p style={{ fontSize: "16px", fontWeight: 700 }}>For Adults</p>
            <StyledForm>
              <Form
                layout="vertical"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                form={adultForm}
              >
                {[
                  { label: "Influenza", name: "influenza" },
                  { label: "Pneumococcal", name: "pneumococcal" },
                  { label: "Hepatitis A", name: "hepatitisA" },
                  { label: "Hepatitis B", name: "hepatitisB" },
                  { label: "Measles, Mumps", name: "measlesMumps" },
                  { label: "Rubella", name: "rubella" },
                  { label: "Any other", name: "anyOther" },
                  {
                    label: "Injection Tetanus Toxoid",
                    name: "injectionTetanusToxoid",
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
        </div>
        <div className="col-lg-6">
          <div className="emr-complaints-box mt-4 rounded p-4">
            <p style={{ fontSize: "16px", fontWeight: 700 }}>For Children</p>
            <StyledForm>
              <Form
                layout="vertical"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                form={childForm}
              >
                {[
                  { label: "Influenza", name: "influenza" },
                  { label: "Pneumococcal", name: "pneumococcal" },
                  { label: "Hepatitis A", name: "hepatitisA" },
                  { label: "Hepatitis B", name: "hepatitisB" },
                  { label: "Measles, Mumps", name: "measlesMumps" },
                  { label: "Rubella", name: "rubella" },
                  { label: "Any other", name: "anyOther" },
                  {
                    label: "Injection Tetanus Toxoid",
                    name: "injectionTetanusToxoid",
                  },
                  {
                    label: "For Pediatrics As Per Vaccination Schedule",
                    name: "pediatricsSchedule",
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
        </div>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button
          className="s-btn"
          onClick={isUpdate ? handleUpdate : handleSave}
        >
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default ImmunizationForAdults;
