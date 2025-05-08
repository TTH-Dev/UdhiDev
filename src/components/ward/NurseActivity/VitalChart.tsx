import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { api_url } from "../../../Config";
import axios from "axios";

const VitalChart = () => {
  const row = [
    {
      key: "Weight",
      value: "weight",
    },
    {
      key: "BP Systolic",
      value: "bpSystolic",
    },
    {
      key: "BP Diastolic",
      value: "bpDiastolic",
    },
    {
      key: "Hr",
      value: "hr",
    },
    {
      key: "SPO2",
      value: "spo2",
    },
    {
      key: "Temperature",
      value: "temperature",
    },
    {
      key: "GRBS",
      value: "grbs",
    },
    {
      key: "Notes",
      value: "notes",
    },
  ];

  const id = sessionStorage.getItem("patientId");

  const [data, setData] = useState<any>();
  const [isUpdate, setisUpdate] = useState(false);
  const [postData, setPostData] = useState<any>({
    weight: 0,
    bpSystolic: 0,
    bpDiastolic: 0,
    hr: 0,
    spo2: 0,
    temperature: 0,
    grbs: 0,
    notes: "",
  });

  const handleAddData = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setPostData((prevData: any) => ({
      ...prevData,
      [key]: key === "notes" ? value : Number(value),
    }));
  };

  const getPatient = async (ids:any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res?.data?.data?.patient);
      if (
        res?.data?.data?.patient?.surgeryDetailsId?.nurseActivity?.vitalChart
          ?.length > 0
      ) {
        setPostData(
          res?.data?.data?.patient?.surgeryDetailsId?.nurseActivity
            ?.vitalChart[0]
        );
        setisUpdate(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      let fg = data?.surgeryDetailsId?._id;

      if (!fg) {
        message.error("Surgery Id error contact support team!");
        return;
      }

      await axios.patch(
        `${api_url}/api/surgery-details/${fg}`,
        {
          nurseActivity: { vitalChart: [postData] },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Saved Successfully!");
      await getPatient(id)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };



  useEffect(() => {
    const ids = sessionStorage.getItem("patientId");

    if (ids) {
      getPatient(ids);
    }
  }, [id]);
  return (
    <>
      <div className="row">
        {row.map((label: any, i: any) => (
          <div className="col-lg-3 py-2" key={i}>
            <label
              className="pb-2"
              style={{ fontSize: "16px", fontWeight: 500, color: "#595959" }}
            >
              {label.key}
            </label>
            <br />
            <Input
              style={{ height: 35 }}
              type={label.value === "notes" ? "text" : "number"}
              value={postData[label.value]}
              onChange={(e) => handleAddData(label.value, e)}
            />{" "}
          </div>
        ))}
      </div>
      <div
        className="d-flex justify-content-end save-cancel-btn mt-0 mb-3"
        style={{ background: "#fff" }}
      >
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn" onClick={handleSave}>
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default VitalChart;
