import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox, Input, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { api_url } from "../../../Config";
import axios from "axios";

const PostCare = () => {
  const [data, setData] = useState([
    {
      date: moment().format("DD-MM-YYYY"),
      timeValue: false,
      name: "",
      time: moment().format("HH:mm A"),
    },
  ]);

  const id = sessionStorage.getItem("patientId");
  const [isUpdate, setisUpdate] = useState(false);
  const [datas, setDatas] = useState<any>();

  const handleTime = (e: any, index: number) => {
    const updated = [...data];
    updated[index].timeValue = e.target.checked;
    setData(updated);
  };

  const handleFoodChange = (e: any, index: number) => {
    const updated = [...data];
    updated[index].name = e.target.value;
    setData(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

// This useEffect should only run if we are not updating
useEffect(() => {
  if (!datas?.bedManagement?.bed?.inTime || isUpdate) return;

  const outTime = moment(datas?.bedManagement?.bed?.outTime, "hh:mm A");
  const inTime = moment(datas?.bedManagement?.bed?.inTime, "hh:mm A");
  const now = moment();
  const newEntries: any[] = [];

  let temp = inTime.clone();
  while (temp.isSameOrBefore(now, "hour")) {
    newEntries.push({
      date: temp.format("DD-MM-YYYY"),
      timeValue: false,
      time: temp.format("hh:mm A"),
      name: "",
    });
    temp.add(1, "hour");
  }

  setData(newEntries);

  const minutesToNextHour = 60 - now.minutes();
  const msToNextHour = minutesToNextHour * 60 * 1000;

  const timeout = setTimeout(() => {
    const interval = setInterval(() => {
      const currentTime = moment().format("hh:mm A");
      if (currentTime === outTime.format("hh:mm A")) {
        clearInterval(interval);
        return;
      }
      setData((prev) => [
        ...prev,
        {
          date: moment().format("DD-MM-YYYY"),
          timeValue: false,
          time: currentTime,
          name: "",
        },
      ]);
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, msToNextHour);

  return () => clearTimeout(timeout);
}, [datas, isUpdate]);


  const getPatient = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(res?.data?.data?.patient);
      if (
        res?.data?.data?.patient?.surgeryDetailsId?.nurseActivity?.postCare
          ?.length > 0
      ) {

        let df=res?.data?.data?.patient?.surgeryDetailsId?.nurseActivity
        ?.postCare.map((val:any)=>({
          date: moment(val?.date).format("DD-MM-YYYY"),
          time: val?.time,
          timeValue: val?.name?true:false,
          name:val?.name
        }
        
        ))

        console.log(df,"df");
        


        setData([
          ...df,
        ]);
        
        setisUpdate(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      let fg = datas?.surgeryDetailsId?._id;

      if (!fg) {
        message.error("Surgery Id error contact support team!");
        return;
      }
      const filteredData = data.filter((item) => item.time !== null);

      await axios.patch(
        `${api_url}/api/surgery-details/${fg}`,
        {
          nurseActivity: { postCare: filteredData },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Saved Successfully!");
      await getPatient();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) {
      getPatient();
    }
  }, [id]);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}
              >
                Date
              </TableCell>
              <TableCell
                style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}
              >
                Time(Every hr)
              </TableCell>
              <TableCell
                style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}
              >
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val, i) => (
              <TableRow key={i}>
                <TableCell style={{ width: "20%" }}>{moment(val?.date).format("DD-MM-YYYY")}</TableCell>
                <TableCell style={{ width: "20%" }}>
                  <Checkbox
                    className="me-2"
                    style={{ height: 35 }}
                    checked={val?.timeValue}
                    onChange={(e) => handleTime(e, i)}
                  />
                  <>{val?.time}</>
                </TableCell>
                <TableCell className="d-flex justify-content-between align-items-center">
                  <Input
                    style={{ height: 35 }}
                    value={val?.name}
                    onChange={(e) => handleFoodChange(e, i)}
                  />
                  <IoMdClose
                    className="ms-2"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(i)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        className="d-flex justify-content-end save-cancel-btn mt-4 mb-3"
        style={{ background: "#fff" }}
      >
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn" onClick={handleSave}>
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default PostCare;
