import { TextField } from "@mui/material";
import { Button, Col, DatePicker, Radio, Row } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";

const PreAuthorizationSample = () => {
    const monthFormat = 'YYYY/MM';
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
        <div className="emr-complaints-box p-3 px-4" ref={printRef} >
      <Row>
        <Col span={24}>
      <h3 style={{ color: "black", textAlign: "center" }}>
        REQUEST FOR CASHLESS HOSPITALIZATION FOR HEALTH INSURANCE POLICY
        PART-C(Revised){" "}
      </h3>
      <h4 style={{ color: "black", textAlign: "center" }} className="mt-3">
        DETAILS OF THE THIRD PARTY ADMINISTRATOR/INSURER/HOSPITAL
      </h4>
      </Col>

      <Col span={24}>

      <div className="d-flex my-2">
        <span className="me-3" style={{ color: "black", width: "30%" }}>
          a. Name of TPA/Insurance Company
        </span>
        <TextField style={{ width: "60%" }} size="small" variant="standard" />
      </div>
      </Col>
      <Col span={24}>

      <div className="d-flex my-2">
        <span className="me-3" style={{ color: "black", width: "30%" }}>
          b. Toll free Phone Number
        </span>
        <TextField style={{ width: "60%" }} size="small" variant="standard" />
      </div>
      </Col>
      <Col span={24}>

      <div className="d-flex my-2">
        <span className="me-3" style={{ color: "black", width: "30%" }}>
          c. Toll free FAX
        </span>
        <TextField style={{ width: "60%" }} size="small" variant="standard" />
      </div>
      </Col>
      <Col span={24}>
      <div className="d-flex my-2">
        <span className="me-3" style={{ color: "black", width: "30%" }}>
          d. Name of the Hospital
        </span>
        <TextField style={{ width: "60%" }} size="small" variant="standard" />
      </div>
      </Col>
<Col span={24}>
      <div className="ms-4">
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            i. Address
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            ii. Rohini ID
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            iii. email id
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </div>
</Col>
<Col span={24}>

      <h4 style={{ color: "black", textAlign: "center" }} className="mt-3">
        TO BE FILLED BY INSURED/PATIENT
      </h4>
</Col>


<Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            A. Name of the Patient
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            B. Gender
          </span>
          <Radio.Group
            options={[
              { value: 1, label: "Male" },
              { value: 2, label: "Female" },
              { value: 3, label: "Third Gender" },
            ]}
          />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            C. Age
          </span>
          <DatePicker defaultValue={dayjs('2015/01', monthFormat)} format={monthFormat} picker="month" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            D. Date of Birth
          </span>
          <DatePicker />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            E. Contact Number
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            F. Contact Number of attending Relative:
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            G. Insured Card ID number:
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            H. Policy Number Name of Corporate:
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black", width: "30%" }}>
            I. Employee Id:
          </span>
          <TextField style={{ width: "60%" }} size="small" variant="standard" />
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex my-2">
          <span className="me-3" style={{ color: "black" }}>
            J. Currently do you have any other mediclaim/health insurance:
          </span>
          <Radio.Group
            style={{ flex: "1" }}
            options={[
              { value: 1, label: "Yes" },
              { value: 2, label: "No" },
            ]}
          />
        </div>
      </Col>
      </Row>
    </div>

        
        

<div className="d-flex justify-content-end mt-5 me-2">
     <Button className="c-btn me-5">
       Cancel
     </Button>
     <Button className="s-btn" onClick={handlePrint}>
      Print
     </Button>
   </div>
    </div>
 
  );
};

export default PreAuthorizationSample;
