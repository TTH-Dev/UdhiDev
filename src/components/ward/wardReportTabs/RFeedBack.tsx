import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  
  const feedbackData = [
    {
      sno: 1,
      date: '2/4/25',
      opNo: 'A12356',
      staff: { excellent: 10, good: 0, improve: 0 },
      ward: { excellent: 10, good: 0, improve: 0 },
    },
    {
      sno: 2,
      date: '3/4/25',
      opNo: 'A12356',
      staff: { excellent: 0, good: 7, improve: 0 },
      ward: { excellent: 0, good: 7, improve: 0 },
    },
    {
      sno: 3,
      date: '4/4/25',
      opNo: 'A12356',
      staff: { excellent: 10, good: 0, improve: 0 },
      ward: { excellent: 10, good: 0, improve: 0 },
    },
    {
      sno: 4,
      date: '5/4/25',
      opNo: 'A12356',
      staff: { excellent: 0, good: 7, improve: 0 },
      ward: { excellent: 0, good: 7, improve: 0 },
    },
  ];
  
  const RFeedBack = () => {
    return (
      <TableContainer component={Paper} elevation={1} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label" rowSpan={2}>S.No</TableCell>
              <TableCell className="emr-label" rowSpan={2}>Date</TableCell>
              <TableCell className="emr-label" rowSpan={2}>Op No</TableCell>
              <TableCell className="emr-label" colSpan={3} align="center">Staff</TableCell>
              <TableCell className="emr-label" colSpan={3} align="center">Ward</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="emr-label">Excellent</TableCell>
              <TableCell className="emr-label">Good</TableCell>
              <TableCell className="emr-label">Can Improve</TableCell>
              <TableCell className="emr-label">Excellent</TableCell>
              <TableCell className="emr-label">Good</TableCell>
              <TableCell className="emr-label">Can Improve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData.map((row) => (
              <TableRow key={row.sno}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.opNo}</TableCell>
                <TableCell className='b-l'>{row.staff.excellent}</TableCell>
                <TableCell>{row.staff.good}</TableCell>
                <TableCell>{row.staff.improve}</TableCell>
                <TableCell className='b-l'>{row.ward.excellent}</TableCell>
                <TableCell>{row.ward.good}</TableCell>
                <TableCell>{row.ward.improve}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RFeedBack;
  