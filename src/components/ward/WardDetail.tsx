import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button, Pagination } from "antd";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { message } from "antd";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface WardDetailProps {
  cfloor: string;
}

const WardDetail: React.FC<WardDetailProps> = ({ cfloor }) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/ward?&limit=${pageSize}&page=${currentPage}&floor=${cfloor}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTotalPages(res.data.totalPages);
      const fetchedData = res.data.data.wards.map((val: any) => ({
        key: val._id,
        floor: val.floor,
        wardType: val.wardType,
        rooms: val.room.map((val: any) => ({
          roomNo: val.roomNo,
          noOfBeds: val.noOfBed,
          beds: val.beds,
        })),
      }));

      setData(fetchedData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }
      await axios.delete(`${api_url}/api/ward/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Deleted Successfully!");
      await fetchData();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const filtered = data.filter((ward) => ward.floor === cfloor);
    setFilteredData(filtered);
  }, [cfloor, data]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const getStatusColor = (status: string) => {
    return status === "Occupied" ? "#FFB617" : "#2CC86D";
  };

  const navigate = useNavigate();
  const handleNav = () => {
    navigate("add-ward");
    sessionStorage.setItem("wardFloor",cfloor)
  };
  return (
    <div className="emr-complaints-box ms-2">
      <div className="text-end py-3 pe-3">
        {/* <Button className="doc-fil-btn mt-1">
          <FaFilter />
          Filter{" "}
        </Button>
        <Button className="doc-fil-btn mx-2 mt-1">
          <MdOutlineReplay />
        </Button> */}

        <Button className="s-btn ms-2" onClick={handleNav}>
          Add
        </Button>
      </div>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Room No</TableCell>
              <TableCell className="emr-label">Ward Type</TableCell>
              <TableCell className="emr-label">Bed No</TableCell>
              <TableCell className="emr-label">Occupied Status</TableCell>
              <TableCell className="emr-label">Patient Name</TableCell>
              <TableCell className="emr-label">OP No</TableCell>
              <TableCell className="emr-label">Admit Time</TableCell>
              <TableCell className="emr-label" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length > 0 &&
              filteredData.map((ward: any) =>
                ward.rooms.map((room: any) =>
                  room.beds.map((bed: any, bedIndex: number) => (
                    <TableRow
                      key={bedIndex}
                      className="b-t"
                      style={{
                        borderTop:
                          bedIndex === 0 ? "1px solid #CFCFCF" : "none",
                      }}
                    >
                      {bedIndex === 0 && (
                        <>
                          <TableCell
                            style={{ border: "0px" }}
                            rowSpan={room?.beds?.length}
                          >
                            {room?.roomNo || "-"}
                          </TableCell>
                          <TableCell
                            style={{
                              border: "0px",
                              borderRight: "1px solid #CFCFCF",
                            }}
                            rowSpan={room?.beds?.length}
                          >
                            {ward?.wardType.toUpperCase() || "-"}
                          </TableCell>
                        </>
                      )}

                      <TableCell style={{ border: "0px" }}>
                        {bedIndex + 1}
                      </TableCell>
                      <TableCell
                        style={{
                          color: getStatusColor(
                            bed?.occupied ? "Occupied" : "Available"
                          ),
                          border: "0px",
                          fontWeight: 600,
                        }}
                      >
                        {bed?.occupied ? "Occupied" : "Unoccupied"}
                      </TableCell>
                      <TableCell style={{ border: "0px" }}>
                        {bed?.patientId?.PatientName || "-"}
                      </TableCell>
                      <TableCell style={{ border: "0px" }}>
                        {bed?.patientId?.opNo || "-"}
                      </TableCell>
                      <TableCell style={{ border: "0px" }}>
                        {bed?.inTime || "-"}
                      </TableCell>
                      <TableCell style={{ border: "0px" }}>
                        {bedIndex === 0 && (
                          <>
                          <Link to={`add-ward?editId=${ward?.key}`}>
                            <Button
                              className="i-btn me-3 p-0"
                              style={{ height: 40, width: 40 }}
                            >
                              <MdEdit />
                            </Button>
                            </Link>
                            <Button
                              className="i-btn p-0"
                              style={{ height: 40, width: 40 }}
                              onClick={() => handleDelete(ward?.key)}
                            >
                              <MdOutlineDelete />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.length > 0 && (
        <div className="d-flex justify-content-end mt-4 pb-4">
          <Pagination
            current={currentPage}
            total={totalPages * pageSize}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default WardDetail;
