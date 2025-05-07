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
import axios from "axios";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../../Config";
import { useEffect, useState } from "react";

const CPgeneral = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("add-general?type=general");
  };
  const handleNavEdit = (id:any) => {
    navigate(`edit-general?type=general&id=${id}`);
  };

  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/surgery?patientType=general`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data?.surgeries);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      await axios.delete(`${api_url}/api/surgery/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fg = data.filter((val: any) => val._id === ids);
      setData(fg);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="emr-complaints-box">
      <div className="d-flex justify-content-between">
        <div>
          <p className="emr-search-text mb-0 p-4">Surgery Details</p>
        </div>
        <div className=" text-end  py-3 pe-3">
          <Button className="s-btn ms-2" onClick={handleNav}>
            Add
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Sl.no</TableCell>
              <TableCell className="emr-label">Surgery Name</TableCell>
              <TableCell className="emr-label">Code</TableCell>
              <TableCell className="emr-label">IOL</TableCell>
              <TableCell className="emr-label">Amount</TableCell>
              <TableCell className="emr-label ps-5">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row: any, idx: any) =>
                row?.type.map((amount: any, index: any) => (
                  <TableRow key={`${idx}-${index}`}>
                    {index === 0 && (
                      <>
                        <TableCell style={{border:"none"}} rowSpan={row?.type?.length}>
                          {idx + 1}
                        </TableCell>
                        <TableCell style={{border:"none"}} rowSpan={row?.type?.length}>
                          {row?.name}
                        </TableCell>
                        <TableCell style={{border:"none"}} rowSpan={row?.type?.length}>
                          {row?.code}
                        </TableCell>
                      </>
                    )}
                    <TableCell style={{border:"none"}}>{amount?.iol}</TableCell>
                    <TableCell style={{border:"none"}}>{amount?.amount}</TableCell>
                    {index === 0 && (
            <TableCell rowSpan={row?.type?.length}  style={{border:"none"}}>
              <div>
                <Button className="i-btn me-3" onClick={()=>handleNavEdit(row?._id)}>
                  <MdEdit />
                </Button>
                <Button
                  className="i-btn"
                  onClick={() => handleDelete(row?._id)}
                >
                  <MdDeleteOutline />
                </Button>
              </div>
            </TableCell>
          )}
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CPgeneral;
