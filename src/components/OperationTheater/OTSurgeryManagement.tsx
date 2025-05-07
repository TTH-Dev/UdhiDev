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
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const rows = [
  {
    sno: 1,
    opNo: "OP01",
    patientName: "Raja",
    operationTime: "10:50 AM",
    surgeonName: "Dr. Raja",
    status: "Completed",
  },
  {
    sno: 2,
    opNo: "OP01",
    patientName: "Monica",
    operationTime: "01:30 PM",
    surgeonName: "Dr. Ram",
    status: "Pending",
  },
  {
    sno: 3,
    opNo: "OP01",
    patientName: "Karthil",
    operationTime: "02:10 PM",
    surgeonName: "-",
    status: "Pending",
  },
];

const OTSurgeryManagement = () => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate("surgery-management-setup");
  };

  return (
    <div className="emr-complaints-box mx-3 rounded">
      <div>
        <p className="emr-search-text mb-0 p-4">Patient Details</p>
      </div>

      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="surgery table">
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">S.No</TableCell>
              <TableCell className="emr-label">OP No</TableCell>
              <TableCell className="emr-label">Patient Name</TableCell>
              <TableCell className="emr-label">Operation Time</TableCell>
              <TableCell className="emr-label">Surgeon Name</TableCell>
              <TableCell className="emr-label">Status</TableCell>
              <TableCell className="emr-label">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.opNo}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.operationTime}</TableCell>
                <TableCell>{row.surgeonName}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        row.status.toLowerCase() === "completed"
                          ? "green"
                          : "orange",
                    }}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button className="i-btn" onClick={handleNav}>
                    <MdEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OTSurgeryManagement;
