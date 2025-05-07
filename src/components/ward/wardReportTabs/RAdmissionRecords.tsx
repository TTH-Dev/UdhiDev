import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  
  const admissionData = [
    {
      sno: 1,
      opNo: 'A12356',
      patientName: 'Raghunath',
      roomNo: 230,
      admitDate: '2/4/25',
      admitTime: '2.30 pm',
      dischargeDate: '2/4/25',
      dischargeTime: '5.30 pm',
    },
    {
      sno: 2,
      opNo: 'A12356',
      patientName: 'Rajakrishna',
      roomNo: 230,
      admitDate: '3/4/25',
      admitTime: '2.30 pm',
      dischargeDate: '3/4/25',
      dischargeTime: '5.30 pm',
    },
    {
      sno: 3,
      opNo: 'A12356',
      patientName: 'Vivivenn',
      roomNo: 230,
      admitDate: '4/4/25',
      admitTime: '2.30 pm',
      dischargeDate: '4/4/25',
      dischargeTime: '5.30 pm',
    },
    {
      sno: 4,
      opNo: 'A12356',
      patientName: 'Saragaman',
      roomNo: 230,
      admitDate: '5/4/25',
      admitTime: '2.30 pm',
      dischargeDate: '5/4/25',
      dischargeTime: '5.30 pm',
    },
  ];
  
  const RAdmissionRecords = () => {
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Op No</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Admit Date</TableCell>
              <TableCell>Admit Time</TableCell>
              <TableCell>Discharge Date</TableCell>
              <TableCell>Discharge Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admissionData.map((row) => (
              <TableRow key={row.sno}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.opNo}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.roomNo}</TableCell>
                <TableCell>{row.admitDate}</TableCell>
                <TableCell>{row.admitTime}</TableCell>
                <TableCell>{row.dischargeDate}</TableCell>
                <TableCell>{row.dischargeTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RAdmissionRecords;
  