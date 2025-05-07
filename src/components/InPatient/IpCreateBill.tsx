import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, message } from "antd";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";
import { useEffect, useState } from "react";

const IpCreateBill = () => {
  const [searchParam] = useSearchParams();
  const patientId = searchParam.get("id");
  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      setData(res?.data?.data?.patient);
    } catch (error: any) {
      console.log(error);
    }
  };
  const navigate=useNavigate()

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required!");
        return;
      }

      let fg = data?.surgeryDetailsId?.surgeryDetails.map((val: any) => ({
        serviceName: val?.surgeryName || val?.categories,
        totalAmount: val?.totalAmount,
        unitPrice: val?.totalAmount,
      }));

      let hj = {
        billDetails: fg,
        subTotal: data?.surgeryDetailsId?.subTotal,
        discount: data?.surgeryDetailsId?.discount,
        total: data?.surgeryDetailsId?.total,
        amount: data?.surgeryDetailsId?.total,
        patientId: data?._id,
        patientName: data?.PatientName,
        billFor:"ipBilling"
      };
      await axios.post(`${api_url}/api/billing`, hj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Saved Successfully!")
      navigate("/in-patient/ip-billing")
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (patientId) {
      getData();
    }
  }, [patientId]);
  return (
    <div>
      <div className="mx-3 me-1 mt-5 emr-complaints-box rounded ">
        <TableContainer component={Paper} elevation={0}>
          <div className="d-flex justify-content-between">
            <div>
              <p className="emr-search-text mb-0 p-4">Bill Details</p>
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">S.No</TableCell>
                <TableCell className="emr-label">Categories</TableCell>
                <TableCell className="emr-label">Procedure</TableCell>
                <TableCell className="emr-label">Amount</TableCell>
                <TableCell className="emr-label">Total Amt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.surgeryDetailsId?.surgeryDetails?.length > 0 &&
                data?.surgeryDetailsId?.surgeryDetails.map(
                  (row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.surgeryType || "-"}</TableCell>
                      <TableCell>{row?.surgeryName || "-"}</TableCell>

                      <TableCell>{row?.amount || "-"}</TableCell>
                      <TableCell>{row?.totalAmount || "-"}</TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
            <TableRow>
              <TableCell colSpan={3} className="b-n"></TableCell>
              <TableCell className="b-n user-text">
                <span className="box-title">Sub Total</span>
              </TableCell>
              <TableCell className="b-n">
                <span className="box-title">
                  {data?.surgeryDetailsId?.subTotal || "-"}
                </span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} className="b-n"></TableCell>

              <TableCell className="b-n user-text">
                <span className="box-title">Discount</span>
              </TableCell>
              <TableCell className="b-n">
                <span className="box-title">
                  {data?.surgeryDetailsId?.discount || "-"}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="b-n"></TableCell>

              <TableCell className="b-n box-title">
                {" "}
                <span className="box-title">Total</span>
              </TableCell>
              <TableCell className="b-n">
                <span className="box-title">
                  {data?.surgeryDetailsId?.total || "-"}
                </span>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>
      <div className="my-4 text-end">
        <Button className="c-btn me-4">Cancel</Button>
        <Button className="s-btn" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default IpCreateBill;
