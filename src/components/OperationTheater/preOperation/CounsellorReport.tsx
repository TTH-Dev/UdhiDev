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
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const CounsellorReport = () => {
  const navigate = useNavigate();
  const handleNav=()=>{
    navigate("/counsellor/new-patient/patient-details/surgery-management")
  }
  const surgeryData = [
    {
      sno: 1,
      surgeryName: "Appendectomy",
      surgeryDate: "2025-05-02",
      surgeryTime: "10:00 AM",
    },
    {
      sno: 2,
      surgeryName: "Cataract Surgery",
      surgeryDate: "2025-05-05",
      surgeryTime: "2:30 PM",
    },
    {
      sno: 3,
      surgeryName: "Knee Replacement",
      surgeryDate: "2025-05-07",
      surgeryTime: "9:00 AM",
    },
    {
      sno: 4,
      surgeryName: "Heart Bypass",
      surgeryDate: "2025-05-10",
      surgeryTime: "11:30 AM",
    },
    {
      sno: 5,
      surgeryName: "Gallbladder Removal",
      surgeryDate: "2025-05-12",
      surgeryTime: "1:00 PM",
    },
  ];

  const data = [
    {
      sno: 1,
      surgeryType: "Appendectomy",
      category: "Emergency",
      name: "John Doe",
      amount: 15000,
      total: 20000,
    },
    {
      sno: 2,
      surgeryType: "Cataract Surgery",
      category: "Routine",
      name: "Jane Smith",
      amount: 8000,
      total: 12000,
    },
    {
      sno: 3,
      surgeryType: "Knee Replacement",
      category: "Orthopedics",
      name: "Michael Brown",
      amount: 25000,
      total: 30000,
    },
    {
      sno: 4,
      surgeryType: "Heart Bypass",
      category: "Cardiac",
      name: "Sarah Lee",
      amount: 50000,
      total: 60000,
    },
    {
      sno: 5,
      surgeryType: "Gallbladder Removal",
      category: "General",
      name: "David Wilson",
      amount: 12000,
      total: 15000,
    },
  ];

  return (
    <>
      
   

      <div className="mx-2 mt-5 emr-complaints-box rounded ">
        <TableContainer component={Paper} elevation={0}>
          <div className="d-flex justify-content-between">
            <div>
              <p className="emr-search-text mb-0 p-4">Surgery Details</p>
            </div>
            <div className="p-4">
              <Button className="i-btn" onClick={handleNav}>
                <MdEdit />
              </Button>
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Type</TableCell>
                <TableCell className="emr-label">Categories</TableCell>
                <TableCell className="emr-label">Name</TableCell>
                <TableCell className="emr-label">Amount</TableCell>
                <TableCell className="emr-label">Total Amt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, _index) => (
                <TableRow key={row.sno}>
                  <TableCell>{row.sno}</TableCell>
                  <TableCell>{row.surgeryType}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>
              <TableCell className="b-n user-text">Subl Total</TableCell>
              <TableCell className="b-n">10,000.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>

              <TableCell className="b-n user-text">Discount</TableCell>
              <TableCell className="b-n">10,000.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>

              <TableCell className="b-n box-title"> Total</TableCell>
              <TableCell className="b-n">10,000.00</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>

      <div className="emr-complaints-box mx-2 mt-3 rounded mb-5">
        <p className="emr-search-text mb-0 p-4">Date and Time</p>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S. No</TableCell>
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Surgery Date</TableCell>
                <TableCell className="emr-label">Surgery Time</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surgeryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.sno}</TableCell>
                  <TableCell>{row.surgeryName}</TableCell>
                  <TableCell>{row.surgeryDate}</TableCell>
                  <TableCell>{row.surgeryTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CounsellorReport;
