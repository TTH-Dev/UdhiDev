import { Button, Input, Radio } from "antd";
import { useState } from "react";

const PersonalHistory = () => {
  const RadioFields = [
    { label: "Smoking", options: ["Yes", "No", "N/A"] },
    { label: "Alcohol Use", options: ["Yes", "No", "N/A"] },
    { label: "Drug Abuse", options: ["Yes", "No", "N/A"] },
    { label: "Tattoo Mark", options: ["Yes", "No", "N/A"] },
    { label: "Exercise", options: ["Yes", "No", "N/A"] },
    { label: "Diet", options: ["Yes", "No", "N/A"] },
    { label: "No of Children", options: ["Yes", "No", "N/A"] },
  ];

  const [formData, setFormData] = useState<{
    [key: string]: { radio?: string; input?: string };
  }>({});

  const handleRadioChange = (label: string, value: string) => {
    setFormData((prev) => {
      const newValues = { ...prev, [label]: { ...prev[label], radio: value } };
      console.log("Updated Form Data:", newValues);
      return newValues;
    });
  };

  const handleInputChange = (label: string, value: string) => {
    setFormData((prev) => {
      const newValues = { ...prev, [label]: { ...prev[label], input: value } };
      console.log("Updated Form Data:", newValues);
      return newValues;
    });
  };

  return (
    <>
      <div className="mh-ph-box pt-3">
        {RadioFields.map((field) => (
          <div className="px-3 mt-2 mb-3" key={field.label}>
            <label className="mx-3 mh-ph-text" style={{ minWidth: "150px" }}>
              {field.label}
            </label>
            <Radio.Group
              options={field.options.map((option) => ({
                label: option,
                value: option,
              }))}
              className="px-0 checkbox-group-mh-toi"
              onChange={(e) => handleRadioChange(field.label, e.target.value)}
              value={formData[field.label]?.radio || ""}
            />
            <Input
              style={{ borderRadius: "3px", width: "200px" }}
              className="ms-2"
              value={formData[field.label]?.input || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button
          className="s-btn"
          onClick={() => console.log("Final Form Data Submitted:", formData)}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default PersonalHistory;
