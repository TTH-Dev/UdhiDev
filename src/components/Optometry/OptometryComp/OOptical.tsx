import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, message } from "antd";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";

const OOptical: React.FC = () => {
  const id = sessionStorage.getItem("patientId");
  const [data, setData] = useState<any>({
    patientId: id,
    wt: false,
    ca: false,
    pge: false,
    mmt: false,
    c39: false,
    bifocal: {
      kryptok: false,
      univisD: false,
      executive: false,
    },
    progressive: "",
    pgCondition: {
      good: false,
      notGood: false,
    },
    forConstantUse: "",
    forReadingOnly: "",
    interPupillaryDistance: "",
    TintToPatientChoice: "",
    values: {
      re: {
        dist: {
          sph: "",
          cyl: "",
          axis: "",
        },
        near: {
          sph: "",
          cyl: "",
          axis: "",
        },
      },
      le: {
        dist: {
          sph: "",
          cyl: "",
          axis: "",
        },
        near: {
          sph: "",
          cyl: "",
          axis: "",
        },
      },
    },
  });
  const subjectOptions = ["W.T", "C.A", "P.G.E", "M.M.T", "C 39"];
  const bifocalOptions = ["Kryptok", "Univis D", "Executive"];

  const handleSubjectChange = (checkedValues: any) => {
    setData((prev: any) => ({
      ...prev,
      wt: checkedValues.includes("W.T"),
      ca: checkedValues.includes("C.A"),
      pge: checkedValues.includes("P.G.E"),
      mmt: checkedValues.includes("M.M.T"),
      c39: checkedValues.includes("C 39"),
    }));
  };

  const handleBifocalChange = (checkedValues: any) => {
    setData((prev: any) => ({
      ...prev,
      bifocal: {
        kryptok: checkedValues.includes("Kryptok"),
        univisD: checkedValues.includes("Univis D"),
        executive: checkedValues.includes("Executive"),
      },
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePGConditionChange = (condition: string) => {
    setData((prev: any) => ({
      ...prev,
      pgCondition: {
        good: condition === "Good",
        notGood: condition === "Not Good",
      },
    }));
  };

  const handleValueChange = (
    eye: "re" | "le",
    range: "dist" | "near",
    field: "sph" | "cyl" | "axis",
    value: string
  ) => {
    setData((prev: any) => ({
      ...prev,
      values: {
        ...prev.values,
        [eye]: {
          ...prev.values[eye],
          [range]: {
            ...prev.values[eye][range],
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      await axios.post(`${api_url}/api/optical-values`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Saved Successfully!");
      await getData(id);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const getData = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      const res = await axios.get(
        `${api_url}/api/optical-values?patientId=${ids}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.data.opticalValues[0], "res");
      let df = res?.data?.data?.opticalValues[0];
      if (df) {
        setData(df);
        setIsUpdate(true);
        setUpdateId(df?._id);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }

      await axios.patch(`${api_url}/api/optical-values/getById/${updateId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Updated Successfully!");
      await getData(id);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">Instructions:</p>
          <p className="emr-search-text">QF/OPTO/F/07</p>
        </div>
        <div>
          <Checkbox.Group
            options={subjectOptions}
            value={subjectOptions.filter(
              (opt: any) => data[opt.toLowerCase().replace(/\s|\./g, "")]
            )}
            onChange={handleSubjectChange}
          />

          <TableRow>
            <TableCell style={{ border: "none" }}>Bifocal</TableCell>
            <TableCell style={{ border: "none" }}>
              {" "}
              <Checkbox.Group
                options={bifocalOptions}
                value={bifocalOptions.filter(
                  (opt) =>
                    data?.bifocal[opt.toLowerCase().replace(/\s|\.|d/g, "")]
                )}
                onChange={handleBifocalChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>Progressive</TableCell>
            <TableCell style={{ border: "none" }}>
              <Input
                value={data?.progressive}
                onChange={(e) =>
                  handleInputChange("progressive", e.target.value)
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>PG Condition</TableCell>
            <TableCell style={{ border: "none" }}>
              <Checkbox
                checked={data?.pgCondition?.good}
                onChange={() => handlePGConditionChange("Good")}
              >
                Good
              </Checkbox>
              <Checkbox
                checked={data?.pgCondition?.notGood}
                onChange={() => handlePGConditionChange("Not Good")}
              >
                Not Good
              </Checkbox>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>For Constant Use</TableCell>
            <TableCell style={{ border: "none" }}>
              <Input
                value={data?.forConstantUse}
                onChange={(e) =>
                  handleInputChange("forConstantUse", e.target.value)
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>For Reading Only</TableCell>
            <TableCell style={{ border: "none" }}>
              <Input
                value={data?.forReadingOnly}
                onChange={(e) =>
                  handleInputChange("forReadingOnly", e.target.value)
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>
              Inter Pupillary Distance
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Input
                value={data?.interPupillaryDistance}
                onChange={(e) =>
                  handleInputChange("interPupillaryDistance", e.target.value)
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>
              Tint to patient's Choice
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Input
                value={data?.TintToPatientChoice}
                onChange={(e) =>
                  handleInputChange("TintToPatientChoice", e.target.value)
                }
              />
            </TableCell>
          </TableRow>
        </div>
      </div>

      <div className="emr-complaints-box mt-4 rounded p-4">
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">Values</p>
        </div>
        <div className="mt-4">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2}></TableCell>
                  <TableCell colSpan={3} style={{ border: "none" }}>
                    RE
                  </TableCell>
                  <TableCell colSpan={3} style={{ border: "none" }}>
                    LE
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SPH</TableCell>
                  <TableCell>CYL</TableCell>
                  <TableCell>AXIS</TableCell>
                  <TableCell>SPH</TableCell>
                  <TableCell>CYL</TableCell>
                  <TableCell>AXIS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Dist.</TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.re?.dist?.sph}
                      onChange={(e) =>
                        handleValueChange("re", "dist", "sph", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.re?.dist?.cyl}
                      onChange={(e) =>
                        handleValueChange("re", "dist", "cyl", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.re?.dist?.axis}
                      onChange={(e) =>
                        handleValueChange("re", "dist", "axis", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.le?.dist?.sph}
                      onChange={(e) =>
                        handleValueChange("le", "dist", "sph", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.le?.dist?.cyl}
                      onChange={(e) =>
                        handleValueChange("le", "dist", "cyl", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.le?.dist?.axis}
                      onChange={(e) =>
                        handleValueChange("le", "dist", "axis", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Near.</TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.re?.near?.sph}
                      onChange={(e) =>
                        handleValueChange("re", "near", "sph", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.re?.near?.cyl}
                      onChange={(e) =>
                        handleValueChange("re", "near", "cyl", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.re?.near?.axis}
                      onChange={(e) =>
                        handleValueChange("re", "near", "axis", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.le?.near?.sph}
                      onChange={(e) =>
                        handleValueChange("le", "near", "sph", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.le?.near?.cyl}
                      onChange={(e) =>
                        handleValueChange("le", "near", "cyl", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextArea
                      value={data?.values?.le?.near?.axis}
                      onChange={(e) =>
                        handleValueChange("le", "near", "axis", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        {/* <Button className="c-btn me-3">Cancel</Button> */}
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

export default OOptical;
