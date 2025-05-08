import { Button, DatePicker, Input, message, TimePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../Config";

const DischargeNote = () => {
  const fields = [
    { label: "Surgeon's Name", key: "surgeonName" },
    { label: "Patient's Name", key: "patientName" },
    { label: "Surgeon's Signature", key: "surgeonSignature" },
    { label: "Patient's Signature", key: "patientSignature" },
    { label: "Name of patient's representative", key: "representativeName" },
    { label: "Name of Witness", key: "witnessName" },
    { label: "Representative's Sign", key: "representativeSignature" },
    { label: "Witness's Signature", key: "witnessSignature" },
  ];

  const [postData, setPostData] = useState<any>({
    name: "",
    surgeryName: "",
    surgeryDate: "",
    dischargeDate: "",
    dischargeTime: null,
    surgeonName: "",
    patientName: "",
    dischargeDateTime: "",
    patientSignature: "",
    surgeonSignature: "",
    representativeName: "",
    representativeSignature: "",
    representativeDateTime: "",
    witnessName: "",
    witnessSignature: "",
    witnessDateTime: "",
  });

  const handleUpload = (file:any, key:any) => {
    //Convert the file to base64 and store it in postData
    const reader = new FileReader();
    reader.onload = (e:any) => {
      setPostData({ ...postData, [key]: e.target.result });
    };
    reader.readAsDataURL(file);
    return false;
  };
  const [patientData,setPatientData]=useState<any>()

  const getData=async()=>{
    const id=sessionStorage.getItem("patientId")
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login required!")
        return
      }
      const res=await axios.get(`${api_url}/api/patient/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(res.data.data.patient);
      setPatientData(res?.data?.data?.patient)
      
    }catch(error:any){
      console.log(error);
      
    }
  }


  const handleSave=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login Required!")
        return
      }
      if(!patientData?.surgeryDetailsId?._id){
        message.error("Id missing contact support team!")
        return
      }
      await axios.patch(`${api_url}/api/surgery-details/${patientData?.surgeryDetailsId?._id}`,{dischargeNote:postData},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Saved Successfully!")
    }catch(error:any){
      console.log(error);
      
    }
  }
  
  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">Discharge Consent</p>
        <p
          style={{
            textIndent: "100px",
            lineHeight: "3rem",
            fontSize: "16px",
            color: "#595959",
            fontWeight: 600,
          }}
        >
          I{" "}
          <Input
            value={postData?.name}
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
            className="mx-1"
            style={{ width: "350px", height: 40 }}
          />{" "}
          underwent{" "}
          <Input
            value={postData?.surgeryName}
            onChange={(e) =>
              setPostData({ ...postData, surgeryName: e.target.value })
            }
            className="mx-1"
            style={{ width: "350px", height: 40 }}
          />{" "}
          at Udhi eye hospital on{" "}
          <DatePicker
            value={postData?.surgeryDate||null}
            onChange={(date: any, _dateString: any) =>
              setPostData({ ...postData, surgeryDate: date })
            }
            className="mx-1"
            style={{ width: "350px", height: 40 }}
          />{" "}
          I got discharge from hospital on{" "}
          <DatePicker
            value={postData?.dischargeDate}
            onChange={(date: any, _dateString: any) =>
              setPostData({ ...postData, dischargeDate: date })
            }
            className="mx-1"
            style={{ width: "350px", height: 40 }}
          />{" "}
          at{" "}
          <TimePicker
            use12Hours
            value={
              postData?.dischargeTime
                ? dayjs(postData?.dischargeTime, "hh:mm A")
                : null
            }
            onChange={(_time: any, timeString: any) =>
              setPostData({ ...postData, dischargeTime: timeString })
            }
            className="mx-1"
            style={{ width: "350px", height: 40 }}
          />{" "}
          on my own decision .
        </p>
        <div className="py-3">
          <div className="row">
            {fields.map((field, index) => (
              <div
                className="col-lg-6 d-flex align-items-center mb-3"
                key={index}
              >
                <div className="col-lg-4">
                  <label
                    style={{
                      fontSize: "16px",
                      color: "#595959",
                      fontWeight: 600,
                    }}
                  >
                    {field.label}:
                  </label>
                </div>
                <div className="col-lg-8">
                  {field.key.includes("Signature") ? (
                    <>
                    <Upload
                      beforeUpload={(file) => handleUpload(file, field.key)}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />} style={{ height: 35,width:300 }}>
                        Upload Signature
                      </Button>
                    </Upload>
                    <span style={{color:"green"}}>{postData[field.key]?field.key+"Uploaded":""}</span>
                    </>
                  ) : (
                    <Input
                      value={postData[field.key]}
                      onChange={(e) =>
                        setPostData({ ...postData, [field.key]: e.target.value })
                      }
                      style={{ height: 35 }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p
          style={{
            fontSize: "16px",
            color: "#595959",
            fontWeight: 500,
          }}
        >
          NB : Signature is taken from the patient's representative as per
          hospitals' policy
        </p>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn" onClick={handleSave}>Save</Button>
      </div>
    </>
  );
};

export default DischargeNote;
