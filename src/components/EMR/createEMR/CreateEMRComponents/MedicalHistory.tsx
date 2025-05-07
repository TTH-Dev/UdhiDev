import { NavLink, Outlet } from "react-router-dom";

const MedicalHistory = () => {
  const nav = [
    {
      name: "History of Present Illness",
      path: "create-history-of-present-illness",
    },
    { name: "Past History", path: "create-past-history" },
    {
      name: "Diabetes and Its Complications",
      path: "create-diabetes-complications",
    },
    { name: "Tayer Organ Involvement", path: "create-tayer-organ-involvement" },
    { name: "Renal History", path: "create-renal-history" },
    { name: "Personal History", path: "create-personal-history" },
  ];

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/emr/create-emr/create-medical-history/${item.path}`}
            className="emr-link-mh ms-3"
          >
            <span className="mx-3 my-3 create-emr-nav text-wrap d-inline-block">
              {item.name}
            </span>
          </NavLink>
        ))}
        <div className="dynamic-content mt-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MedicalHistory;
