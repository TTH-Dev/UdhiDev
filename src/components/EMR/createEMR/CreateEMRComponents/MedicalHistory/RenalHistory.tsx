import { Button, Checkbox } from "antd";

const RenalHistory = () => {
  const checkboxOptions = [
    "Edema Legs",
    "Facial Puffiness",
    "Poor Urinary Stream",
    "Kidney Stones",
    "Hair Loss",
    "Skin Lesion",
    "Bleeding Tendency",
    "Arthritis",
    "Phobophobia",
  ];

  return (
    <>
      <div className="mh-ph-box pt-3">
        <div className="px-3 mt-2" style={{ width: "90%" }}>
          <Checkbox.Group
            options={checkboxOptions}
            className="checkbox-group-mh-rh"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn">Save</Button>
      </div>
    </>
  );
};

export default RenalHistory;
