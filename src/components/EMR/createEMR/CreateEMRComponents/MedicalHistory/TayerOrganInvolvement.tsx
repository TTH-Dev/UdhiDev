import { Button, Checkbox } from "antd";

const TayerOrganInvolvement = () => {
  const checkboxFields = [
    {
      label: "Eyes - Retinopathy",
      options: ["No", "NPDR", "PDR", "VH"],
    },
    {
      label: "Eyes - Laser Photocoagulation",
      options: ["No", "RE", "LE", "Bilateral"],
    },
    {
      label: "Eyes - Vision",
      options: ["Good", "Impaired", "Blind"],
    },
  ];

  return (
    <>
      <div className="mh-ph-box pt-3">
        {checkboxFields.map((field) => (
          <div className="px-3 mt-2" key={field.label}>
            <label className="mx-3 mh-ph-text" style={{ minWidth: "220px" }}>
              {field.label}
            </label>
            <Checkbox.Group
              options={field.options}
              className=" px-0 checkbox-group-mh-toi"
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default TayerOrganInvolvement;
