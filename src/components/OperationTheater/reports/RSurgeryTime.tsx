import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { Button } from "antd";
  import { FaFilter } from "react-icons/fa";
  import { MdOutlineReplay } from "react-icons/md";
  
  const surgeryData = [
    {
      opNo: "OP78",
      patientName: "Monica",
      surgeryTime: "10:50 Am",
      delayTime: "11:10 Am",
      blockRoomIn: "11:10 Am",
      surgeryIn: "11:30 Am",
      surgeryOut: "12:30 Am",
    },
    {
      opNo: "OP78",
      patientName: "John",
      surgeryTime: "10:50 Am",
      delayTime: "-",
      blockRoomIn: "10:50 Am",
      surgeryIn: "10:50 Am",
      surgeryOut: "10:50 Am",
    },
    {
      opNo: "4/4/25",
      patientName: "Walter",
      surgeryTime: "10:50 Am",
      delayTime: "-",
      blockRoomIn: "10:50 Am",
      surgeryIn: "10:50 Am",
      surgeryOut: "10:50 Am",
    },
    {
      opNo: "5/4/25",
      patientName: "Harry Potter",
      surgeryTime: "10:50 Am",
      delayTime: "-",
      blockRoomIn: "10:50 Am",
      surgeryIn: "10:50 Am",
      surgeryOut: "10:50 Am",
    },
  ];
  
  const RSurgeryTime = () => {
    return (
      <>
        <div className="emr-complaints-box pb-3">
          <div className="d-flex justify-content-between">
            <div>
              <p className="emr-search-text mb-0 p-4">Surgery Time Details</p>
            </div>
            <div className="text-end py-3 pe-3">
              <Button className="doc-fil-btn mt-1">
                <FaFilter /> Filter
              </Button>
              <Button className="doc-fil-btn mx-2 mt-1">
                <MdOutlineReplay />
              </Button>
            </div>
          </div>
  
          <div className="mx-2">
            <TableContainer component={Paper} style={{ overflowX: "auto" }} elevation={0}>
              <Table sx={{ minWidth: 1000 }} aria-label="surgery time table">
                <TableHead>
                  <TableRow>
                    <TableCell className="emr-label">S.No</TableCell>
                    <TableCell className="emr-label">Op No</TableCell>
                    <TableCell className="emr-label">Patient Name</TableCell>
                    <TableCell className="emr-label">Surgery Time</TableCell>
                    <TableCell className="emr-label">Delay Time</TableCell>
                    <TableCell className="emr-label">Block Room In</TableCell>
                    <TableCell className="emr-label">Surgery Time In</TableCell>
                    <TableCell className="emr-label">Surgery Time Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surgeryData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.opNo}</TableCell>
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>{row.surgeryTime}</TableCell>
                      <TableCell>{row.delayTime}</TableCell>
                      <TableCell>{row.blockRoomIn}</TableCell>
                      <TableCell>{row.surgeryIn}</TableCell>
                      <TableCell>{row.surgeryOut}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
  
        <div className="text-end">
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button className="s-btn me-3">Save</Button>
        </div>
      </>
    );
  };
  
  export default RSurgeryTime;
  