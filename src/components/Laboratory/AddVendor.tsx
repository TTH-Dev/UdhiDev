import { TableCell, TableRow } from "@mui/material";
import { Button, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";

const AddVendor = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState({
    vendorName: "",
    bankIFSCCode: "",
    communicationMode: "",
    purchaseLimit: 0,
    deliveryDay: "",
    bankAccountNumber: "",
    paymentType: "",
    daysToDeliver: 0,
    gstNo: "",
    taxType: "",
    bankName: "",
    creditPeriod: 0,
    status: "",
    hospital: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }

    try {
      await axios.post(`${api_url}/api/vendor`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Added Successfully!");
      navigate("/laboratory/vendor");
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
      await axios.patch(`${api_url}/api/vendor/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Updated Successfully!");
      navigate("/laboratory/vendor");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getDetail = async (ids: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/vendor/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data.vendor);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };




  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  return (
    <>
      <div className="cont">
        <div className="back-box-doc mt-5 ms-3">
          <p className="back pt-5 pb-3" style={{ color: "#414141" }}>
            <Link
              to={"/laboratory/vendor"}
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
          <Container fluid className="emr-doc-box py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="emr-search-text mb-0">
                  {id ? "Edit" : "Add New"} Vendor
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Vendor Name
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        value={data?.vendorName}
                        onChange={(e) =>
                          setData({ ...data, vendorName: e.target.value })
                        }
                        style={{ height: 35, width: "100px" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Bank IFSC Code
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        value={data?.bankIFSCCode}
                        onChange={(e) =>
                          setData({ ...data, bankIFSCCode: e.target.value })
                        }
                        className=""
                        style={{ width: "100px", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Communication Mode
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        value={data?.communicationMode}
                        onChange={(e) =>
                          setData({
                            ...data,
                            communicationMode: e.target.value,
                          })
                        }
                        style={{ height: 35, width: "100px" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Limit
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        value={data?.purchaseLimit || ""}
                        onChange={(value) =>
                          setData({ ...data, purchaseLimit: Number(value) })
                        }
                        type="number"
                        style={{ height: 35, width: "100px" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Delivery Day
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.deliveryDay}
                        onChange={(e) =>
                          setData({ ...data, deliveryDay: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Bank account Number
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.bankAccountNumber}
                        onChange={(e) =>
                          setData({
                            ...data,
                            bankAccountNumber: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Payment Type
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ width: "100px", height: 35 }}
                        value={data?.paymentType}
                        onChange={(e) =>
                          setData({ ...data, paymentType: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Days to deliver
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        value={data?.daysToDeliver || ""}
                        onChange={(value) =>
                          setData({ ...data, daysToDeliver: Number(value) })
                        }
                        type="number"
                        style={{ height: 35, width: "100px" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>GST No</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.gstNo}
                        onChange={(e) =>
                          setData({ ...data, gstNo: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Tax Type</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.taxType}
                        onChange={(e) =>
                          setData({ ...data, taxType: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Bank Name</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.bankName}
                        onChange={(e) =>
                          setData({ ...data, bankName: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Credit Period
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        value={data?.creditPeriod || ""}
                        onChange={(value) =>
                          setData({ ...data, creditPeriod: Number(value) })
                        }
                        type="number"
                        style={{ width: "100px", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Status</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.status}
                        onChange={(e) =>
                          setData({ ...data, status: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Hospital</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.hospital}
                        onChange={(e) =>
                          setData({ ...data, hospital: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Location</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data?.location}
                        onChange={(e) =>
                          setData({ ...data, location: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          <Button className="s-btn" onClick={id ? handleUpdate : handleSave}>
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddVendor;
