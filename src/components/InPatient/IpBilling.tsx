import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button, Empty, message, Pagination } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";

const IpBilling = () => {
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/filter?patientStatus=Inpatient&page=${currentPage}&limit=${pageSize}&ipBillStatus=pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      
      setData(res?.data?.data?.patients);
      setTotalPages(res?.data?.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="emr-complaints-box mx-3 rounded">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0  ps-2 p-4">Patient Details</p>
          </div>
          {/* <div className="p-3">
            <Button className="doc-fil-btn mt-1">
              <FaFilter /> Filter
            </Button>
            <Button className="doc-fil-btn mx-2 mt-1">
              <MdOutlineReplay />
            </Button>
          </div> */}
        </div>
        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="patient details table">
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Operation Date</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map((row: any, i: any) => (
                  <TableRow key={i}>
                    <TableCell>
                      {(currentPage - 1) * pageSize + 1 + i}
                    </TableCell>
                    <TableCell>{row?.opNo || "-"}</TableCell>
                    <TableCell>{row?.PatientName || "-"}</TableCell>
                    <TableCell>
                      {row?.surgeryDetailsId?.surgeryName || "-"}
                    </TableCell>
                    <TableCell>
                      {row?.surgeryDetailsId?.surgeryTime || "-"}
                    </TableCell>
                    <TableCell>
                 
                        <Link to={`create-bill?id=${row._id}`}>
                        <Button type="primary" className="i-btn">
                          Create Bill
                        </Button>
                      </Link>
                     
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Pagination Component */}
      {data?.length > 0 ? (
        <div className="d-flex justify-content-end mt-4">
          <Pagination
            current={currentPage}
            total={totalPages * pageSize}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      ) : (
        <>
          <Empty className="pt-2" />
        </>
      )}
    </>
  );
};

export default IpBilling;
