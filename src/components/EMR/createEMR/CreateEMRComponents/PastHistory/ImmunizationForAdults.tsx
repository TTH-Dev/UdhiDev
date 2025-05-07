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

const ImmunizationForAdults: React.FC = () => {
  const columns = [
    "Influenza",
    "Pneumococcal",
    "Hepatitis A",
    "Hepatitis B",
    "Measles, Mumps",
    "Rubella",
    "Injection Tetanus Toxoid",
    "For Pediatrics As Per Vaccination Schedule",
    "Any other",
  ];

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
        `${api_url}/api/past-history/getBy-section?section=immunizationForAdults&patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data.immunizationForAdults.forAdults, "ll");
      console.log(res.data.data.immunizationForAdults.forChildrens, "ll");

      setData(res.data.data.immunizationForAdults);
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
        <p className="emr-search-text">Immunization : For Adults</p>
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
                    >
                      <div style={{ width: "8rem" }}>{col}</div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 &&
                  data.map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>
                        {row?.forAdults?.influenza.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.pneumococcal.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.hepatitisA.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.hepatitisB.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.measlesMumps.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.rubella.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.injectionTetanusToxoid.toLocaleString() ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {(row?.forAdults
                          ?.ForPediatricsAsPerVaccinationSchedule &&
                          row?.forAdults?.ForPediatricsAsPerVaccinationSchedule.toLocaleString()) ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forAdults?.anyOther.toLocaleString() || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="emr-complaints-box mt-4 rounded ps-4">
        <p className="emr-search-text">Immunization : For Childrens</p>
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
                    >
                      <div style={{ width: "8rem" }}>{col}</div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 &&
                  data.map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>
                        {row?.forChildrens?.influenza.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.pneumococcal.toLocaleString() ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.hepatitisA.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.hepatitisB.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.measlesMumps.toLocaleString() ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.rubella.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.injectionTetanusToxoid.toLocaleString() ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {(row?.forChildrens
                          ?.ForPediatricsAsPerVaccinationSchedule &&
                          row?.forChildrens?.ForPediatricsAsPerVaccinationSchedule.toLocaleString()) ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {row?.forChildrens?.anyOther.toLocaleString() || "-"}
                      </TableCell>
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

export default ImmunizationForAdults;
