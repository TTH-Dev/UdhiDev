import { Form, Input, Button, Col, Row, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../../../Config";
import moment from "moment";

const NonContactTonoMetry = () => {
  const patientId = sessionStorage.getItem("patientId");

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const [nonContactTonoMetryData, setNonContactTonoMetryData] = useState<any>([{
    os: "",
    iop: "",
    od: "",
  }]);

  const hanldeSave = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {

      const sendData = {
        patientId: patientId,
        enteredDate: new Date(),
        section: "nonContactTonoMetry",
        data: {
          patientId: patientId,
          enteredDate: new Date(),
          nonContactTonoMetry: nonContactTonoMetryData
        }
      };
      await axios.post(`${api_url}/api/other-routine-test/add-data`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Added successfully!");
      await getData(patientId);

    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
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

      const sendData = {
        patientId: patientId,
        enteredDate: new Date(),
        section: "nonContactTonoMetry",
        data: {
          patientId: patientId,
          enteredDate: new Date(),
          nonContactTonoMetry: nonContactTonoMetryData
        }
      };
      await axios.post(`${api_url}/api/other-routine-test/edit-data/${updateId}`, sendData, {
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

  const getData = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/other-routine-test/get-by-date?section=nonContactTonoMetry&patientId=${ids}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const df = res?.data?.data?.nonContactTonoMetry?.results[0];

      const eff = res.data.data.nonContactTonoMetry.results[0].nonContactTonoMetry;
      setNonContactTonoMetryData(eff)
      if (df && Object.keys(df).length > 0) {
        setIsUpdate(true);
        console.log(df);

        setUpdateId(df._id);
      } else {
        setIsUpdate(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRepeatTest = () => {
    setNonContactTonoMetryData([
      ...nonContactTonoMetryData,
      {
        os: "",
        iop: "",
        od: "",
      }
    ]);
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
          {nonContactTonoMetryData.map((item: any, index: any) => (
            <div key={index}>
              <Row gutter={16}>
                <Col xs={24} md={10}>
                  <Form.Item>
                    <label className="emr-label mb-1">IOP</label>
                    <br />
                    <Input
                      className="custom-input-bod"
                      suffix="MMHG"
                      style={{ width: "455px", height: 40 }}
                      value={item.iop}
                      onChange={(e) => {
                        const newData = [...nonContactTonoMetryData];
                        newData[index].iop = e.target.value;
                        setNonContactTonoMetryData(newData);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={10}>
                  <Form.Item>
                    <label className="emr-label mb-1">OD</label>
                    <br />
                    <Input
                      suffix="MMHG"
                      value={item.od}
                      onChange={(e) => {
                        const newData = [...nonContactTonoMetryData];
                        newData[index].od = e.target.value;
                        setNonContactTonoMetryData(newData);
                      }}
                      className="custom-input-bod"
                      style={{ width: "455px", height: 40 }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={10}>
                  <Form.Item>
                    <label className="emr-label mb-1">OS</label>
                    <br />
                    <Input
                      suffix="MMHG"
                      className="custom-input-bod"
                      style={{ width: "455px", height: 40 }}
                      value={item.os}
                      onChange={(e) => {
                        const newData = [...nonContactTonoMetryData];
                        newData[index].os = e.target.value;
                        setNonContactTonoMetryData(newData);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ))}

          <Row gutter={16}>
            <Col xs={24} md={10} className="pb-3">
              <span
                style={{ textDecoration: "underline", color: "#3497F9", cursor: "pointer" }}
                onClick={handleRepeatTest}
              >
                Repeat test
              </span>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
        <Button className="s-btn" onClick={isUpdate ? handleUpdate : hanldeSave}
        >
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default NonContactTonoMetry;
