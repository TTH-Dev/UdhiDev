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
import { api_url } from "../../../../../Config";
import axios from "axios";
import moment from "moment";

const Typeofallergies: React.FC = () => {
  const columns = ["Injections", "Tablets", "Eye Drops", "Any Others"];

  const [data, setData] = useState<any[]>([]);

  const getDatas = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/past-history/getBy-section?section=typeOfAllergies&patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data?.typeOfAllergies);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  console.log(data, "data");

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      getDatas(id);
    }
  }, []);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded ps-4">
        <p className="emr-search-text">Types of Allergies</p>
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
                      align="left"
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
                      <TableCell>{row?.injections}</TableCell>
                      <TableCell>{row?.tablets}</TableCell>
                      <TableCell>{row?.eyeDrops}</TableCell>
                      <TableCell>{row?.anyOthers}</TableCell>
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

export default Typeofallergies;
