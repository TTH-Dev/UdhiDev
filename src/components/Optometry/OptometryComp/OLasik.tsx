import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Input,
  message,

} from "antd";
import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { api_url } from "../../../Config";
import moment from "moment";

type EyeExamData = {
  [key: string]: { id: number; od: string; os: string };
};

const initialData: EyeExamData = {
  "UNAIDED V": { id: 1, od: "", os: "" },
  "AIDED V": { id: 2, od: "", os: "" },
  REFRACTION: { id: 3, od: "", os: "" },
  CYCLOVALVE: { id: 4, od: "", os: "" },
  SMCCT: { id: 5, od: "", os: "" },
  "K READING": { id: 6, od: "", os: "" },
  "K 1": { id: 7, od: "", os: "" },
  "K 2": { id: 8, od: "", os: "" },
  "AVERAGE K": { id: 9, od: "", os: "" },
  TOPOGRAPHY: { id: 10, od: "", os: "" },
  "SK 1": { id: 11, od: "", os: "" },
  "SK 2": { id: 12, od: "", os: "" },
  " AVERAGE K": { id: 13, od: "", os: "" },
  "K C PATTERN": { id: 14, od: "", os: "" },
};

const Lasik = () => {
  const [data, setData] = useState<EyeExamData>(initialData);

  const handleChange = (field: string, eye: "od" | "os", value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [eye]: value },
    }));
  };

  const id = sessionStorage.getItem("patientId");
  const [postData, setPostData] = useState<any>({
    patientId: id,
    fullName: "",
    opNo: "",
    ageAndSex: "",
    time: "",
    signatureDocument: null,
    lasikWorkSheet: "",
  });

  const divRef = useRef<HTMLDivElement>(null);



  const handleSave = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");
      postData.squintWorkSheet = imageData;
      img = imageData;
    }

    const formData = new FormData();
    formData.append("patientId", postData.patientId);
    formData.append("opNo", postData.opNo);
    formData.append("ageAndSex", postData.ageAndSex);
    formData.append("time", postData.time);
    formData.append("signatureDocument", postData.signatureDocument);
    formData.append("lasikWorkSheet", img);
    formData.append("lasikData",JSON.stringify(data))

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/lasik`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      

      setPostData({
        patientId: id,
        fullName: "",
        opNo: "",
        ageAndSex: "",
        time: "",
        signatureDocument: null,
        lasikWorkSheet: "",
      });
      await getData(id)
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

const [isUpdate,setIsUpdate]=useState(false)
const [updateId,setUpdateId]=useState("")
  const getData=async(ids:any)=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res=await axios.get(`${api_url}/api/lasik?patientId=${ids}&createdAt=${moment(new Date()).format("YYYY-MM-DD")}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      let df=res?.data?.data?.lasiks[0]
      if(df){
        setIsUpdate(true)
        setUpdateId(df?._id)
        setData(JSON.parse(df?.lasikData))
      }
      
    }catch(error:any){
      console.log(error);
    }
  }


  const handleUpdate = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");
      postData.squintWorkSheet = imageData;
      img = imageData;
    }

    const formData = new FormData();
    formData.append("patientId", postData.patientId);
    formData.append("opNo", postData.opNo);
    formData.append("ageAndSex", postData.ageAndSex);
    formData.append("time", postData.time);
    formData.append("signatureDocument", postData.signatureDocument);
    formData.append("lasikWorkSheet", img);
    formData.append("lasikData",JSON.stringify(data))

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(`${api_url}/api/lasik/${updateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      

      setPostData({
        patientId: id,
        fullName: "",
        opNo: "",
        ageAndSex: "",
        time: "",
        signatureDocument: null,
        lasikWorkSheet: "",
      });
      await getData(id)
      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

  useEffect(()=>{
if(id){
  getData(id)
}
  },[id])

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4" ref={divRef}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">Lasik Work Up Sheet</p>
          <p className="emr-search-text">QF/OPTO/F5</p>
        </div>
        <>
          <TableContainer component={Paper} elevation={0} className="px-3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="emr-label"></TableCell>
                  <TableCell className="emr-label">OD</TableCell>
                  <TableCell className="emr-label">OS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([field, values]) => (
                  <TableRow key={field}>
                    <TableCell
                      className="emr-label"
                      style={{ borderRight: "0.5px solid #CFCFCF" }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </TableCell>

                    <TableCell>
                      <Input
                        className="my-1"
                        variant="outlined"
                        size="small"
                        style={{ width: "320px", height: 40 }}
                        value={values.od}
                        onChange={(e) =>
                          handleChange(field, "od", e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Input
                        className="my-1"
                        variant="outlined"
                        size="small"
                        style={{ width: "320px", height: 40 }}
                        value={values.os}
                        onChange={(e) =>
                          handleChange(field, "os", e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
         
        </>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={isUpdate?handleUpdate:handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default Lasik;
