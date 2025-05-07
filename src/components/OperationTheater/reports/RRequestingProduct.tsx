


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
  
  const data = [
    {
      requestedDate: "10-03-2025",
      productName: "Paracetamol",
      requestedQyt: "50 Qyt",
      receivedDate: "10-03-2025",
      batchNo: "AS784sh",
      expDate: "10-03-2026",
    },
    {
      requestedDate: "10-03-2025",
      productName: "Paracetamol",
      requestedQyt: "50 Qyt",
      receivedDate: "10-03-2025",
      batchNo: "AS784sh",
      expDate: "10-03-2026",
    },
    {
      requestedDate: "10-03-2025",
      productName: "Paracetamol",
      requestedQyt: "50 Qyt",
      receivedDate: "10-03-2025",
      batchNo: "AS784sh",
      expDate: "10-03-2026",
    },
    {
      requestedDate: "10-03-2025",
      productName: "Paracetamol",
      requestedQyt: "50 Qyt",
      receivedDate: "10-03-2025",
      batchNo: "AS784sh",
      expDate: "10-03-2026",
    },
  ];
  
  const RRequestingProduct = () => {
    return (
        <>
        
      <div className="emr-complaints-box pb-3">
        <div className="d-flex justify-content-between">
          <p className="emr-search-text mb-0 p-4">Requesting Product Detail</p>
          <div className="text-end py-3 pe-3">
            <Button className="doc-fil-btn mt-1"><FaFilter /> Filter</Button>
            <Button className="doc-fil-btn mx-2 mt-1"><MdOutlineReplay /></Button>
          </div>
        </div>
  
        <div className="mx-2">
          <TableContainer component={Paper} style={{ overflowX: "auto" }} elevation={0}>
            <Table sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  <TableCell className="emr-label">S.No</TableCell>
                  <TableCell className="emr-label" style={{ whiteSpace: "nowrap" }}>Requested Date</TableCell>
                  <TableCell className="emr-label">Product Name</TableCell>
                  <TableCell className="emr-label">Requested Qty</TableCell>
                  <TableCell className="emr-label">Received Date</TableCell>
                  <TableCell className="emr-label">Batch No</TableCell>
                  <TableCell className="emr-label">Exp Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{entry.requestedDate}</TableCell>
                    <TableCell>{entry.productName}</TableCell>
                    <TableCell>{entry.requestedQyt}</TableCell>
                    <TableCell>{entry.receivedDate}</TableCell>
                    <TableCell>{entry.batchNo}</TableCell>
                    <TableCell>{entry.expDate}</TableCell>
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
  
  export default RRequestingProduct;
  
