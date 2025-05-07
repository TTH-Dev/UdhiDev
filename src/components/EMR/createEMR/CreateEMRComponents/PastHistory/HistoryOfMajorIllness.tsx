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
import { api_url } from "../../../../../Config";
import moment from "moment";

const HistoryOfMajorIllness: React.FC = () => {
  const [data, setData] = useState<any>([]);

  const getData = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/past-history/getBy-section/?section=historyOfMajorIllness&patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res, "historyOfMajorIllness");
      setData(res.data.data.historyOfMajorIllness);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      getData(id);
    }
  }, []);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded ps-4">
        <p className="emr-search-text">History of Major illness</p>
      </div>

      <div className="emr-complaints-box mt-2 rounded p-4">
        <div>
          <TableContainer component={Paper} elevation={0}>
            {data?.length > 0 &&
              data.map((val: any, i: any) => (
                <Table key={i}>
                  <TableHead>
                    <TableRow>
                      {val?.HistoryOfMajorIllnessSchema.length>0&&val?.HistoryOfMajorIllnessSchema.map(
                        (col: any, index: any) => (
                          <TableCell
                            key={index}
                            sx={{
                              backgroundColor: "transparent",
                              color: "#595959",
                            }}
                            className="emr-label"
                          >
                            <div style={{ width: "10rem" }}>
                              {col?.typeName}
                            </div>
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={i}>
                      {val?.HistoryOfMajorIllnessSchema.map(
                        (val: any, i: any) => (
                          <TableCell key={i}>{val.typeValue || "-"}</TableCell>
                        )
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              ))}
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default HistoryOfMajorIllness;
