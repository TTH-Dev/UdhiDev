import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api_url } from "../../../Config";
import html2canvas from "html2canvas";
import moment from "moment";

const OBiometryworkupSheet = () => {
  const [data, setData] = useState<any>({
    k1: {
      od: "",
      os: "",
      name: "K1",
    },
    k2: {
      od: "",
      os: "",
      name: "K2",
    },
    avgk: {
      od: "",
      os: "",
      name: "AVGK",
    },
    axl: {
      od: "",
      os: "",
      name: "AXL",
    },
    pciol: {
      od: "",
      os: "",
      name: "PCIOL",
    },
    pciol2: {
      od: "",
      os: "",
      name: "PCIOL",
    },
    usg: {
      od: "",
      os: "",
      name: "USG",
    },

    smt: {
      od: "",
      os: "",
      name: "( SM )T",
    },
    n: {
      od: "",
      os: "",
      name: "N",
    },
    min: {
      od: "",
      os: "",
      name: "MIN",
    },
    max: {
      od: "",
      os: "",
      name: "MAX",
    },
    avg: {
      od: "",
      os: "",
      name: "AVG",
    },
    sd: {
      od: "",
      os: "",
      name: "SD",
    },
    cv: {
      od: "",
      os: "",
      name: "CV",
    },
    cd: {
      od: "",
      os: "",
      name: "CD",
    },
    xst: {
      od: "",
      os: "",
      name: "XST",
    },
    bp: {
      od: "",
      os: "",
      name: "BP",
    },
    nld: {
      od: "",
      os: "",
      name: "NLD",
    },
  });

  const divRef = useRef<HTMLDivElement>(null);
  const id = sessionStorage.getItem("patientId");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const handleSave = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");

      img = imageData;
    }

    const formData = new FormData();
    formData.append("patientId", id || "");

    formData.append("biometryWorkSheet", img);
    formData.append("biometryData", JSON.stringify(data));

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/biometry`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Saved Successfully!");
      await getData(id);
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

  const getData = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/biometry?patientId=${ids}&createdAt=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df = res?.data?.data?.biometrys[0];
      if (df) {
        setData(JSON.parse(df?.biometryData));
        setUpdateId(df?._id);
        setIsUpdate(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");

      img = imageData;
    }

    const formData = new FormData();
    formData.append("patientId", id || "");

    formData.append("biometryWorkSheet", img);
    formData.append("biometryData", JSON.stringify(data));

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(`${api_url}/api/biometry/${updateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Updated Successfully!");
      await getData(id);
    } catch (error: any) {
      console.log(error);
      message.error("SOmething went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4" ref={divRef}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">BIOMETRY WORK UP SHEET</p>
          <p className="emr-search-text">QF/OPTO/F3</p>
        </div>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>OD</TableCell>
                  <TableCell>OS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([key, row]: any, i: number) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.od}
                        style={{ height: 35 }}
                        onChange={(e) => {
                          const newData = { ...data };
                          newData[key] = {
                            ...newData[key],
                            od: e.target.value,
                          };
                          setData(newData);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.os}
                        style={{ height: 35 }}
                        onChange={(e) => {
                          const newData = { ...data };
                          newData[key] = {
                            ...newData[key],
                            os: e.target.value,
                          };
                          setData(newData);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn">
        <Button
          className="s-btn"
          onClick={isUpdate ? handleUpdate : handleSave}
        >
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default OBiometryworkupSheet;
