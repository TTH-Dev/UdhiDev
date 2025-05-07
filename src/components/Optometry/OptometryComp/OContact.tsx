import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Button, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api_url } from "../../../Config";
import html2canvas from "html2canvas";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const Contact = () => {
  const patientId = sessionStorage.getItem("patientId");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>({
    patientId: patientId,
    contactLensTestWorkSheet: "",
  });

  const [contactLensData, setContactLensData] = useState<any>({
    od: {
      mm: {
        k1: "",
        k2: "",
        avgK: "",
      },
      d: {
        k1: "",
        k2: "",
        avgK: "",
      },
      axis: {
        k1: "",
        k2: "",
        avgK: "",
      },
    },
    os: {
      mm: {
        k1: "",
        k2: "",
        avgK: "",
      },
      d: {
        k1: "",
        k2: "",
        avgK: "",
      },
      axis: {
        k1: "",
        k2: "",
        avgK: "",
      },
    },
    trialLens: {
      od: {
        soft: "",
        rgp: "",
        softToric: "",
      },
      os: {
        soft: "",
        rgp: "",
        softToric: "",
      },
    },
    fitAssessment: {
      od: {
        centration: "",
        movement: "",
        limbalCoverage: "",
        visionAfterBlink: "",
        fluorscencePattern: "",
      },
      os: {
        centration: "",
        movement: "",
        limbalCoverage: "",
        visionAfterBlink: "",
        fluorscencePattern: "",
      },
      retinoscopyOvercl: {
        od: "",
        os: "",
      },
      accovercl: {
        od: "",
        os: "",
      },
      finalClspecifications: {
        od: "",
        os: "",
      },
    },
    review: {
      oneWeek: "",
      oneMonth: "",
      sixMonth: "",
    },
  });

  const handleContactLensChange = (path: any, value: any) => {
    setContactLensData((prevState: any) => {
      const keys = path.split(".");
      let updatedState = { ...prevState };
      let temp = updatedState;

      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;
      return updatedState;
    });
  };

  const handleSave = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");
      data.contactLensTestWorkSheet = imageData;
      img = imageData;
      console.log(img);
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }

      const formData = new FormData();
      if (data.fullName === "") {
        message.error("Full name required!");
        return;
      }

      formData.append("patientId", data.patientId);
      formData.append("contactLensTestWorkSheet", img);
      formData.append("contactLensData", JSON.stringify(contactLensData));

      await axios.post(`${api_url}/api/contact-lens-test`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        patientId: patientId,
        contactLensTestWorkSheet: "",
      });

      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");
      data.contactLensTestWorkSheet = imageData;
      img = imageData;
      console.log(img);
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }

      const formData = new FormData();
      if (data.fullName === "") {
        message.error("Full name required!");
        return;
      }

      formData.append("patientId", data.patientId);
      formData.append("contactLensTestWorkSheet", img);
      formData.append("contactLensData", JSON.stringify(contactLensData));

      await axios.patch(
        `${api_url}/api/contact-lens-test/getById/${updateId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData({
        patientId: patientId,
        contactLensTestWorkSheet: "",
      });

      message.success("Saved Successfully!");
      await getData(patientId);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
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
        `${api_url}/api/contact-lens-test?createdAt=${dayjs().format(
          "YYYY-MM-DD"
        )}&patientId=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setContactLensData(res?.data?.data?.contactLensTests[0]?.contactLensData);
      const df = res.data.data.contactLensTests[0];
      if (df && Object.keys(df).length > 0) {
        setIsUpdate(true);
        setUpdateId(df._id);
      } else {
        setIsUpdate(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (patientId) {
      getData(patientId);
    }
  }, [patientId]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4" ref={divRef}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">CONTACT LENS TRAIL WORK UP SHEET</p>
          <p className="emr-search-text">QF/OPTO/F3</p>
        </div>
        <>
          <div className="mt-4">
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                        borderBottom: "none",
                      }}
                    ></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OD
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      mm
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      D
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      AXIS
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      mm
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      D
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      AXIS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      K1
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.mm?.k1}
                        onChange={(e) =>
                          handleContactLensChange("od.mm.k1", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.d?.k1}
                        onChange={(e) =>
                          handleContactLensChange("od.d.k1", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.axis?.k1}
                        onChange={(e) =>
                          handleContactLensChange("od.axis.k1", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.mm?.k1}
                        onChange={(e) =>
                          handleContactLensChange("os.mm.k1", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.d?.k1}
                        onChange={(e) =>
                          handleContactLensChange("os.d.k1", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.axis?.k1}
                        onChange={(e) =>
                          handleContactLensChange("os.axis.k1", e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      K2
                    </TableCell>
                    <TableCell align="center">
                      <TextArea
                        value={contactLensData?.od?.mm?.k2}
                        onChange={(e) =>
                          handleContactLensChange("od.mm.k2", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.d?.k2}
                        onChange={(e) =>
                          handleContactLensChange("od.d.k2", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.axis?.k2}
                        onChange={(e) =>
                          handleContactLensChange("od.axis.k2", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.mm?.k2}
                        onChange={(e) =>
                          handleContactLensChange("os.mm.k2", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.d?.k2}
                        onChange={(e) =>
                          handleContactLensChange("os.d.k2", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.axis?.k2}
                        onChange={(e) =>
                          handleContactLensChange("os.axis.k2", e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      width={100}
                    >
                      Avg K
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.mm?.avgK}
                        onChange={(e) =>
                          handleContactLensChange("od.mm.avgK", e.target.value)
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.d?.avgK}
                        onChange={(e) =>
                          handleContactLensChange("od.d.avgK", e.target.value)
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.od?.axis?.avgK}
                        onChange={(e) =>
                          handleContactLensChange(
                            "od.axis.avgK",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.mm?.avgK}
                        onChange={(e) =>
                          handleContactLensChange("os.mm.avgK", e.target.value)
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.d?.avgK}
                        onChange={(e) =>
                          handleContactLensChange("os.d.avgK", e.target.value)
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.os?.axis?.avgK}
                        onChange={(e) =>
                          handleContactLensChange(
                            "os.axis.avgK",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <p className="box-title mt-4">Trial Lens Specification </p>

          <div className="mt-4">
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      TYPE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OD
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      SOFT
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={contactLensData?.trialLens?.od?.soft || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "trialLens.od.soft",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={contactLensData?.trialLens?.os?.soft || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "trialLens.os.soft",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      RGP
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        variant="standard"
                        value={contactLensData?.trialLens?.od?.rgp || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "trialLens.od.rgp",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={contactLensData?.trialLens?.os?.rgp || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "trialLens.os.rgp",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      width={200}
                    >
                      SOFT TORIC
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={contactLensData?.trialLens?.od?.softToric || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "trialLens.od.softToric",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={contactLensData?.trialLens?.os?.softToric || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "trialLens.os.softToric",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <p className="box-title mt-4">FIT ASSESSMENT</p>
          <div className="mt-4">
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      OD
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    ></TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.od?.centration || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.od.centration",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      CENTRATION
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.os?.centration || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.os.centration",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.od?.movement || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.od.movement",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      MOVEMENT
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.os?.movement || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.os.movement",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.od?.limbalCoverage ||
                          ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.od.limbalCoverage",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      LIMBAL COVERAGE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.os?.limbalCoverage ||
                          ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.os.limbalCoverage",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.od
                            ?.visionAfterBlink || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.od.visionAfterBlink",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      VISION AFTER BLINK
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.os
                            ?.visionAfterBlink || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.os.visionAfterBlink",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.od
                            ?.fluorscencePattern || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.od.fluorscencePattern",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      FLUORESCENCE PATTERN
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.os
                            ?.fluorscencePattern || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.os.fluorscencePattern",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="mt-4">
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                      align="center"
                    ></TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OD
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      RETINOSCOPY OVER C/L
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.retinoscopyOvercl
                            ?.od || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.retinoscopyOvercl.od",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.retinoscopyOvercl
                            ?.os || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.retinoscopyOvercl.os",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      ACCOVER C/L
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.accovercl?.od || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.accovercl.od",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.accovercl?.os || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.accovercl.os",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      FINAL C/L SPECIFICATIONS
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.finalClspecifications
                            ?.od || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.finalClspecifications.od",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={
                          contactLensData?.fitAssessment?.finalClspecifications
                            ?.os || ""
                        }
                        onChange={(e) =>
                          handleContactLensChange(
                            "fitAssessment.finalClspecifications.os",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <p className="box-title mt-4">REVIEW </p>

          <div className="mt-4">
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                      align="center"
                    ></TableCell>
                    <TableCell
                      colSpan={4}
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      REMARK
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      1 WEEK
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.review?.oneWeek || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "review.oneWeek",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      1 MONTH
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.review?.oneMonth || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "review.oneMonth",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                      align="center"
                    >
                      6 MONTH
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      <TextArea
                        value={contactLensData?.review?.sixMonth || ""}
                        onChange={(e) =>
                          handleContactLensChange(
                            "review.sixMonth",
                            e.target.value
                          )
                        }
                      />{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
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

export default Contact;
