import { Button } from "antd";

const OTnote = () => {
  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">OT Notes</p>

        <p style={{ fontSize: "14px", color: "#595959", fontWeight: 500 }}>
          Dr. Emily Smith is known for her expertise in treating skin conditions
          such as acne, eczema, and psoriasis. She also specializes in cosmetic
          dermatology and laser treatments.
        </p>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default OTnote;
