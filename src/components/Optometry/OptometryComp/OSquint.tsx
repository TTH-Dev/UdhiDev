import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox, Col, Input, message, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import DrawableGrid from "./OSqgrid";
import html2canvas from "html2canvas";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";
type EyeExamData = {
  id: number;
  name: string;
  subname: { label: string; d: string; n: string }[];
};

interface Datas {
  sheet: string;
  eom: string;
  hirschberg: string;
  ct: {
    distance: string;
    near: string;
  };
  pbct: {
    withGlass: {
      distance: string;
      near: string;
    };
    withoutGlass: {
      distance: string;
      near: string;
    };
  };
  npc: {
    npcs: string;
    subjective: string;
    objective: string;
  };
  wfdt: {
    near: string;
    distance: string;
    synaptophore: string;
    odFixationAt: string;
    odFixationAts: {
      blur: boolean;
      break: boolean;
      recovery: boolean;
    };
    adduction: string;
    abduction: string;
    fusionalRange: string;
  };
  diagnosis: string;
  management: string;
}

const options = ["Blur", "Break", "Recovery"];

const initialData: EyeExamData[] = [
  {
    id: 1,
    name: "CT",
    subname: [{ label: "", d: "", n: "" }],
  },
  {
    id: 2,
    name: "PBCT",
    subname: [
      { label: "With Glass", d: "", n: "" },
      { label: "Without Glass", d: "", n: "" },
    ],
  },
];

const OSquint = () => {
  const [data] = useState<EyeExamData[]>(initialData);

  const [selectedcb, setSelectedcb] = useState<string[]>([]);

  const handleChange = (checkedValues: any) => {
    setSelectedcb(checkedValues);
    console.log("Selected:", checkedValues);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawGrid(ctx, canvas.width, canvas.height);

          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;

          ctxRef.current = ctx;
        }
      }
    };

    initCanvas();
  }, []);

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const gridWidth = canvasWidth;
    const cellSizeX = gridWidth / 3;
    const cellSizeY = canvasHeight / 3;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.setLineDash([]);

    // Draw vertical lines
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSizeX, 0);
      ctx.lineTo(i * cellSizeX, canvasHeight);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSizeY);
      ctx.lineTo(gridWidth, i * cellSizeY);
      ctx.stroke();
    }
  };
  const id = sessionStorage.getItem("patientId");

  const divRef = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const [postData, setPostData] = useState<any>({
    patientId: id,
    patientName: "",
    time: "",
    signatureDocument: null,
    squintWorkSheet: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [sheet, setSheet] = useState("");

  const [datas, setDatas] = useState<Datas>({
    sheet: "",
    eom: "",
    hirschberg: "",
    ct: {
      distance: "",
      near: "",
    },
    pbct: {
      withGlass: {
        distance: "",
        near: "",
      },
      withoutGlass: {
        distance: "",
        near: "",
      },
    },
    npc: {
      npcs: "",
      subjective: "",
      objective: "",
    },
    wfdt: {
      near: "",
      distance: "",
      synaptophore: "",
      odFixationAt: "",
      odFixationAts: {
        blur: false,
        break: false,
        recovery: false,
      },
      adduction: "",
      abduction: "",
      fusionalRange: "",
    },
    diagnosis: "",
    management: "",
  });

  const handleInputChange = (
    examType: "CT" | "PBCT",
    subLabel: string,
    field: "distance" | "near",
    value: string
  ) => {
    if (examType === "CT") {
      setDatas((prev) => ({
        ...prev,
        ct: {
          ...prev.ct,
          [field]: value,
        },
      }));
    }

    if (examType === "PBCT") {
      setDatas((prev) => ({
        ...prev,
        pbct: {
          ...prev.pbct,
          [subLabel === "With Glass" ? "withGlass" : "withoutGlass"]: {
            ...prev.pbct[
              subLabel === "With Glass" ? "withGlass" : "withoutGlass"
            ],
            [field]: value,
          },
        },
      }));
    }
  };

  const handleSave = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);

      const imageData = canvas.toDataURL("image/png");

      postData.squintWorkSheet = imageData;
      img = imageData;
    }

    let img2 = "";
    if (divRef2.current) {
      const canvas = await html2canvas(divRef2.current);

      const imageData2 = canvas.toDataURL("image/png");

      postData.squintWorkSheet = imageData2;
      img2 = imageData2;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }

      const formData = new FormData();

      formData.append("patientId", postData.patientId);
      formData.append("patientName", postData.patientName);
      formData.append("time", postData.time);
      formData.append("squintWorkSheet", img);
      formData.append("signatureDocument", postData.signatureDocument);
      formData.append("squintData", JSON.stringify({ ...datas, sheet: img2 }));

      await axios.post(`${api_url}/api/squint`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPostData({
        patientId: id,
        patientName: "",
        time: "",
        signatureDocument: null,
        squintWorkSheet: "",
      });
      await getData(id);
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

      postData.squintWorkSheet = imageData;
      img = imageData;
    }

    let img2 = "";
    if (divRef2.current) {
      const canvas = await html2canvas(divRef2.current);

      const imageData2 = canvas.toDataURL("image/png");

      postData.squintWorkSheet = imageData2;
      img2 = imageData2;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }

      const formData = new FormData();

      formData.append("patientId", postData.patientId);
      formData.append("patientName", postData.patientName);
      formData.append("time", postData.time);
      formData.append("squintWorkSheet", img);
      formData.append("signatureDocument", postData.signatureDocument);
      formData.append("squintData", JSON.stringify({ ...datas, sheet: img2 }));

      await axios.patch(`${api_url}/api/squint/${updateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPostData({
        patientId: id,
        patientName: "",
        time: "",
        signatureDocument: null,
        squintWorkSheet: "",
      });
      await getData(id);
      message.success("Updated Successfully!");
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
        message.error("Something went wrong!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/squint?patientId=${ids}&createdAt=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df = res?.data?.data?.squints[0];
      let fg=JSON.parse(df?.squintData)
      if (df) {
        setIsUpdate(true);
        setUpdateId(df?._id);
        setDatas(JSON.parse(df?.squintData));
        setSheet(fg?.sheet);
      }
    
    } catch (error: any) {
      console.log(error);
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
          <p className="emr-search-text">Squint Work up sheet</p>
          <p className="emr-search-text">QF/OPTO/F2</p>
        </div>
        <>
          <Row>
            <Col span={24}>
              <label className="labl mb-2">
                <p className="box-title mt-4">1.EOM</p>
              </label>
              <br />
              <Input
                value={datas?.eom}
                onChange={(e) => setDatas({ ...datas, eom: e.target.value })}
                style={{ width: "50%", height: "40px" }}
                className="mb-2"
              />
            </Col>
            <Col span={24}>
              <label className="labl mb-2">
                <p className="box-title mt-4">2.HIRSCHBERG</p>
              </label>
              <br />
              <Input
                value={datas?.hirschberg}
                onChange={(e) =>
                  setDatas({ ...datas, hirschberg: e.target.value })
                }
                style={{ width: "50%", height: "40px" }}
                className="mb-2"
              />
            </Col>
          </Row>
          <TableContainer
            component={Paper}
            elevation={0}
            className="mt-4"
            style={{ overflow: "hidden" }}
          >
            <Table className="" sx={{ overflowX: "hidden" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="emr-label"
                    style={{
                      borderLeft: "1px solid #cecece",

                      borderTop: "1px solid #cecece",
                    }}
                  >
                    3.
                  </TableCell>
                  <TableCell
                    className="emr-label"
                    style={{
                      borderTop: "1px solid #cecece",
                    }}
                  ></TableCell>
                  <TableCell
                    className="emr-label"
                    style={{
                      borderLeft: "1px solid #cecece",
                      borderRight: "1px solid #cecece",
                      borderTop: "1px solid #cecece",
                    }}
                    align="center"
                  >
                    Distance
                  </TableCell>
                  <TableCell
                    className="emr-label"
                    style={{
                      borderLeft: "1px solid #cecece",
                      borderRight: "1px solid #cecece",
                      borderTop: "1px solid #cecece",
                    }}
                    align="center"
                  >
                    Near
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) =>
                  item.subname.map((sub, subIndex) => (
                    <TableRow key={`${item.id}-${subIndex}`}>
                      <TableCell
                        sx={{
                          borderBottom: subIndex === 0 ? "none" : "",
                          position: "relative",
                          top: "50px",
                          borderLeft: "1px solid #cecece",
                        }}
                      >
                        {subIndex === 0 ? item.name : ""}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderLeft: "1px solid #CFCFCF",
                          borderRight: "1px solid #CFCFCF",
                          borderBottom: "1px solid #CFCFCF",
                        }}
                      >
                        {sub.label}
                      </TableCell>

                      <TableCell sx={{ borderRight: "1px solid #cecece" }}>
                        <Input
                          className="my-1"
                          variant="outlined"
                          size="small"
                          value={
                            item.name === "CT"
                              ? datas?.ct?.distance
                              : item?.name === "PBCT" &&
                                sub?.label === "With Glass"
                              ? datas?.pbct?.withGlass?.distance
                              : datas?.pbct?.withoutGlass?.distance
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.name as "CT" | "PBCT",
                              sub.label,
                              "distance",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", height: 40 }}
                        />
                      </TableCell>

                      <TableCell sx={{ borderRight: "1px solid #cecece" }}>
                        <Input
                          className="my-1"
                          variant="outlined"
                          size="small"
                          value={
                            item.name === "CT"
                              ? datas?.ct?.near
                              : item?.name === "PBCT" &&
                                sub?.label === "With Glass"
                              ? datas?.pbct?.withGlass?.near
                              : datas?.pbct?.withoutGlass?.near
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.name as "CT" | "PBCT",
                              sub.label,
                              "near",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", height: 40 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <p className="box-title mt-4">4.NPC</p>
          <br />
          <Row className="pb-3">
            <Col span={12} className="">
              <label className="labl mb-2 pe-4">NPC</label>
              <Input
                value={datas?.npc?.npcs}
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    npc: {
                      ...datas?.npc,
                      npcs: e.target.value,
                    },
                  })
                }
                className="mb-2"
                style={{ width: "200px", height: "40px" }}
              />
            </Col>
            <Col span={12} className="">
              <label className="labl mb-2 pe-4">Subjective</label>
              <Input
                value={datas?.npc?.subjective}
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    npc: {
                      ...datas.npc,
                      subjective: e.target.value,
                    },
                  })
                }
                className="mb-2"
                style={{ width: "200px", height: "40px" }}
              />
            </Col>
            <Col span={12} className="pt-3"></Col>
            <Col span={12} className="pt-3">
              <label className="labl mb-2 pe-4">Objective</label>
              <Input
                value={datas?.npc?.objective}
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    npc: {
                      ...datas.npc,
                      objective: e.target.value,
                    },
                  })
                }
                className="mb-2"
                style={{ width: "200px", height: "40px" }}
              />
            </Col>
          </Row>
          <div>
            <p className="box-title">5.WFDT</p>
            <div className="d-flex">
              <div className="">
                <label className="pe-3 my-4" style={{ minWidth: "150px" }}>
                  Near
                </label>
                <Input
                  style={{ width: "200px", height: "40px" }}
                  value={datas?.wfdt?.near}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      wfdt: {
                        ...datas.wfdt,
                        near: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="ms-3">
                <label className=" my-4" style={{ minWidth: "100px" }}>
                  Distance
                </label>
                <Input
                  style={{ width: "200px", height: "40px" }}
                  value={datas?.wfdt?.distance}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      wfdt: {
                        ...datas.wfdt,
                        distance: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ minWidth: "150px" }} className="my-4">
              SYNAPTOPHORE
            </label>
            <Input
              style={{ width: "200px", height: "40px" }}
              value={datas?.wfdt?.synaptophore}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  wfdt: {
                    ...datas.wfdt,
                    synaptophore: e.target.value,
                  },
                })
              }
            />
            <br />
            <label className="pe-4 my-4" style={{ minWidth: "150px" }}>
              OD Fixation at
            </label>
            <Input
              style={{ width: "200px", height: "40px" }}
              value={datas?.wfdt?.odFixationAt}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  wfdt: {
                    ...datas.wfdt,
                    odFixationAt: e.target.value,
                  },
                })
              }
            />
            <br />
            <label className="pe-4 my-4" style={{ minWidth: "150px" }}>
              OD Fixation at
            </label>

            <Checkbox.Group
              options={options}
              value={selectedcb}
              onChange={handleChange}
            />
            <br />
            <label style={{ minWidth: "150px" }} className="my-4">
              Adduction
            </label>
            <Input
              style={{ width: "200px", height: "40px" }}
              value={datas?.wfdt?.adduction}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  wfdt: {
                    ...datas.wfdt,
                    adduction: e.target.value,
                  },
                })
              }
            />
            <br />
            <label className="pe-4 my-4" style={{ minWidth: "150px" }}>
              {" "}
              Abduction{" "}
            </label>
            <Input
              style={{ width: "200px", height: "40px" }}
              value={datas?.wfdt?.abduction}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  wfdt: {
                    ...datas.wfdt,
                    abduction: e.target.value,
                  },
                })
              }
            />
            <br />
            <label className="pe-4 my-4" style={{ minWidth: "150px" }}>
              Fusional Range
            </label>
            <Input
              style={{ width: "200px", height: "40px" }}
              value={datas?.wfdt?.fusionalRange}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  wfdt: {
                    ...datas.wfdt,
                    fusionalRange: e.target.value,
                  },
                })
              }
            />
            <br />
          </div>
          <div>
            <p className="box-title">6.DIPLOPIA CHARTING</p>
            <Row className="d-flex justify-content-between">
              <Col span={8}>
                <div className="text-start ps-5">
                  <span className="box-title">OS</span>
                </div>
              </Col>

              <Col span={8}>
                <div className="text-center">
                  <span className="box-title">OD</span>
                </div>
              </Col>
            </Row>

            <div ref={divRef2}>
              <DrawableGrid />
            </div>

            <div>
              {sheet && (
                <>
                <span style={{fontSize:"16px",fontWeight:600}}>Reference Sheet</span>
                <img src={sheet} loading="lazy" className="img-fluid" />
                </>
              )}
            </div>
            <div>
              <p className="box-title">7.DIAGNOSIS</p>
              <Input.TextArea
                rows={4}
                style={{ width: "400px" }}
                value={datas?.diagnosis}
                onChange={(e) =>
                  setDatas({ ...datas, diagnosis: e.target.value })
                }
              />
            </div>
            <div className="pt-2">
              <p className="box-title">8.MANAGEMENT</p>
              <Input.TextArea
                rows={4}
                style={{ width: "400px" }}
                value={datas?.management}
                onChange={(e) =>
                  setDatas({ ...datas, management: e.target.value })
                }
              />
            </div>
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

export default OSquint;
