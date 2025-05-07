import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  message,
  Radio,
  TimePicker,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { api_url } from "../../../Config";
import axios from "axios";
import html2canvas from "html2canvas";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import moment from "moment";

interface BiometryState {
  familyHistory: {
    radio: string;
    checkbox: string[];
  };
  tonometry: {
    time1: string;
    predilatedIop: {
      od: string;
      os: string;
    };
    time2: string;
    postdilatedIop: {
      od: string;
      os: string;
    };
  };
  cct: {
    od: string;
    os: string;
  };
  gonioscopy: {
    os: EyeQuadrants;
    od: EyeQuadrants;
  };
  fields: TestDetail;
  oct: TestDetail;
}

interface EyeQuadrants {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

interface TestDetail {
  title: string;
  od: string;
  os: string;
  testedBy: string;
  time: string;
  date: string;
}

const options = ["Father", "Mother", "Sibling"];

const Glaucoma = () => {
  const id = sessionStorage.getItem("patientId");
  const [data, setData] = useState<any>({
    patientId: id,
    fullName: "",
    opNo: "",
    date: "",
    time: "",
    signatureDocument: null,
    glaucomaWorkSheet: "",
  });

  const [datas, setDatas] = useState<BiometryState>({
    familyHistory: {
      radio: "no",
      checkbox: [],
    },
    tonometry: {
      time1: "",
      predilatedIop: {
        od: "",
        os: "",
      },
      time2: "",
      postdilatedIop: {
        od: "",
        os: "",
      },
    },
    cct: {
      od: "",
      os: "",
    },
    gonioscopy: {
      os: {
        top: false,
        bottom: false,
        left: false,
        right: false,
      },
      od: {
        top: false,
        bottom: false,
        left: false,
        right: false,
      },
    },
    fields: {
      title: "",
      od: "",
      os: "",
      testedBy: "",
      time: "",
      date: "",
    },
    oct: {
      title: "",
      od: "",
      os: "",
      testedBy: "",
      time: "",
      date: "",
    },
  });

  const divRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");

      data.squintWorkSheet = imageData;
      img = imageData;
    }
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }


      const formData = new FormData();

      formData.append("patientId", data.patientId);
   
    
      formData.append("glaucomaWorkSheet", img);
      formData.append("glaucomaData", JSON.stringify(datas));

      await axios.post(`${api_url}/api/glaucoma`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        patientId: id,
        fullName: "",
        opNo: "",
        date: "",
        time: "",
        signatureDocument: null,
        glaucomaWorkSheet: "",
      });

      message.success("Saved Successfully!");
      await getData(id)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [updateId,setUpdateId]=useState("")
  const [isUpdate,setIsUpdate]=useState(false)

  const getData=async(ids:any)=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }
      const res=await axios.get(`${api_url}/api/glaucoma?createdAt=${moment(new Date()).format("YYYY-MM-DD")}&patientId=${ids}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    
      let df=res?.data?.data?.glaucomas[0]
      if(df){
        setDatas(JSON.parse(df?.glaucomaData))
        setUpdateId(df?._id)
        setIsUpdate(true)
      }
      
    }catch(error:any){
      console.log(error);
      
    }
  }

  const handleUpdate = async () => {
    let img = "";
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");

      data.squintWorkSheet = imageData;
      img = imageData;
    }
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Something went wrong!");
        return;
      }


      const formData = new FormData();

      formData.append("patientId", data.patientId);
   
    
      formData.append("glaucomaWorkSheet", img);
      formData.append("glaucomaData", JSON.stringify(datas));

      await axios.patch(`${api_url}/api/glaucoma/getById/${updateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

   

      message.success("Updated Successfully!");
      await getData(id)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(()=>{
if(id){
  getData(id)
}
  },[id])
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4" ref={divRef}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">GLAUCOMA WORK UP SHEET</p>
          <p className="emr-search-text">QF/OP/F/01</p>
        </div>
        <>
          <div>
            <p className="box-title ">1.Family History</p>

            <div className="ps-5">
              <Radio.Group
                value={datas?.familyHistory?.radio}
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    familyHistory: {
                      ...datas?.familyHistory,
                      radio: e.target.value,
                    },
                  })
                }
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <div className="ps-5 mt-2">
              <Checkbox.Group
                options={options}
                value={datas?.familyHistory?.checkbox}
                onChange={(checkedValues) =>
                  setDatas({
                    ...datas,
                    familyHistory: {
                      ...datas?.familyHistory,
                      checkbox: checkedValues,
                    },
                  })
                }
              />
            </div>
          </div>

          <div>
            <p className="box-title mt-4">2.Tonometry</p>

            <TableContainer component={Paper} className="mt-4" elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      TIME
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      PRE DILATED IOP
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      TIME
                    </TableCell>

                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      POST DILATED IOP
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      OD
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ borderLeft: "1px solid #cecece" }}
                    >
                      OD
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ border: "1px solid #cecece" }}>
                  {[1].map((_val: any) => (
                    <TableRow>
                      <TableCell style={{ borderRight: "1px solid #cecece" }}>
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          value={datas?.tonometry?.time1}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              tonometry: {
                                ...datas?.tonometry,
                                time1: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          value={datas?.tonometry?.predilatedIop?.od}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              tonometry: {
                                ...datas?.tonometry,
                                predilatedIop: {
                                  ...datas.tonometry?.predilatedIop,
                                  od: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          value={datas?.tonometry?.predilatedIop?.os}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              tonometry: {
                                ...datas?.tonometry,
                                predilatedIop: {
                                  ...datas.tonometry?.predilatedIop,
                                  os: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          value={datas?.tonometry?.time2}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              tonometry: {
                                ...datas?.tonometry,
                                time2: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          value={datas?.tonometry?.postdilatedIop?.od}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              tonometry: {
                                ...datas?.tonometry,
                                postdilatedIop: {
                                  ...datas.tonometry?.postdilatedIop,
                                  od: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          value={datas?.tonometry?.postdilatedIop?.os}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              tonometry: {
                                ...datas?.tonometry,
                                postdilatedIop: {
                                  ...datas.tonometry?.postdilatedIop,
                                  os: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <p className="box-title mt-4">3.CCT: (SMCCT)</p>

            <TableContainer component={Paper} className="mt-4" elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OD
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid #cecece",
                        borderRight: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                      }}
                    >
                      OS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ border: "1px solid #cecece" }}>
                  {[1].map((_val: any) => (
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          value={datas?.cct?.od}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              cct: {
                                ...datas.cct,
                                od: e.target.value,
                              },
                            })
                          }
                          style={{ border: "none" }}
                          rows={10}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextArea
                          value={datas?.cct?.os}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              cct: {
                                ...datas.cct,
                                os: e.target.value,
                              },
                            })
                          }
                          style={{ border: "none" }}
                          rows={10}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <p className="box-title mt-4">4.GONIOSCOPY</p>
          <br />

          <div className="d-flex justify-content-around align-items-center mt-5">
            <div className="">
              <span className="box-title " style={{ paddingLeft: "65px" }}>
                OS
              </span>
              <br />
              <i className="fi fi-ts-x" style={{ fontSize: "150px" }}></i>
              <div className="cornerg top">
                <Checkbox
                  checked={datas?.gonioscopy?.os?.left}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        os: {
                          ...datas?.gonioscopy?.os,
                          left: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
              <div className="cornerg right">
                <Checkbox
                  checked={datas?.gonioscopy?.os?.right}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        os: {
                          ...datas?.gonioscopy?.os,
                          right: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
              <div className="cornerg bot">
                <Checkbox
                  checked={datas?.gonioscopy?.os?.bottom}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        os: {
                          ...datas?.gonioscopy?.os,
                          bottom: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
              <div className="cornerg left">
                <Checkbox
                  checked={datas?.gonioscopy?.os?.top}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        os: {
                          ...datas?.gonioscopy?.os,
                          top: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
            </div>
            <div className="">
              <span className="box-title" style={{ paddingLeft: "65px" }}>
                OD
              </span>
              <br />

              <i className="fi fi-ts-x" style={{ fontSize: "150px" }}></i>

              <div className="cornerg top">
                <Checkbox
                  checked={datas?.gonioscopy?.od?.left}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        od: {
                          ...datas?.gonioscopy?.od,
                          left: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
              <div className="cornerg right">
                <Checkbox
                  checked={datas?.gonioscopy?.od?.right}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        od: {
                          ...datas?.gonioscopy?.od,
                          right: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
              <div className="cornerg bot">
                <Checkbox
                  checked={datas?.gonioscopy?.od?.bottom}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        od: {
                          ...datas?.gonioscopy?.od,
                          bottom: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
              <div className="cornerg left">
                <Checkbox
                  checked={datas?.gonioscopy?.od?.top}
                  onChange={(e) =>
                    setDatas({
                      ...datas,
                      gonioscopy: {
                        ...datas?.gonioscopy,
                        od: {
                          ...datas?.gonioscopy?.od,
                          top: e.target.checked,
                        },
                      },
                    })
                  }
                ></Checkbox>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-start align-items-center">
              <p className="box-title mb-0 me-3">5.FIELDS</p>
              <Input
                style={{ width: "200px", height: 35 }}
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    fields: {
                      ...datas?.fields,
                      title: e.target.value,
                    },
                  })
                }
                value={datas?.fields?.title}
              />
            </div>

            <TableContainer component={Paper} className="mt-4" elevation={0}>
              <Table style={{ border: "1px solid #cecece" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ borderRight: "1px solid #cecece" }}
                    >
                      OD
                    </TableCell>
                    <TableCell align="center">OS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1].map((_val: any) => (
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              fields: {
                                ...datas?.fields,
                                od: e.target.value,
                              },
                            })
                          }
                          value={datas?.fields?.od}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              fields: {
                                ...datas?.fields,
                                os: e.target.value,
                              },
                            })
                          }
                          value={datas?.fields?.os}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="row pt-2">
              <div className="col-lg-3">
                <div>
                  <label>Tested by</label>
                  <br />
                  <Input
                    style={{ width: "100%", height: 35 }}
                    onChange={(e) =>
                      setDatas({
                        ...datas,
                        fields: {
                          ...datas?.fields,
                          testedBy: e.target.value,
                        },
                      })
                    }
                    value={datas?.fields?.testedBy}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <label>Time </label>
                  <br />
                  <TimePicker
                    style={{ width: "100%", height: 35 }}
                    value={
                      datas.fields.time
                        ? dayjs(datas.fields.time, "HH:mm")
                        : null
                    }
                    onChange={(value) =>
                      setDatas({
                        ...datas,
                        fields: {
                          ...datas.fields,
                          time: value ? value.format("HH:mm") : "",
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <label>Date</label>
                  <br />
                  <DatePicker
                    style={{ width: "100%", height: 35 }}
                    value={
                      datas.fields.date
                        ? dayjs(datas.fields.date, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(value) =>
                      setDatas({
                        ...datas,
                        fields: {
                          ...datas.fields,
                          date: value ? value.format("YYYY-MM-DD") : "",
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3">
            <div className="d-flex justify-content-start align-items-center">
              <p className="box-title mb-0 me-3">6.OCT</p>
              <Input
                style={{ width: "200px", height: 35 }}
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    oct: {
                      ...datas?.oct,
                      title: e.target.value,
                    },
                  })
                }
                value={datas?.oct?.title}
              />
            </div>

            <TableContainer component={Paper} className="mt-4" elevation={0}>
              <Table style={{ border: "1px solid #cecece" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ borderRight: "1px solid #cecece" }}
                    >
                      OD
                    </TableCell>
                    <TableCell align="center">OS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1].map((_val: any) => (
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ borderRight: "1px solid #cecece" }}
                      >
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              oct: {
                                ...datas?.oct,
                                od: e.target.value,
                              },
                            })
                          }
                          value={datas?.oct?.od}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <TextArea
                          style={{ border: "none" }}
                          rows={10}
                          onChange={(e) =>
                            setDatas({
                              ...datas,
                              oct: {
                                ...datas?.oct,
                                os: e.target.value,
                              },
                            })
                          }
                          value={datas?.oct?.os}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="row pt-2">
              <div className="col-lg-3">
                <div>
                  <label>Tested by</label>
                  <br />
                  <Input
                    style={{ width: "100%", height: 35 }}
                    onChange={(e) =>
                      setDatas({
                        ...datas,
                        oct: {
                          ...datas?.oct,
                          testedBy: e.target.value,
                        },
                      })
                    }
                    value={datas?.oct?.testedBy}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <label>Time </label>
                  <br />
                  <TimePicker
                    style={{ width: "100%", height: 35 }}
                    value={
                      datas.oct.time ? dayjs(datas.oct.time, "HH:mm") : null
                    }
                    onChange={(value) =>
                      setDatas({
                        ...datas,
                        oct: {
                          ...datas.oct,
                          time: value ? value.format("HH:mm") : "",
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <label>Date</label>
                  <br />
                  <DatePicker
                    style={{ width: "100%", height: 35 }}
                    value={
                      datas.oct.date
                        ? dayjs(datas.oct.date, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(value) =>
                      setDatas({
                        ...datas,
                        oct: {
                          ...datas.oct,
                          date: value ? value.format("YYYY-MM-DD") : "",
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn ">
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={isUpdate?handleUpdate:handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default Glaucoma;
