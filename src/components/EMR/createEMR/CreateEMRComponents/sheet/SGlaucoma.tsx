import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { api_url } from "../../../../../Config";
import axios from "axios";
import { Avatar, Image, } from "antd";


const SGlaucoma = () => {
  const columns = ["View"];

  const [visible, setVisible] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [img, setImg] = useState("");

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/glaucoma?createdAt=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data.glaucomas);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
  }, []);
 
  return (
    <>
       <div className="emr-complaints-box mt-4 rounded p-4">
           <p style={{fontWeight:600,color:"#595959"}}>Glaucoma workup sheet</p>
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
                {data?.length > 0 &&
                  data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar className="me-2" src={row?.glaucomaWorkSheet} style={{borderRadius:"0px",width:"40px",height:"35px"}}/>
                        <Button
                          onClick={() => {
                            setImg(row.glaucomaWorkSheet);
                            setVisible(true);
                          }}
                          className="s-btn"
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
          src={img}
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

export default SGlaucoma;
