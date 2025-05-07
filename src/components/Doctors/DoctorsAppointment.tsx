import React, { useState, useEffect } from "react";
import { Table, Button, Avatar, Select, Input, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { api_url } from "../../Config";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import moment from "moment";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { BsInfoCircle } from "react-icons/bs";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

dayjs.extend(isBetween);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "90vh",
  p: 4,
  overflowY: "auto",
};

const DoctorsAppointment: React.FC = () => {
  const fullTimeSlots = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
  ];

  const getCurrentDate = (offsetDays = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + offsetDays);
    return today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const [timeSlots, setTimeSlots] = useState(fullTimeSlots);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const visibleColumns = 7;
  const [arrowChange, setArrowChange] = useState(false);
  const [isModel, setIsmodel] = useState({
    book: false,
    register: false,
  });

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour === 24) {
      setCurrentDate(getCurrentDate(1));
      setTimeSlots(fullTimeSlots);
    } else {
      setCurrentDate(getCurrentDate());
      setTimeSlots(fullTimeSlots);
    }
  }, [arrowChange]);

  const shiftColumns = (direction: "left" | "right") => {
    setVisibleStartIndex((prev) => {
      if (direction === "left") return Math.max(prev - 1, 0);
      return Math.min(prev + 1, timeSlots.length - visibleColumns);
    });
  };

  const [bookData, setBookData] = useState({
    patientName: "",
    phoneNo: "",
    doctorId: "",
    patientType: "",
    doctorName: "",
    status: "Waiting",
    reason: "",
    timeSlot: "",
    areaLocation: "",
    email: "",
    visitType: "",
  });


  const handleSlotClick = (
    record: any,
    availability: string,
    index: number
  ) => {
    let interval = 10;
    if (record.customizeTime === "15") interval = 15;
    if (record.customizeTime === "20") interval = 20;

    // Ensure 'availability' always has minutes (e.g., "8:00 AM" instead of "8 AM")
    const formattedAvailability = availability.includes(":")
      ? availability
      : availability.replace(/(\d+)\s*(AM|PM)/, "$1:00 $2");

    // Parse the formatted time
    const baseTime = dayjs(formattedAvailability, "h:mm A");

    // Check if parsing is successful
    if (!baseTime.isValid()) {
      console.error("Invalid Date:", formattedAvailability);
      return;
    }

    // Calculate the selected time
    const selectedTime = baseTime
      .add(index * interval, "minute")
      .format("h:mm A");
    setBookData({ ...bookData, timeSlot: selectedTime });

    setIsmodel({ register: false, book: true });
  };

  // Utility to get slot times
  const generateSlotTimes = (baseTime: string, customizeTime: number) => {
    const [hourStr, meridian] = baseTime.split(" ");
    let hour = parseInt(hourStr); 

    if (meridian === "PM" && hour !== 12) hour += 12; 
    if (meridian === "AM" && hour === 12) hour = 0; 

    const slots = [];
    const slotCount = Math.floor(60 / customizeTime); 

    for (let i = 0; i < slotCount; i++) {
      const minutes = i * customizeTime;
      const slotTime = dayjs().hour(hour).minute(minutes).format("h:mm A");
      slots.push(slotTime);
    }

    return slots; 
  };

  const columns = [
    {
      title: "Doctor",
      dataIndex: "name",
      key: "name",
      fixed: "left" as "left" | "right",
      width: 250,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "transparent",
          color: "#595959",
          fontWeight: 400,
        },
      }),
      render: (text: string, record: any): React.ReactNode => (
        <div className="d-flex">
          <div className="me-3">
            <Avatar
              style={{ width: "50px", height: "50px" }}
              src={`${api_url}/public/images/${record.image}`}
            ></Avatar>
          </div>
          <div>
            <h6
              className="mb-1"
              style={{ fontSize: "16px", fontWeight: 600, color: "#595959" }}
            >
              {text}
            </h6>
            <p className="mb-1">
              <a
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#595959",
                  textDecoration: "none",
                }}
                href={`tel:${record.phone}`}
              >
                {record.phone}
              </a>
            </p>
            <span
              className="p-1"
              style={{
                margin: 0,
                backgroundColor: "#E6F2FE",
                color: "#3497F9",
              }}
            >
              {record.specialty}
            </span>
          </div>
        </div>
      ),
    },
    ...timeSlots
      .slice(visibleStartIndex, visibleStartIndex + visibleColumns)
      .map((slotTime) => ({
        title: slotTime,
        dataIndex: slotTime,
        key: slotTime,
        width: 100,
        onHeaderCell: () => ({
          style: {
            backgroundColor: "transparent",
            color: "#595959",
            fontWeight: 400,
          },
        }),
        onCell: () => ({
          style: {
            backgroundColor: "transparent",
            color: "#595959",
            fontWeight: 400,
            borderLeft: "1px solid #CFCFCF",
          },
        }),
        render: (_availability: string, record: any): React.ReactNode => {
          const slots = generateSlotTimes(slotTime, parseInt(record.customizeTime));

          const startTime = dayjs(record.startTime, "h:mm A");
          const endTime = dayjs(record.endTime, "h:mm A");
        
          return (
            <div className="d-flex justify-content-between align-items-center flex-wrap">
            {slots.map((time, index) => {
        const slotTime = dayjs(time, "h:mm A");

        // Check if the slot is within the working hours
        const isWithinRange = slotTime.isSameOrAfter(startTime) && slotTime.isSameOrBefore(endTime);
        const isPast = slotTime.isBefore(dayjs());

        // Check if the slot is booked
        const isBooked = record.slotStatus.some(
          (slot: any) => slot.time === time && slot.status === "Booked"
        );
        
                  return (
                    <div
                      key={index}
                      className="m-1"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "1px",
                        border: "1px solid #3497F9",
                        backgroundColor: isBooked
                        ? "#E6F2FE"
                        : isWithinRange
                          ? isPast
                            ? "#e7e7e7" 
                            : "transparent"
                          : "red",
                          cursor: isWithinRange && !isBooked && !isPast ? "pointer" : "not-allowed",
                          opacity: isWithinRange ? (isPast ? 0.5 : 1) : 0.3,
                        }}
                      onClick={() => {
                        if (isWithinRange&&!isBooked && !isPast) handleSlotClick(record, slotTime.format("h:mm A"), index);
                      }}
                    ></div>
                  );
                })}
            </div>
          );
        },
        
      })),
  ];

  const [alldoctor, setAllDoctor] = useState([]);

  const getAllDoctor = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(
        `${api_url}/api/doctor/filter-slot?slotDate=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllDoctor(res.data.data.doctors);
      await getDropDown();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const dataSource: any = alldoctor.map((doctor: any) => {
   
    const today = dayjs().format("dddd");
    const shiftForToday = doctor.shift.find((val: any) => val.day === today);

    return {
      key: doctor.doctorName,
      name: doctor.doctorName,
      specialty: doctor.specialist,
      phone: doctor.phoneNo,
      customizeTime: doctor.customizeTime,
      image: doctor.doctorImage,
      startTime: shiftForToday ? shiftForToday.startTime : null,
      endTime: shiftForToday ? shiftForToday.endTime : null,
      slotStatus: doctor.slotStatus || [],
    };
  });

  const [patientNameDrop, setPatientNameDrop] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [doctorName, setDoctorName] = useState<
    { label: string; value: string }[]
  >([]);
  const [doctorNameID, setDoctorNameID] = useState<
    { label: string; value: string }[]
  >([]);

  const getDropDown = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/patient?fields=PatientName`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res2 = await axios.get(`${api_url}/api/doctor/d-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove duplicates based on PatientName
      const uniquePatients = Array.from(
        new Map(
          res.data.data.patients.map((val: any) => [val.PatientName, val])
        ).values()
      );

      // Format dropdown data
      const dropdownData = uniquePatients.map((val: any) => ({
        label: val.PatientName,
        value: val._id,
      }));

      const dropdownDoctor = res2.data.data.dmMenu.map((val: any) => ({
        label: val.label,
        value: val.label,
      }));

      const dropdownDoctorID = res2.data.data.dmMenu.map((val: any) => ({
        label: val.label,
        value: val.id,
      }));

      setDoctorNameID(dropdownDoctorID);
      setPatientNameDrop(dropdownData);
      setDoctorName(dropdownDoctor);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      let fgd = doctorNameID.filter(
        (val: any) =>
          val.label.trim().toLowerCase() ===
          (bookData.doctorName?.trim().toLowerCase() || "")
      );

      if (fgd.length === 0) {
        message.error("Doctor not found. Please select a valid doctor.");
        return;
      }

      setBookData((prev) => {
        const updatedBookData = { ...prev, doctorId: fgd[0].value };

        const requiredFields = [
          "patientName",
          "phoneNo",
        
          "patientType",
         
        ];
        const emptyFields = requiredFields.filter(
          (field) => !updatedBookData[field as keyof typeof updatedBookData]
        );

        if (emptyFields.length > 0) {
          message.error(`Please fill in: ${emptyFields.join(", ")}`);
          return prev;
        }

        axios
          .post(`${api_url}/api/patient/add-app-patint`, updatedBookData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((_res: any) => {
            setIsmodel({ register: false, book: false });
            setBookData({
              patientName: "",
              phoneNo: "",
              doctorId: "",
              patientType: "",
              doctorName: "",
              status: "Waiting",
              reason: "",
              timeSlot: "",
              areaLocation: "",
              email: "",
              visitType: "",
            });
            getAllDoctor();
          })
          .catch((error) => {
            console.log(error);
            message.error("Something went wrong!");
          });

        return updatedBookData;
      });
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlebookApp = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      let fgd = doctorNameID.filter(
        (val: any) =>
          val.label.trim().toLowerCase() ===
          (bookData.doctorName?.trim().toLowerCase() || "")
      );

      if (fgd.length === 0) {
        message.error("Doctor not found. Please select a valid doctor.");
        return;
      }

      setBookData((prev) => {
        const updatedBookData = {
          ...prev,
          doctorId: fgd[0].value,
          patientId: bookData.patientName,
        };

        const requiredFields = [
          "patientName",
          "phoneNo",
         
          "patientType",
         
        ];
        const emptyFields = requiredFields.filter(
          (field) => !updatedBookData[field as keyof typeof updatedBookData]
        );

        if (emptyFields.length > 0) {
          message.error(`Please fill in: ${emptyFields.join(", ")}`);
          return prev;
        }

        axios
          .post(`${api_url}/api/appointment`, updatedBookData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((_res: any) => {
            getAllDoctor();
            setIsmodel({ register: false, book: false });
            setBookData({
              patientName: "",
              phoneNo: "",
              doctorId: "",
              patientType: "",
              doctorName: "",
              status: "Waiting",
              reason: "",
              timeSlot: "",
              areaLocation: "",
              email: "",
              visitType: "",
            });
          })
          .catch((error) => {
            console.log(error.response.data.message);
            message.error(
              error.response.data.message || "Something went wrong!"
            );
          });

        return updatedBookData;
      });
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

  return (
    <>
      <div
        style={{ padding: "20px", maxWidth: "90vw", margin: "auto" }}
        className="emr-complaints-box ms-3 mb-5"
      >
        <div className="d-flex justify-content-between align-items-center  mb-3">
          <div
            style={{
              width: "50%",
              color: "#595959",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            <p className="mb-0">Doctor Name</p>
          </div>
          <div
            className="date-da text-center position-relative"
            style={{ width: "50%" }}
          >
            <p
              className="mb-0"
              style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}
            >
              {currentDate}
            </p>
            <Button
              icon={<LeftOutlined />}
              style={{
                position: "absolute",
                left: "0px",
                top: "10px",
                transform: "translateY(-50%)",
                zIndex: 10,
                borderRadius: "50%",
                visibility: visibleStartIndex === 0 ? "visible" : "visible",
              }}
              onClick={() => {
                shiftColumns("left");
                setArrowChange(arrowChange ? false : true);
              }}
            />
            <Button
              icon={<RightOutlined />}
              style={{
                position: "absolute",
                right: "0px",
                top: "10px",
                borderRadius: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                visibility:
                  visibleStartIndex + visibleColumns >= timeSlots.length
                    ? "visible"
                    : "visible",
              }}
              onClick={() => {
                shiftColumns("right");
                setArrowChange(arrowChange ? false : true);
              }}
            />
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 400 }}
            className="custom-table-da mksd"
          />
        </div>
{dataSource.length>0&&
<div className="mt-4">
  <p style={{fontSize:"18px",fontWeight:600}}>Info <BsInfoCircle style={{fontSize:"16px"}}/></p>
  <div className="d-flex justify-content-start align-items-center">
  <div style={{width:"20px",height:"20px",backgroundColor:"#e7e7e7",border:"1px solid white"}}></div>
  <div className="ms-2"><span>Time Passed</span></div>
  </div>
  <div className="d-flex justify-content-start align-items-center my-2">
  <div style={{width:"20px",height:"20px",backgroundColor:"red",opacity:0.3,border:"1px solid white"}}></div>
  <div className="ms-2"><span>Not Available</span></div>
  </div>
  <div className="d-flex justify-content-start align-items-center">
  <div style={{width:"20px",height:"20px",backgroundColor:"white",border:"1px solid rgb(52, 151, 249)"}}></div>
  <div className="ms-2"><span>Slot Available</span></div>
  </div>
</div>}

      </div>

      <div>
        <Modal
          open={isModel.book}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0" style={{ color: "#414141" }}>
                  Appointment
                </h6>
                <IoClose
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={() => {
                    setIsmodel({ register: false, book: false });
                    setBookData({
                      patientName: "",
                      phoneNo: "",
                      doctorId: "",
                      patientType: "",
                      doctorName: "",
                      status: "Waiting",
                      reason: "",
                      timeSlot: "",
                      areaLocation: "",
                      email: "",
                      visitType: "",
                    });
                  }}
                />
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div>
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Patient Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Select
                      showSearch
                      style={{ width: "100%", height: 40 }}
                      placeholder="Search to Select"
                      optionFilterProp="label"
                      dropdownStyle={{ zIndex: 2050 }}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      value={bookData.patientName}
                      options={patientNameDrop}
                      onChange={(value) =>
                        setBookData({ ...bookData, patientName: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Phone Num <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Input
                      value={bookData.phoneNo}
                      style={{ width: "100%", height: 40 }}
                      onChange={(e) =>
                        setBookData({ ...bookData, phoneNo: e.target.value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Email 
                    </label>
                    <br />
                    <Input
                      value={bookData.email}
                      style={{ width: "100%", height: 40 }}
                      onChange={(e) =>
                        setBookData({ ...bookData, email: e.target.value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Patient Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 40 }}
                      dropdownStyle={{ zIndex: 2050 }}
                      options={[
                        {
                          value: "General",
                          label: (
                            <>
                              <span>General</span>
                              <GoDotFill style={{ color: "#00BE4F" }} />
                            </>
                          ),
                        },
                        {
                          value: "Corporate",
                          label: (
                            <>
                              <span>Corporate</span>
                              <GoDotFill style={{ color: "#FFAE00" }} />
                            </>
                          ),
                        },
                        {
                          value: "Insurance",
                          label: (
                            <>
                              <span>Insurance</span>
                              <GoDotFill style={{ color: "#3497F9" }} />
                            </>
                          ),
                        },
                      ]}
                      value={bookData.patientType}
                      onChange={(value) =>
                        setBookData({ ...bookData, patientType: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Visit Type 
                    </label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 40 }}
                      dropdownStyle={{ zIndex: 2050 }}
                      options={[
                        {
                          value: "General",
                          label: (
                            <>
                              <span>General</span>
                            </>
                          ),
                        },
                        {
                          value: "Follow-Up",
                          label: (
                            <>
                              <span>Follow Up</span>
                            </>
                          ),
                        },
                      ]}
                      value={bookData.visitType}
                      onChange={(value) =>
                        setBookData({ ...bookData, visitType: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Doctor 
                    </label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 40 }}
                      dropdownStyle={{ zIndex: 2050 }}
                      options={doctorName}
                      value={bookData.doctorName}
                      onChange={(value) =>
                        setBookData({ ...bookData, doctorName: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Reason 
                    </label>
                    <br />
                    <Input
                      style={{ width: "100%", height: 40 }}
                      value={bookData.reason}
                      onChange={(e) =>
                        setBookData({ ...bookData, reason: e.target.value })
                      }
                    />
                    <br />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div>
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                        visibility: "hidden",
                      }}
                    >
                      Patient Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Button
                      style={{
                        height: "40px",
                        background: "#3497F9",
                        color: "#fff",
                        width: "90px",
                      }}
                      onClick={() =>
                        setIsmodel({ register: true, book: false })
                      }
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <Button
                  style={{
                    height: "40px",
                    background: "#3497F9",
                    color: "#fff",
                    width: "90px",
                  }}
                  onClick={handlebookApp}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={isModel.register}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0" style={{ color: "#414141" }}>
                  Appointment
                </h6>
                <IoClose
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={() => {
                    setIsmodel({ register: false, book: false });
                    setBookData({
                      patientName: "",
                      phoneNo: "",
                      doctorId: "",
                      patientType: "",
                      doctorName: "",
                      status: "Waiting",
                      reason: "",
                      timeSlot: "",
                      areaLocation: "",
                      email: "",
                      visitType: "",
                    });
                  }}
                />
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div>
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Patient Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Input
                      value={bookData.patientName}
                      style={{ width: "100%", height: 40 }}
                      onChange={(e) =>
                        setBookData({
                          ...bookData,
                          patientName: e.target.value,
                        })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Phone Num <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Input
                      value={bookData.phoneNo}
                      style={{ width: "100%", height: 40 }}
                      onChange={(e) =>
                        setBookData({ ...bookData, phoneNo: e.target.value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Email 
                    </label>
                    <br />
                    <Input
                      value={bookData.email}
                      style={{ width: "100%", height: 40 }}
                      onChange={(e) =>
                        setBookData({ ...bookData, email: e.target.value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Patient Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 40 }}
                      dropdownStyle={{ zIndex: 2050 }}
                      options={[
                        {
                          value: "General",
                          label: (
                            <>
                              <span>General</span>
                              <GoDotFill style={{ color: "#00BE4F" }} />
                            </>
                          ),
                        },
                        {
                          value: "Corporate",
                          label: (
                            <>
                              <span>Corporate</span>
                              <GoDotFill style={{ color: "#FFAE00" }} />
                            </>
                          ),
                        },
                        {
                          value: "Insurance",
                          label: (
                            <>
                              <span>Insurance</span>
                              <GoDotFill style={{ color: "#3497F9" }} />
                            </>
                          ),
                        },
                      ]}
                      value={bookData.patientType}
                      onChange={(value) =>
                        setBookData({ ...bookData, patientType: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Visit Type 
                    </label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 40 }}
                      dropdownStyle={{ zIndex: 2050 }}
                      options={[
                        {
                          value: "General",
                          label: (
                            <>
                              <span>General</span>
                            </>
                          ),
                        },
                        {
                          value: "Follow-Up",
                          label: (
                            <>
                              <span>Follow Up</span>
                            </>
                          ),
                        },
                      ]}
                      value={bookData.visitType}
                      onChange={(value) =>
                        setBookData({ ...bookData, visitType: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Doctor 
                    </label>
                    <br />
                    <Select
                      style={{ width: "100%", height: 40 }}
                      dropdownStyle={{ zIndex: 2050 }}
                      options={doctorName}
                      value={bookData.doctorName}
                      onChange={(value) =>
                        setBookData({ ...bookData, doctorName: value })
                      }
                    />
                    <br />
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Reason 
                    </label>
                    <br />
                    <Input
                      style={{ width: "100%", height: 40 }}
                      value={bookData.reason}
                      onChange={(e) =>
                        setBookData({ ...bookData, reason: e.target.value })
                      }
                    />
                    <br />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div>
                    <label
                      className="py-2"
                      style={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Area / Location 
                    </label>
                    <br />
                    <Input
                      style={{ width: "100%", height: 40 }}
                      value={bookData.areaLocation}
                      onChange={(e) =>
                        setBookData({
                          ...bookData,
                          areaLocation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="text-end">
                <Button
                  style={{
                    height: "40px",
                    background: "#3497F9",
                    color: "#fff",
                  }}
                  onClick={handleRegister}
                >
                  Register and Book
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DoctorsAppointment;
