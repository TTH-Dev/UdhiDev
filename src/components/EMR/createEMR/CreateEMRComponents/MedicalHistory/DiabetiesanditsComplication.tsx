import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const DiabetesandItsComplication = () => {
  const fieldnames = [
    {
      name: "Duration Of DM",
    },
    {
      name: "Glycemic Control",
    },
    {
      name: "Hyperglycemic Episodes",
    },
  ];
  const [ismodalopen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mh-ph-box pt-3">
        {fieldnames.map((field) => (
          <div>
            <Form className="px-3">
              <Form.Item>
                <div>
                  <label className=" mh-ph-text" style={{ minWidth: "200px" }}>
                    {field.name}
                  </label>
                  <Input
                    placeholder=""
                    style={{ width: "25%", borderRadius: "3px" }}
                  ></Input>
                </div>
              </Form.Item>
            </Form>
          </div>
        ))}

        <Button
          className="add-more-ph ps-3"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <IoIosAddCircleOutline className="add-icon" /> Add more
        </Button>
      </div>
      <Modal
        title="Add New Field"
        open={ismodalopen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form className="p-3">
          <Row>
            <Col md={24}>
              <Form.Item>
                <div>
                  <label
                    className="mx-1 mh-ph-text pb-2"
                    style={{ minWidth: "200px", display: "block" }}
                  >
                    Field Name
                  </label>
                  <Input
                    placeholder=""
                    style={{ width: "100%", borderRadius: "3px" }}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <div className="d-flex justify-content-end save-cancel-btn ">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default DiabetesandItsComplication;
