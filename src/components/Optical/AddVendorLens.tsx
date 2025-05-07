import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, Input, message } from "antd";
import axios from "axios";
import { api_url } from "../../Config";

const AddVendorLens: React.FC = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({
    vendorName: "",
    accountNumber: "",
    address: "",
    city: "",
    pincode: "",
    phoneNo: "",
    contactPersonName: "",
    emailId: "",
    vendorType: "Lens",
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      if (!data.vendorName) {
        message.error("Vendor name required!");
        return;
      }

      const phoneRegex = /^\d{10}$/;

      if (data.phoneNo && !phoneRegex.test(data.phoneNo.trim())) {
        message.error("Phone number must be exactly 10 digits!");
        return;
      }

      if (data.emailId) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.emailId)) {
          message.error("Enter valid email!");
          return;
        }
      }

      await axios.post(`${api_url}/api/optical-vendor`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        vendorName: "",
        accountNumber: "",
        address: "",
        city: "",
        pincode: "",
        phoneNo: "",
        contactPersonName: "",
        emailId: "",
        vendorType: "Frame",
      });

      message.success("Created Successfully!");
      navigate("/optical/vendor")
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const getVendor = async (ids:any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(
        `${api_url}/api/optical-vendor/getById/${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      setData(res?.data?.data?.opticalVendor)
      
    } catch (error: any) {
      console.log(error);
    }
  };


  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      if (!data.vendorName) {
        message.error("Vendor name required!");
        return;
      }

      const phoneRegex = /^\d{10}$/;

      if (data.phoneNo && !phoneRegex.test(data.phoneNo.trim())) {
        message.error("Phone number must be exactly 10 digits!");
        return;
      }

      if (data.emailId) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.emailId)) {
          message.error("Enter valid email!");
          return;
        }
      }

      await axios.patch(`${api_url}/api/optical-vendor/getById/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        vendorName: "",
        accountNumber: "",
        address: "",
        city: "",
        pincode: "",
        phoneNo: "",
        contactPersonName: "",
        emailId: "",
        vendorType: "Frame",
      });

      message.success("Updated Successfully!");
      navigate("/optical/vendor")
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getVendor(id);
    }
  }, [id]);

  return (
    <>
      <div className="cont">
        <div className="mt-5 pt-5 ms-4 mb-0">
          <p className="back pb-2" style={{ color: "#414141" }}>
            <Link
              to="/optical/vendor"
              style={{ textDecoration: "none", color: "#414141" }}
            >
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
            </Link>
          </p>
        </div>
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "60px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-4">
            <p className="emr-search-text mb-3">{id?"Edit":"Add New"} Vendor ( Lens )</p>
            <div className="row">
              <div className="col-lg-6">
                <label className="mb-2 label-style">
                  Vendor name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.vendorName}
                  onChange={(e) =>
                    setData({ ...data, vendorName: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Address</label>
                <Input
                  style={{ height: 40 }}
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
                <label className="mb-2 label-style">City</label>
                <Input
                  style={{ height: 40 }}
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                />
                <label className="mb-2 label-style">Pin code</label>
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.pincode}
                  onChange={(e) =>
                    setData({ ...data, pincode: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6">
                <label className="mb-2 label-style">Account Number</label>
                <br />
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.accountNumber}
                  onChange={(e) =>
                    setData({ ...data, accountNumber: e.target.value })
                  }
                />
                <br />
                <label className="mb-2 label-style">Phone Number</label>
                <br />
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.phoneNo}
                  onChange={(e) =>
                    setData({ ...data, phoneNo: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Contact Person Name</label>
                <br />
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.contactPersonName}
                  onChange={(e) =>
                    setData({ ...data, contactPersonName: e.target.value })
                  }
                />
                <label className="mb-2 label-style">Email Id</label>
                <br />
                <Input
                  style={{ height: 40, width: "100%" }}
                  value={data.emailId}
                  onChange={(e) =>
                    setData({ ...data, emailId: e.target.value })
                  }
                />
              </div>
            </div>
          </Container>
        </div>
        <div className="d-flex justify-content-end save-cancel-btn my-4">
          <Link to="/optical/vendor">
            <Button className="c-btn me-3">Cancel</Button>
          </Link>
          <Button className="s-btn" onClick={id?handleEdit:handleSave}>
            {id?"Update":"Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddVendorLens;
