import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { api_url } from "../../../Config";
import { useSearchParams } from "react-router-dom";

const PmProcedure = () => {
  const [filtervalue, setFilterValue] = useState([
    {
      type: "",
      name: "",
      amount: "",
    },
  ]);
  const [searchParam] = useSearchParams();
  const patientId = searchParam.get("id");
  const [drp, setDrp] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [isAdded, setIsAdded] = useState(false);
  const [surgeryID,setSurgeryID]=useState("")

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/surgery-details/filter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let gf = res?.data?.data?.products;

      if (gf.length > 0) {
        setData(gf);
        let gh = gf.map((val: any) => ({
          label: val?.productName,
          value: val?.productName,
        }));
        setDrp(gh);
      }

      await getPatient()
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDrop = (val: any, i: any) => {
    const newData = [...filtervalue];
    newData[i].type = val;
    setFilterValue(newData);
  };

  const handleNameDrop = (val: any, i: any) => {
    const newData = [...filtervalue];
    newData[i].name = val;
    let df = data.filter((vals: any) => vals.productName === val);
    newData[i].amount = df[0].mrp;
    setFilterValue([
      ...newData,
      {
        type: "",
        name: "",
        amount: "",
      },
    ]);
  };

  const handleRemove = (index: any) => {
    const updatedTestIds = [...filtervalue];
    updatedTestIds.splice(index, 1);
    if (updatedTestIds.length === 0) {
      updatedTestIds.push({
        type: "",
        name: "",
        amount: "",
      });
    }
  
    setFilterValue(updatedTestIds);
  };

  const getPatient=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res=await axios.get(`${api_url}/api/patient/${patientId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
     
      setSurgeryID(res?.data?.data?.patient?.surgeryDetailsId?._id)
    }catch(error:any){
      console.log(error);
    }
  }

  const handleSave=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const dg=filtervalue.slice(0, -1).map((val:any)=>({
        surgeryName:val.name,
        surgeryType:val.type,
        categories:val.name,
        amount:val.amount,
        totalAmount:val.amount
      }))

      await axios.patch(`${api_url}/api/surgery-details/add-bill/${surgeryID}`,{
        surgeryDetails:dg,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      message.success("Added Successfully!")
      setIsAdded(true)
    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="emr-complaints-box mx-3">
        <div className="d-flex justify-content-between p-2">
          <div className="px-2 py-3">
            <p className="emr-search-text "> Procedure</p>
          </div>
        </div>
        <div className="">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="emr-label">Type</TableCell>
                  <TableCell className="emr-label">Name</TableCell>
                  <TableCell className="emr-label">Amount</TableCell>
                  <TableCell className="emr-label"></TableCell>
                  <TableCell className="emr-label"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtervalue.map((val: any, i: any) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Select
                        style={{ width: 150 }}
                        options={[
                          {
                            label: "Injection",
                            value: "Injection",
                          },
                          {
                            label: "Drops",
                            value: "Drops",
                          },
                        ]}
                        value={val?.type}
                        onChange={(value) => handleDrop(value, i)}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        disabled={!val?.type}
                        options={drp}
                        style={{ width: 150 }}
                        value={val?.name}
                        onChange={(value) => handleNameDrop(value, i)}
                      />
                    </TableCell>
                    <TableCell>{val?.amount || "-"}</TableCell>
                    <TableCell className="text-danger">
                      <IoClose
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemove(i)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="text-end my-3 me-2">
        {/* <Button className="c-btn me-4">Cancel</Button> */}
        {isAdded ? (
          <Button className="s-btn">Added to Bill</Button>
        ) : (
          <Button className="s-btn" onClick={handleSave}>Add to Bill</Button>
        )}
      </div>
    </>
  );
};

export default PmProcedure;
