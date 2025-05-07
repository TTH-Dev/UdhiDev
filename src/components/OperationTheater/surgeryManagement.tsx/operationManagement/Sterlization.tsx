import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { Button } from 'antd';
import { useState } from 'react';

const initialRow = {tempPressure: '', loadingTime: '' ,holdingTime:'',uploadingTime:'',operatorName:"",OtTechnicianName:""};
type Field =  'tempPressure' | 'loadingTime' |'holdingTime' |'uploadingTime' |'operatorName' |'OtTechnicianName';



const validFields = [
    'tempPressure',
    'loadingTime',
    'holdingTime',
    'uploadingTime',
    'operatorName',
    'OtTechnicianName',
  ];


const Sterlization = () => {
  const [rows, setRows] = useState([{ ...initialRow }]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field as Field] = value;
    setRows(updatedRows);


    if((validFields.includes(field)) &&  index === rows.length - 1 &&
    value.trim() !== '')

   {
      setRows([...updatedRows, { ...initialRow }]);
    }
  };

  return (
    <>
    
    
    <div className='emr-complaints-box mx-3'>
          <div>
        <p className="emr-search-text mb-0 p-4">Sterlization</p>
      </div>
      <div className='px-2'>
        <div style={{ width: '100%', overflowX: 'auto' }}>
      <Table className=''  style={{ width: '1200px' }}>
      <TableHead>
        <TableRow>
          <TableCell className='emr-label'>S.No</TableCell>
          <TableCell className='emr-label'>Temp pressure </TableCell>
          <TableCell className='emr-label'>Loading time</TableCell>
          <TableCell className='emr-label'>Holding time</TableCell>
          <TableCell className='emr-label'>Uploading time</TableCell>
          <TableCell className='emr-label'>Operator name</TableCell>
          <TableCell className='emr-label'>Ot technician Name</TableCell>
          <TableCell className='emr-label'></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  {rows.map((row, index) => (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={row.tempPressure}
          onChange={(e) =>
            handleChange(index, 'tempPressure', e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={row.loadingTime}
          onChange={(e) =>
            handleChange(index, 'loadingTime', e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={row.holdingTime}
          onChange={(e) =>
            handleChange(index, 'holdingTime', e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={row.uploadingTime}
          onChange={(e) =>
            handleChange(index, 'uploadingTime', e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={row.operatorName}
          onChange={(e) =>
            handleChange(index, 'operatorName', e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={row.OtTechnicianName}
          onChange={(e) =>
            handleChange(index, 'technicianName', e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <i
          className="fi fi-br-cross text-danger"
          style={{ cursor: 'pointer' }}
        ></i>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
    </Table>
    </div>

      </div>
  
    </div>

    <div className="text-end  my-4">
        <Button className="c-btn me-5">
            Cancel
        </Button>
        <Button className="s-btn me-3">
            Save
        </Button>
      </div>
    </>

    
  );
};

export default Sterlization;



