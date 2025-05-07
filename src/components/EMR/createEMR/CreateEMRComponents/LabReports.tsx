import React from "react";
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

const reportData = [
  { id: 1, date: "10-02-2025", type: "Lab", report: "View Report" },
  { id: 2, date: "10-02-2025", type: "Radiology", report: "View Report" },
  { id: 3, date: "10-02-2025", type: "Lab", report: "View Report" },
  { id: 4, date: "10-02-2025", type: "Radiology", report: "View Report" },
  { id: 5, date: "10-02-2025", type: "Lab", report: "View Report" },
  { id: 6, date: "10-02-2025", type: "Radiology", report: "View Report" },
];

const LabReports: React.FC = () => {
  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Lab Results</p>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ boxShadow: "none" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    color: "#595959",
                  }}
                  className="py-4"
                >
                  S.No
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    color: "#595959",
                  }}
                  className="py-4"
                >
                  Report Date
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    color: "#595959",
                  }}
                  className="py-4"
                >
                  Type
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    color: "#595959",
                    width: "10%",
                  }}
                  className="py-4 text-center"
                >
                  Report
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Button className="emr-btn-lr" style={{ width: "10rem" }}>
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
   
    </>
  );
};

export default LabReports;
