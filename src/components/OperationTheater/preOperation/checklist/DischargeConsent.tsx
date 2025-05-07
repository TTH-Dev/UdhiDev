import { Button, Input } from "antd";

const DischargeConsent = () => {
  const fields = [
    { label: "Surgeon's Name", key: "surgeonName" },
    { label: "Patient's Name", key: "patientName" },
    { label: "Date & Time", key: "datetime1" },
    { label: "Date & Time", key: "datetime2" },
    { label: "Surgeon's Signature", key: "surgeonSign" },
    { label: "Patient's Signature", key: "patientSign" },
    { label: "Name of patient's representative", key: "repName" },
    { label: "Name of Witness", key: "witnessName" },
    { label: "Date & Time", key: "datetime3" },
    { label: "Date & Time", key: "datetime4" },
    { label: "Representative's Sign", key: "repSign" },
    { label: "Witness's Signature", key: "witnessSign" },
  ];

  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">Discharge Consent</p>
        <p style={{ textIndent: "100px", lineHeight: "3rem" ,fontSize:"16px",color:"#595959",fontWeight:600}}>
          I <Input className="mx-1" style={{ width: "350px", height: 40 }} />{" "}
          underwent{" "}
          <Input className="mx-1" style={{ width: "350px", height: 40 }} /> at
          Udhi eye hospital on{" "}
          <Input className="mx-1" style={{ width: "350px", height: 40 }} /> I
          got discharge from hospital on{" "}
          <Input className="mx-1" style={{ width: "350px", height: 40 }} /> to{" "}
          <Input className="mx-1" style={{ width: "350px", height: 40 }} /> on
          my own decision .
        </p>
        <div className="py-3">
          <div className="row">
            {fields.map((field, index) => (
              <div
                className="col-lg-6 d-flex align-items-center mb-3"
                key={index}
              >
                <div className="col-lg-4">
                  <label style={{fontSize:"16px",color:"#595959",fontWeight:600}}>{field.label}:</label>
                </div>
                <div className="col-lg-8">
                  <Input style={{ height: 35 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p style={{fontSize:"16px",color:"#595959",fontWeight:500}}>NB : Signature is taken from the patient's representative as per hospitals' policy </p>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default DischargeConsent;