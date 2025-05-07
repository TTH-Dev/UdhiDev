import { NavLink, Outlet } from "react-router-dom";

const OtherRoutinetestMain = () => {
  // const { id } = useParams<{ id: string }>(); 

    const nav = [
        {
          name: "Non-Contact Tonometry",
          path: "non-contact-tonometry",
        },
        {
          name: "Color Vision",
          path: "color-vision",
        },
        {
          name: "Confrontation",
          path: "confrontation",
        },
        {
          name: "Ocular Movements",
          path: "ocular-movements",
        },
        {
          name: "Cover Test",
          path: "cover-test",
        },
        // {
        //   name: "Anterior Segment",
        //   path: "anterior-segment",
        // },
        // {
        //   name: "Posterior Segment",
        //   path: "posterior-segment",
        // },
      ];
      

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav">
        <p className="me-3 text-end">QF/OPTO/F/02</p>
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/optometry-details/other-routine-test/${item.path}`}
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

export default OtherRoutinetestMain;
