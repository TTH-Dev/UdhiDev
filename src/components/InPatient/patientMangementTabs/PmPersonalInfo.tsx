import { Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { api_url } from "../../../Config";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PmPersonalInfo = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let df = res?.data?.data?.patient;
      if (df) {
        setData(df);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="patient-detail-pi rounded ">
      <div className="emr-complaints-box p-3 px-4">
        <p className="emr-search-text "> Patient Details</p>

        <Row>
          <Col className="d-flex my-4">
            <div style={{ width: "100px", height: "100px" }} className="me-4">
              <FaUserCircle style={{ fontSize: "100px", color: "#595959" }} />
            </div>
            <div className=" mt-1">
              <div>
                <p className="head-title mb-0">{data?.PatientName || "-"}</p>
              </div>
              <div>
                <p style={{ color: "#3497F9" }}>{data?.UHIDId || "-"}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p className="emr-search-text "> Patient Details</p>

            <div className="patient-detail-grid-pi">
              <div className="label-pi user-text">Phone Num:</div>
              <div className="value-pi">{data?.phoneNo || "-"}</div>

              <div className="label-pi user-text">Email:</div>
              <div className="value-pi">{data?.emailId || "-"}</div>

              <div className="label-pi user-text">Area / Location:</div>
              <div className="value-pi">{data?.areaLocation || "-"}</div>

              <div className="label-pi user-text">Blood Group:</div>
              <div className="value-pi">{data?.bloodGroup || "-"}</div>

              <div className="label-pi user-text">Age:</div>
              <div className="value-pi">{data?.age || "-"}</div>

              <div className="label-pi user-text">Sex:</div>
              <div className="value-pi">{data?.sex || "-"}</div>
            </div>
          </Col>
          <Col span={12}>
            <p className="emr-search-text "> Admission Details</p>

            <div className="patient-detail-grid-pi">
              <div className="label-pi user-text">Admission Reason:</div>
              <div className="value-pi">
                {data?.ipData?.admissionReason || "-"}
              </div>

              <div className="label-pi user-text">Attender Name:</div>
              <div className="value-pi">
                {data?.ipData?.attenderName || "-"}
              </div>

              <div className="label-pi user-text">Attender No:</div>
              <div className="value-pi">{data?.ipData?.attenderNo || "-"}</div>

              <div className="label-pi user-text">Care Required:</div>
              <div className="value-pi">
                {data?.ipData?.careRequired || "-"}
              </div>

              <div className="label-pi user-text">Gov ID:</div>
              <div className="value-pi">{data?.ipData?.govIdNo || "-"}</div>

              <div className="label-pi user-text">Gov ID Type:</div>
              <div className="value-pi">{data?.ipData?.govIdType || "-"}</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PmPersonalInfo;
