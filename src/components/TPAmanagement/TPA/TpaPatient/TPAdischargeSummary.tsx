import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Button, Col, DatePicker, Input, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Paper from "@mui/material/Paper";
import { UploadOutlined } from "@ant-design/icons";

const TPAdischargeSummary = () => {
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <Row justify="end" className="py-4">
          <Col span={8} className="text-center ">
            <span className="emr-doc-text " style={{ color: "black" }}>
              Discharge Summery
            </span>
          </Col>
          <Col span={8} className="text-end pe-4">
            <span className="text-end">Eg: QF / ADM / F / 03</span>
          </Col>
        </Row>

        <div style={{ border: "2px solid black" }}>
          <Row gutter={[32, 32]} className="p-3">
            <Col span={8}>
              <div className="d-flex">
                <label className="label-style mb-1 " style={{ width: "50%" }}>
                  Patient Name
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
              <div>
                <label className="label-style mb-1" style={{ width: "50%" }}>
                  DOA
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
              <div>
                <label className="label-style mb-1" style={{ width: "50%" }}>
                  Consultant Name
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <label className="label-style mb-1" style={{ width: "50%" }}>
                  OP No
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
              <div>
                <label className="label-style mb-1" style={{ width: "50%" }}>
                  DOS
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <label className="label-style mb-1" style={{ width: "50%" }}>
                  DOA
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
              <div>
                <label className="label-style mb-1" style={{ width: "50%" }}>
                  Time of Discharge
                </label>
                <Input style={{ width: "50%" }} className="mb-2" />
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col span={24} className="ms-4">
              <p className="label-style ">Significant Findings and Diagnosis</p>
              <TextArea rows={4} style={{ width: "50%" }}></TextArea>
            </Col>
            <Col span={12} className="ms-4 my-4">
              <div>
                <label className="label-style mb-1" style={{ width: "30%" }}>
                  Investigation Detials
                </label>
                <Input style={{ width: "70%" }} className="mb-2" />
              </div>
            </Col>
          </Row>
        </div>
        <div className="p-4">
          <Row>
            <Col span={18}>
              <TableContainer
                component={Paper}
                elevation={0}
                className="mt-4"
                style={{
                  overflow: "hidden",
                  borderRadius: 0,
                  borderBottom: "1px solid black",
                }}
              >
                <Table sx={{ overflowX: "hidden" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="label-style"
                        style={{
                          borderLeft: "1px solid black",
                          borderRight: "1px solid black",
                          borderTop: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        Name of Investigations
                      </TableCell>
                      <TableCell
                        className="label-style"
                        style={{
                          borderRight: "1px solid black",

                          borderTop: "1px solid black",
                          fontWeight: "bold",
                        }}
                        align="center"
                      >
                        Values
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {[
                      "Topography - K1, K2",
                      "Biometry",
                      "B - SCAN",
                      "Specular microscopic Central",
                      "Corneal thickening - CD",
                      "Blood pressure",
                      "Pulse rate",
                    ].map((investigation, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="emr-label"
                          style={{
                            borderLeft: "1px solid black",
                            borderTop: "1px solid black",
                            borderRight: "1px solid black",

                            fontWeight: 600,
                            width: "35%",
                          }}
                        >
                          {investigation}
                        </TableCell>
                        <TableCell
                          style={{
                            borderRight: "1px solid black",
                            borderTop: "1px solid black",
                          }}
                        >
                          <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
          </Row>
        </div>
        <div>
          <p className="label-style text-start" style={{ color: "black" }}>
            Procedure performed
          </p>
          <div className="d-flex">
            <span className="me-3" style={{ color: "black" }}>
              1.  Copy of Medical treatment given on the day of surgery is
              attached.{" "}
            </span>
            <TextField style={{ flex: 1 }} size="small" variant="standard" />
          </div>
          <div className="d-flex">
            <span className="me-3" style={{ color: "black" }}>
              2.  Patient’s condition at the time of discharged{" "}
            </span>
            <TextField style={{ flex: 1 }} size="small" variant="standard" />
          </div>

          <div className="d-flex">
            <span className="me-3" style={{ color: "black" }}>
              3.   Copy of Medical treatment given on the first post-operative
              visit is attached.{" "}
            </span>
            <TextField style={{ flex: 1 }} size="small" variant="standard" />
          </div>
          <div className="d-flex">
            <span className="me-3" style={{ color: "black" }}>
              4.   Follow - up appointments is mentioned.{" "}
            </span>
            <TextField style={{ flex: 1 }} size="small" variant="standard" />
          </div>
          <div className="d-flex">
            <span className="me-3" style={{ color: "black" }}>
              5.   If there is any discomfort in the operated eye or any other
              general discomfort; please contact:
            </span>
            <TextField style={{ flex: 1 }} size="small" variant="standard" />
          </div>
        </div>
        <div className="my-4">
          <Row gutter={32}>
            <Col span={12}>
              <div className="my-3">
                <label className="label-style me-3" style={{ width:"50%"}}>
                  Doctor’s Signature
                </label>
                <Upload >
                  <Button icon={<UploadOutlined />} style={{ width:"125%",height:"40px"}}>Click to Upload</Button>
                </Upload>
              </div>
              <div className="my-3">
                <label className="label-style me-3" style={{ width:"50%"}}>
                  Date & Time
                </label>
                <DatePicker
               style={{ width:"40%",height:"40px"}}

                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select date & time"
                />
              </div>
              <div className="my-3">
              <label className="label-style me-3" style={{ width:"50%"}}>
              Guardian Name
                </label>
              <Input style={{ width:"40%",height:"40px"}}/>

              </div>
              <div className="my-3">
                <label className="label-style me-3" style={{ width:"50%"}}>
                Guardian Signature
                </label>
                <Upload >
                  <Button icon={<UploadOutlined />} style={{ width:"125%",height:"40px"}}>Click to Upload</Button>
                </Upload>
              </div>
              <div className="my-3">
              <label className="label-style me-3" style={{ width:"50%"}}>
                  Date & Time
                </label>
                <DatePicker
               style={{ width:"40%",height:"40px"}}

                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select date & time"
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="my-3">
                <label className="label-style me-3" style={{ width:"50%"}}>
                Patient’s Signature
                </label>
                <Upload >
                  <Button icon={<UploadOutlined />} style={{ width:"125%",height:"40px"}}>Click to Upload</Button>
                </Upload>
              </div>
              <div className="my-3">
                <label className="label-style me-3" style={{ width:"50%"}}>
                  Date & Time
                </label>
                <DatePicker
               style={{ width:"40%",height:"40px"}}

                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select date & time"
                />
              </div>
              <div className="my-3">
              <label className="label-style me-3" style={{ width:"50%"}}>
              Name of Witness
                </label>
              <Input style={{ width:"40%",height:"40px"}}/>

              </div>
              <div className="my-3">
                <label className="label-style me-3" style={{ width:"50%"}}>
                Witness Signature
                </label>
                <Upload >
                  <Button icon={<UploadOutlined />} style={{ width:"125%",height:"40px"}}>Click to Upload</Button>
                </Upload>
              </div>
              <div className="my-3">
              <label className="label-style me-3" style={{ width:"50%"}}>
                  Date & Time
                </label>
                <DatePicker
               style={{ width:"40%",height:"40px"}}
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select date & time"
                />
              </div>
            </Col>
       
          </Row>
        </div>
        
      </div>
      <div className="d-flex justify-content-end mt-5 me-2">
          <Button className="c-btn me-5"> Cancel</Button>
          <Button className="s-btn"> Save</Button>
        </div>
    </>
  );
};

export default TPAdischargeSummary;
