import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSearchParams } from "react-router-dom";

const DoctorActivity = () => {
 const [searchParam]=useSearchParams()
const id=searchParam.get("patientId")



  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">Doctor Activity</p>
        <Form layout="vertical" >
          <div className="row">
            <div className="col-lg-12 col-md-12">
              {" "}
              <Form.Item
                label={<span className="emr-label">Complaints</span>}
                name="Complaints"
              >
                <TextArea rows={5}/>
              </Form.Item>
            </div>
          
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button
          className="s-btn "
       
        >
        Save
        </Button>
      </div>
    </>
  );
};

export default DoctorActivity;
