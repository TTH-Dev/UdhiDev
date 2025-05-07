import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";

const groupedData = [
  {
    roomNo: "05",
    beds: [
      {
        wardType: "General",
        bedNo: "01",
        status: "Unoccupied",
        patientName: "-",
        opNo: "-",
        admitTime: "-",
      },
      {
        wardType: "General",
        bedNo: "02",
        status: "Unoccupied",
        patientName: "-",
        opNo: "-",
        admitTime: "-",
      },
    ],
  },
  {
    roomNo: "06",
    beds: [
      {
        wardType: "General",
        bedNo: "02",
        status: "Unoccupied",
        patientName: "-",
        opNo: "-",
        admitTime: "-",
      },
      {
        wardType: "General",
        bedNo: "02",
        status: "Unoccupied",
        patientName: "-",
        opNo: "-",
        admitTime: "-",
      },
    ],
  },
  {
    roomNo: "07",
    beds: [
      {
        wardType: "General",
        bedNo: "03",
        status: "Occupied",
        patientName: "Arun",
        opNo: "OP01",
        admitTime: "01:42 AM",
      },
      {
        wardType: "General",
        bedNo: "03",
        status: "Occupied",
        patientName: "Arun",
        opNo: "OP01",
        admitTime: "01:42 AM",
      },
      {
        wardType: "General",
        bedNo: "03",
        status: "Occupied",
        patientName: "Arun",
        opNo: "OP01",
        admitTime: "01:42 AM",
      },
    ],
  },
];

const WardDetail = () => {
  const getStatusColor = (status: string) => {
    return status === "Occupied" ? "yellow" : "green";
  };

  return (
    <div className="emr-complaints-box ms-2">
      <div className=" text-end  py-3 pe-3">
        <Button className="doc-fil-btn mt-1">
          <FaFilter />
          Filter{" "}
        </Button>
        <Button className="doc-fil-btn mx-2 mt-1">
          <MdOutlineReplay />
        </Button>

        <Button className="s-btn ms-2">Add</Button>
      </div>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Room No</TableCell>
              <TableCell className="emr-label">Ward Type</TableCell>
              <TableCell className="emr-label">Bed No</TableCell>
              <TableCell className="emr-label">Occupied Status</TableCell>
              <TableCell className="emr-label">Patient Name</TableCell>
              <TableCell className="emr-label">OP No</TableCell>
              <TableCell className="emr-label">Admit Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData.map((room) =>
              room.beds.map((bed, index) => (
                <TableRow key={`${room.roomNo}-${index}`} className="b-t">
                  {index === 0 && (
                    <TableCell rowSpan={room.beds.length}>
                      {room.roomNo}
                    </TableCell>
                  )}
                  <TableCell>{bed.wardType}</TableCell>
                  <TableCell>{bed.bedNo}</TableCell>
                  <TableCell
                    style={{
                      color: getStatusColor(bed.status),
                      fontWeight: 600,
                    }}
                  >
                    {bed.status}
                  </TableCell>
                  <TableCell>{bed.patientName}</TableCell>
                  <TableCell>{bed.opNo}</TableCell>
                  <TableCell>{bed.admitTime}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WardDetail;
