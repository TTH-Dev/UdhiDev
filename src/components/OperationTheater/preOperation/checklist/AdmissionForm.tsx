import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  TimePicker,
} from "antd";
import React from "react";

const AdmissionForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <div className="emr-complaints-box mx-3 p-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 py-3">Admission Form</p>
          </div>
          <div className="p-3">
            <span>QF/0T/F/09</span>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item
                name="admissionDate"
                label="Admission Date"
                className="emr-label"
              >
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="admissionTime"
                label="Admission Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="admissionReason"
                label="Admission Reason"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="dischargeDate"
                label="Discharge Date"
                className="emr-label"
              >
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="dischargeTime"
                label="Discharge Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="consultationName"
                label="Consultation Name"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNum"
                label="Phone Num"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="shifted"
                label="Shifted To OT/ Ward At"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="mobileNo"
                label="Mobile No"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="eyeCondition"
                label="Eye Condition"
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
                  <Radio value="dayCare">Day Care Admission</Radio>
                  <Radio value="inpatient">Inpatient Admission</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Form.Item>
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button className="s-btn me-3" onClick={() => form.submit()}>
            Save
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default AdmissionForm;
