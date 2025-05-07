import React, { useEffect, useState } from "react";
import { Button, Row, Col, Select, InputNumber, message } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const AddConsultancyFees: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [data, setData] = useState({
    feesType: "",
    feesAmount: null,
  });

  const handlePostfees = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }

    if (!data.feesAmount || !data.feesType) {
      message.error("All fields required!");
      return;
    }

    await axios.post(`${api_url}/api/consulty-fees`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate(-1);
    message.success("Saved Successfully!");
    try {
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlegetFees = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/consulty-fees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data.consultingFee);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleUpdatefees = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }

    await axios.patch(`${api_url}/api/consulty-fees/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate(-1);
    message.success("Updated Successfully!");
    try {
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      handlegetFees();
    }
  }, [id]);

  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <Link
            to="/doctors/consultancy-fees"
            style={{ textDecoration: "none", color: "#414141" }}
          >
            <i
              className="fi fi-br-angle-left"
              style={{ cursor: "pointer" }}
            ></i>
            <span
              className="ms-2"
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#414141",
                cursor: "pointer",
              }}
            >
              Back
            </span>
          </Link>
        </p>
      </div>

      <div className="doc-details-main-box-cf p-3  rounded my-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div
              className="doctor-detail-box p-3  rounded"
              style={{ backgroundColor: "white", border: "none" }}
            >
              <p className="emr-search-text py-3">Consulting fees detail</p>

              <Row gutter={[8, 8]} className="pb-3">
                <Col span={12}>
                  <p className="cfd-label mb-2">
                    Fees Type<span style={{ color: "red" }}>*</span>
                  </p>
                  <Select
                    placeholder="Select an option"
                    style={{ width: "90%", borderRadius: "2px", height: 40 }}
                    className="custom-select-doc"
                    value={data.feesType}
                    options={[
                      {
                        label: "General",
                        value: "General",
                      },
                      {
                        label: "Corporate",
                        value: "Corporate",
                      },
                      {
                        label: "Insurance",
                        value: "Insurance",
                      },
                      {
                        label: "Follow Up",
                        value: "Follow-Up",
                      },
                    ]}
                    onChange={(value) => setData({ ...data, feesType: value })}
                  />
                </Col>
                <br />
                <Col span={12}>
                  <p className="cfd-label mb-2">
                    Fees Amount<span style={{ color: "red" }}>*</span>
                  </p>
                  <InputNumber
                    value={data.feesAmount}
                    style={{ height: 40, width: "90%" }}
                    suffix="₹"
                    onChange={(value: any) =>
                      setData({ ...data, feesAmount: value })
                    }
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mb-4">
        <Button className="c-btn me-3" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button
          className="s-btn"
          onClick={id ? handleUpdatefees : handlePostfees}
        >
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default AddConsultancyFees;
