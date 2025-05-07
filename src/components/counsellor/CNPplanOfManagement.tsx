import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, message } from "antd";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";
import { eventEmitter } from "../../../EventEmitter";


const CNPplanOfManagement = () => {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [data, setData] = useState<any>({
    enteredDate: "",
    glassPrescription: "",
    investigation: "",
    medicalSheet: "",
    procedure: "",
  });
  const [status,setStatus]=useState("")

  const getPOM = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/plan-of-management?patientId=${ids}&createdAt=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

   
      let df = res?.data?.data?.planOfManageMents[0];
      if (df) {
        setData(df);
      }
      await getPatients(ids)
    } catch (error: any) {
      console.log(error);
    }
  };


  const getPatients = async (ids:any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      let dg=res?.data?.data?.patient
      if(dg){
        setStatus(dg?.cousellingStatus)
      }
      
    } catch (error: any) {
      console.log(error);
    }
  };


  const handleUpdate=async(sd:any)=>{
  
    
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login required!")
        return
      }

      await axios.patch(`${api_url}/api/patient/${id}`,{cousellingStatus:sd},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      if(sd==="waiting"){
        eventEmitter.emit("isWilling")
      }

      await getPatients(id)
      message.success("Updated successfully!")

    }catch(error:any){
      console.log(error);
      
    }
  }
  

  useEffect(() => {
    if (id) {
      getPOM(id);
    }
  }, [id]);
  return (
    <div>
      <div className="d-flex justify-content-between mx-3">
        <div className="mt-4"></div>
        {status==="completed"?"":
        <div>
          <Button className="s-btn m-3" onClick={()=>handleUpdate("completed")}>Not Required</Button>
          <Button className="s-btn m-3" onClick={()=>handleUpdate("completed")}>Not Willing</Button>
          <Button className="s-btn m-3" onClick={()=>handleUpdate("waiting")}>Willing</Button>
        </div>}
      </div>

      <div className="mx-3 emr-complaints-box">
        <p className="emr-search-text mb-0 p-4">Plan of management </p>

        <TableContainer component={Paper} elevation={0} className="mb-5">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Entered Date</TableCell>
                <TableCell className="emr-label">Name</TableCell>
                <TableCell className="emr-label">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map(([key, val]: any, i: number) => {
                if (
                  [
                    "enteredDate",
                    "_id",
                    "updatedAt",
                    "patientId",
                    "createdAt",
                  ].includes(key)
                )
                  return null;

                return (
                  <TableRow key={i}>
                    <TableCell sx={{ width: "15%" }}>
                      {data.enteredDate
                        ? moment(data.enteredDate).format("YYYY-MM-DD")
                        : ""}
                    </TableCell>
                    <TableCell sx={{ width: "15%" }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableCell>
                    <TableCell sx={{ width: "80%" }}>{val || "-"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CNPplanOfManagement;
