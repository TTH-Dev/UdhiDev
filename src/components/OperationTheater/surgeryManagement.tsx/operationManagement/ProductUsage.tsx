import {  Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { Button } from 'antd';
import { useState } from 'react';

const initialRow = { batchNo: '', productName: '', quantity: '' };
type Field = 'batchNo' | 'productName' | 'quantity';
const ProductUsage = () => {
  const [rows, setRows] = useState([{ ...initialRow }]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field as Field] = value;
    setRows(updatedRows);

    if (
      field === 'batchNo' &&
      index === rows.length - 1 &&
      value.trim() !== ''
    ) {
      setRows([...updatedRows, { ...initialRow }]);
    }
  };

  return (
    <>
    
    
    <div className='emr-complaints-box mx-3'>
          <div>
        <p className="emr-search-text mb-0 p-4">Product Details</p>
      </div>
      <div className='px-2'>
      <Table className=''>
      <TableHead>
        <TableRow>
          <TableCell className='emr-label'>S.No</TableCell>
          <TableCell className='emr-label'>Batch No</TableCell>
          <TableCell className='emr-label'>Product Name</TableCell>
          <TableCell className='emr-label'>Qty</TableCell>
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
                value={row.batchNo}
                onChange={(e) => handleChange(index, 'batchNo', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                value={row.productName}
                onChange={(e) => handleChange(index, 'productName', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                value={row.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              />
            </TableCell>
            <TableCell><i className="fi fi-br-cross text-danger" style={{cursor:"pointer"}}></i></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

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

export default ProductUsage;
