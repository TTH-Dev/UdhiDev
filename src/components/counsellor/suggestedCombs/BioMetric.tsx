import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../../Config";
import { useSearchParams } from "react-router-dom";

const BioMetric = () => {
  const [searchParam]=useSearchParams()
  const ids=searchParam.get("id")
  const [isUpdate, setIsUpdate] = useState(false);

  const [biometric, setBiometric] = useState(false);
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      await axios.patch(
        `${api_url}/api/patient/${ids}`,
        { biometric: biometric },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Updated Successfully!")
      await getData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data.patient);
      let df = res?.data?.data?.patient;
      if (df) {
        setBiometric(df?.biometric);
        setIsUpdate(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Suggest</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select
                    value={biometric}
                    onChange={(value) => setBiometric(value)}
                    style={{ width: "50%" }}
                    options={[
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ]}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        className="d-flex justify-content-end save-cancel-btn mt-4"
        style={{ backgroundColor: "white" }}
      >
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={handleSave}>
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default BioMetric;
