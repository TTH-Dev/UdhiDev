import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';
  
  const RDisposalReport = () => {
    const data = [
      {
        date: '2/4/25',
        floor: '2nd Floor',
        red: '3.600',
        yellow: '',
        white: '',
        blue: '0.570',
        doneBy: 'Aswathi'
      },
      {
        date: '2/4/25',
        floor: '2nd Floor',
        red: '4.700',
        yellow: '',
        white: '',
        blue: '4.300',
        doneBy: 'Aswathi'
      },
      {
        date: '2/4/25',
        floor: '2nd Floor',
        red: '',
        yellow: '',
        white: '',
        blue: '',
        doneBy: 'Aswathi'
      },
      {
        date: '2/4/25',
        floor: '2nd Floor',
        red: '3.600',
        yellow: '0.570',
        white: '',
        blue: '',
        doneBy: 'Aswathi'
      }
    ];
  
    return (
      <TableContainer component={Paper} elevation={0} style={{ width: '100%' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Date</TableCell>
              <TableCell className="emr-label">Floor</TableCell>
              <TableCell className="emr-label">Red</TableCell>
              <TableCell className="emr-label">Yellow</TableCell>
              <TableCell className="emr-label">White</TableCell>
              <TableCell className="emr-label">Blue</TableCell>
              <TableCell className="emr-label">Done By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.floor}</TableCell>
                <TableCell>{row.red || '-'}</TableCell>
                <TableCell>{row.yellow || '-'}</TableCell>
                <TableCell>{row.white || '-'}</TableCell>
                <TableCell>{row.blue || '-'}</TableCell>
                <TableCell>{row.doneBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RDisposalReport;
  