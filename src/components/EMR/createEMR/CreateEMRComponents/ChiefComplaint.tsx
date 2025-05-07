import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { api_url } from "../../../../Config";
import moment from "moment";

const ChiefComplaint: React.FC = () => {
  const columns = ["Reason", "Duration", "Notes"];

  const [data, setData] = useState<any>([]);

  const getChief = async (id: any) => {
    
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(
        `${api_url}/api/chief-complaint?patientId=${id}&date=${moment(new Date()).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data.chiefComplaints);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      getChief(id);
    }
  }, []);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Chief Complaints</p>
        <div>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      sx={{ backgroundColor: "transparent", color: "#595959" }}
                      className="emr-label"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{row?.notes || "-"}</TableCell>
                    <TableCell>
                      {row?.since?.year +"Y "}/{" "}
                      {row?.since?.month +"M "}/{" "}{row?.since?.day + "D "}
                    </TableCell>
                    <TableCell>{row?.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ChiefComplaint;