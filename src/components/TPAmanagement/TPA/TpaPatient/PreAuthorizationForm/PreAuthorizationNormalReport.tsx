import { TextField } from "@mui/material";
import { Button, Col, DatePicker, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import  { useRef } from "react";

const PreAuthorizationNormalReport = () => {
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
    <>
    <div className="emr-complaints-box p-3" ref={printRef} >
  
      <div>
       
        <div>
          <Row gutter={32}>
            <Col span={24}>
            <div>
        <label className="mb-2 emr-label">Date</label>
        <br />
        <DatePicker />
      </div>
      <div className="d-flex my-2">
          <span className="" style={{ color: "black" }}>
            <TextField size="small" variant="standard" />
            (OP
            <TextField
              size="small"
              variant="standard"
              style={{ width: "10%" }}
            />
            )was seen here on
            <TextField size="small" variant="standard" style={{ flex: "1" }} />
          </span>
        </div>
        <div>
          <span>His /Her ophthalmic report revealed:-</span>

          <TextField size="small" variant="standard" style={{ flex: "1" }} />
        </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label">Distant Vision (Both Eye)</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> Refraction (Both Eye)</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> Near Vision (Both Eye)</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12}>
            <div className="">
            <span className="emr-label ">Non contact tonometry (IOP)</span>

            </div>
              <br />
              <div className="d-flex">
                <Col span={12}>
                  <div>
                    <label className="mb-2 emr-label"> Right Eye</label>
                       <TextArea autoSize />
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <label className="mb-2 emr-label"> Left Eye</label>
                       <TextArea autoSize />
                  </div>
                </Col>
              </div>
            </Col>

            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> Anterior Segment  (Both Eye)</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> 90D lens examination</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> Indirect Ophthalmoscopy (Both Eye)</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> IMPRESSION Both Eyes    </label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label"> Auto Refractometry (Both Eye)</label>
                   <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label">SUGGESTED Both Eyes </label>
                   <TextArea autoSize />
              </div>
            </Col>
          </Row>
        </div>
      </div>
     
    </div>
     <div className="d-flex justify-content-end mt-5 me-2">
     <Button className="c-btn me-5">
       Cancel
     </Button>
     <Button className="s-btn" onClick={handlePrint}>
      Print
     </Button>
   </div>
   </>

  );
};

export default PreAuthorizationNormalReport;
