import {  message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../../Config";

const OTnote = () => {
  const patientId = sessionStorage.getItem("patientId");
  const [data,setData]=useState<any>()
  const [notes,setNotes]=useState<any>("")

const getData=async()=>{
  try{
    const token=localStorage.getItem("authToken")
    if(!token){
      localStorage.clear()
      message.error("login Required!")
      return
    }

    const res=await axios.get(`${api_url}/api/patient/${patientId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    let df=res?.data?.data?.patient
    
    if(df){
      setData(df)
    }

    await getDetail()

  }catch(error:any){
    console.log(error);
    
  }
}

const getDetail=async()=>{
  try{
    const token=localStorage.getItem("authToken")
    if(!token){
      localStorage.clear()
      message.error("login Required!")
      return
    }
    const res=await axios.get(`${api_url}/api/surgery-details/${data?.surgeryDetailsId?._id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

   
    setNotes(res?.data?.data?.entry?.otActivity)
    
  }catch(error:any){
    console.log(error);
    
  }
}

  useEffect(() => {
    if(patientId){
      getData();
    }
   
  }, [patientId]);
  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">OT Notes</p>

        <p style={{ fontSize: "14px", color: "#595959", fontWeight: 500 }}>
        {notes||"-"}
        </p>
      </div>
      {/* <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div> */}
    </>
  );
};

export default OTnote;
