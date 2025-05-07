import { TextField } from "@mui/material";
import { DatePicker, Row, Col, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useRef } from "react";

const PreAuthorizationCghsReportCorporates = () => {
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
      <div className="emr-complaints-box  p-3 px-4" ref={printRef} >
      
      

          <Row gutter={32}>
            <Col span={24}>


            
          <div className="d-flex justify-content-between">
          <div>
            <label className="mb-2 emr-label">Date</label>
            <br />
            <DatePicker />
          </div>
          <div className="p-2">
            <span>Eg: QF / ADM / F / 03</span>
          </div>
        </div>
        </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label">To</label>
                <br />
                <TextArea autoSize />
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label">
                  Auto Refractometry (Both Eye)
                </label>
                <TextArea autoSize />

                
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label">Dear sir / Mam,</label>
                <br />
                <TextArea autoSize />

               
              </div>
            </Col>
            <Col span={12} className="my-2">
              <div>
                <label className="mb-2 emr-label">Refraction (Both Eye)</label>
                <TextArea autoSize />
                
              </div>
            </Col>
          
              <Col span={12} className="my-2">
                <div>
                  <label className="mb-2 emr-label">
                    Distant Vision (Both Eye)
                  </label>
                <TextArea autoSize />
                 
                </div>
              </Col>
              <Col span={12}>
                <div className="">
                  <span className="emr-label ">
                    Non contact tonometry (IOP)
                  </span>
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
                  <label className="mb-2 emr-label">
                    {" "}
                    Near Vision (Both Eye)
                  </label>
                  <TextArea autoSize />

                </div>
              </Col>
              <Col span={12}>
                <div className="mt-2">
                  <span className="emr-label mt-2">OCT Macula</span>
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
                  <label className="mb-2 emr-label">
                    {" "}
                    Anterior Segment  (Both Eye)
                  </label>
                                        <TextArea autoSize />

                </div>
              </Col>
              <Col span={12}>
                <div className="mt-2">
                  <span className="emr-label mt-2">
                    DIAGNOSIS (OP Consultation)
                  </span>
                </div>
                <br />
                <Col span={24}>
                  <div>
                    <label className="mb-2 emr-label"> Both Eye</label>
                                          <TextArea autoSize />

                  </div>
                </Col>
              </Col>

              <Col span={12} className="my-2">
                <div>
                  <label className="mb-2 emr-label">
                    {" "}
                    Indirect Ophthalmoscopy (Both Eye)
                  </label>
                                        <TextArea autoSize />

                </div>
              </Col>
              <Col span={12} className="my-2">
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
                <div className="mt-2">
                  <span className="emr-label ">SUGGESTED</span>
                </div>
                <br />
                <Col span={24}>
                  <div>
                    <label className="mb-2 emr-label"> Both Eye</label>
                                          <TextArea autoSize />

                  </div>
                </Col>
              </Col>
              <Col span={12} className="my-2">
                <span className="emr-label">
                  Thank you, Sir/mam Your Sincerely,
                </span>
                <br />
                <TextField size="small" variant="standard" />
              </Col>
              <Col span={12}>
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

export default PreAuthorizationCghsReportCorporates;
