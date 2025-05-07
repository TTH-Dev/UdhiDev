import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, DatePicker, message, Pagination, Select } from "antd";
import axios from "axios";
import { Container } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { RiResetRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import moment from "moment";

const ProductUsageMonitor = () => {
  const [testName, setTestName] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [filterValues, setFilterValues] = useState({
    name: "",
    date: "",
  });

  const getTestdrop = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/test/dm-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let uniqueTests = Array.from(
        new Map(
          res.data.data.data.map((val: any) => [
            val.testName,
            { label: val.testName, value: val.testName },
          ])
        ).values()
      );

      setTestName(uniqueTests);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      let formattedDate = filterValues.date
      ? moment(filterValues.date).format("YYYY-MM-DD")
      : "";
      const res = await axios.get(
        `${api_url}/api/product-usage-monitor/filter?limit=${pageSize}&page=${currentPage}&testName=${
          filterValues.name
        }&date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data.monitors, "res");
      setData(res.data.data.monitors);
      setTotalPages(res.data.totalPages);
      await getTestdrop();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = async () => {
    setFilterValues({
      name: "",
      date: "",
    });
  };

  useEffect(() => {
    getData();
  }, [currentPage, filterValues]);
  return (
    <>
      <div
        className="act-cont-c  ms-4"
        style={{ marginBottom: "16px", color: "#595959" }}
      >
        <Container
          fluid
          className="emr-doc-box py-3"
          style={{
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            border: "1px solid rgb(219, 225, 227)",
            borderTop: "none",
          }}
        >
          <p className="emr-search-text">Filter</p>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div>
                <label
                  className="pb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#595959",
                  }}
                >
                  Test Name
                </label>
                <br />
                <Select
                  showSearch
                  style={{ width: "100%", height: 40 }}
                  options={testName}
                  value={filterValues.name}
                  onChange={(value) =>
                    setFilterValues({ ...filterValues, name: value })
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div>
                <label
                  className="pb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#595959",
                  }}
                >
                  Date
                </label>
                <br />
                <DatePicker
                  value={filterValues.date ? moment(filterValues.date) : null}
                  onChange={(_date: any, datestring: any) =>
                    setFilterValues({ ...filterValues, date: datestring })
                  }
                  style={{ width: "100%", height: 40 }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div>
                <label className="pb-2" style={{ visibility: "hidden" }}>
                  reset
                </label>
                <br />
                <Button
                  className="p-0"
                  style={{
                    backgroundColor: "#3497F9",
                    height: 40,
                    width: 40,
                    color: "#fff",
                  }}
                  onClick={handleReset}
                >
                  <RiResetRightLine style={{ fontSize: "20px" }} />
                </Button>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 d-flex justify-content-end align-items-center">
              <div>
                <label className="pb-2" style={{ visibility: "hidden" }}>
                  Quantity
                </label>
                <br />
                <Link to="/laboratory/quality-standard/add-product-usage-monitor-info">
                  <Button
                    className="p-0"
                    style={{
                      backgroundColor: "#3497F9",
                      height: 40,
                      width: 40,
                      color: "#fff",
                    }}
                  >
                    <IoIosAddCircle style={{ fontSize: "20px" }} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-3">
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.no</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Open Date</TableCell>
                    <TableCell>Close Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((val: any, index: any) => (
                    <TableRow
                      key={val._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {(currentPage - 1) * pageSize + index + 1}
                      </TableCell>
                      <TableCell>{val.productName || "-"}</TableCell>
                      <TableCell>{val.testName || "-"}</TableCell>
                      <TableCell>
                        {moment(val.openDate).format("DD-MM-YYYY")+" "+ (val.openTime) ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        {moment(val.closeDate).format("DD-MM-YYYY")+" "+ (val.closeTime) ||
                          "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination Component */}
            {data.length > 0 && (
              <div className="d-flex justify-content-end mt-4">
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
        </Container>
      </div>
    </>
  );
};

export default ProductUsageMonitor;
