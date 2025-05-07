import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  
  const OTProvisionalDiagnosis = () => {
    const rows = [
      {
        enteredDate: "20-05-2025",
        items: [
          { id: 1, value: 'Hi hello how r u' },
          { id: 2, value: 'Hi hello how r u' },
          { id: 3, value: 'Hi hello how r u' },
        ]
      },
      {
        enteredDate: "21-05-2025",
        items: [
          { id: 4, value: 'Hi hello how r u' },
          { id: 5, value: 'Hi hello how r u' },
        ]
      }
    ];
  
    return (
      <div className="emr-complaints-box ">
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='emr-label'>Entered Date</TableCell>
                <TableCell className='emr-label'>S. No</TableCell>
                <TableCell className='emr-label'>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((group) => (
                group.items.map((item, itemIndex) => (
                  <TableRow key={item.id}>
                    {itemIndex === 0 && (
                      <TableCell rowSpan={group.items.length}>
                        {group.enteredDate}
                      </TableCell>
                    )}
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  export default OTProvisionalDiagnosis;
  