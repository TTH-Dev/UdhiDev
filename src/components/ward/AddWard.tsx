import { Button, Col, InputNumber, message, Row, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";

const AddWard = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const editId = searchParam.get("editId");
  const floor = sessionStorage.getItem("wardFloor");
  const [data, setData] = useState<any>({
    floor: floor,
    wardType: "",
    amount: 0,
    room: {
      roomNo: 0,
      noOfBed: 0,
    },
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      await axios.post(`${api_url}/api/ward`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Saved Successfully!");
      navigate("/ward/ward-setup");
    } catch (error: any) {
      console.log(error);
    }
  };

  const getWard = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/ward/${editId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let dg = res?.data?.data?.ward;

      let gh = {
        floor: dg?.floor,
        wardType: dg?.wardType,
        room: {
          noOfBed: dg?.room[0]?.noOfBed,
          roomNo: dg?.room[0]?.roomNo,
        },
        amount: dg?.amount,
      };
      setData(gh);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      await axios.patch(`${api_url}/api/ward/${editId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Updated Successfully!");
      navigate("/ward/ward-setup");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editId) {
      getWard();
    }
  }, [editId]);

  return (
    <div className="">
      <div className=" ms-3 ">
        <span
          className=""
          style={{ cursor: "pointer", fontSize: "18px" }}
          onClick={() => navigate(-1)}
        >
          {" "}
          <i className="fi fi-br-angle-left " style={{ fontSize: "14px" }}></i>
          Back{" "}
        </span>
      </div>
      <div className="emr-complaints-box mt-4 mx-3 rounded">
        <div>
          <p className="emr-search-text mb-0 p-3 pt-4">
            {editId ? "Edit" : "Add"} Ward
          </p>
        </div>
        <Row className="p-3" gutter={32}>
          <Col span={12} className="my-2">
            <div>
              <label className="emr-label mb-2">Ward Type </label>
              <br />
              <Select
                style={{ height: "35px", width: "100%" }}
                disabled={editId ? true : false}
                options={[
                  {
                    label: "General",
                    value: "general",
                  },
                  {
                    label: "Special",
                    value: "special",
                  },
                ]}
                value={data?.wardType}
                onChange={(value) => setData({ ...data, wardType: value })}
              />
            </div>
          </Col>
          <Col span={12} className="my-2">
            <div>
              <label className="emr-label mb-2">Amount </label>
              <br />
              <InputNumber
                value={data?.amount || ""}
                onChange={(value) => setData({ ...data, amount: value })}
                type="number"
                style={{ height: "35px", width: "100%" }}
              />
            </div>
          </Col>
          <Col span={12} className="my-2">
            <div>
              <label className="emr-label mb-2">Room No </label>
              <br />
              <InputNumber
                disabled={editId ? true : false}
                value={data?.room?.roomNo || ""}
                onChange={(value) =>
                  setData({
                    ...data,
                    room: {
                      ...data?.room,
                      roomNo: value,
                    },
                  })
                }
                type="number"
                style={{ height: "35px", width: "100%" }}
              />
            </div>
          </Col>
          <Col span={12} className="my-2">
            <div>
              <label className="emr-label mb-2">No of Bed </label>
              <br />
              <InputNumber
                value={data?.room?.noOfBed || ""}
                onChange={(value) =>
                  setData({
                    ...data,
                    room: {
                      ...data?.room,
                      noOfBed: value,
                    },
                  })
                }
                type="number"
                style={{ height: "35px", width: "100%" }}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="text-end my-4">
        <Button className="c-btn me-4">Cancel</Button>
        <Button
          className="s-btn me-3"
          onClick={editId ? handleUpdate : handleSave}
        >
          {editId ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default AddWard;
