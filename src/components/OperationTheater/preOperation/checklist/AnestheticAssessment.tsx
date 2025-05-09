import { UploadOutlined } from "@ant-design/icons";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Col, Form, Input, message, Radio, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { api_url } from "../../../../Config";
import axios from "axios";
import moment from "moment";

const AnestheticAssessment: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const [postData,setPostData]=useState({
    temp:"",
    pluse:"",
    respiration	:"",
    bp:"",

  })

  const patientId = sessionStorage.getItem("patientId");
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      const formData = new FormData();
      let gg=form.getFieldsValue()
      formData.append("patientId", patientId || "-");
      formData.append("anestheticsAssessmentData", JSON.stringify({...postData,...gg}));
      await axios.post(`${api_url}/api/anestheticsAssessment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState("");
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/anestheticsAssessment?patientId=${patientId}&date=${moment().format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let df = res.data.data.assessments[1]      ;
      if (df) {
    
        form.setFieldsValue(df?.anestheticsAssessmentData);
        setPostData(df?.anestheticsAssessmentData);
        setIsUpdate(true);
        setIsUpdateId(df?._id);
      }
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

      const formData = new FormData();
      let gg=form.getFieldsValue()
      formData.append("patientId", patientId || "-");
      formData.append("anestheticsAssessmentData", JSON.stringify({...postData,...gg}));
      await axios.patch(`${api_url}/api/anestheticsAssessment/${isUpdateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

useEffect(()=>{
if(patientId){
  getData()
}
},[patientId])

  return (
    <>
      <div className="emr-complaints-box mx-3 p-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 py-3">Anesthetist assessment</p>
          </div>
          <div className="p-3">
            <span>QF/0T/F/09</span>
          </div>
        </div>
        <div>
          <p className="emr-search-text mb-0 py-3">On Examination</p>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S. No</TableCell>
                <TableCell className="emr-label">Vitals</TableCell>
                <TableCell className="emr-label">At Admission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Temp</TableCell>
                <TableCell>
                  <Input value={postData?.temp} onChange={(e)=>setPostData({...postData,temp:e.target.value})}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Pulse</TableCell>
                <TableCell>
                  <Input  value={postData?.pluse} onChange={(e)=>setPostData({...postData,pluse:e.target.value})}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Respiration</TableCell>
                <TableCell>
                  <Input  value={postData?.respiration} onChange={(e)=>setPostData({...postData,respiration:e.target.value})}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>B.P</TableCell>
                <TableCell>
                  <Input  value={postData?.bp} onChange={(e)=>setPostData({...postData,bp:e.target.value})}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={32} className="px-3 mt-4">
            <Col span={12}>
              <Form.Item
                name="bowelHabits"
                label="Bowel Habits"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="eyeCondition"
                label="Eye Condition ( any pain, redness, swelling, abscess)"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="anyUrinary"
                label="Any Urinary"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nameoftheAnaesthetist"
                label="Name of the Anaesthetist"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="retention"
                label="Retention"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="yes" style={{color:"#595959"}}>Yes</Radio>
                  <Radio value="no" style={{color:"#595959"}}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12} style={{ marginTop: "-10px" }}>
              <Form.Item
                name="signatureDocument"
                label="Signature Document (Anesthetist)"
                className="emr-label"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload name="file" action="/upload" listType="text">
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Form.Item>
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button className="s-btn me-3" onClick={isUpdate?handleUpdate:handleSave}>
            {isUpdate?"Update":"Save"}
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default AnestheticAssessment;
