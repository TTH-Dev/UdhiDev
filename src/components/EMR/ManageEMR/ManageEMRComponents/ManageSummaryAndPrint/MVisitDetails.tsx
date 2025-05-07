import {
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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MVisitDetails = () => {
  const id = sessionStorage.getItem("patientId");
  const [searchParams]=useSearchParams()
  const date=searchParams.get("date")
  const [ogData, setOgData] = useState<any>([]);
  const [meds, setMeds] = useState<any>();

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/provisional-diagnosis?createdAt=${moment(
          date
        ).format("YYYY-MM-DD")}&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rws = res.data.data.provisionalDiagnosiss.map(
        (val: any) => val.provisionalDiagnosis
      );

      if (rws[0]) {
        setOgData(rws[0]);
      }

      await getMedicine();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getMedicine = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/prescription?date=${moment(date).format(
          "YYYY-MM-DD"
        )}&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMeds(res?.data?.data?.prescriptions[0]);
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
      <div className="mt-4 px-3 py-3">
        <div>
          <p className="emr-search-text ps-2">Provisional Diagnosis</p>
        </div>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    S.No
                  </TableCell>

                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ogData.length > 0 &&
                  ogData.map((val: any, i: any) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        {i + 1}
                      </TableCell>

                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        {val}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="py-4" style={{ backgroundColor: "white" }}>
        <div className="d-flex justify-content-between ps-2">
          <div>
            <p className="emr-search-text ps-3">Medicine</p>
          </div>
        </div>
        <div className="px-3">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    Medication
                  </TableCell>
                  <TableCell
                    className="py-0 "
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    <span className="ps-3">Dosage</span>
                    <TableRow>
                      <TableCell
                        className="py-0"
                        style={{ border: "none", color: "#595959" }}
                      >
                        M
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{ border: "none", color: "#595959" }}
                      >
                        A
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{ border: "none", color: "#595959" }}
                      >
                        E
                      </TableCell>
                      <TableCell
                        className="py-0"
                        style={{ border: "none", color: "#595959" }}
                      >
                        N
                      </TableCell>
                    </TableRow>
                  </TableCell>
                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meds?.medicine.length > 0 &&
                  meds?.medicine.map((val: any, i: any) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* Medication Name */}
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        {val?.medicineName || "-"}
                      </TableCell>

                      {/* Timing (M, A, E, N) in one row */}
                      <TableCell colSpan={1}>
                        <TableRow>
                          {["M", "A", "E", "N"].map((time) => (
                            <TableCell
                              key={time}
                              style={{
                                border: "none",
                                color: "#595959",
                                textAlign: "center",
                              }}
                            >
                              {val?.Timing.includes(time) ? val?.quantity : "-"}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableCell>

                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        {meds?.description || "-"}
                      </TableCell>

                      {/* Duration */}
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#595959",
                        }}
                      >
                        {val.duration || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="py-3">
        <div>
          <p className="emr-search-text ps-4">Follow Up Visit</p>
        </div>
        <div className="ps-4">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    Follow Up Date
                  </TableCell>

                  <TableCell
                    className="py-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    Test perscription for follow up{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                  {meds?.followUpCheckup?.chooseDate||"-"}
                  </TableCell>

                  <TableCell
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#595959",
                    }}
                  >
                    {meds?.followUpCheckup?.testPrescriptionForFollowUp||"-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default MVisitDetails;
