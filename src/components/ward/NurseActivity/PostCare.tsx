import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox, Input } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const PostCare = () => {
  const [data, setData] = useState([
    {
      date: moment().format("DD-MM-YYYY"),
      time: false,
      name: "",
      timeValue: moment().format("HH:mm A"),
    },
  ]);

  const handleTime = (e: any, index: number) => {
    const updated = [...data];
    updated[index].time = e.target.checked;

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

  useEffect(() => {
    const inTime = moment("09:00 AM", "hh:mm A");
    const now = moment();

    const newEntries: any[] = [];

    let temp = inTime.clone();
    while (temp.isSameOrBefore(now, "hour")) {
      newEntries.push({
        date: temp.format("DD-MM-YYYY"),
        time: false,
        timeValue: temp.format("HH:mm A"),
        name: "",
      });
      temp.add(1, "hour");
    }

    setData(newEntries);

    const minutesToNextHour = 60 - now.minutes();
    const msToNextHour = minutesToNextHour * 60 * 1000;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const currentTime = moment().format("HH:mm A");
        setData((prev) => [
          ...prev,
          {
            date: moment().format("DD-MM-YYYY"),
            time: false,
            timeValue: currentTime,
            name: "",
          },
        ]);
      }, 60 * 60 * 1000);

      return () => clearInterval(interval);
    }, msToNextHour);

    return () => clearTimeout(timeout);
  }, []);

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
                <TableCell style={{ width: "20%" }}>{val.date}</TableCell>
                <TableCell style={{ width: "20%" }}>
                  <Checkbox
                    className="me-2"
                    style={{ height: 35 }}
                    checked={val.time}
                    onChange={(e) => handleTime(e, i)}
                  />
                  <>{val.timeValue}</>
                </TableCell>
                <TableCell className="d-flex justify-content-between align-items-center">
                  <Input
                    style={{ height: 35 }}
                    value={val.name}
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
        <Button className="s-btn">Save</Button>
      </div>
    </>
  );
};

export default PostCare;
