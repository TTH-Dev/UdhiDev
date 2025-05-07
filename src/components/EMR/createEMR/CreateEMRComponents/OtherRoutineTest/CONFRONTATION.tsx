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
import { Avatar, Image, message } from "antd";
import { api_url } from "../../../../../Config";
import moment from "moment";
import axios from "axios";

const Confrontation: React.FC = () => {
  const columns = ["Image"];
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState<any>([]);
  const [img, setImg] = useState("");

  const getDatas = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/other-routine-test/get-by-date?section=confrontation&patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const otherTests = res?.data?.data?.confrontation?.results;
      
      setData(otherTests);
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
        <p className="emr-search-text">Confrontation</p>
      </div>
      <div className="emr-complaints-box mt-1 rounded p-4">
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
                data.map(
                  (row: any, index: any) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Avatar
                            className="me-2"
                            style={{ borderRadius: "0px" }}
                            src={`${api_url}/public/images/${row.confrontationImage}`}
                          />
                          <span
                            style={{ cursor: "pointer", color: "#3497F9" }}
                            onClick={() => {
                              setImg(row.confrontationImage);
                              setVisible(true);
                            }}
                          >
                            View
                          </span>
                        </TableCell>
                      </TableRow>
                  
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Image
        width={200}
        style={{ display: "none", backgroundColor: "red" }}
        src={`${api_url}/public/images/${img}`}
        preview={{
          visible,
          src: `${api_url}/public/images/${img}`,
          onVisibleChange: (value) => setVisible(value),
        }}
      />
    </>
  );
};

export default Confrontation;
