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
import { api_url } from "../../../../../Config";
import axios from "axios";
import { message } from "antd";
import moment from "moment";

const FamilyHistory: React.FC = () => {
  const columns = ["Systemic Disease", "Ophthalmic Disease"];

  const [data, setData] = useState<any>([]);

  const getDatas = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/past-history/getBy-section?section=familyHistory&patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data.familyHistory);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      getDatas(id);
    }
  }, []);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded ps-4">
        <p className="emr-search-text">Family History</p>
      </div>

      <div className="emr-complaints-box mt-2 rounded p-4">
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
                {data.length > 0 &&
                  data.map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{row?.systemicDisease || "-"}</TableCell>
                      <TableCell>{row?.ophthalmicDisease || "-"}</TableCell>
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

export default FamilyHistory;
