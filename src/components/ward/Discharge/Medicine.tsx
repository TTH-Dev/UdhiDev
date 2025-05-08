import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox, message } from "antd";
import axios from "axios";
import { api_url } from "../../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const Medicine = () => {
  const patientId = sessionStorage.getItem("patientId");
  const [postData, setPostData] = useState<any>([]);
  const [patientData, setPatientData] = useState<any>();

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/prescription?prescriptionFor=ip&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}&patientId=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatientData(res?.data?.data?.prescriptions[0]);

      let fg = res?.data?.data?.prescriptions[0]?.medicine;

      if (fg) {
        const mappedData = fg.map((val: any) => ({
          date: moment().format("DD-MM-YYYY"),
          name: val.medicineName || "-",
          mrg: {
            dose: val?.Timing.includes("M")
              ? val?.quantity + "Nos," + val?.quantityType
              : "-",
            given: val?.Timing.includes("M") ? false : null,
          },
          aft: {
            dose: val?.Timing.includes("A")
              ? val?.quantity + "Nos," + val?.quantityType
              : "-",
            given: val?.Timing.includes("A") ? false : null,
          },
          eve: {
            dose: val?.Timing.includes("E")
              ? val?.quantity + "Nos," + val?.quantityType
              : "-",
            given: val?.Timing.includes("E") ? false : null,
          },
          ngt: {
            dose: val?.Timing.includes("N")
              ? val?.quantity + "Nos," + val?.quantityType
              : "-",
            given: val?.Timing.includes("N") ? false : null,
          },
          instruction: val?.tabletTiming.join(", ") || "-",
        }));

        setPostData(mappedData);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCheckboxChange = (timeOfDay: string, index: number) => {
    const updatedData = [...postData];
    updatedData[index][timeOfDay].given = !updatedData[index][timeOfDay].given;
    setPostData(updatedData);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      await axios.patch(
        `${api_url}/api/surgery-details/${patientData?.patientId?.surgeryDetailsId}`,
        { medicineActivity: postData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Data saved successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to save data.");
    }
  };

  console.log(postData, "llll");

  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">Medication Chart</p>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#595959" }}>Date</TableCell>
                  <TableCell style={{ color: "#595959" }}>Name</TableCell>
                  <TableCell style={{ color: "#595959" }}>Mrg</TableCell>
                  <TableCell style={{ color: "#595959" }}>Aft</TableCell>
                  <TableCell style={{ color: "#595959" }}>Eve</TableCell>
                  <TableCell style={{ color: "#595959" }}>Ngt</TableCell>
                  <TableCell style={{ color: "#595959" }}>
                    Instruction
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postData.length > 0 &&
                  postData.map((val: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{val.date}</TableCell>
                      <TableCell>{val.name}</TableCell>

                      <TableCell>
                        {val.mrg.dose}
                        <br />
                        {val.mrg.given !== null && (
                          <>
                            <Checkbox
                              className="me-1"
                              checked={val.mrg.given}
                              onChange={() => handleCheckboxChange("mrg", i)}
                            />
                            <>Given</>
                          </>
                        )}
                      </TableCell>

                      <TableCell>
                        {val.aft.dose}
                        <br />
                        {val.aft.given !== null && (
                          <>
                            <Checkbox
                              className="me-1"
                              checked={val.aft.given}
                              onChange={() => handleCheckboxChange("aft", i)}
                            />
                            <>Given</>
                          </>
                        )}
                      </TableCell>

                      <TableCell>
                        {val.eve.dose}
                        <br />
                        {val.eve.given !== null && (
                          <>
                            <Checkbox
                              className="me-1"
                              checked={val.eve.given}
                              onChange={() => handleCheckboxChange("eve", i)}
                            />
                            <>Given</>
                          </>
                        )}
                      </TableCell>

                      <TableCell>
                        {val.ngt.dose}
                        <br />
                        {val.ngt.given !== null && (
                          <>
                            <Checkbox
                              className="me-1"
                              checked={val.ngt.given}
                              onChange={() => handleCheckboxChange("ngt", i)}
                            />
                            <>Given</>
                          </>
                        )}
                      </TableCell>

                      <TableCell>{val.instruction}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Medicine;
