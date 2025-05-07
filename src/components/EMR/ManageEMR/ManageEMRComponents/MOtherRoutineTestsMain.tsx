import { NavLink, Outlet } from "react-router-dom";

const MOtherRoutinetestMain = () => {
    const nav = [
        {
          name: "Non-Contact Tonometry",
          path: "manage-non-contact-tonometry",
        },
        {
          name: "Color Vision",
          path: "manage-color-vision",
        },
        {
          name: "Confrontation",
          path: "manage-confrontation",
        },
        {
          name: "Ocular Movements",
          path: "manage-ocular-movements",
        },
        {
          name: "Cover Test",
          path: "manage-cover-test",
        },
     
      ];
      

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav-m">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/emr/manage-emr/manage-other-routine-test/${item.path}`}
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

export default MOtherRoutinetestMain;
