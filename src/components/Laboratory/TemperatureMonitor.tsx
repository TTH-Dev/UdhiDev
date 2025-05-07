import { TableCell, TableRow } from "@mui/material";
import {
  Button,
  DatePicker,
  Input,
  message,
  Pagination,
  Select,
  Table,
  TimePicker,
} from "antd";
import axios from "axios";
import { Container } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { RiResetRightLine } from "react-icons/ri";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";

const TemperatureMonitor = () => {
  const [filterValues, setFilterValues] = useState("");
  const [data, setData] = useState<any>([]);
  const [placedROP, setPlaceDrop] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [postData, setPostData] = useState({
    employeeName: "",
    placeName: "",
    Celsius: "",
    temperatureMonitorDate: "",
    temperatureMonitorTime: "",
  });

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      render: (_text: string, _record: any, index: any) => (
        <>{(currentPage - 1) * pageSize + index + 1}</>
      ),
    },
    {
      title: "Place Name",
      dataIndex: "placeName",
    },

    {
      title: "Celsius",
      dataIndex: "Celsius",
      render: (text: string) => <>{text}*C</>,
    },
    {
      title: "Date & Time",
      dataIndex: "DateTime",
      render: (_text: string, record: any) => (
        <>
          {record.temperatureMonitorDate + " " + record.temperatureMonitorTime}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_text: any, record: any) => (
        <>
          {" "}
          <Button
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#3497F9",
              color: "#fff",
              border: "none",
            }}
            className="p-0 mx-2"
            onClick={() => handleDelete(record._id)}
          >
            <MdDeleteForever style={{ fontSize: "20px" }} />
          </Button>
        </>
      ),
    },
  ];

  const getPlaceName = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/temperature-monitor/dm-menu`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let dfs = res.data.data.places.map((val: any) => ({
        label: val,
        value: val,
      }));
      setPlaceDrop(dfs);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      let dateformat = filterValues
        ? moment(filterValues).format("YYYY-MM-DD")
        : "";
      const res = await axios.get(
        `${api_url}/api/temperature-monitor/filter?limit=${pageSize}&page=${currentPage}&date=${dateformat}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data.monitors);
      setTotalPages(res.data.totalPages);
      await getPlaceName();
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.delete(`${api_url}/api/temperature-monitor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Deleted Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleChange = (value: any) => {
    setPostData({ ...postData, placeName: value[0] });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setFilterValues("");
  };

  const handleSave=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/temperature-monitor`,postData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Created Successfully!")


      await getDetails()

      setPostData({
        employeeName: "",
        placeName: "",
        Celsius: "",
        temperatureMonitorDate: "",
        temperatureMonitorTime: "",
      })

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(() => {
    getDetails();
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
          <p className="emr-search-text" style={{ fontSize: "18px" }}>
            Temperature Monitor Details
          </p>

          <div className="pt-3">
            <TableRow>
              <TableCell
                className="py-1"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#595959",
                  border: "none",
                }}
              >
                Employee Name
              </TableCell>
              <TableCell className="py-1" style={{ border: "none" }}>
                <Input
                  style={{ width: "100%", height: "35px" }}
                  value={postData.employeeName}
                  onChange={(e) =>
                    setPostData({ ...postData, employeeName: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className="py-2"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#595959",
                  border: "none",
                }}
              >
                Place Name
              </TableCell>
              <TableCell className="py-2" style={{ border: "none" }}>
                <Select
                  mode="tags"
                  onChange={handleChange}
                  style={{ width: "100%", height: "35px" }}
                  options={placedROP}
                  value={postData.placeName||undefined}
                  maxTagCount={1}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className="pt-1 pb-2"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#595959",
                  border: "none",
                }}
              >
                Celsius(*C)
              </TableCell>
              <TableCell className="pt-1 pb-2" style={{ border: "none" }}>
                <Input
                  style={{ width: "100%", height: "35px" }}
                  value={postData.Celsius}
                  onChange={(e) =>
                    setPostData({ ...postData, Celsius: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className="py-1"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#595959",
                  border: "none",
                }}
              >
                Date & Time
              </TableCell>
              <TableCell className="py-1" style={{ border: "none" }}>
                <DatePicker
                  className="me-1"
                  value={
                    postData.temperatureMonitorDate
                      ? dayjs(postData.temperatureMonitorDate)
                      : null
                  }
                  onChange={(_date: any, datestring: any) =>
                    setPostData({
                      ...postData,
                      temperatureMonitorDate: datestring,
                    })
                  }
                  style={{ width: "49%", height: 35 }}
                />
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  style={{ width: "49%", height: 35 }}
                  value={
                    postData.temperatureMonitorTime
                      ? dayjs(postData.temperatureMonitorTime, "h:mm a")
                      : null
                  }
                  onChange={(value) =>
                    setPostData({
                      ...postData,
                      temperatureMonitorTime: value
                        ? value.format("h:mm a")
                        : "",
                    })
                  }
                />
              </TableCell>
            </TableRow>
          </div>
          <div className="d-flex justify-content-end pt-3 pb-4">
            <Button className="s-btn" onClick={handleSave}>Save</Button>
          </div>
        </Container>
      </div>
      <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
        <div className="d-flex justify-content-between align-items-center my-3">
          <p className="emr-search-text mb-0">
            Temperature Monitor Report Details
          </p>

          <div className="d-flex">
            <DatePicker
              style={{ width: "235px", height: 40 }}
              value={filterValues ? dayjs(filterValues) : null}
              onChange={(_date: any, datestring: any) =>
                setFilterValues(datestring)
              }
            />
            <Button
              style={{
                height: 38,
                width: 38,
                backgroundColor: "#3497F9",
                color: "#fff",
                border: "none",
              }}
              className="p-0 mx-2"
              onClick={handleReset}
            >
              <RiResetRightLine style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </div>

        <div>
          <Table columns={columns} dataSource={data} pagination={false} />
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
      </div>
    </>
  );
};

export default TemperatureMonitor;
