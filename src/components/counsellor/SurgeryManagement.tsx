import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  DatePicker,
  InputNumber,
  message,
  Select,
  TimePicker,
} from "antd";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";
import dayjs from "dayjs";

const SurgeryManagement = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const editId = searchParam.get("editId");
  const [data, setData] = useState({
    patientId: id,
    surgeryDetails: [
      {
        surgeryName: "",
        surgeryType: "",
        categories: "",
        amount: 0,
        totalAmount: 0,
        name: "",
      },
    ],
    subTotal: 0,
    total: 0,
    discount:0,
    surgeryName: "",
    surgeryDate: "",
    surgeryTime: "",
  });

  const handleTypeChange = (value: string, index: number) => {
    const newData = [...data.surgeryDetails];
    newData[index].surgeryType = value;

    let dh = [
      ...newData,
      {
        surgeryName: "",
        surgeryType: "",
        categories: "",
        amount: 0,
        totalAmount: 0,
        name: "",
      },
    ];
    setData({ ...data, surgeryDetails: dh });
  };

  const [surgeryData, setSurgeryData] = useState<any>([]);
  const [injectionData, setInjectionData] = useState<any>([]);
  const [bedData, setBedData] = useState<any>([]);
  const [surgDrp, setSurgDrop] = useState<any>([]);
  const [injectDrp, setInjectDrop] = useState<any>([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/surgery-details/filter?wardType=general`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSurgeryData(res?.data?.data?.iolNames);
      setInjectionData(res?.data?.data?.products);
      setBedData(res?.data?.data?.bed);

      let df = res?.data?.data?.iolNames.map((val: any) => ({
        label: val.iolName,
        value: val.iolName,
      }));

      let dt = res?.data?.data?.products.map((val: any) => ({
        label: val.productName,
        value: val.productName,
      }));

      setSurgDrop(df);
      setInjectDrop(dt);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDrop = (val: any, i: any, type: any) => {
    const newData = [...data?.surgeryDetails];
    newData[i].categories = val;
    let newSurgeryName = data?.surgeryName;

    if (val === "general" || val === "special") {
      let gh = bedData.filter((vals: any) => vals?.Type === val);
      newData[i].amount = gh[0]?.amount;
      newData[i].totalAmount = gh[0]?.amount;
    } else if (type === "Surgery") {
      let gh = surgeryData.filter((vals: any) => vals?.iolName === val);
      newData[i].amount = gh[0]?.amount;
      newData[i].totalAmount = gh[0]?.amount;
      newData[i].name = gh[0]?.tierName;
      newData[i].surgeryName = gh[0]?.tierName;
      newSurgeryName = gh[0]?.tierName;
    } else {
      let gh = injectionData.filter((vals: any) => vals?.productName === val);
      newData[i].amount = gh[0]?.mrp;
      newData[i].totalAmount = gh[0]?.mrp;
    }

    setData((prev) => ({
      ...prev,
      surgeryDetails: newData,
      surgeryName: newSurgeryName,
    }));
  };

  const handleRemove = (index: any) => {
    const updatedTestIds = [...data?.surgeryDetails];
    updatedTestIds.splice(index, 1);

    setData((prevData: any) => ({
      ...prevData,
      surgeryDetails: updatedTestIds,
    }));
  };

  const [discount, setDiscount] = useState<any>(0);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      let dj = [...data.surgeryDetails];
      dj.splice(dj.length - 1, 1);

      await axios.post(
        `${api_url}/api/surgery-details`,
        { ...data, surgeryDetails: dj,discount:discount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getReport = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(`${api_url}/api/surgery-details/${editId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data.entry, "resss");
      let df = res?.data?.data?.entry;
      if (df) {
        setData({
          ...df,
          surgeryDetails: [
            ...df.surgeryDetails,
            {
              surgeryName: "",
              surgeryType: "",
              categories: "",
              amount: 0,
              totalAmount: 0,
              name: "",
            },
          ],
        });
        setDiscount(df?.discount)
        
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      let dj = [...data.surgeryDetails];
      dj.splice(dj.length - 1, 1);

      await axios.patch(
        `${api_url}/api/surgery-details/${editId}`,
        { ...data, surgeryDetails: dj,discount:discount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const subtotal = data.surgeryDetails.reduce(
      (acc, curr) => acc + Number(curr.totalAmount || 0),
      0
    );
    const total = subtotal - Number(discount || 0);
    setData((prev) => ({
      ...prev,
      subTotal: subtotal,
      total: total < 0 ? 0 : total,
    }));
  }, [data.surgeryDetails, discount]);

  useEffect(() => {
    getData();
    if (editId) {
      getReport();
    }
  }, [editId]);

  return (
    <div>
      <div className="mx-4 emr-complaints-box rounded">
        <TableContainer component={Paper} elevation={0}>
          <p className="emr-search-text mb-0 p-4">Surgery Details</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell style={{ width: "200px" }}>Type</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Total Amt</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.surgeryDetails.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ width: "150px" }}>
                    <Select
                      style={{ width: "150px" }}
                      options={[
                        {
                          label: "Surgery",
                          value: "Surgery",
                          disabled: data?.surgeryDetails.some(
                            (item, i) =>
                              item.surgeryType === "Surgery" && i !== index
                          ),
                        },
                        { label: "Bed", value: "Bed" },
                        { label: "Injection", value: "Injection" },
                        { label: "Drops", value: "Drops" },
                      ]}
                      value={row?.surgeryType}
                      onChange={(value) => handleTypeChange(value, index)}
                    />
                  </TableCell>
                  <TableCell>
                    {row.surgeryType === "Bed" ? (
                      <Select
                        style={{ width: "200px" }}
                        options={[
                          {
                            label: "General",
                            value: "general",
                          },
                          {
                            label: "Special",
                            value: "special",
                          },
                        ]}
                        value={row.categories}
                        onChange={(value) => handleDrop(value, index, "Bed")}
                      />
                    ) : (
                      <Select
                        style={{ width: "200px" }}
                        options={
                          row?.surgeryType === "Surgery" ? surgDrp : injectDrp
                        }
                        value={row.categories}
                        onChange={(value) =>
                          handleDrop(value, index, row?.surgeryType)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>{row.name || "-"}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell className="text-danger">
                    <IoClose
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemove(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>
              <TableCell className="b-n user-text">Sub Total</TableCell>
              <TableCell className="b-n">{data?.subTotal.toFixed(2)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>

              <TableCell className="b-n user-text">Discount</TableCell>
              <TableCell className="b-n">
                <InputNumber
                  type="number"
                  value={discount}
                  onChange={(value) => setDiscount(value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="b-n"></TableCell>

              <TableCell className="b-n box-title"> Total</TableCell>
              <TableCell className="b-n">{data?.total.toFixed(2)}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>

      <div className="emr-complaints-box mx-4 mt-3 rounded">
        <p className="emr-search-text mb-0 p-4">Date and Time</p>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Surgery Name</TableCell>
                <TableCell className="emr-label">Surgery Date</TableCell>
                <TableCell className="emr-label">Surgery Time</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data?.surgeryName || "-"}</TableCell>
                <TableCell>
                  <DatePicker
                    value={data?.surgeryDate ? dayjs(data.surgeryDate) : null}
                    onChange={(date: any, _dateString: any) =>
                      setData({ ...data, surgeryDate: date })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TimePicker
                    use12Hours
                    format="hh:mm A"
                    value={
                      data?.surgeryTime
                        ? dayjs(data?.surgeryTime, "hh:mm A")
                        : null
                    }
                    onChange={(_time: any, timeString: any) =>
                      setData({ ...data, surgeryTime: timeString })
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="my-3 me-4 text-end">
        <Button className="c-btn me-4">Cancel</Button>
        <Button className="s-btn" onClick={editId?handleUpdate:handleSave}>
          {editId?"Update":"Complete"}
        </Button>
      </div>
    </div>
  );
};

export default SurgeryManagement;
