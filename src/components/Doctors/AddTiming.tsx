import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import axios from "axios";

const sampleData = {
  doctorName: "Dr. John Doe",
  doctorId: "D12345",
  timing: {
    Sun: { checked: true, slots: [{ from: "09:00", to: "11:00" }] },
    Mon: { checked: true, slots: [{ from: "10:00", to: "12:00" }] },
    Tue: { checked: false, slots: [{ from: "", to: "" }] },
    Wed: { checked: false, slots: [{ from: "", to: "" }] },
    Thu: { checked: false, slots: [{ from: "", to: "" }] },
    Fri: { checked: true, slots: [{ from: "14:00", to: "16:00" }] },
    Sat: { checked: false, slots: [{ from: "", to: "" }] },
  },
};

const AddConsultancytiming: React.FC = () => {

  const [searchParams]=useSearchParams()
  const id=searchParams.get("id")
  console.log(id);
  

  const location = useLocation();
  const isEditMode = location.pathname.includes("edit-timing");
  const [consultingDuration, setConsultingDuration] = useState("10");
  const [timing, settiming] = useState({
    Sun: { checked: false, slots: [{ from: "", to: "" }] },
    Mon: { checked: false, slots: [{ from: "", to: "" }] },
    Tue: { checked: false, slots: [{ from: "", to: "" }] },
    Wed: { checked: false, slots: [{ from: "", to: "" }] },
    Thu: { checked: false, slots: [{ from: "", to: "" }] },
    Fri: { checked: false, slots: [{ from: "", to: "" }] },
    Sat: { checked: false, slots: [{ from: "", to: "" }] },
  });

  const handleCheckboxChange = (key: string) => {
    settiming((prev) => ({
      ...prev,
      [key]: {
        ...prev[key as keyof typeof timing],
        checked: !prev[key as keyof typeof timing].checked,
      },
    }));
  };
  const handleDurationChange = (e: RadioChangeEvent) => {
    setConsultingDuration(e.target.value);
  };

  const handleTimeChange = (
    day: string,
    index: number,
    type: "from" | "to",
    value: string
  ) => {
    settiming((prev) => {
      const updatedSlots = [...prev[day as keyof typeof timing].slots];
      updatedSlots[index][type] = value;
      return {
        ...prev,
        [day]: { ...prev[day as keyof typeof timing], slots: updatedSlots },
      };
    });
  };

  const addTimeSlot = (day: string) => {
    settiming((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof timing],
        slots: [
          ...prev[day as keyof typeof timing].slots,
          { from: "", to: "" },
        ],
      },
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    settiming((prev) => {
      const updatedSlots = [...prev[day as keyof typeof timing].slots];
      updatedSlots.splice(index, 1);
      return {
        ...prev,
        [day]: { ...prev[day as keyof typeof timing], slots: updatedSlots },
      };
    });
  };
  useEffect(() => {
    if (isEditMode) {
      settiming(sampleData.timing);
    }
  }, [isEditMode]);

  const [doctorName, setDoctorName] = useState<
    { label: string; value: string }[]
  >([]);

  const [doctorId, setDoctorID] = useState<{ label: string; value: number }[]>(
    []
  );

  const [dropValue, setDropValue] = useState({
    drID: null,
    drName: "",
  });

  useEffect(() => {
    let dd = doctorName.filter((val) => val.value === dropValue.drID);
    setDropValue({ ...dropValue, drName: dd[0]?.label });
  }, [dropValue.drID]);

  const getDropDown = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/doctor/d-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dropdownDoctor = res.data.data.dmMenu.map((val: any) => ({
        label: val.value,
        value: val.doctotId,
      }));

      const dropdownDoctorID = res.data.data.dmMenu.map((val: any) => ({
        label: val.doctotId,
        value: val.doctotId,
      }));

      setDoctorName(dropdownDoctor);
      setDoctorID(dropdownDoctorID);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDropDown();
  }, []);


  const formatTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const dayMap: Record<string, string> = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };
  
  
const navigate=useNavigate()

  const handleSubmit = async () => {
    if (!dropValue.drID) {
      message.error("Please select a doctorID!");
      return;
    }
  
    // Transform timing data into API format
    const formattedTiming = Object.entries(timing)
      .filter(([_day, { checked }]) => checked) 
      .map(([shortDay, { slots }]) => ({
        day: dayMap[shortDay] || shortDay,
        slots: slots.map(({ from, to }) => ({
          startTime: formatTo12Hour(from),
          endTime: formatTo12Hour(to),
        })),
            }));
  
    const payload = {
      doctorId: dropValue.drID,
      docatorName: dropValue.drName,
      updatedData:{
        customizeTime:consultingDuration,
      availabilityDays: formattedTiming.map(({ day }) => day),
      shift: formattedTiming.flatMap(({ day, slots }) =>
        slots.map((slot) => ({
          day,
          startTime: slot.startTime,
          endTime: slot.endTime,
        }))
      ),}
    };
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear()
        message.error("Login required!");
        return;
      }


     await axios.post(`${api_url}/api/doctor/shift`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      message.success("Added successfully!")
      navigate("/doctors/doctors-availability")
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong!");
    }
  };


const convertTo24Hour = (time: string): string => {
  if (!time) return ""; 
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};


const getDoctor = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    localStorage.clear();
    message.error("Login required!");
    return;
  }
  
  try {
    const res = await axios.get(`${api_url}/api/doctor/ById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const doctorInfo = res.data.data.doctor;
    setConsultingDuration(res.data.data.doctor.customizeTime)

    if (doctorInfo) {
      setDropValue({
        drID: doctorInfo.doctorId,
        drName: doctorInfo.doctorName,
      });

      // Convert API response into your state structure
      const updatedTiming = Object.keys(timing).reduce((acc, day) => {
        const dayData = doctorInfo.shift.filter((shift: any) => shift.day === dayMap[day]);

        acc[day as keyof typeof timing] = {
          checked: dayData.length > 0,
          slots: dayData.length
            ? dayData.map((slot: any) => ({
                from: convertTo24Hour(slot.startTime),
                to: convertTo24Hour(slot.endTime),
              }))
            : [{ from: "", to: "" }],
        };

        return acc;
      }, {} as typeof timing);

      settiming(updatedTiming);
    }
  } catch (error: any) {
    console.log(error);
  
  }
};




useEffect(()=>{
  getDoctor()
},[isEditMode])

  const handleEdit=async()=>{
    if (!dropValue.drID) {
      message.error("Please select a doctorID!");
      return;
    }
  
    // Transform timing data into API format
    const formattedTiming = Object.entries(timing)
      .filter(([_day, { checked }]) => checked) 
      .map(([shortDay, { slots }]) => ({
        day: dayMap[shortDay] || shortDay,
        slots: slots.map(({ from, to }) => ({
          startTime: formatTo12Hour(from),
          endTime: formatTo12Hour(to),
        })),
            }));
  
    const payload = {
      doctorId: dropValue.drID,
      docatorName: dropValue.drName,
      updatedData:{
        customizeTime:consultingDuration,
      availabilityDays: formattedTiming.map(({ day }) => day),
      shift: formattedTiming.flatMap(({ day, slots }) =>
        slots.map((slot) => ({
          day,
          startTime: slot.startTime,
          endTime: slot.endTime,
        }))
      ),}
    };
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear()
        message.error("Login required!");
        return;
      }


     await axios.post(`${api_url}/api/doctor/shift`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      message.success("Updated successfully!")
      navigate("/doctors/doctors-availability")

    }catch(error:any){
      console.log(error);
      message.error("Soething went wrong!")
    }
  }
  

  return (
    <div className="cont">
      <div className="back-box-doc mt-5 ms-3">
        <p className="back pt-5" style={{ color: "#414141" }}>
          <Link
            to="/doctors/doctors-availability"
            style={{ color: "#414141", textDecoration: "none" }}
          >
            <i
              className="fi fi-br-angle-left"
              style={{ cursor: "pointer" }}
            ></i>
            <span
              className="ms-2"
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#414141",
                cursor: "pointer",
              }}
            >
              Back
            </span>
          </Link>
        </p>
      </div>

      <div className="doc-details-main-box-cf p-3 rounded my-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <div
              className="doctor-detail-box p-3 rounded"
              style={{ backgroundColor: "white", border: "none" }}
            >
              <p className="emr-search-text py-3">Doctor Detail</p>
              <Row gutter={[8, 8]} className="mt-2">
                <Col span={24}>
                  <p className="cfd-label mb-0">
                    Doctor ID <span style={{ color: "red" }}>*</span>
                  </p>
                </Col>
                <Col span={24}>
                  <Select
                    placeholder="Select an option"
                    style={{ width: "100%", borderRadius: "2px" }}
                    className="custom-select-doc"
                    value={dropValue.drID}
                    options={doctorId}
                    onChange={(value) =>
                      setDropValue({ ...dropValue, drID: value })
                    }
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]} className="mt-2">
                <Col span={24}>
                  <p className="cfd-label mb-0">
                    Doctor Name<span style={{ color: "red" }}>*</span>
                  </p>
                </Col>
                <Col span={24}>
                  <Input value={dropValue?.drName} disabled />
                </Col>
              </Row>
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div
              className="consulting-timing-box p-3 rounded px-3"
              style={{ backgroundColor: "white" }}
            >
              <p className="emr-search-text py-3" style={{ marginLeft: "0px" }}>
                Consulting timing Detail
              </p>
              <p className="emr-doc-text-dd">
                Add Available <span style={{ color: "red" }}>*</span>
              </p>

              {Object.entries(timing).map(([day, { checked, slots }]) => (
                <div key={day} className="mb-3">
                  <Row align="top" gutter={[8, 8]}>
                    <Col span={2} style={{ alignSelf: "flex-start" }}>
                      <Checkbox
                        checked={checked}
                        onChange={() => handleCheckboxChange(day)}
                      />
                    </Col>

                    <Col span={2} style={{ alignSelf: "flex-start" }}>
                      <p className="cfd-label">{day}</p>
                    </Col>

                    <Col span={20}>
                      {slots.map((slot, index) => (
                        <Row
                          key={index}
                          align="middle"
                          gutter={[8, 8]}
                          className="mb-2"
                        >
                          <Col span={8}>
                            <Input
                              type="time"
                              value={slot.from}
                              disabled={!checked}
                              onChange={(e) =>
                                handleTimeChange(
                                  day,
                                  index,
                                  "from",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col span={2} className="text-center">
                            <p>to</p>
                          </Col>
                          <Col span={8}>
                            <Input
                              type="time"
                              value={slot.to}
                              disabled={!checked}
                              onChange={(e) =>
                                handleTimeChange(
                                  day,
                                  index,
                                  "to",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col span={2}>
                            {index > 0 && (
                              <Button
                                type="link"
                                icon={<MinusCircleOutlined />}
                                onClick={() => removeTimeSlot(day, index)}
                              />
                            )}
                          </Col>
                          <Col span={2}>
                            {index === slots.length - 1 && (
                              <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                onClick={() => addTimeSlot(day)}
                                disabled={!checked}
                              />
                            )}
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </div>
              ))}
              <div className="mb-3">
                <p
                  className="emr-search-text py-3"
                  style={{ marginLeft: "0px" }}
                >
                  Duration of Consulting
                </p>
                <Radio.Group
                  value={consultingDuration}
                  onChange={handleDurationChange}
                  style={{ display: "flex", gap: "10px" }}
                >
                  <Radio value="10">10 Mins</Radio>
                  <Radio value="15">15 Mins</Radio>
                  <Radio value="20">20 Mins</Radio>
                  <Radio value="30">30 Mins</Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn my-4">
        <Link to="/doctors/doctors-availability">
        <Button className="c-btn me-3">Cancel</Button>
        </Link>
        <Button className="s-btn" onClick={isEditMode ? handleEdit : handleSubmit}>{isEditMode ? "Update" : "Save"}</Button>
      </div>
    </div>
  );
};

export default AddConsultancytiming;
