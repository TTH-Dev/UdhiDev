import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import { Button } from "antd";

type EyeExamData = {
  [key: string]: { od: string; os: string };
};

const initialData: EyeExamData = {
  face: { od: "", os: "" },
  lids: { od: "", os: "" },
  lacrimalSystem: { od: "", os: "" },
  conjunctiva: { od: "", os: "" },
  cornea: { od: "", os: "" },
  Sclera: { od: "", os: "" },
  AnteriorChamber: { od: "", os: "" },
  Iris: { od: "", os: "" },
  Pupil: { od: "", os: "" },
  Lens: { od: "", os: "" },
};

const AnteriorSegment: React.FC = () => {
  const [data, setData] = useState<EyeExamData>(initialData);

  const handleChange = (field: string, eye: "od" | "os", value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [eye]: value },
    }));
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0} className="px-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Name</TableCell>
              <TableCell className="emr-label">OD</TableCell>
              <TableCell className="emr-label">OS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([field, values]) => (
              <TableRow key={field}>
                <TableCell className="emr-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                    value={values.od}
                    onChange={(e) => handleChange(field, "od", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                    value={values.os}
                    onChange={(e) => handleChange(field, "os", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="d-flex justify-content-end save-cancel-btn ">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default AnteriorSegment;
