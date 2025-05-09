import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Radio,
    Row,
    TimePicker,
    Upload
} from "antd";
import { api_url } from "../../../../Config";
import axios from "axios";


const PreOperativeCheckList: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

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
      formData.append("preOperativeChecklistData", JSON.stringify(gg));
      await axios.post(`${api_url}/api/preOperativeChecklist`, formData, {
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







  return (
    <>
      <div className="emr-complaints-box mx-3 p-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 py-3">
              Pre-OPerative Check List
            </p>
          </div>
          <div className="p-3">
            <span>QF/0T/F/09</span>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                name="identificationOfPatient"
                label="Identification of patient"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="Yes" style={{ color: "#595959" }}>
                    Yes
                  </Radio>
                  <Radio value="No" style={{ color: "#595959" }}>
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="biometryLensGrade"
                label="Biometry and lens grade"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="eyeToBeOperated"
                label="Eye to be operated"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="OD" style={{ color: "#595959" }}>
                    OD
                  </Radio>
                  <Radio value="OS" style={{ color: "#595959" }}>
                    OS
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="pulse" label="Pulse" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p className="emr-search-text mb-0 py-3 ps-3"> IOP</p>
              <div className="d-flex">
                <Col span={12}>
                  <Form.Item name="iOPod" label="OD" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="ioPsos" label="OS" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
              </div>
            </Col>

            <Col span={12} className="mt-5 pt-2">
              <Form.Item name="bp" label="B.P" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p className="emr-search-text mb-0 py-3 ps-3"> NLD</p>
              <div className="d-flex">
                <Col span={12}>
                  <Form.Item name="nLDod" label="OD" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="nLDos" label="OS" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
              </div>
            </Col>

            <Col span={12} className="mt-5 pt-2">
              <Form.Item
                name="respiratoryRate"
                label="Respiratory rate"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p className="emr-search-text mb-0 py-3 ps-3"> Drug Allergy</p>
              <div className="d-flex">
                <Col span={12}>
                  <Form.Item name="dilationYes" label="Yes" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="dilationNo" label="No" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
              </div>
            </Col>

            <Col span={12}>
              <Form.Item
                name="patientIsComfortable"
                label="Patient is comfortable"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="Yes" className="emr-label">
                    Yes
                  </Radio>
                  <Radio value="No" className="emr-label">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <p className="emr-search-text mb-0 py-3 ps-3">
                {" "}
                Adequacy of dilation
              </p>
              <div className="d-flex">
                <Col span={12}>
                  <Form.Item name="yes" label="Yes" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="no" label="No" className="emr-label">
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
              </div>
            </Col>
            <Col span={12} style={{marginTop:"-70px"}}>
              <Form.Item
                name="eyeToBeOperated2"
                label="Eye to be operated"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="OD" style={{ color: "#595959" }}>
                    OD
                  </Radio>
                  <Radio value="OS" style={{ color: "#595959" }}>
                    OS
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            
           
            <Col span={12} className="" >
              <Form.Item
                name="checkedBy"
                label="Checked By"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12} style={{marginTop:"-140px"}}>
              <Form.Item
                name="preOperativeMeditation"
                label="Pre operative Meditation"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="yes" style={{ color: "#595959" }}>
                    Yes
                  </Radio>
                  <Radio value="no" style={{ color: "#595959" }}>
                    NO
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
           
            <Col span={12}></Col>
            <Col span={12} style={{marginTop:"-150px"}}>
              <Form.Item
                name="systemicMeditation"
                label="Systemic Meditation"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="yes" style={{ color: "#595959" }}>
                    Yes
                  </Radio>
                  <Radio value="no" style={{ color: "#595959" }}>
                    NO
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}></Col>
            <Col span={12} style={{marginTop:"-70px"}}>
              <Form.Item
                name="consentFromObtained"
                label="Consent form obtained"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="yes" style={{ color: "#595959" }}>
                    Yes
                  </Radio>
                  <Radio value="no" style={{ color: "#595959" }}>
                    N O
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}></Col>
            <Col span={12} style={{marginTop:"-10px"}}>
              <Form.Item
                name="signatureDocument"
                label="Signature Document"
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
          <div>
            <p className="emr-search-text mb-0 py-3">
            Post Operative-Check List
            </p>
          </div>
          <Row gutter={32}>
        
            <Col span={12}>
              <Form.Item
                name="pulse2"
                label="Pulse"
                className="emr-label"
              >
                <Input style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="shifted"
                label="Shifting from OT to Inpatient / Out Patient"
                className="emr-label"
              >
                <Input style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bp2"
                label="B.P"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="review"
                label="Review date and time on"
                className="emr-label"
              >
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="respiratoryRate2"
                label="Respiratory Rate"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="postOperativeInstructionandMedication"
                label="Post operative instruction and medication"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="admissionType"
                label="Type of Admission"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="yes" style={{ color: "#595959" }}> Yes</Radio>
                  <Radio value="no" style={{ color: "#595959" }}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="explainedBy"
                label="Explained by"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px" ,width:"100%"}} />
              </Form.Item>
            </Col>

         
      

         
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Form.Item>
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button className="s-btn me-3" onClick={handleSave}>
            Save
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default PreOperativeCheckList;
