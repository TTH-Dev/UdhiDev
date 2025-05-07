import { NavLink, Outlet } from "react-router-dom";

const PastHistorys = () => {
  // const {id}=useParams<{id:string}>();
  const nav = [
    {
      name: "History Of Major Illness",
      path: "history-of-major-illness",
    },
    { name: "Type of allergies", path: "type-of-allergies" },
    {
      name: "Nutritional Assessment",
      path: "nutritional-assessment",
    },
    { name: "Immunization", path: "immunization-for-adults" },
    { name: "Family History", path: "family-history" },
    { name: "Recent Investigations", path: "recent-investigations" },
    { name: "Screen Usage", path: "screen-usage" },
    { name: "Any Regular Medication", path: "any-regular-medication" },
    { name: "Previous Surgeries", path: "previous-surgeries" },
  ];

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav">
        <p className="text-end me-3">QF/OP/F/01</p>
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/optometry-details/past-history/${item.path}`}
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

export default PastHistorys;
