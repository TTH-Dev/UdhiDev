



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
      operateEye: "RE",
      iol: "Toric",
      power: "+20.5D",
      procedure: "UF",
      surgeons: ["Dr. Raveendran", "Dr. Allen"],
    },
    {
      opNo: "OP78",
      patientName: "Monica",
      operateEye: "RE",
      iol: "Toric",
      power: "+20.5D",
      procedure: "UF",
      surgeons: ["Dr. Raveendran", "Dr. Allen"],
    },
    {
      opNo: "OP78",
      patientName: "Monica",
      operateEye: "RE",
      iol: "Toric",
      power: "+20.5D",
      procedure: "UF",
      surgeons: ["Dr. Raveendran", "Dr. Allen"],
    },
  ];
  
  const RSurgeryDetail = () => {
    return (
      <>
        <div className="emr-complaints-box pb-3">
          <div className="d-flex justify-content-between">
            <div>
              <p className="emr-search-text mb-0 p-4">Surgery Details</p>
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
              <Table sx={{ minWidth: 1000 }} aria-label="surgery details table">
                <TableHead>
                  <TableRow>
                    <TableCell className="emr-label">S.No</TableCell>
                    <TableCell className="emr-label">Op No</TableCell>
                    <TableCell className="emr-label">Patient Name</TableCell>
                    <TableCell className="emr-label">Operate Eye</TableCell>
                    <TableCell className="emr-label">IOL</TableCell>
                    <TableCell className="emr-label">Power</TableCell>
                    <TableCell className="emr-label">Procedure</TableCell>
                    <TableCell className="emr-label">Surgeon</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surgeryData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.opNo}</TableCell>
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>{row.operateEye}</TableCell>
                      <TableCell>{row.iol}</TableCell>
                      <TableCell>{row.power}</TableCell>
                      <TableCell>{row.procedure}</TableCell>
                      <TableCell>
                        {row.surgeons.map((surgeon, idx) => (
                          <div key={idx}>{surgeon}</div>
                        ))}
                      </TableCell>
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
  
  export default RSurgeryDetail;
  
