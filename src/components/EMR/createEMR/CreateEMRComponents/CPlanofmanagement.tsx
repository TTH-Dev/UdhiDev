import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { api_url } from "../../../../Config";
import moment from "moment";
import { TableCell, TableRow } from "@mui/material";

const CPlanofmanagement = () => {
  const [form] = Form.useForm();
  const id = sessionStorage.getItem("patientId");

  const [data, setData] = useState({
    patientId: id,
    investigation: "",
    medicalSheet: "",
    glassPrescription: "",
    procedure: "",
    _id: "",
  });

  const handleValue = async (_values: any, allValue: any) => {
    setData(allValue);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.post(
        `${api_url}/api/plan-of-management`,
        { ...data, patientId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getData();
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [isShow,setIsShow]=useState(false)

  const getData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(
        `${api_url}/api/plan-of-management?patientId=${id}&createdAt=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df = res?.data?.data?.planOfManageMents[0];
      
      if(df){
        setIsShow(true)
      }

      setData(df);
    } catch (error: any) {
      console.log(error);
      // message.error("Something went wrong!");
    }
  };

  const [ids, setIds] = useState("");
  const handleEdit = () => {
    setIds(data._id);
    form.setFieldsValue(data);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }

    try {
      await axios.patch(`${api_url}/api/plan-of-management/${ids}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIds("");
      form.resetFields();
      await getData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  console.log(data, "data");

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValue}
        className="emr-complaints-box mt-4 rounded p-4"
      >
        <Form.Item
          label="Investigation"
          name="investigation"
          className="box-title"
        >
          <Input
            placeholder="Enter investigation..."
            style={{ width: "40%", height: 40 }}
          />
        </Form.Item>

        <Form.Item
          label="Medical Sheet"
          name="medicalSheet"
          className="box-title"
        >
          <Input
            placeholder="Enter medical sheet..."
            style={{ width: "40%", height: 40 }}
          />
        </Form.Item>

        <Form.Item
          label="Glass Prescription"
          name="glassPrescription"
          className="box-title"
        >
          <Input
            placeholder="Enter glass prescription..."
            style={{ width: "40%", height: 40 }}
          />
        </Form.Item>

        <Form.Item label="Procedure" name="procedure" className="box-title">
          <Input
            placeholder="Enter procedure..."
            style={{ width: "40%", height: 40 }}
          />
        </Form.Item>

        <div
          className="d-flex justify-content-end save-cancel-btn mt-4"
          style={{ backgroundColor: "white" }}
        >
          {/* <Button onClick={onCancel} className="c-btn me-3">
            Cancel
          </Button> */}
          <Button
            type="primary"
            htmlType="submit"
            className="s-btn"
            onClick={ids ? handleUpdate : handleSave}
          >
            {ids ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
      {isShow&&
      <div className="pt-5">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text ps-2">Plan of management </p>
          </div>
          <div className="pe-4">
            <MdEdit
              style={{ color: "#3497F9", cursor: "pointer" }}
              onClick={handleEdit}
            />
          </div>
        </div>
        <div className="px-3">
          <TableRow>
            <TableCell style={{ width: "20%" }}>Investigation</TableCell>
            <TableCell style={{ width: "100%" }}>
              {data?.investigation || ""}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Medical Sheet </TableCell>
            <TableCell>{data?.medicalSheet || ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Glass Prescription</TableCell>
            <TableCell>{data?.glassPrescription || ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Procedure</TableCell>
            <TableCell>{data?.procedure || ""}</TableCell>
          </TableRow>
        </div>
      </div>}
    </>
  );
};

export default CPlanofmanagement;
