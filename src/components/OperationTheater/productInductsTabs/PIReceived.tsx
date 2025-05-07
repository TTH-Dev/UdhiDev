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

const stockData = [
  {
    productName: "Paracetamol",
    currentStock: 30,
    requiredStock: 20,
    requestingStock: 20,
  },
];

const PIReceived = () => {
  return (
    <>
      <div className="emr-complaints-box pb-3 ">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 p-4">Requesting Product</p>
          </div>
          <div className=" text-end  py-3 pe-3">
            <Button className="doc-fil-btn mt-1">
              <FaFilter />
              Filter{" "}
            </Button>
            <Button className="doc-fil-btn mx-2 mt-1">
              <MdOutlineReplay />
            </Button>
          </div>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {stockData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.currentStock} QYT</TableCell>
                    <TableCell>{row.requiredStock} QYT</TableCell>
                    <TableCell>{row.requestingStock} QYT</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>Total Product</TableCell>
                <TableCell>3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>Total Qyt</TableCell>
                <TableCell>30</TableCell>
              </TableRow>
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

export default PIReceived;
