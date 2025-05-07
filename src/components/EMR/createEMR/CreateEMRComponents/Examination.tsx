import React from "react";
import { Form, Input, Row, Col, Button } from "antd";

const ExaminationFields = [
  { label: "Heart Rate", name: "heartrate" },
  { label: "Rhythm", name: "rhythm" },
  { label: "BP", name: "bp" },
  { label: "Temp", name: "temp" },
  { label: "Resp.Rate", name: "resprate" },
  { label: "SPO2", name: "spo2" },
  { label: "In/Out", name: "inout" },
];

const Examination: React.FC = () => {
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">General Examination</p>
        <Form layout="vertical">
          <Row gutter={16} justify="start">
            {ExaminationFields.map((field) => (
              <Col xs={24} md={5} key={field.name} style={{ margin: "0 10px" }}>
                <Form.Item
                  label={field.label}
                  name={field.name}
                  className="mx-5 emr-label"
                >
                  <Input style={{ borderRadius: "5px", width: "160px" }} />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn">Save</Button>
      </div>
    </>
  );
};

export default Examination;
