import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Input, Select } from "antd";

const stockData = [
  {
    productName: "Paracetamol",
    currentStock: 30,
    requiredStock: 20,
    requestingStock: 20,
  },
 
];

const PIRequest = () => {

  return (
    <>
  
  
    <div className="emr-complaints-box pb-3 ">
      <div className="d-flex justify-content-between">
        <div>
          <p className="emr-search-text mb-0 p-4">Filter</p>
        </div>
      </div>
      <div className="mx-4">
        <div className="d-flex justify-content-start">

        <div className="me-4">
          <label className="emr-label mb-1">Products Name</label>
          <br />
          <Select
          style={{width:"180px",height:"35px"}}
            showSearch
            placeholder="Select product"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "1", label: "Jack" },
              { value: "2", label: "Lucy" },
              { value: "3", label: "Tom" },
            ]}
          />
        </div>
        <div className="me-4">
          <label className="emr-label mb-1">Quantity</label><br/>
          <Input style={{height:"35px"}}/>
        </div>
        <div className="mt-4 pt-1 ">
          <Button className="i-btn pt-1"><i className="fi fi-br-add"></i></Button>
        </div>
        </div>

      </div>
      <div>
          <p className="emr-search-text mb-0 p-4">Requesting Product</p>
        </div>

      <div className="mx-2">
        <TableContainer
          component={Paper}
          style={{ overflowX: "auto" }}
          elevation={0}
        >
          <Table sx={{ minWidth: 700 }} aria-label="stock table">
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Product Name</TableCell>
                <TableCell className="emr-label">Current Stock</TableCell>
                <TableCell className="emr-label">Requried Stock</TableCell>
                <TableCell className="emr-label">Requesting Stock</TableCell>
                <TableCell className="emr-label"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.currentStock} QYT</TableCell>
                  <TableCell>{row.requiredStock} QYT</TableCell>
                  <TableCell>
                  
                      {row.requestingStock} QYT
                  </TableCell>
                  <TableCell className="text-danger"><i className="fi fi-br-cross" style={{cursor:"pointer"}}></i></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow>

              <TableCell colSpan={4}></TableCell>
              <TableCell>Total Product</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>

              <TableCell colSpan={4}></TableCell>
              <TableCell>Total Qyt</TableCell>
              <TableCell>30</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>
    </div>

<div className="text-end">
  <Button className="c-btn me-4 my-4">Cancel</Button>
  <Button className="s-btn me-3" >
    Save
  </Button>
</div>
</>

  );
};

export default PIRequest;
