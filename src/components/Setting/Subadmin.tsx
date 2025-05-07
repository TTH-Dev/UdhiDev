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
import { Button, Empty, Switch, message } from "antd";
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const Subadmin: React.FC = () => {
  const [data, setData] = useState([
    {
      fullName: "",
      email: "",
      emloyeeType: "",
      isActive: false,
      _id: "",
    },
  ]);

  const getSubAdmin = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/subadmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data.subAdmin);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const updateSubAdmin = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(
        `${api_url}/api/subadmin/getById/${id}`,
        { isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Status updated successfully!");

      setData((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isActive } : item))
      );
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.delete(`${api_url}/api/subadmin/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) => prevData.filter((subadmin) => subadmin._id !== id));

      message.success("SubAdmin deleted successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getSubAdmin();
  }, []);

  return (
    <div
      className="cont-da p-2 mx-3 rounded mb-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0 p-3">Sub Admin Info</p>
        <div className="d-flex p-3">
          <Link to="/setting/sub-admin/add-sub-admin">
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
                <TableCell className="emr-label">S. No</TableCell>
                <TableCell className="emr-label">Name</TableCell>
                <TableCell className="emr-label">Email ID</TableCell>
                <TableCell className="emr-label">Employee Type</TableCell>
                <TableCell className="emr-label">Access</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((patient: any, index: any) => (
                <TableRow key={patient.id}>
                  <TableCell className="emr-pat-text-dd">{index + 1}</TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.fullName}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.email}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.emloyeeType}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    <Switch
                      checked={patient.isActive}
                      onChange={(checked) =>
                        updateSubAdmin(patient._id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/setting/sub-admin/edit-sub-admin?id=${patient._id}`}
                    >
                      <Button
                        className="p-0"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#3497F9",
                          color: "white",
                          border: "none",
                        }}
                      >
                        <MdEdit style={{ fontSize: "20px" }} />
                      </Button>
                    </Link>
                    <Button
                      className="p-0 ms-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#3497F9",
                        color: "white",
                      }}
                      onClick={() => handleDelete(patient._id)}
                    >
                      <MdOutlineDeleteForever style={{ fontSize: "20px" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.length===0&&<div className="pt-3"><Empty description="No subadmin found!"/></div>}
        </TableContainer>
      </div>
    </div>
  );
};

export default Subadmin;
