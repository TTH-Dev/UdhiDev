import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Patch = () => {
  const [data, setData] = useState([
    {
      date: moment().format("DD-MM-YYYY"),
      time: null,
      removedStatus: false,
    },
  ]);

  const handleTimeChange = (time: any, index: number) => {
    const updated = [...data];
    updated[index].time = time;
   
    setData([...updated, {
      date: moment().format("DD-MM-YYYY"),
      time: null,
      removedStatus: false
    }]);
  };

  const handleRemovedStatus = (e: any, index: number) => {
    
    const updated = [...data];
    updated[index].removedStatus = e.target.checked;
    setData(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}>Date</TableCell>
              <TableCell style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}>Time</TableCell>
              <TableCell style={{ color: "#595959", fontSize: "16px", fontWeight: 400 }}>Removed Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val, i) => (
              <TableRow key={i}>
                <TableCell style={{ width: "20%" }}>{val.date}</TableCell>
                <TableCell style={{ width: "20%" }}>
                  <TimePicker
                    style={{ height: 35 }}
                    format="HH:mm"
                    value={val.time}
                    onChange={(time, _timeString) => handleTimeChange(time, i)}
                  />
                </TableCell>
                <TableCell className="d-flex justify-content-start align-items-center">
                  <Checkbox
                  className="me-2"
                    style={{ height: 35 }}
                   
                    checked={val.removedStatus}
                    onChange={(e) => handleRemovedStatus(e, i)}
                  />Yes
                  <IoMdClose
                    className="ms-5"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(i)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3" style={{ background: "#fff" }}>
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn">Save</Button>
      </div>
    </>
  );
};

export default Patch;
