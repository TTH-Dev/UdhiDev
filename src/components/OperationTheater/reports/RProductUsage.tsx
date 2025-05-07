


import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { Button } from "antd";
  import { FaFilter } from "react-icons/fa";
  import { MdOutlineReplay } from "react-icons/md";
  
  const productUsageData = [
    {
      batchNo: "Af451",
      productName: "Paracetamol",
      productUsed: "50 Qyt",
      currentStock: "20 Qyt",
      minimumStock: "10 Qyt",
      stockRequired: "-",
    },
    {
      batchNo: "Af451",
      productName: "Paracetamol",
      productUsed: "50 Qyt",
      currentStock: "20 Qyt",
      minimumStock: "10 Qyt",
      stockRequired: "-",
    },
    {
      batchNo: "Af451",
      productName: "Paracetamol",
      productUsed: "50 Qyt",
      currentStock: "20 Qyt",
      minimumStock: "10 Qyt",
      stockRequired: "-",
    },
    {
      batchNo: "Af451",
      productName: "Paracetamol",
      productUsed: "50 Qyt",
      currentStock: "20 Qyt",
      minimumStock: "10 Qyt",
      stockRequired: "-",
    },
  ];
  
  const RProductUsage = () => {
    return (
      <>
        <div className="emr-complaints-box pb-3">
          <div className="d-flex justify-content-between">
            <div>
              <p className="emr-search-text mb-0 p-4">Product Usage Detail</p>
            </div>
            <div className="text-end py-3 pe-3">
              <Button className="doc-fil-btn mt-1">
                <FaFilter /> Filter
              </Button>
              <Button className="doc-fil-btn mx-2 mt-1">
                <MdOutlineReplay />
              </Button>
            </div>
          </div>
  
          <div className="mx-2">
            <TableContainer component={Paper} style={{ overflowX: "auto" }} elevation={0}>
              <Table sx={{ minWidth: 900 }} aria-label="product usage table">
                <TableHead>
                  <TableRow>
                    <TableCell className="emr-label">S.No</TableCell>
                    <TableCell className="emr-label">Batch No</TableCell>
                    <TableCell className="emr-label">Product Name</TableCell>
                    <TableCell className="emr-label">Product Used</TableCell>
                    <TableCell className="emr-label">Current Stock</TableCell>
                    <TableCell className="emr-label">Minimum Stock</TableCell>
                    <TableCell className="emr-label">Stock Required</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productUsageData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.batchNo}</TableCell>
                      <TableCell>{row.productName}</TableCell>
                      <TableCell>{row.productUsed}</TableCell>
                      <TableCell>{row.currentStock}</TableCell>
                      <TableCell>{row.minimumStock}</TableCell>
                      <TableCell>{row.stockRequired}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
  
        <div className="text-end">
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button className="s-btn me-3">Save</Button>
        </div>
      </>
    );
  };
  
  export default RProductUsage;
  