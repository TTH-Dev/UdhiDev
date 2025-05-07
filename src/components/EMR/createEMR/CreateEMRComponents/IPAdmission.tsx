import React from "react";
import { Form, Input, Row, Col, Button } from "antd";

const IPAdmission: React.FC = () => {
  // const [complaints, setComplaints] = useState([{ id: 1 }]);

  const complaints = [
    {
      id: 1,
    },
  ];

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Admit Reason</p>
        <Form layout="vertical">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              style={{ position: "relative", paddingBottom: "1rem" }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span className="emr-label">Admission Reason</span>}
                    name={`admissionReason-${complaint.id}`}
                    rules={[{ message: "Please enter admission reason" }]}
                  >
                    <Input
                      placeholder="Enter Admission Reason"
                      style={{ width: "100%",height:40 }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label={
                      <span className="emr-label">
                        Tentative stay in hospital
                      </span>
                    }
                    name={`admissionReason-${complaint.id}`}
                    rules={[
                      { message: "Please enter Tentative stay in hospital" },
                    ]}
                  >
                    <Input
                      placeholder="Enter Admission Reason"
                      style={{ width: "100%",height:40 }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span className="emr-label">Notes</span>}
                    name={`notes-${complaint.id}`}
                    rules={[{ message: "Write your notes here" }]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter Notes"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ))}
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default IPAdmission;
