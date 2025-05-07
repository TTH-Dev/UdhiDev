import { Select } from "antd";
import { useState } from "react";
import CatractSurgeryNotes from "./surgeryNotes/CatractSurgeryNotes";
import CatractAntiGlaucoma from "./surgeryNotes/CatractAntiGlaucoma";
import AntiGlaucoma from "./surgeryNotes/AntiGlaucoma";

const SurgeryNotesMain = () => {
  const [selectedOption, setSelectedOption] = useState(
    "Cataract Surgery Notes"
  );


  const handleSelect = (e: any) => {
    setSelectedOption(e);
  };
  return (
    <div>
      <div className="emr-complaints-box pb-3 mx-3 px-3">
        <p className="emr-search-text mb-0 py-3">Surgery Notes</p>
        <div>
          <label className="emr-label mb-1">Notes type</label>
          <br />
          <Select
            style={{ width: "50%", height: "40px" }}
            onChange={handleSelect}
            value={selectedOption}
            defaultValue={"Cataract Surgery Notes"}
            options={[
              {
                label: "Cataract Surgery Notes",
                value: "Cataract Surgery Notes",
              },
              {
                label: "Cataract With Anti Glaucoma Surgery Notes",
                value: "Cataract With Anti Glaucoma Surgery Notes",
              },
              {
                label: "Antiglaucoma Surgery Notes",
                value: "Antiglaucoma Surgery Notes",
              },
            ]}
          />
        </div>
      </div>

      <div className=" ">
        {selectedOption === "Cataract Surgery Notes" && (
         <CatractSurgeryNotes/>
        ) || selectedOption==="Cataract With Anti Glaucoma Surgery Notes" && (

            <CatractAntiGlaucoma/>
        ) || selectedOption==="Antiglaucoma Surgery Notes"&&(
            <AntiGlaucoma/>
        ) }
      </div>
    </div>
  );
};

export default SurgeryNotesMain;
