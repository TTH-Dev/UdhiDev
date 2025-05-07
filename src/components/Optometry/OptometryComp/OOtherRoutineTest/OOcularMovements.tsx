import { Form, Input, Button, Col, Row, message } from "antd";
import { api_url } from "../../../../Config";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const OcularMovements = () => {

  const patientId = sessionStorage.getItem("patientId");

  const [data, setData] = useState({
    patientId: patientId,
    enteredDate: new Date(),
    section: "ocularMovements",
    data: {
      patientId: patientId,
      enteredDate: new Date(),
      os: "",
      od: "",
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const hanldeSave = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.post(`${api_url}/api/other-routine-test/add-data`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Added successfully!");

    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const getData = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/other-routine-test/get-by-date?section=ocularMovements&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const df = res?.data?.data?.ocularMovements?.results[0];
      setData({
        patientId: patientId,
        enteredDate: new Date(),
        section: "ocularMovements",
        data: {
          patientId: patientId,
          enteredDate: new Date(),
          os: df?.os || "",
          od: df?.od || "",
        },
      });


      if (df && Object.keys(df).length > 0) {
        setIsUpdate(true);
        setUpdateId(df._id);
      } else {
        setIsUpdate(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {

      await axios.post(`${api_url}/api/other-routine-test/edit-data/${updateId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getData(patientId);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    if (patientId) {
      getData(patientId);
    }
  }, [patientId]);
  return (
    <>
      <div className="mh-ph pt-3">
        <Form className="px-4 ms-2">
          <Row gutter={16}>
            <Col xs={24} md={10}>
              <Form.Item>
                <label className="emr-label mb-1">OD</label><br />
                <Input value={data.data.od}
                  onChange={(e) =>
                    setData({
                      ...data,
                      data: {
                        ...data.data,
                        od: e.target.value,
                      },
                    })
                  } className="custom-input-bod" style={{ width: "455px", height: 40 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={10}>
              <Form.Item>
                <label className="emr-label mb-1">OS</label><br />
                <Input value={data.data.os}
                  onChange={(e) =>
                    setData({
                      ...data,
                      data: {
                        ...data.data,
                        os: e.target.value,
                      },
                    })
                  } className="custom-input-bod" style={{ width: "455px", height: 40 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={isUpdate ? handleUpdate : hanldeSave}
        >
          {isUpdate ? "Update" : "Save"}</Button>
      </div>
    </>
  );
};

export default OcularMovements;
