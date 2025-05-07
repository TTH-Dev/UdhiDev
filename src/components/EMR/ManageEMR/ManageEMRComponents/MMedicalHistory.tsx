import { NavLink, Outlet } from "react-router-dom";

const MMedicalHistory = () => {
  const nav = [
    {
      name: "History of Present Illness",
      path: "manage-history-of-present-illness",
    },
    { name: "Past History", path: "manage-past-history" },
    {
      name: "Diabetes and Its Complications",
      path: "manage-diabetes-complications",
    },
    { name: "Tayer Organ Involvement", path: "manage-tayer-organ-involvement" },
    { name: "Renal History", path: "manage-renal-history" },
    { name: "Personal History", path: "manage-personal-history" },
  ];

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav-m ">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/emr/manage-emr/manage-medical-history/${item.path}`}
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

export default MMedicalHistory;
