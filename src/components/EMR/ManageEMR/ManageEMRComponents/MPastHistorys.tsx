import { NavLink, Outlet } from "react-router-dom";

const MPastHistorys = () => {
  const nav = [
    {
      name: "History Of Major Illness",
      path: "manage-history-of-major-illness",
    },
    { name: "Type of allergies", path: "manage-type-of-allergies" },
    {
      name: "Nutritional Assessment",
      path: "manage-nutritional-assessment",
    },
    { name: "Immunization : For Adults", path: "manage-immunization-for-adults" },
    { name: "Family History", path: "manage-family-history" },
    { name: "Recent Investigations", path: "manage-recent-investigations" },
    { name: "Screen Usage", path: "manage-screen-usage" },
    { name: "Any Regular Medication", path: "manage-any-regular-medication" },
    { name: "Previous Surgeries", path: "manage-previous-surgeries" },
  ];

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/emr/manage-emr/manage-past-history/${item.path}`}
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

export default MPastHistorys;
