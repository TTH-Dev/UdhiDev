import { Button } from "antd"
import { FaFilter } from "react-icons/fa"
import { MdOutlineReplay } from "react-icons/md"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const stockData = [
  {
    batchNo: 'A458RE',
    productName: 'Paracetamol',
    expDate: '10-03-2025',
    currentStock: 30,
    minimumStock: 20,
  },
  {
    batchNo: 'A458RE',
    productName: 'Monica',
    expDate: '10-03-2025',
    currentStock: 5,
    minimumStock: 30,
  },
  {
    batchNo: 'A458RE',
    productName: 'Karthil',
    expDate: '10-03-2025',
    currentStock: 30,
    minimumStock: 20,
  },
];

const PIProductDetail = () => {
  const navigate = useNavigate();
  const handleNav=()=>{
    navigate("/operation-theater/product-indents/add-product")
  }
  return (
    <div className="emr-complaints-box pb-3 ">
       <div className="d-flex justify-content-between">
        <div>
        <p className="emr-search-text mb-0 p-4">Products Details</p>

        </div>
      <div className=" text-end  py-3 pe-3">
        <Button className="doc-fil-btn mt-1">
          <FaFilter />
          Filter{" "}
        </Button>
        <Button className="doc-fil-btn mx-2 mt-1">
          <MdOutlineReplay />
        </Button>

        <Button className="s-btn ms-2" onClick={handleNav}>Add</Button>
      </div>

        </div>

<div className="mx-2">

        <TableContainer component={Paper} style={{ overflowX: 'auto' }} elevation={0}>
      <Table sx={{ minWidth: 700 }} aria-label="stock table">
        <TableHead>
          <TableRow>
            <TableCell className="emr-label">S.No</TableCell>
            <TableCell className="emr-label">Batch No</TableCell>
            <TableCell className="emr-label">Product Name</TableCell>
            <TableCell className="emr-label">Exp Date</TableCell>
            <TableCell className="emr-label">Current Stock</TableCell>
            <TableCell className="emr-label">Minimum Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.batchNo}</TableCell>
              <TableCell>{row.productName}</TableCell>
              <TableCell>{row.expDate}</TableCell>
              <TableCell>
                <p style={{color:row.currentStock<row.minimumStock?"red":"green"}}>


                
                <i className="fi fi-br-boxes me-2" ></i>{row.currentStock}
                </p>
                
                </TableCell>
              <TableCell>{row.minimumStock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
</div>
      
    </div>
  )
}

export default PIProductDetail
