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
    brand: 'A458RE',
    model: 'A458RE',
    type: 'Toric',
    power: '+20.45',
    totalStock: 30,
  },
  {
    brand: 'A458RE',
    model: 'A458RE',
    type: 'Toric',
    power: '+20.45',
    totalStock: 5,
  },
  {
    brand: 'A458RE',
    model: 'A458RE',
    type: 'Tpric',
    power: '+20.45',
    totalStock: 30,
  },
];



const PILensDetail = () => {
  const navigate = useNavigate();
const handleNav=()=>{
  navigate("/operation-theater/product-indents/add-lens")
}
  return (
    <div className="emr-complaints-box pb-3 mt-5 rounded">
       <div className="d-flex justify-content-between">
        <div>
        <p className="emr-search-text mb-0 p-4">Lens Details</p>

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

        <TableContainer component={Paper} style={{ overflowX: 'auto' }} elevation={0}>
  <Table sx={{ minWidth: 700 }} aria-label="lens detail table">
    <TableHead>
      <TableRow>
        <TableCell className="emr-label">S.No</TableCell>
        <TableCell className="emr-label">Brand</TableCell>
        <TableCell className="emr-label">Model</TableCell>
        <TableCell className="emr-label">Type</TableCell>
        <TableCell className="emr-label">Power</TableCell>
        <TableCell className="emr-label">Total Stock</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {stockData.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{row.brand}</TableCell>
          <TableCell>{row.model}</TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.power}</TableCell>
          <TableCell>
            <p style={{ color: row.totalStock < 10 ? 'red' : 'green' }}>
              <i className="fi fi-br-boxes me-2" />
              {row.totalStock}
            </p>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

     
      
    </div>
  )
}

export default PILensDetail
