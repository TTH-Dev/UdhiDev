import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api_url } from "../../../Config";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const distanceVisionOptions = [
  "PL(-)",
  "PL+",
  "HM+",
  "CF CF",
  "CF @ ½ m",
  "CF @ 1m",
  "CF @ 1½m",
  "CF @ 2m",
  "CF @ 2½m",
  "CF @ 3m",
  "6/60",
  "6/36(P)",
  "6/36",
  "6/24(P)",
  "6/24",
  "6/18(P)",
  "6/18",
  "6/12(P)",
  "6/12",
  "6/9(P)",
  "6/9",
  "6/6(P)",
  "6/6",
];

const nearVisionOptions = [
  "<N36",
  "N36",
  "N24",
  "N18",
  "N12",
  "N10",
  "N8",
  "N6",
];

const StyledForm = styled.div`
  :where(.css-dev-only-do-not-override-1v613y0).ant-form-vertical
    .ant-form-item:not(.ant-form-item-horizontal)
    .ant-form-item-row {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 0px;
    align-items: center;
  }
  :where(.css-dev-only-do-not-override-1v613y0).ant-form-item
    .ant-form-item-label {
    text-align: start !important;
  }
`;

const Refractionsheet = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const id = sessionStorage.getItem("patientId");

  const [data, setData] = useState({
    patientId: sessionStorage.getItem("patientId"),
    enteredDate: new Date().toISOString(),
    uva: {
      od: {
        day: [],
        night: [],
      },
      os: {
        day: [],
        night: [],
      },
    },
    pgv: {
      od: {
        day: [],
        night: [],
      },
      os: {
        day: [],
        night: [],
      },
    },
    phv: {
      od: {
        day: [],
      },
      os: {
        day: [],
      },
    },
    pgp: {
      od: {
        day: [],
        night: [],
      },
      os: {
        day: [],
        night: [],
      },
    },
    pgCondition: {
      od: "",
      os: "",
    },
    frame: {
      od: "",
      os: "",
    },
    lens: {
      od: "",
      os: "",
    },
    arValue: {
      od: "",
      os: "",
    },
    cycloValue: {
      od: "",
      os: "",
    },
    acc: {
      od: "",
      os: "",
    },
    add: {
      od: "",
      os: "",
    },
    fogging: {
      done: false,
      notDone: false,
    },
    duoChromeBalance: {
      done: false,
      notDone: false,
    },
    ipd: {
      ou: "",
      od: "",
      os: "",
      advice: "",
      dilatation: "",
    },
    refractionSheet: "",
  });

  const handleSave = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");
      data.refractionSheet = imageData;
    }

    const formData = new FormData();

    // Helper to append nested values into formData
    const appendFormData = (
      formData: FormData,
      data: any,
      parentKey: string = ""
    ) => {
      if (data && typeof data === "object" && !Array.isArray(data)) {
        for (const key in data) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          appendFormData(formData, data[key], newKey);
        }
      } else if (Array.isArray(data)) {
        data.forEach((value, index) => {
          const newKey = `${parentKey}[${index}]`;
          appendFormData(formData, value, newKey);
        });
      } else if (data !== undefined && data !== null) {
        formData.append(parentKey, data);
      }
    };

    appendFormData(formData, data);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/refraction-sheet`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getData(id);

      message.success("Added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const getData = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/refraction-sheet?date=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}&patientId=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res?.data?.data?.refractionSheets[0], "res");
      let df = res?.data?.data?.refractionSheets[0];
      if (df) {
        setData(df);
        setIsUpdate(true);
        setUpdateId(df?._id);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const hanldeUpdate = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const imageData = canvas.toDataURL("image/png");
      data.refractionSheet = imageData;
    }

    const formData = new FormData();

    // Helper to append nested values into formData
    const appendFormData = (
      formData: FormData,
      data: any,
      parentKey: string = ""
    ) => {
      if (data && typeof data === "object" && !Array.isArray(data)) {
        for (const key in data) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          appendFormData(formData, data[key], newKey);
        }
      } else if (Array.isArray(data)) {
        data.forEach((value, index) => {
          const newKey = `${parentKey}[${index}]`;
          appendFormData(formData, value, newKey);
        });
      } else if (data !== undefined && data !== null) {
        formData.append(parentKey, data);
      }
    };

    appendFormData(formData, data);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(`${api_url}/api/refraction-sheet/getById/${updateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getData(id);

      message.success("Updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
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
          <p className="emr-search-text">Refraction Sheet</p>
          <p className="emr-search-text">QF/OPTO/F/01</p>
        </div>
        <TableContainer component={Paper} elevation={0} className="px-3">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Name</TableCell>
                <TableCell className="emr-label">OD</TableCell>
                <TableCell className="emr-label">OS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>UVA</TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.uva?.od?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          uva: {
                            ...prev.uva,
                            od: {
                              ...prev.uva.od,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                  <div className="mt-2">
                    N{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      value={data?.uva?.od?.night}
                      mode="tags"
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          uva: {
                            ...prev.uva,
                            od: {
                              ...prev.uva.od,
                              night: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.uva?.os?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          uva: {
                            ...prev.uva,
                            os: {
                              ...prev.uva.os,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                  <div className="mt-2">
                    N{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      value={data?.uva?.os?.night}
                      mode="tags"
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          uva: {
                            ...prev.uva,
                            os: {
                              ...prev.uva.os,
                              night: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PGV</TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.pgv?.od?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgv: {
                            ...prev.pgv,
                            od: {
                              ...prev.pgv.od,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                  <div className="mt-2">
                    N{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.pgv?.od?.night}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgv: {
                            ...prev.pgv,
                            od: {
                              ...prev.pgv.od,
                              night: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.pgv?.os?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgv: {
                            ...prev.pgv,
                            os: {
                              ...prev.pgv.os,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                  <div className="mt-2">
                    N{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      value={data?.pgv?.os?.night}
                      mode="tags"
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgv: {
                            ...prev.pgv,
                            os: {
                              ...prev.pgv.os,
                              night: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PHV</TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.phv?.od?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          phv: {
                            ...prev.phv,
                            od: {
                              ...prev.phv.od,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.phv?.os?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          phv: {
                            ...prev.phv,
                            os: {
                              ...prev.phv.os,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PGP</TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.pgp?.od?.day}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgp: {
                            ...prev.pgp,
                            od: {
                              ...prev.pgp.od,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                  <div className="mt-2">
                    N{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.pgp?.od?.night}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgp: {
                            ...prev.pgp,
                            od: {
                              ...prev.pgp.od,
                              night: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    D{" "}
                    <Select
                      options={distanceVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      value={data?.pgp?.os?.day}
                      mode="tags"
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgp: {
                            ...prev.pgp,
                            os: {
                              ...prev.pgp.os,
                              day: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                  <div className="mt-2">
                    N{" "}
                    <Select
                      options={nearVisionOptions.map((val) => ({
                        lable: val,
                        value: val,
                      }))}
                      mode="tags"
                      value={data?.pgp?.os?.night}
                      onChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          pgp: {
                            ...prev.pgp,
                            os: {
                              ...prev.pgp.os,
                              night: value,
                            },
                          },
                        }))
                      }
                      showSearch
                      style={{ width: 300, height: 35 }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PG Condition</TableCell>
                <TableCell>
                  <Input
                    value={data?.pgCondition?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        pgCondition: {
                          ...prev.pgCondition,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.pgCondition?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        pgCondition: {
                          ...prev.pgCondition,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Frame</TableCell>
                <TableCell>
                  <Input
                    value={data?.frame?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        frame: {
                          ...prev.frame,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.frame?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        frame: {
                          ...prev.frame,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lens</TableCell>
                <TableCell>
                  <Input
                    value={data?.lens?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        lens: {
                          ...prev.lens,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.lens?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        lens: {
                          ...prev.lens,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AR Value</TableCell>
                <TableCell>
                  <Input
                    value={data?.arValue?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        arValue: {
                          ...prev.arValue,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.arValue?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        arValue: {
                          ...prev.arValue,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cyclo value</TableCell>
                <TableCell>
                  <Input
                    value={data?.cycloValue?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        cycloValue: {
                          ...prev.cycloValue,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.cycloValue?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        cycloValue: {
                          ...prev.cycloValue,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ACC</TableCell>
                <TableCell>
                  <Input
                    value={data?.acc?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        acc: {
                          ...prev.acc,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.acc?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        acc: {
                          ...prev.acc,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ADD</TableCell>
                <TableCell>
                  <Input
                    value={data?.add?.od}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        add: {
                          ...prev.add,
                          od: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={data?.add?.os}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        add: {
                          ...prev.add,
                          os: e.target.value,
                        },
                      }))
                    }
                    style={{ width: 300, height: 35 }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-3">
          <StyledForm>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 10 }}>
              <Form.Item label={<span className="emr-label">Fogging</span>}>
                <Checkbox
                  checked={data?.fogging?.done}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      fogging: {
                        ...prev.fogging,
                        done: e.target.checked,
                      },
                    }))
                  }
                >
                  Done
                </Checkbox>
                <Checkbox
                  checked={data?.fogging?.notDone}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      fogging: {
                        ...prev.fogging,
                        notDone: e.target.checked,
                      },
                    }))
                  }
                >
                  Not Done
                </Checkbox>
              </Form.Item>
              <Form.Item
                label={<span className="emr-label">Duo Chrome Balance</span>}
                name="Duo Chrome Balance"
              >
                <Checkbox
                  checked={data?.duoChromeBalance?.done}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      duoChromeBalance: {
                        ...prev.duoChromeBalance,
                        done: e.target.checked,
                      },
                    }))
                  }
                >
                  Done
                </Checkbox>
                <Checkbox
                  checked={data?.duoChromeBalance?.notDone}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      duoChromeBalance: {
                        ...prev.duoChromeBalance,
                        notDone: e.target.checked,
                      },
                    }))
                  }
                >
                  Not Done
                </Checkbox>
              </Form.Item>
            </Form>
          </StyledForm>
        </div>

        <Form>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <Form.Item name="OU">
                <label className="mh-ph-text" style={{ minWidth: "200px" }}>
                  OU
                </label>
                <Input
                  value={data?.ipd?.ou}
                  style={{ height: 40 }}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      ipd: {
                        ...prev.ipd,
                        ou: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Item>
              <Form.Item name="OS">
                <label className="mh-ph-text" style={{ minWidth: "200px" }}>
                  OS
                </label>
                <Input
                  style={{ height: 40 }}
                  value={data?.ipd?.os}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      ipd: {
                        ...prev.ipd,
                        os: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Item>
            </div>
            <div className="col-lg-6 col-md-6">
              <Form.Item name="Dilatation">
                <label className="mh-ph-text" style={{ minWidth: "200px" }}>
                  Dilatation
                </label>
                <Input
                  style={{ height: 40 }}
                  value={data?.ipd?.dilatation}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      ipd: {
                        ...prev.ipd,
                        dilatation: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Item>
              <Form.Item name="Advice">
                <label className="mh-ph-text" style={{ minWidth: "200px" }}>
                  Advice
                </label>
                <TextArea
                  value={data?.ipd?.advice}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      ipd: {
                        ...prev.ipd,
                        advice: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn">
        <Button className="s-btn" onClick={isUpdate?hanldeUpdate:handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default Refractionsheet;
