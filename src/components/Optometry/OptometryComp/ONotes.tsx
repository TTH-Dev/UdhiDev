import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";

const Notes: React.FC = () => {
  const id = sessionStorage.getItem("patientId");
  const [postData, setPostData] = useState({
    patientId: id,
    notes: "",
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/notes`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostData({
        patientId: id,
        notes: "",
      });
      await getData(id);
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
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
        `${api_url}/api/notes?patientId=${ids}&createdAt=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df = res?.data?.data?.notess[0];

      if (df) {
        setPostData((prev) => ({ ...prev, notes: df?.notes }));
        setIsUpdate(true);
        setUpdateId(df?._id);
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

      await axios.patch(`${api_url}/api/notes/${updateId}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getData(id);
      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <Form layout="vertical">
          <div style={{ position: "relative", paddingBottom: "1rem" }}>
            <Row gutter={16}>
              <Col xs={24} md={24}>
                <Form.Item
                  label={<span className="emr-label">Notes</span>}
                  rules={[{ message: "Write your notes here" }]}
                >
                  <Input.TextArea
                    rows={10}
                    value={postData.notes}
                    onChange={(e) =>
                      setPostData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Enter Notes"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        {/* <Button className="c-btn me-3">Cancel</Button> */}
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

export default Notes;
