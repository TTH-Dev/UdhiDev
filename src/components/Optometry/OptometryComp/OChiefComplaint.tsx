import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import { api_url } from "../../../Config";
import axios from "axios";
import moment from "moment";

const ChiefComplaint: React.FC = () => {
  const [form] = Form.useForm();

  const id = sessionStorage.getItem("patientId");
  const [datas, setDatas] = useState({
    patientId: id,
    enteredDate: Date.now,
    notes: "",
    since: {
      year: "",
      month: "",
      day: "",
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateID] = useState("");

  const getDetails = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/chief-complaint?patientId=${ids}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.data?.chiefComplaints.length > 0) {
        setDatas({
          patientId: ids,
          enteredDate: Date.now,
          notes: res?.data?.data?.chiefComplaints[0]?.notes,
          since: {
            year: res?.data?.data?.chiefComplaints[0]?.since?.year,
            month: res?.data?.data?.chiefComplaints[0]?.since?.month,
            day: res?.data?.data?.chiefComplaints[0]?.since?.day,
          },
        });
        form.setFieldsValue(res?.data?.data?.chiefComplaints[0]);
        let df = res?.data?.data?.chiefComplaints[0];
        if (
          df?.notes ||
          df?.since?.year ||
          df?.since?.month ||
          df?.since?.day
        ) {
          setUpdateID(df?._id);
          setIsUpdate(true);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await form.validateFields();
      await axios.post(`${api_url}/api/chief-complaint`, datas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.resetFields();

      setDatas({
        patientId: id,
        enteredDate: Date.now,
        notes: "",
        since: { year: "", month: "", day: "" },
      });
      message.success("Added Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
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

      await axios.patch(
        `${api_url}/api/chief-complaint/getById/${updateId}`,
        datas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Updated successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleFormChange = (_changedValues: any, allValues: any) => {
    setDatas((prevState) => ({
      ...prevState,
      ...allValues,
      since: {
        ...prevState.since,
        year: allValues.year || prevState.since.year,
        month: allValues.month || prevState.since.month,
        day: allValues.day || prevState.since.day,
      },
    }));
  };

  useEffect(() => {
    if (id) {
      getDetails(id);
    }
  }, [id]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">Chief Complaints</p>
          <p className="emr-search-text">QF/OP/F/01</p>
        </div>
        <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
          <div style={{ position: "relative", paddingBottom: "1rem" }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="emr-label">Notes</span>}
                  name={"notes"}
                  rules={[{ message: "Write your notes here" }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter Notes"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={4} md={4}>
                <Form.Item
                  label={<span className="emr-label">Year</span>}
                  name="year"
                  rules={[{ message: "Please enter year" }]}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Input
                      value={datas?.since?.year}
                      className="no-arrow-input"
                      style={{ width: "100%", height: 40 }}
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col xs={4} md={4}>
                <Form.Item
                  label={<span className="emr-label">Month</span>}
                  name="month"
                  rules={[{ message: "Please enter month" }]}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Input
                      value={datas?.since?.month}
                      className="no-arrow-input"
                      style={{ width: "100%", height: 40 }}
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col xs={4} md={4}>
                <Form.Item
                  label={<span className="emr-label">Day</span>}
                  name="day"
                  rules={[{ message: "Please enter date" }]}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Input
                      value={datas?.since?.day}
                      className="no-arrow-input"
                      style={{ width: "100%", height: 40 }}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
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

export default ChiefComplaint;
