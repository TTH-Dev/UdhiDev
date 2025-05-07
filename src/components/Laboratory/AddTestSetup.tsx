import { Button, Input, InputNumber, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {  IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";

const AddTestSetup = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState({
    testName: "",
    sampleType: "",
    price: 0,
    productName: "",
    quantityUsage: 0,
    countType: "",
    values: [
      {
        testVitals: "",
        referenceValues: "",
        unit: "",
      },
    ],
  });

  // Add new row dynamically
  const addNewRow = () => {
    setData((prevData) => ({
      ...prevData,
      values: [
        ...prevData.values,
        { testVitals: "", referenceValues: "", unit: "" },
      ],
    }));
  };

  // Handle input change in dynamic fields
  const handleVitalsChange = (
    index: number,
    field: keyof (typeof data)["values"][0],
    value: string
  ) => {
    const updatedValues = [...data.values];
    updatedValues[index][field] = value;
    setData({ ...data, values: updatedValues });
  };

  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/test`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/laboratory/test-setup");
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

      await axios.patch(`${api_url}/api/test/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/laboratory/test-setup");
      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [productName, setProductName] = useState([]);
  const getProductDrop = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/product/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let fgd = res.data.data.data.map((val: any) => ({
        label: val.productName,
        value: val.productName,
      }));
      setProductName(fgd);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getTestByID = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/test/${ids}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      setData(res.data.data.test)
      
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getProductDrop();
  }, []);

  useEffect(() => {
    if (id) {
      getTestByID(id);
    }
  }, [id]);

  return (
    <>
      <div className="cont">
        <div className="back-box-doc mb-3 mt-5 ms-3">
          <p className="back pt-5" style={{ color: "#414141" }}>
            <Link
              to="/laboratory/test-setup"
              style={{ color: "#414141", textDecoration: "none" }}
            >
              <i
                className="fi fi-br-angle-left"
                style={{ cursor: "pointer" }}
              ></i>
              <span
                className="ms-2"
                style={{
                  zIndex: "99",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "0",
                  color: "#414141",
                  cursor: "pointer",
                }}
              >
                Back
              </span>
            </Link>
          </p>
        </div>
        <div
          className="act-cont-c   ms-4"
          style={{ marginBottom: "10px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="emr-search-text mb-2">
                  {id ? "Edit" : "Add"} Test{" "}
                </p>
              </div>
            </div>

            <div>
              <div className="row">
                <div className="col-lg-6">
                  <div>
                    <label className="py-2">
                      Test Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Input
                      style={{ width: "100%", height: 40 }}
                      value={data.testName}
                      onChange={(e) =>
                        setData({ ...data, testName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <label className="py-2">
                      Price <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <InputNumber
                      type="number"
                      style={{ width: "100%", height: 40 }}
                      value={data.price || ""}
                      onChange={(value: any) =>
                        setData({ ...data, price: value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <label className="py-2">Sample type</label>
                    <br />
                    <Input
                      style={{ width: "100%", height: 40 }}
                      value={data.sampleType}
                      onChange={(e) =>
                        setData({ ...data, sampleType: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div>
                    <label className="py-2">Product Name</label>
                    <br />
                    <Select
                    showSearch
                      style={{ width: "100%", height: 40 }}
                      value={data.productName}
                      options={productName}
                      onChange={(value) =>
                        setData({ ...data, productName: value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div>
                    <label className="py-2">Quantity Usage</label>
                    <br />

                    <InputNumber
                      type="number"
                      min={0}
                      value={data.quantityUsage || ""}
                      onChange={(value: any) =>
                        setData({ ...data, quantityUsage: value })
                      }
                      style={{ width: "49%", height: 36 }}
                     
                    />

                    <Select
                      className="ms-1"
                      value={data.countType}
                      onChange={(value) =>
                        setData({ ...data, countType: value })
                      }
                      style={{ width: "49%", height: 40 }}
                      options={[
                        {
                          label: "ML",
                          value: "ml",
                        },
                        {
                          label: "Nos",
                          value: "nos",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div>
                {data.values.map((val: any, index: any) => (
                  <div className="row pb-2" key={index}>
                    <div className="col-lg-6">
                      <div>
                        <label className="py-2">Test Vitals</label>
                        <br />
                        <Input
                          style={{ width: "100%", height: 40 }}
                          value={val.testVitals}
                          onChange={(e) =>
                            handleVitalsChange(
                              index,
                              "testVitals",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div>
                        <label className="py-2">Unit in</label>
                        <br />
                        <Input
                          style={{ width: "100%", height: 40 }}
                          value={val.unit}
                          onChange={(e) =>
                            handleVitalsChange(index, "unit", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div>
                        <label className="py-2">Reference Value </label>
                        <br />
                        <Input
                          style={{ width: "100%", height: 40 }}
                          value={val.referenceValues}
                          onChange={(e) =>
                            handleVitalsChange(
                              index,
                              "referenceValues",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <span
                  onClick={addNewRow}
                  style={{ color: "#3497F9", cursor: "pointer" }}
                >
                  <IoIosAddCircleOutline className="mb-1" /> Add new
                </span>
              </div>
            </div>
          </Container>
        </div>

        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          <Button className="s-btn" onClick={id ? handleUpdate : handlePost}>
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddTestSetup;
