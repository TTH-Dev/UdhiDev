import React, {  useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import { Button, message } from "antd";
import axios from "axios";
import { api_url } from "../../../../../Config";
import moment from "moment";

type EyeExamData = {
  [key: string]: { od: string; os: string };
};

const initialData: EyeExamData = {
  face: { od: "", os: "" },
  lids: { od: "", os: "" },
  lacrimalSystem: { od: "", os: "" },
  conjunctiva: { od: "", os: "" },
  cornea: { od: "", os: "" },
  sclera: { od: "", os: "" },
  anteriorChamber: { od: "", os: "" },
  iris: { od: "", os: "" },
  pupil: { od: "", os: "" },
  lens: { od: "", os: "" },
};

const AnteriorSegment: React.FC = () => {
  const [data, setData] = useState<EyeExamData>(initialData);

  const id=sessionStorage.getItem("patientId")
  const [datas, setDatas] = useState<any>({
    data: {
      patientId: id,
      enteredDate: new Date(),
      face: {
        od: "",
        os: "",
      },
      lids: {
        od: "",
        os: "",
      },
      lacrimalSystem: {
        od: "",
        os: "",
      },
      conjunctiva: {
        od: "",
        os: "",
      },
      cornea: {
        od: "",
        os: "",
      },
      sclera: {
        od: "",
        os: "",
      },
      anteriorChamber: {
        od: "",
        os: "",
      },
      iris: {
        od: "",
        os: "",
      },
      pupil: {
        od: "",
        os: "",
      },
      lens: {
        od: "",
        os: "",
      },
    },
  });


  const handleChange = (field: string, eye: "od" | "os", value: string) => {
    setData((prev) => {
      const updated = {
        ...prev,
        [field]: { ...prev[field], [eye]: value },
      };
  
      setDatas((prevDatas:any) => ({
        ...prevDatas,
        data: {
          ...prevDatas.data,
          [field]: { ...updated[field] },
        },
      }));
  
      return updated;
    });
  };

  const handleSave=async()=>{
    const token=localStorage.getItem("authToken")
    if(!token){
      localStorage.clear()
      message.error("Login Required!")
      return
    }
    try{
      await axios.post(`${api_url}/api/antriorSegment`,datas.data,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      await getDatas()

      message.success("Saved Successfully!")
    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

const [isUpdate,setIsUpdate]=useState(false)
  const getDatas=async()=>{
    const token=localStorage.getItem("authToken")
    if(!token){
      localStorage.clear()
      message.error("Login Required!")
      return
    }
    try{

      const res = await axios.get(
        `${api_url}/api/antriorSegment?patientId=${id}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = res?.data?.data?.antriorSegment[0];
      
      if (responseData) {
        setDatas(responseData);
        setIsUpdate(true)
        const newData: EyeExamData = {
          face: responseData.face,
          lids: responseData.lids,
          lacrimalSystem: responseData.lacrimalSystem,
          conjunctiva: responseData.conjunctiva,
          cornea: responseData.cornea,
          sclera: responseData.sclera,
          anteriorChamber: responseData.anteriorChamber,
          iris: responseData.iris,
          pupil: responseData.pupil,
          lens: responseData.lens,
        };
        setData(newData);
      }
      
    }catch(error:any){
      console.log(error);
    }
  }


  const handleUpdate=async()=>{
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login Required!")
        return
      }
      await axios.patch(`${api_url}/api/antriorSegment/${datas._id}`,datas.data,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Updated Successfully!")
      await getDatas()
    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }


  useEffect(()=>{
    getDatas()
  },[])
  

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded ps-4">
        <p className="emr-search-text">Anterior Segment</p>
      </div>
      <TableContainer component={Paper} elevation={0} className="px-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Name</TableCell>
              <TableCell className="emr-label">OD</TableCell>
              <TableCell className="emr-label">OS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([field, values]) => (
              <TableRow key={field}>
                <TableCell className="emr-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                    value={values.od}
                    onChange={(e) => handleChange(field, "od", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                    value={values.os}
                    onChange={(e) => handleChange(field, "os", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-end save-cancel-btn-s pt-5">
        <Button className="s-btn me-5" onClick={isUpdate?handleUpdate:handleSave}>{isUpdate?"Update":"Save"}</Button>
             {/* <Button className="s-btn me-5" onClick={handleSave}>Save</Button> */}

      </div>
    </>
  );
};

export default AnteriorSegment;
