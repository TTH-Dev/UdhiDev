import { Row, Col, Input, Button } from "antd";

const OTAssign = () => {
  return (
    <>
    
    
    <div className="emr-complaints-box mt-5 mx-3 rounded">
      <div>
        <p className="emr-search-text mb-0 p-3 pt-4">Assign</p>
      </div>
      <Row className="p-3" gutter={32}>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Surgeon </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Co-Surgeon </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Anesthetist </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Nursing staff </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
      </Row>
    </div>
    <div className="text-end my-4">

        <Button className="c-btn me-4">Cancel</Button>
        <Button className="s-btn me-3">Save</Button>
    </div>
    </>

  );
};

export default OTAssign;
