import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TPAbilling: React.FC = () => {
  const serviceData = [
    {
      sno: 1,
      serviceName: "Consultation",
      qty: 1,
      unitPrice: 1000,
      taxAmt: 0,
      discount: 0,
      totalAmt: 1000,
    },
    {
      sno: 2,
      serviceName: "HBA1C",
      qty: 1,
      unitPrice: 500,
      taxAmt: 0,
      discount: 100,
      totalAmt: 400,
    },
  ];

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
      <p className="emr-search-text">Billing</p>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Service Name</TableCell>
                <TableCell className="emr-label">Qty</TableCell>
                <TableCell className="emr-label">Unit Price (₹)</TableCell>
                <TableCell className="emr-label">Tax Amt (₹)</TableCell>
                <TableCell className="emr-label">Discount (₹)</TableCell>
                <TableCell className="emr-label">Total Amt (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceData.map((row) => (
                <TableRow key={row.sno}>
                  <TableCell>{row.sno}</TableCell>
                  <TableCell>{row.serviceName}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.unitPrice.toLocaleString()}</TableCell>
                  <TableCell>{row.taxAmt.toFixed(2)}</TableCell>
                  <TableCell>{row.discount.toFixed(2)}</TableCell>
                  <TableCell>{row.totalAmt.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
      

            <TableRow>

            <TableCell  colSpan={5} className="b-n"></TableCell>
            <TableCell  colSpan={1} className="b-n emr-doc-text  ">Sub Total</TableCell>
            <TableCell  colSpan={1}className="b-n" >50,000.00</TableCell>
            </TableRow>
            <TableRow>

            <TableCell  colSpan={5} className="b-n"></TableCell>
            <TableCell  colSpan={1} className="b-n emr-doc-text">Amt  Paid</TableCell>
            <TableCell  colSpan={1}className="b-n" >5000.00</TableCell>
            </TableRow>
            <TableRow>

            <TableCell  colSpan={5} className="b-n"></TableCell>
            <TableCell  colSpan={1} className="b-n emr-doc-text">Insurance Amt</TableCell>
            <TableCell  colSpan={1}className="b-n" >40,000.00</TableCell>
            </TableRow>
            <TableRow>

            <TableCell  colSpan={5} className="b-n "></TableCell>
            <TableCell  colSpan={1} className="b-n emr-search-text">Pending Amt</TableCell>
            <TableCell  colSpan={1}className="b-n" >40,000.00</TableCell>
            </TableRow>
          

          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TPAbilling;
