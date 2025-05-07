import { Form, Input, Button } from "antd";

const HistoryofPresentIllness = () => {
  return (
    <>
      <div className="mh-ph pt-3">
        <p className="mh-ph-text ms-4 ps-3">Personal History</p>
        <Form className="px-4 ms-2">
          <Form.Item>
            <Input.TextArea
              rows={4}
              placeholder="Enter the Personal History"
            ></Input.TextArea>
          </Form.Item>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default HistoryofPresentIllness;
