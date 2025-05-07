import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Avatar, Button, message } from "antd";
import { useEffect, useState } from "react";
import { api_url } from "../../../../Config";
import moment from "moment";
import axios from "axios";
import { Image } from "antd";

const Refractionsheet = () => {
  const columns = ["Sheet"];

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
        `${api_url}/api/refraction-sheet?patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data.refractionSheets);
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

  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState("");

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p style={{ fontWeight: 600, color: "#595959" }}>Refraction Sheet</p>
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
                      <TableCell>
                        <Avatar className="me-2" src={row.refractionSheet} style={{borderRadius:"0px",width:"40px",height:"40px"}}/>
                        <Button
                          className="s-btn"
                          onClick={() => {
                            setImg(row.refractionSheet);
                            setVisible(true);
                          }}
                        >
                          View
                        </Button>
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
          src={`${img}`}
          preview={{
            visible,
            src: `${img}`,
            onVisibleChange: (value) => setVisible(value),
          }}
        />
      </div>
    </>
  );
};

export default Refractionsheet;
