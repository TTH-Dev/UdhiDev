import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  
  const occupancyData = [
    { sno: 1, date: '2/4/25', bedsOccupied: '5+2 = 7', rate: 35 },
    { sno: 2, date: '3/4/25', bedsOccupied: '5+1 = 6', rate: 30 },
    { sno: 3, date: '4/4/25', bedsOccupied: '13+1 = 14', rate: 70 },
    { sno: 4, date: '5/4/25', bedsOccupied: '10+1 = 11', rate: 55 },
  ];
  
  const RWardManagement = () => {
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">S.No</TableCell>
              <TableCell className="emr-label">Date</TableCell>
              <TableCell className="emr-label">No. Of Beds Occupied</TableCell>
              <TableCell className="emr-label">Bed Occupancy Rate (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {occupancyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.bedsOccupied}</TableCell>
                <TableCell>{row.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RWardManagement;
  