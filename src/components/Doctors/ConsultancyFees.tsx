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
import { Button, Empty, message } from "antd";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { api_url } from "../../Config";
import axios from "axios";

const ConsultancyFees: React.FC = () => {
  const [alldoctor, setAllDoctor] = useState([]);

  const getAll = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/consulty-fees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllDoctor(res.data.data.consultingFees);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div
      className="cont-da p-2 mx-3 rounded mb-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <p className="emr-search-text p-3">Consultancy Fees</p>
        </div>
        <div>
          <Link to="/doctors/consultancy-fees/add-fees">
            <Button className="s-btn ms-2">Add</Button>
          </Link>
        </div>
      </div>
      <div className="mb-5 mx-3">
        <TableContainer
          component={Paper}
          elevation={0}
          className="doc-avail-tabl"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Fees Type</TableCell>
                <TableCell className="emr-label">Fees Amount</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alldoctor.map((doctor: any, index) => (
                <TableRow key={index}>
                  <TableCell className="emr-pat-text-dd">
                    {doctor?.feesType}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    ₹ {doctor.feesAmount}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/doctors/consultancy-fees/edit-fees?id=${doctor._id}`}
                    >
                      <Button
                        style={{ backgroundColor: "#3497F9", color: "white" }}
                      >
                        <MdEdit />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {alldoctor.length === 0 && (
            <div className="pt-3">
              <Empty />
            </div>
          )}
        </TableContainer>
      </div>
    </div>
  );
};

export default ConsultancyFees;
