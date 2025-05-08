import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Input, message, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { api_url } from "../../../Config";
import dayjs from "dayjs";

const Diet = () => {
  const [data, setData] = useState([
    {
      date: moment().format("DD-MM-YYYY"),
      time: null,
      foodType: "",
    },
  ]);

  const handleTimeChange = (time: any, index: number) => {
    const updated = [...data];
    updated[index].time = time;

    setData([
      ...updated,
      {
        date: moment().format("DD-MM-YYYY"),
        time: null,
        foodType: "",
      },
    ]);
  };

  const handleFoodChange = (e: any, index: number) => {
    const updated = [...data];
    updated[index].foodType = e.target.value;
    setData(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const id = sessionStorage.getItem("patientId");

  const [isUpdate, setisUpdate] = useState(false);
  const [datas, setDatas] = useState<any>();

  const getPatient = async (ids:any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(res?.data?.data?.patient);
      if (
        res?.data?.data?.patient?.surgeryDetailsId?.nurseActivity?.diet
          ?.length > 0
      ) {
        setData([
          ...res?.data?.data?.patient?.surgeryDetailsId?.nurseActivity?.diet,
          {
            date: moment().format("DD-MM-YYYY"),
            time: null,
            foodType: "",
          },
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
          nurseActivity: { diet: filteredData },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Saved Successfully!");
      await getPatient(id);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const ids = sessionStorage.getItem("patientId");

    if (ids) {
      getPatient(ids);
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
                Time
              </TableCell>
              <TableCell
                style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}
              >
                Soft Food
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val, i) => (
              <TableRow key={i}>
                <TableCell style={{ width: "20%" }}>
                  {moment(val?.date).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  <TimePicker
                    style={{ height: 35 }}
                    format="hh:mm A"
                    use12Hours
                    value={val?.time ? dayjs(val?.time, "hh:mm A") : null}
                    onChange={(_time, timeString) =>
                      handleTimeChange(timeString, i)
                    }
                  />
                </TableCell>
                <TableCell className="d-flex justify-content-between align-items-center">
                  <Input
                    style={{ height: 35 }}
                    value={val?.foodType}
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

export default Diet;
