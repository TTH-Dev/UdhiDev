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
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api_url } from "../../Config";
import moment from "moment";

const PatientDetail = () => {
  const [data, setData] = useState<any[]>([]);
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
        `${api_url}/api/ward/getOccipiedBeds?limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data);
      setTotalPages(res?.data?.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleId=(id:any)=>{
    sessionStorage.setItem("patientId",id)
  }

  useEffect(() => {
    getData();
  }, [currentPage]);
  return (
    <>
      <div className="emr-complaints-box mx-3 rounded">
        <div>
          <p className="emr-search-text mb-0 p-4">Patient Details</p>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="patient details table">
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">OP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Floor</TableCell>
                <TableCell className="emr-label">Ward</TableCell>
                <TableCell className="emr-label">Room No</TableCell>
                <TableCell className="emr-label">Admitted Date</TableCell>
                <TableCell className="emr-label" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(currentPage - 1) * pageSize + 1 + index}
                    </TableCell>
                    <TableCell>{row.opNo}</TableCell>
                    <TableCell>{row.patientName}</TableCell>
                    <TableCell>{row.floor}</TableCell>
                    <TableCell>{row.wardType}</TableCell>
                    <TableCell>{row.roomNo}</TableCell>
                    <TableCell>
                      {row?.admittedDate
                        ? moment(row.admittedDate).format("YYYY-MM-DD")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div>
                        <Link to={`doctor-activity?id=${row?.patientId}`} onClick={()=>handleId(row?.patientId)}>
                          <Button className="i-btn me-3">
                            <FaEye />
                          </Button>
                        </Link>
                        <Link to={`discharge-note?id=${row?.patientId}`} onClick={()=>handleId(row?.patientId)}>
                          <Button className="s-btn" style={{ height: "33px" }}>
                            Start Discharge
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {data.length > 0 ? (
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

export default PatientDetail;
