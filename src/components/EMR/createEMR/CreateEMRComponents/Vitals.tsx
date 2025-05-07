import React from "react";
import { Form, Input, Row, Col, Button } from "antd";

const Vitals: React.FC = () => {
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Vitals</p>
        <Form layout="vertical">
          <Row gutter={16} justify="space-around">
            <Col xs={24} md={5}>
              <Form.Item label="Height" name="height">
                <Input
                  placeholder="Enter Height"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item label="Weight" name="weight">
                <Input
                  placeholder="Enter Weight"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item label="BMI" name="bmi">
                <Input
                  placeholder="Enter BMI"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item label="Waist Circumference" name="waistCircumference">
                <Input
                  placeholder="Enter Waist Circumference"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} justify="space-around">
            <Col xs={24} md={5}>
              <Form.Item label="BP Systolic" name="bpSystolic">
                <Input
                  placeholder="Enter BP Systolic"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item label="BP Diastolic" name="bpDiastolic">
                <Input
                  placeholder="Enter BP Diastolic"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item label="Pulse" name="pulse">
                <Input
                  placeholder="Enter Pulse"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item label="HC" name="hc">
                <Input placeholder="Enter HC" style={{ borderRadius: "5px" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="ms-2">
            <Col xs={24} md={5}>
              <Form.Item label="Temperature" name="temperature">
                <Input
                  placeholder="Enter Temperature"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
            </Col>
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

export default Vitals;
