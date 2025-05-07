import { DatePicker, Row, Col, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useRef } from "react";

const PreAuthorizationBScan = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="emr-complaints-box  p-3 px-4" ref={printRef}>
        <Row gutter={32}>
          <Col span={24}>
            <div>
              <label className="mb-2 emr-label">Date</label>
              <br />
              <DatePicker />
            </div>
          </Col>
          <Col span={24} className="my-2">
            <div>
              <label className="mb-2 emr-label">To</label>
              <br />
              <TextArea autoSize style={{ width: "50%" }} />
            </div>
          </Col>
          <Col span={24} className="my-2">
            <div>
              <label className="mb-2 emr-label">Dear sir / Mam,</label>
              <br />
              <TextArea autoSize style={{ width: "50%" }} />
            </div>
          </Col>

          <p className="emr-search-text ps-4 mt-2 mb-1" style={{ color: "black" }}>
            Left Eye
          </p>
          <Col span={24} className="my-2 d-flex">
            <Col span={6}>
              <div>
                <label className="mb-2 emr-label">ONH</label>
                <br />
                <TextArea autoSize />
              </div>
            </Col>
            <Col span={6}>
              <div>
                <label className="mb-2 emr-label">RCS</label>
                <br />
                <TextArea autoSize />
              </div>
            </Col>
          </Col>

          <Col span={24}>
            <div>
              <label className="mb-2 emr-label">Vitreous Cavity</label>
              <br />
              <TextArea autoSize style={{ width: "25%" }} />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label className="mb-2 emr-label">SUGGESTED</label>
              <br />
              <TextArea autoSize />
            </div>
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-end mt-5 me-2">
        <Button className="c-btn me-5">Cancel</Button>
        <Button className="s-btn" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </div>
  );
};

export default PreAuthorizationBScan;
