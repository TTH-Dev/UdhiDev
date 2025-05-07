import {
  Button,
  Col,
  DatePicker,
  Input,
  message,
  Row,
  Select,
  TimePicker,
} from "antd";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const EditNewIp = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [data, setData] = useState({
    fullName: "",
    age: "",
    sex: "",
    attenderName: "",
    attenderNo: "",
    govIdType: "",
    govIdNo: "",
    ipDate: "",
    time: "",
    admissionReason: "",
    careRequired: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data.patient.ipData, "ll");
      let df = res?.data?.data?.patient?.ipData;
      if (df) {
        setData(df);
        setIsUpdate(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const hanldeSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      await axios.patch(
        `${api_url}/api/patient/${id}`,
        { patientStatus: "Inpatient", ipData: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className=" mb-3 ms-4 mb-0">
        <span onClick={() => navigate(-1)}>
          <p className="back" style={{ color: "#414141" }}>
            <i
              className="fi fi-br-angle-left"
              style={{ cursor: "pointer" }}
            ></i>
            <span
              style={{
                zIndex: "999",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "0",
                color: "#414141",
                cursor: "pointer",
              }}
              className="ms-2 "
            >
              Back
            </span>
          </p>
        </span>
      </div>
      <div className="emr-complaints-box py-4 px-3 mx-3 rounded mb-5">
        <div>
          <p className="emr-search-text mb-0 p-4">Admission Details</p>
        </div>
        <Row gutter={32} className="px-4">
          <Col span={12}>
            <label className="emr-label my-2"> Full Name</label>
            <br />
            <Input
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          </Col>

          <Col span={6}>
            <label className="emr-label my-2">Date</label>
            <br />
            <DatePicker
              style={{ width: "100%" }}
              value={data.ipDate ? dayjs(data.ipDate) : null}
              onChange={(date: any, _dateString: any) =>
                setData({ ...data, ipDate: date })
              }
            />
          </Col>
          <Col span={6}>
            <label className="emr-label my-2">Time</label>
            <br />
            <TimePicker
              style={{ width: "100%" }}
              use12Hours
              format="hh:mm A"
              value={data?.time ? dayjs(data.time, "hh:mm A") : null}
              onChange={(_time: any, timeString: any) =>
                setData({ ...data, time: timeString })
              }
            />
          </Col>
          <Col span={6}>
            <label className="emr-label my-2"> Age</label>
            <br />
            <Input
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
            />
          </Col>
          <Col span={6}>
            <label className="emr-label my-2">Sex</label>
            <br />
            <Select
              style={{ width: "100%" }}
              value={data?.sex}
              onChange={(value) => setData({ ...data, sex: value })}
              options={[
                {
                  label: "Male",
                  value: "Male",
                },
                {
                  label: "Female",
                  value: "Female",
                },
                {
                  label: "TransGender",
                  value: "TransGender",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <label className="emr-label my-2">Admission Reason</label>
            <br />
            <Input
              style={{ width: "100%" }}
              value={data?.admissionReason}
              onChange={(e) =>
                setData({ ...data, admissionReason: e.target.value })
              }
            />
          </Col>
          <Col span={6}>
            <label className="emr-label my-2"> Attender Name</label>
            <br />
            <Input
              value={data?.attenderName}
              onChange={(e) =>
                setData({ ...data, attenderName: e.target.value })
              }
            />
          </Col>
          <Col span={6}>
            <label className="emr-label my-2">Attender No</label>
            <br />
            <Input
              value={data?.attenderNo}
              onChange={(e) => setData({ ...data, attenderNo: e.target.value })}
            />
          </Col>
          <Col span={12}>
            <label className="emr-label my-2">Care Required</label>
            <br />
            <Input
              style={{ width: "100%" }}
              value={data?.careRequired}
              onChange={(e) =>
                setData({ ...data, careRequired: e.target.value })
              }
            />
          </Col>
          <Col span={12}>
            <label className="emr-label my-2">Gov Id No</label>
            <br />
            <Input
              value={data?.govIdNo}
              onChange={(e) => setData({ ...data, govIdNo: e.target.value })}
            />
          </Col>
          <Col span={12}>
            <label className="emr-label my-2">Gov Id Type</label>
            <br />
            <Input
              style={{ width: "100%" }}
              value={data?.govIdType}
              onChange={(e) => setData({ ...data, govIdType: e.target.value })}
            />
          </Col>
        </Row>
      </div>
      <div className="text-end mb-5 me-3">
        {/* <Button className="c-btn me-5">Cancel</Button> */}
        <Button className="s-btn" onClick={hanldeSave}>
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default EditNewIp;
