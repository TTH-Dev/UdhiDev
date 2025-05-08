import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api_url } from "../../../Config";

const DoctorActivity = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id")||sessionStorage.getItem("patientId");
  

  const [complaint, setComplaint] = useState<any>("");
  const [data, setData] = useState<any>();
  const [isUpdate,setisUpdate]=useState(false)

  const getPatient = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res?.data?.data?.patient);
      if(res?.data?.data?.patient?.surgeryDetailsId?.doctorActivity.length>0){
        setComplaint(res?.data?.data?.patient?.surgeryDetailsId?.doctorActivity[0]?.complaint)
        setisUpdate(true)
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
          doctorActivity: [{ complaint: complaint }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getPatient();
    }
  }, [id]);

  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">Doctor Activity</p>
        <Form layout="vertical">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              {" "}
              <Form.Item
                label={<span className="emr-label">Complaints</span>}
              >
                <TextArea
                  rows={5}
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn" onClick={handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default DoctorActivity;
