import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  
  const injectionData = [
    {
      sno: 1,
      opNo: 'A12356',
      patientName: 'Raghunath',
      date: '2/4/25',
      time: '2.30 pm',
      medicine: 'Inj . Anicut',
      rove: 'I.M',
      orderBy: 'Dr. RR',
      givenBy: 'Aswathi',
      needle: 'Yes',
      designed: 'None',
      remark: '',
    },
    {
      sno: 2,
      opNo: 'A12356',
      patientName: 'rajakrishna',
      date: '3/4/25',
      time: '2.30 pm',
      medicine: 'Inj . Anicut',
      rove: 'I.M',
      orderBy: 'Dr. RR',
      givenBy: 'Aswathi',
      needle: 'Yes',
      designed: 'None',
      remark: '',
    },
    {
      sno: 3,
      opNo: 'A12356',
      patientName: 'vivivenn',
      date: '4/4/25',
      time: '2.30 pm',
      medicine: 'Inj . Anicut',
      rove: 'I.M',
      orderBy: 'Dr. RR',
      givenBy: 'Aswathi',
      needle: 'Yes',
      designed: 'None',
      remark: '',
    },
    {
      sno: 4,
      opNo: 'A12356',
      patientName: 'Saragaman',
      date: '5/4/25',
      time: '2.30 pm',
      medicine: 'Inj . Anicut',
      rove: 'I.M',
      orderBy: 'Dr. RR',
      givenBy: 'Aswathi',
      needle: 'Yes',
      designed: 'None',
      remark: '',
    },
  ];
  
  const RInjectionReport = () => {
    return (
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">S.No</TableCell>
              <TableCell className="emr-label">Op No</TableCell>
              <TableCell className="emr-label" >Patient Name</TableCell>
              <TableCell className="emr-label">Date</TableCell>
              <TableCell className="emr-label">Time</TableCell>
              <TableCell className="emr-label">Medicine Name</TableCell>
              <TableCell className="emr-label">Rove</TableCell>
              <TableCell className="emr-label">Order By</TableCell>
              <TableCell className="emr-label">Given By</TableCell>
              <TableCell className="emr-label">Needle</TableCell>
              <TableCell className="emr-label">Designed</TableCell>
              <TableCell className="emr-label">Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {injectionData.map((row) => (
              <TableRow key={row.sno}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.opNo}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.medicine}</TableCell>
                <TableCell>{row.rove}</TableCell>
                <TableCell>{row.orderBy}</TableCell>
                <TableCell>{row.givenBy}</TableCell>
                <TableCell>{row.needle}</TableCell>
                <TableCell>{row.designed}</TableCell>
                <TableCell>{row.remark || 'None'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RInjectionReport;
  