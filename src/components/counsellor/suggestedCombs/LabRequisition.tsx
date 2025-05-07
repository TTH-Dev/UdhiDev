import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Select, Button, message } from "antd";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { api_url } from "../../../Config";
import { useSearchParams } from "react-router-dom";

const LabRequisition: React.FC = () => {
  const [searchParam]=useSearchParams()
  const ids=searchParam.get("id")

  const [testDrop, setTestDrop] = useState<any>([]);
  const [data, setData] = useState<any>({
    patientId: ids,
    enteredDate: new Date(),
    testId: [""],
    suggestBy:"counsellor",
    _id: "",
  });

  const handleTestChange = (index: number, value: string) => {
    const updatedTestIds = [...data.testId];
    updatedTestIds[index] = value;

    if (index === data.testId.length - 1) {
      updatedTestIds.push("");
    }

    setData((prevData: any) => ({
      ...prevData,
      testId: updatedTestIds,
    }));
  };



  const getAllTestName = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/test?fields=_id,testName`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let ds = res.data.data.tests.map((val: any) => ({
        label: val.testName,
        value: val._id,
      }));
      setTestDrop(ds);
      await getData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const formatTestIds = data.testId.filter(
        (id: string) => id && id.trim() !== ""
      );

      const formatData = {
        ...data,
        testId: formatTestIds,
      };

      await axios.post(`${api_url}/api/prescribe-test`, formatData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        patientId: ids,
        enteredDate: new Date(),
        testId: [""],
      });

      await getData()
      message.success("Saved successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [updateId,setUpdateId]=useState("")

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/prescribe-test?patientId=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let fh: any[] = [];
      res.data.data.prescribeTests.map((val: any) =>
        val.testId.map((dts: any) => fh.push(dts._id))
      );
      
      setUpdateId(res.data.data.prescribeTests[0]._id)

      if (res.data.data.prescribeTests.length > 0) {
        const record = res.data.data.prescribeTests[0];
        const testIds = record.testId.map((t: any) => t._id);
        setData({
          patientId: record.patientId,
          enteredDate: new Date(record.enteredDate),
          testId: [...testIds, ""],
          _id: record._id,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const formatTestIds = data.testId.filter(
        (id: string) => id && id.trim() !== ""
      );

      const formatData = {
        ...data,
        testId: formatTestIds,
      };

      await axios.patch(`${api_url}/api/prescribe-test/${updateId}`, formatData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        patientId: ids,
        enteredDate: new Date(),
        testId: [""],
      });
      await getData()
      message.success("Updated successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  const handleRemove=(index:any)=>{
    const updatedTestIds = [...data.testId];
    updatedTestIds.splice(index, 1); 
  
    setData((prevData: any) => ({
      ...prevData,
      testId: updatedTestIds,
    }));
  }


  useEffect(() => {
    getAllTestName();
  }, []);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Prescribe Tests</p>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    color: "#595959",
                  }}
                  className="py-4"
                >
                  Test Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    color: "#595959",
                  }}
                  className="py-4"
                >
                  Action
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.testId.length > 0 &&
                data.testId.map((test: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}
                  >
                    <TableCell>
                      <Select
                        className="select-opt"
                        value={test}
                        style={{
                          width: "200px",
                          height: 40,
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#7F8F98",
                        }}
                        onChange={(value) => handleTestChange(index, value)}
                        options={testDrop}
                      />
                    </TableCell>
                    <TableCell><Button onClick={()=>handleRemove(index)}><IoCloseCircleOutline style={{fontSize:"20px",color:"red"}}/></Button></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        className="d-flex justify-content-end save-cancel-btn mt-4"
        style={{ backgroundColor: "white" }}
      >
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={updateId ? handleUpdate : handleSave}>
          {updateId ? "Update" : "Save"}
        </Button>
      </div>

    </>
  );
};

export default LabRequisition;
