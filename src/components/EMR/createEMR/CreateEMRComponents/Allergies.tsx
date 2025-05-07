import React from "react";
import { Form, Input, Row, Col, Button } from "antd";

const Allergies: React.FC = () => {
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Allergies</p>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Notes" name="notes">
                <Input.TextArea
                  rows={4}
                  placeholder="Enter Your Notes"
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

export default Allergies;
