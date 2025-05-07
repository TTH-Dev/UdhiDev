import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const MRenalHistory = [
  { name: "Edema Legs", answer: "No" },
  { name: "Facial Puffiness", answer: "No" },
  { name: "Poor Urinary Stream", answer: "No" },
  { name: "Recurrent UTI", answer: "No" },
  { name: "Kidney Stones", answer: "No" },
  { name: "Hairloss", answer: "No" },
  { name: "Skin Lesion", answer: "No" },
];

const HealthTable: React.FC = () => {
  return (
    <TableContainer component={Paper} elevation={0} className="ms-3">
      <Table>
        <TableBody>
          {MRenalHistory.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  backgroundColor: "transparent",
                  width: "5rem",
                  color: "#595959",
                }}
                className="emr-label"
              >
                {item.name}
              </TableCell>

              <TableCell
                sx={{
                  backgroundColor: "transparent",
                  color: "#595959",
                  width: "6rem",
                  paddingLeft: "1rem",
                }}
                className="emr-label"
              >
                {item.answer}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HealthTable;
