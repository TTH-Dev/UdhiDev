import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { api_url } from "../../../Config";
import { useEffect, useState } from "react";

const PmSummary = () => {
  const [searchParam] = useSearchParams();
  const patientId = searchParam.get("id");
  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Login required!");
        localStorage.clear();
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data.patient, "res");
      setData(res?.data?.data?.patient);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (patientId) {
      getData();
    }
  }, [patientId]);

  return (
    <div className="emr-complaints-box mx-3 mb-4">
      <p className="emr-search-text ps-3 pt-3">Summary</p>

      {/* Package Detail Table */}
      <div className="mt-4 px-3">
        <p className="emr-search-text">Package Detail</p>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Procedure</TableCell>
                <TableCell className="emr-label">Amount</TableCell>

                <TableCell className="emr-label">Billed Amt</TableCell>
                <TableCell className="emr-label">Amt to Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.surgeryDetailsId?.surgeryDetails?.length > 0 &&
                data?.surgeryDetailsId?.surgeryDetails.map(
                  (item: any, i: any) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {item?.surgeryName ||
                          item?.surgeryType + " (" + item?.categories + ")"}
                      </TableCell>
                      <TableCell>{item.amount}</TableCell>

                      <TableCell>{item?.totalAmount}</TableCell>
                      <TableCell>{item?.totalAmount}</TableCell>
                    </TableRow>
                  )
                )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  {" "}
                  <span className="emr-search-text">Total</span>
                </TableCell>
                <TableCell>
                  <span className="emr-search-text">
                    {data?.surgeryDetailsId?.subTotal || "-"}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="emr-search-text">
                    {" "}
                    {data?.surgeryDetailsId?.total || "-"}
                  </span>
                  <span className="ms-1" style={{ color: "red" }}>
                    (-{data?.surgeryDetailsId?.discount || "-"})
                  </span>
                </TableCell>
                <TableCell>
                  <span className="emr-search-text">
                    {data?.surgeryDetailsId?.total || "-"}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PmSummary;
