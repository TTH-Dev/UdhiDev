import { Button, Input, message } from "antd";
import { CiCirclePlus } from "react-icons/ci";
import {  useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { api_url } from "../../../../Config";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ProvisionalDiagnosis = () => {
  const id = sessionStorage.getItem("patientId");

  const [diagnosisInputs, setDiagnosisInputs] = useState([""]);
  const [editData, setEditData] = useState([""]);

  const [data, setData] = useState({
    patientId: id,
    provisionalDiagnosis: [] as string[],
  });

  const handleAdd = () => {
    setDiagnosisInputs([...diagnosisInputs, ""]);
  };

  const handleChange = (value: string, index: number) => {
    const updatedInputs = [...diagnosisInputs];
    updatedInputs[index] = value;
    setDiagnosisInputs(updatedInputs);

    // Keep data in sync
    setData(prev => ({
      ...prev,
      provisionalDiagnosis: updatedInputs,
    }));
  };

  const handleremove=(index:any)=>{
    const updatedInputs = [...diagnosisInputs];
    updatedInputs.splice(index, 1);
    setDiagnosisInputs(updatedInputs);
    setData(prev => ({
      ...prev,
      provisionalDiagnosis: updatedInputs,
    }));
  }

  const handleSave = async() => {
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Something went wrong!")
        return
      }
      await axios.post(`${api_url}/api/provisional-diagnosis`,data,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      message.success("Saved successfully!")
    }
    catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  };

  const [isUpdate,setIsUpdate]=useState(false)
  const [ogData,setOgData]=useState<any>()

  const getData=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Something went wrong!")
        return
      }

    const res= await axios.get(`${api_url}/api/provisional-diagnosis?createdAt=${moment(new Date()).format("YYYY-MM-DD")}&patientId=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      const rws=res.data.data.provisionalDiagnosiss[0]
      
      if(rws){
        setEditData(rws.provisionalDiagnosis)
        setOgData(rws)
      }
      

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  console.log(editData,"editDate");
  

  const handleEdit=()=>{
    setDiagnosisInputs(editData)
    setIsUpdate(true)
  }

  const handleUpdate=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Something went wrong!")
        return
      }

      await axios.patch(`${api_url}/api/provisional-diagnosis/${ogData._id}`,data,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Updated Successfully!")

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text ps-2">Provisional Diagnosis</p>
        <div className="px-3">
          <label>Diagnosis</label>
          <br />
          {diagnosisInputs.map((value, index) => (
            <div key={index}>
              <Input
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                style={{ width: "50%", height: "40px" }}
                className="my-3"
              /><IoIosCloseCircleOutline onClick={()=>handleremove(index)} className="ms-2" style={{fontSize:"20px",cursor:"pointer"}}/>
            </div>
          ))}
          <span onClick={handleAdd} style={{ cursor: "pointer" }}>
            <CiCirclePlus  className="mb-1 me-1 fs-5"/>
            <span>Add More</span>
          </span>
        </div>
      </div>

      <div
        className="d-flex justify-content-end save-cancel-btn mt-4"
        style={{ backgroundColor: "white" }}
      >
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={isUpdate?handleUpdate:handleSave}>{isUpdate?"Update":"Save"}</Button>
      </div>
      {editData.length>0&&
      <div className="pt-5">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text ps-2">Provisional Diagnosis</p>
          </div>
          <div className="pe-4">
            <MdEdit style={{ color: "#3497F9",cursor:"pointer" }} onClick={handleEdit}/>
          </div>
        </div>
       
        <div className="px-3">
        <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.NO</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {editData.map((row:any,index:any) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell>{row}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>}
    </>
  );
};

export default ProvisionalDiagnosis;
