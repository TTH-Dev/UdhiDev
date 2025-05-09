import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_url } from "../../../../Config";
import moment from "moment";

const PreAnestheticFitness: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  const [postData, setPostData] = useState<any>({
    presentComplaint: "",
    cvs: "",
    pastIllness: "",
    rs: "",
    presentMedication: "",
    bp: "",
    presentInvestigation: "",
    pluse: "",
    ecg: "",
    name: "",
    underGo: "",
  });

  const patientId = sessionStorage.getItem("patientId");
  const [isUpdate,setIsUpdate]=useState(false)
  const [isUpdateId,setIsUpdateId]=useState("")
  const getData=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return; 
      }
      const res=await axios.get(`${api_url}/api/preAnestheticFitness?patientId=${patientId}&date=${moment().format("YYYY-MM-DD")}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      let df=res.data.data.fitnessEntries[0]
      if(df){
        setPostData(df?.preAnestheticFitnessData)
        setIsUpdate(true)
        setIsUpdateId(df?._id)
      }
      
    }catch(error:any){
      console.log(error);
      
    }
  }
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      const formData = new FormData();
      formData.append("patientId", patientId || "-");
      formData.append("preAnestheticFitnessData", JSON.stringify(postData));
      await axios.post(`${api_url}/api/preAnestheticFitness`, formData, {
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

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      const formData = new FormData();
      formData.append("patientId", patientId || "-");
      formData.append("preAnestheticFitnessData", JSON.stringify(postData));
      await axios.patch(`${api_url}/api/preAnestheticFitness/${isUpdateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Updated Successfully!");
      await getData()
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
            <p className="emr-search-text mb-0 py-3">Pre Anesthetist Fitness</p>
          </div>
          <div className="p-3">
            <span>QF/0T/F/09</span>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="Present Complaint" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.presentComplaint}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      presentComplaint: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CVS" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.cvs}
                  onChange={(e) =>
                    setPostData({ ...postData, cvs: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Past Illness" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.pastIllness}
                  onChange={(e) =>
                    setPostData({ ...postData, pastIllness: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="RS" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.rs}
                  onChange={(e) =>
                    setPostData({ ...postData, rs: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Present Medication" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.presentMedication}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      presentMedication: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="BP" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.bp}
                  onChange={(e) =>
                    setPostData({ ...postData, bp: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Present Investigation" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.presentInvestigation}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      presentInvestigation: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Pulse" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.pluse}
                  onChange={(e) =>
                    setPostData({ ...postData, pluse: e.target.value })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}></Col>
            <Col span={12}>
              <Form.Item label="ECG" className="emr-label">
                <Input
                  style={{ height: "40px" }}
                  value={postData?.ecg}
                  onChange={(e) =>
                    setPostData({ ...postData, ecg: e.target.value })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Input
                style={{ height: "40px" }}
                value={postData?.name}
                onChange={(e) =>
                  setPostData({ ...postData, name: e.target.value })
                }
              />
            </Col>

            <Col span={8}>
              <span className="">Examined by me She/He is fit to undergo</span>
            </Col>

            <Col span={8}>
              <Input
                style={{ height: "40px" }}
                value={postData?.underGo}
                onChange={(e) =>
                  setPostData({ ...postData, underGo: e.target.value })
                }
              />
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

export default PreAnestheticFitness;
