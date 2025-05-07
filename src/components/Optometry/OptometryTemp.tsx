import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Form, Row, Col, Container } from "react-bootstrap";
import { Avatar, message, Select } from "antd";
import axios from "axios";
import { api_url } from "../../Config";
import moment from "moment";
import dayjs from "dayjs";

const OptometryTemp: React.FC = () => {
  const nav = [
    { name: "Chief Complaint", path: "chief-complaint" },
    { name: "Associated Complaints", path: "associated-complaints" },
    { name: "Past Ocular History", path: "past-ocular-history" },
    { name: "Past History", path: "past-history" },
    { name: "Refraction Sheet", path: "refraction-sheet" },
    { name: "Other Routine Test", path: "other-routine-test" },
    { name: "Notes", path: "notes" },
    { name: "Optical Store", path: "optical-store" },
    { name: "Lasik Test", path: "lasik" },
    { name: "Squint Test", path: "squint" },
    { name: "Glaucoma Test", path: "glaucoma" },
    { name: "Contact Lens Test", path: "contact-lens-trail" },
    { name: "Biometry Workup Sheet", path: "biometry-workup-sheet" },
  ];

  const [data, setData] = useState<any>([]);
  const [testData, setTestData] = useState([]);
  const [status, setStatus] = useState("");

  const id = sessionStorage.getItem("patientId");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/optometry");
  };

  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data.patient);


      setStatus(res.data.data.patient.optoStatus);

      sessionStorage.setItem("patientName", res.data.data.patient.PatientName);
      await handleTestedBy();
      await getAvailable();
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching doctor data!");
    }
  };

  const handleTestedBy = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/patient/testedBy-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let vsf = res?.data?.data?.testedBy.map((val: any) => ({
        label: val,
        value: val,
      }));

      setTestData(vsf);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleChange = async (value: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      setData({ ...data, testedBy: value[0] });

      if (value[0]) {
        await axios.post(
          `${api_url}/api/patient/add-testedBy/${id}`,
          { testedBy: value[0] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Updated Successfully!");
      }

      await handleTestedBy();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(
        `${api_url}/api/patient/${id}`,
        { optoStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [slot, setSlot] = useState<any>([]);
  const [doctor, setDoctor] = useState<any>([]);
  const [drDropDown, setDrDropDown] = useState<any>([]);

  const getAvailable = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const today = new Date();
      const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

      const res = await axios.get(
        `${api_url}/api/doctor/filter?availableDay=${dayName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let drName = res?.data?.data?.doctors.map((val: any) => ({
        label: val.doctorName,
        value: val._id,
      }));

      setDrDropDown(drName);
      setDoctor(res?.data?.data?.doctors);
    } catch (error: any) {
      console.log(error);
    }
  };

  const roundUpToInterval = (
    time: dayjs.Dayjs,
    interval: number
  ): dayjs.Dayjs => {
    const minutes = time.minute();
    const roundedMinutes = Math.ceil(minutes / interval) * interval;
    return time.minute(roundedMinutes).second(0);
  };

  const generateRoundedTimeSlots = (
    startTime: string,
    endTime: string,
    intervalMinutes: number
  ): string[] => {
    const format = "h:mm A";
    let start = dayjs(startTime, format);
    const end = dayjs(endTime, format);

    // Round up to nearest interval
    start = roundUpToInterval(start, intervalMinutes);

    const slots: string[] = [];

    while (start.isBefore(end)) {
      slots.push(start.format(format));
      start = start.add(intervalMinutes, "minute");
    }

    return slots;
  };

  const handleSlot = (id: any) => {
    const fds = doctor.filter((val: any) => val._id === id);
    const now = new Date();

    fds.forEach((doc: any) => {
      doc.shift.forEach((shift: any) => {
        const slots = generateRoundedTimeSlots(
          shift.startTime,
          shift.endTime,
          parseInt(doc.customizeTime)
        );

        // Filter out past time slots
        const filteredSlots = slots.filter((timeStr: string) => {
          const slotTime = new Date();
          const [hours, minutesPart] = timeStr.split(":");
          const minutes = parseInt(minutesPart);
          const hourPart = parseInt(hours);

          let isPM = timeStr.toLowerCase().includes("pm");
          let actualHour = isPM ? (hourPart % 12) + 12 : hourPart % 12;

          slotTime.setHours(actualHour, minutes, 0, 0);

          return slotTime > now;
        });

        const gg = filteredSlots.map((val: string) => ({
          label: val,
          value: val,
        }));

        setSlot(gg);
      });
    });
  };

  const updateAppoinmentDr = async (id: any, slot: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(
        `${api_url}/api/appointment/getById/${data?.appointmentId?._id}`,
        {
          doctorId: id,
          timeSlot: slot,
          patientId: data?.appointmentId?.patientId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Updated successfully!");
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateOPDr = async (ids: any, slot: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(
        `${api_url}/api/patient/edit-op/${data?.outPatientId?._id}`,
        { doctorId: ids, timeSlot: slot, patientId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Updated successfully!");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      (data?.appointmentId?.timeSlot || data?.doctorId?._id) &&
      data?.patientStatus === "Appointment"
    ) {
      updateAppoinmentDr(data?.doctorId?._id, data?.appointmentId?.timeSlot);
    }
    if (
      (data?.outPatientId?.timeSlot || data?.doctorId?._id) &&
      data?.patientStatus === "Outpatient"
    ) {
      updateOPDr(data?.doctorId?._id, data?.outPatientId?.timeSlot);
    }
  }, [
    data?.appointmentId?.timeSlot,
    data?.doctorId?._id,
    data?.outPatientId?.timeSlot,
  ]);

  useEffect(() => {
    if (status) {
      handleStatusUpdate();
    }
  }, [status]);

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="cont">
      <div className="mt-5 pt-5 ms-4 mb-0" onClick={handleBack}>
        <p className="back" style={{ color: "#414141" }}>
          <i className="fi fi-br-angle-left" style={{ cursor: "pointer" }}></i>
          <span
            style={{
              zIndex: "999",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "0",
              color: "#414141",
              cursor: "pointer",
            }}
            className="ms-2"
          >
            Back
          </span>
        </p>
      </div>

      <div
        className="act-cont-c ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-section-nav">
          {nav.map((item, index) => (
            <NavLink
              key={index}
              to={`/optometry-details/${item.path}`}
              className="emr-link ms-3"
            >
              <span className="ms-1 me-5 my-3 create-emr-nav text-wrap d-inline-block">
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        <Container fluid className="emr-doc-box py-3">
          <Row className="justify-content-between">
            <Col xs={12} md={1}>
              <Avatar style={{ height: "75px", width: "75px" }}>
                {data?.PatientName}
              </Avatar>
            </Col>

            <Col xs={12} md={2}>
              <p className="emr-doc-name mb-1">{data?.PatientName}</p>
              <p className="emr-doc-id">{data?.UHIDId}</p>
            </Col>

            <Col xs={12} md={5} className="text-start emr-visit-details">
              <p>
                <span className="emr-doc-text">Consult Doctor</span>
                <span className="emr-pat-text">
                  {" "}
                  : {data?.doctorId?.doctorName || "-"}
                </span>
              </p>
              <p>
                <span className="emr-doc-text">Visit Date & Time</span>
                <span className="emr-pat-text">
                  :{" "}
                  {moment(data?.outPatientId?.joiningDate).format(
                    "DD-MM-YYYY hh:mm:a"
                  ) ||
                    moment(data?.appointmentId?.timeSlot).format(
                      "DD-MM-YYYY hh:mm:a"
                    )}
                </span>
              </p>
              <p>
                <span className="emr-doc-text">Patient Type</span>
                <span className="emr-pat-text">: {data?.patientType}</span>
              </p>
              <p>
                <span className="emr-doc-text">Reason</span>
                <span className="emr-pat-text">
                  : {data?.appointmentId?.reason || data?.outPatientId?.reason}
                </span>
              </p>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="text-start">
                <Form.Label className="emr-label mb-2">Status</Form.Label>
                <br />
                <Select
                  style={{ width: "100%", height: 35 }}
                  value={status}
                  onChange={(value) => setStatus(value)}
                  options={[
                    {
                      label: "Pending",
                      value: "pending",
                    },
                    {
                      label: "Completed",
                      value: "completed",
                    },
                  ]}
                />
                <br />
                <Form.Label className="emr-label mb-2 mt-2">
                  Tested By
                </Form.Label>
                <br />
                <Select
                  value={data.testedBy}
                  showSearch
                  mode="tags"
                  maxCount={1}
                  options={testData}
                  onChange={handleChange}
                  style={{ width: "100%", height: 35 }}
                />
              </Form.Group>

              <>
                <Form.Group className="text-start d-flex pt-2">
                  <div style={{ width: "49%" }}>
                    <Form.Label className="emr-label mb-2">Doctor</Form.Label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 35 }}
                      onChange={(value) => {
                        setData({
                          ...data,
                          doctorId: {
                            ...data?.doctorId,
                            _id: value,
                          },
                        });
                        handleSlot(value);
                      }}
                      value={data?.doctorId?._id}
                      options={drDropDown}
                    />
                  </div>
                  <div className="ms-2" style={{ width: "49%" }}>
                    <Form.Label className="emr-label mb-2 ">Time</Form.Label>
                    <br />
                    <Select
                      value={
                        data.patientStatus === "Outpatient"
                          ? data?.outPatientId?.timeSlot
                          : data?.appointmentId?.timeSlot
                      }
                      showSearch
                      style={{ width: "100%", height: 35 }}
                      options={slot}
                      onChange={(value) => {
                        if (data.patientStatus === "Outpatient") {
                          setData({
                            ...data,
                            outPatientId: {
                              ...data?.outPatientId,
                              timeSlot: value,
                            },
                          });
                        } else {
                          setData({
                            ...data,
                            appointmentId: {
                              ...data?.appointmentId,
                              timeSlot: value,
                            },
                          });
                        }
                      }}
                      disabled={!data?.doctorId?._id}
                    />
                  </div>
                </Form.Group>
              </>
            </Col>
          </Row>
        </Container>

        <div className="dynamic-content mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OptometryTemp;
