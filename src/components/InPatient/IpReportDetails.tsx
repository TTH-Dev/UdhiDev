import { Avatar, message } from "antd";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const IpReportDetails = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [data, setData] = useState<any>();
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.data.patient, "res");
      setData(res?.data?.data?.patient);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);
  return (
    <div>
      <div className="mx-3 ">
        <Container fluid className="emr-doc-box py-3 mx-2">
          <Row className="g-4 flex-wrap ">
            <Col xs={12} md={3} className="d-flex flex-shrink-0">
              <div className="me-3">
                <Avatar style={{ height: "75px", width: "75px" }}>
                  {data?.PatientName || "-"}
                </Avatar>
              </div>
              <div className="mt-2">
                <div
                  style={{
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p className="emr-doc-name mb-1">
                    {data?.PatientName || "-"}
                  </p>
                </div>
                <div
                  style={{
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p className="emr-doc-id">{data?.UHIDId || "-"}</p>
                </div>
              </div>
            </Col>

            <Col xs={12} md={4} className="emr-visit-details">
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <div className="emr-doc-text">Phone Number</div>
                  <div className="emr-pat-text-new">
                    : {data?.phoneNo || "-"}
                  </div>
                </p>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <div className="emr-doc-text">Patient Type</div>
                  <div className="emr-pat-text-new">
                    : {data?.patientType || "-"}
                  </div>
                </p>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <div className="emr-doc-text">Area/Location</div>
                  <div className="emr-pat-text-new">
                    : {data?.areaLocation || "-"}
                  </div>
                </p>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              ></div>
            </Col>

            <Col xs={12} md={4} className="emr-visit-details">
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <div className="emr-doc-text">Age</div>
                  <div className="emr-pat-text-new">: {data?.age || "-"}</div>
                </p>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <div className="emr-doc-text">Sex</div>
                  <div className="emr-pat-text-new">: {data?.sex || "-"}</div>
                </p>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <div className="emr-doc-text">OP No</div>
                  <div className="emr-pat-text-new">: {data?.opNo || "-"}</div>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="emr-complaints-box mx-3 my-5 px-3 py-3 rounded ">
        <Row>
          <p className="emr-search-text "> Over all report</p>

          <Col span={12} className="mt-3">
            <p className="emr-search-text ">Data detail </p>

            <div className="patient-detail-grid-pi mt-3">
              <div className="label-pi user-text">Surgery Date </div>
              <div className="value-pi">
                :{" "}
                {data?.surgeryDetailsId?.surgeryDate
                  ? moment(data?.surgeryDetailsId?.surgeryDate).format(
                      "DD-MM-YYYY"
                    )
                  : "-"}
              </div>

              <div className="label-pi user-text">Admitted Date </div>
              <div className="value-pi">
                :{" "}
                {data?.admittedDate
                  ? moment(data?.admittedDate).format("DD-MM-YYYY")
                  : "-"}
              </div>

              <div className="label-pi user-text">Discharge date</div>
              <div className="value-pi">
                {data?.dischargeDate
                  ? moment(data?.dischargeDate).format("DD-MM-YYYY")
                  : "-"}
              </div>

              <div className="label-pi user-text">Ward</div>
              <div className="value-pi">
                {(data?.bedManagement?.wardType).toUpperCase()}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IpReportDetails;
