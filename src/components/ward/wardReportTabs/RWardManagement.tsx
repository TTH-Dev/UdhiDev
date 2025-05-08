import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../../Config";
import moment from "moment";

const RWardManagement = () => {
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      let f = moment().format("MM");
      let y = moment().format("YYYY");

      const res = await axios.get(
        `${api_url}/api/ward/bed-allocation/monthly?month=${f}&year=${y}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res?.data?.reports);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="emr-label">S.No</TableCell>
            <TableCell className="emr-label">Date</TableCell>
            <TableCell className="emr-label">No. Of Beds Occupied</TableCell>
            <TableCell className="emr-label">Bed Occupancy Rate (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 &&
            data.map((row: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{moment(row?.date).format("DD-MM-YYYY")}</TableCell>
                <TableCell>{row?.allocatedBeds}</TableCell>
                <TableCell>{row?.allocationPercentage}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RWardManagement;
