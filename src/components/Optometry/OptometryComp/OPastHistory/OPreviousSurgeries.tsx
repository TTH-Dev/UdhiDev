import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { api_url } from "../../../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const PreviousSurgeries = () => {
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
      console.log(values);

      const data = {
        patientId: patientId,
        enteredDate: Date.now,
        section: "previousSurgeries",
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          surgeries: values.surgeries,
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
        `${api_url}/api/past-history/getBy-section/?section=previousSurgeries&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const df = res.data.data.previousSurgeries[0];

      if (df && Object.keys(df).length > 0) {
        setIsUpdate(true);
        setUpdateId(df._id);
        form.setFieldsValue({
          surgeries: df.surgeries,
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
        section: "previousSurgeries",
        sectionItemId: updateId,
        data: {
          patientId: patientId,
          enteredDate: Date.now,
          surgeries: values.surgeries,
        },
      };
      await axios.post(`${api_url}/api/past-history/edit-section`, data, {
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

  useEffect(() => {
    if (patientId) {
      getData(patientId);
    }
  }, [patientId]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <Form form={form} layout="vertical">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              {" "}
              <Form.Item
                label={<span className="emr-label">Surgeries</span>}
                name="surgeries"
              >
                <TextArea rows={4} />
              </Form.Item>
            </div>
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

export default PreviousSurgeries;
