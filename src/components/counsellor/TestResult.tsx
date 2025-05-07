import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Empty, message, Modal } from "antd";
import axios from "axios";
import { api_url } from "../../Config";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

const ReportTable = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [data, setData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [type, setTpye] = useState("");

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/prescribe-test/get-bothReport?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let df = res?.data?.data.map((val: any) => ({
        date: val?.createdAt,
        img: val?.lapReportPdf || val?.biometryWorkSheet,
        type: val?.type,
      }));

      setData(df);
      console.log(df);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="emr-complaints-box m-3 ">
        <p className="emr-search-text mb-0 p-4">Test Result</p>
        {data.length > 0 ? (
          <TableContainer component={Paper} className="mx-2" elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="emr-label">Report</TableCell>
                  <TableCell className="emr-label">Report Date</TableCell>
                  <TableCell className="emr-label" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 &&
                  data.map((report: any, i: any) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {report?.date
                          ? moment(report?.date).format("DD-MM-YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          className="s-btn"
                          onClick={() => {
                            setImg(report?.img);
                            setTpye(report.type);
                            setIsModalVisible(true);
                          }}
                        >
                          View Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="py-3">
            <Empty />
          </div>
        )}
      </div>

      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
          setImg("");
        }}
        centered
      >
        <img
          src={type === "LapReport" ? `${api_url}/public/images/${img}` : img}
          alt="Preview"
          className=""
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Modal>
    </>
  );
};

export default ReportTable;
