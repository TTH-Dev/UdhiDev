import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Button } from 'antd';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const rows = [
  { sno: 1, opNo: 'OP01', patientName: 'Raja', surgeryName: 'Raja', operationDate: 'Raja' },
  { sno: 1, opNo: 'OP01', patientName: 'Raja', surgeryName: 'Raja', operationDate: 'Raja' },
  { sno: 1, opNo: 'OP01', patientName: 'Raja', surgeryName: 'Raja', operationDate: 'Raja' },
];

const PreOperation = () => {
  const navigate = useNavigate();
  const handleNav=()=>{
    navigate("pre-operation-setup")
  }
  return (
    <>
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
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Operation Date</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.sno}</TableCell>
                  <TableCell>{row.opNo}</TableCell>
                  <TableCell>{row.patientName}</TableCell>
                  <TableCell>{row.surgeryName}</TableCell>
                  <TableCell>{row.operationDate}</TableCell>
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
    </>
  );
};

export default PreOperation;
