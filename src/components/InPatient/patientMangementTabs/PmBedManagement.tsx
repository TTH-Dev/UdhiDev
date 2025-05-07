import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { api_url } from "../../../Config";
import { useSearchParams } from "react-router-dom";

const { Option } = Select;

const PmBedManagement = () => {
  const [filterData, setFilterData] = useState<any>({
    floor: "",
    wardType: "",
    roomNo: "",
    bedNo: "",
    amount: 0,
  });

  const [wardTypeDrp, setWardTypeDrp] = useState<any>([]);
  const [roomDrp, setRoomDrp] = useState<any>([]);
  const [bedDrop, setBedDrop] = useState<any>([]);
  const [postData, setPostData] = useState<any>();
  const [searchParam] = useSearchParams();
  const patientId = searchParam.get("id");

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/ward/get-ward?floor=${filterData?.floor}&wardType=${filterData?.wardType}&roomNo=${filterData?.roomNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data?.wardTypes?.length > 0) {
        let gf = res?.data?.wardTypes.map((val: any) => ({
          label: val,
          value: val,
        }));
        setWardTypeDrp(gf);
      }

      if (res?.data?.rooms?.length > 0) {
        let gd = res?.data?.rooms.map((val: any) => ({
          label: val?.roomNo,
          value: val?.roomNo,
        }));
        setRoomDrp(gd);
      }

      if (res?.data?.beds?.length > 0) {
        console.log(res, "kl");
        setPostData(res?.data);

        let fh = res?.data?.beds.filter((val: any) => !val?.occupied);

        setFilterData({ ...filterData, amount: res?.data?.amount });

        let hg = fh.map((val: any) => ({
          label: val?.bedNo,
          value: val?.bedNo,
        }));

        setBedDrop(hg);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFilterData({
      floor: "",
      wardType: "",
      roomNo: "",
      bedNo: "",
      amount: 0,
    });
  };

  const handleAssign = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.patch(
        `${api_url}/api/ward/${postData?.wardId}/allocate/${postData?.roomId}/${postData?.roomNo}`,
        { patientId: patientId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
    }
  };
  const [isAdded,setIsAdded]=useState(false)

  const hanldeAddBill=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      await axios.patch(`${api_url}/api/ward/handle-Bill/${patientId}`,{bedData:{
        wardType:filterData?.wardType,
        amount:filterData?.amount
      }},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Added Successfully!")
      setIsAdded(true)

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
      
    }
  }

  useEffect(() => {
    getData();
  }, [filterData.floor, filterData.roomNo, filterData.wardType]);

  return (
    <>
      <div className="emr-complaints-box mx-3">
        <div className="d-flex justify-content-between p-2">
          <div className="px-2 pt-3">
            <p className="emr-search-text">Bed Management</p>
          </div>
        </div>
        <TableContainer component={Paper} elevation={0} className="">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Floor</TableCell>
                <TableCell className="emr-label">Ward Type</TableCell>
                <TableCell className="emr-label">Room No</TableCell>
                <TableCell className="emr-label">Bed No</TableCell>
                <TableCell className="emr-label">Amount</TableCell>
                <TableCell className="emr-label"></TableCell>
                <TableCell className="emr-label"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select
                    style={{ width: 100 }}
                    value={filterData?.floor}
                    onChange={(value) =>
                      setFilterData({ ...filterData, floor: value })
                    }
                  >
                    <Option value="1stfloor">1st</Option>
                    <Option value="2ndfloor">2nd</Option>
                  </Select>
                </TableCell>

                <TableCell>
                  <Select
                    value={filterData?.wardType}
                    onChange={(value) =>
                      setFilterData({ ...filterData, wardType: value })
                    }
                    style={{ width: 120 }}
                    options={wardTypeDrp}
                    disabled={!filterData.floor}
                  />
                </TableCell>

                <TableCell>
                  <Select
                    value={filterData?.roomNo}
                    onChange={(value) =>
                      setFilterData({ ...filterData, roomNo: value })
                    }
                    style={{ width: 80 }}
                    disabled={!filterData.wardType}
                    options={roomDrp}
                  />
                </TableCell>

                <TableCell>
                  <Select
                    style={{ width: 80 }}
                    disabled={!filterData.roomNo}
                    options={bedDrop}
                    value={filterData?.bedNo}
                    onChange={(value) =>
                      setFilterData({ ...filterData, bedNo: value })
                    }
                  />
                </TableCell>

                <TableCell>
                  {filterData?.bedNo ? filterData?.amount : "-"}
                </TableCell>

                <TableCell>
                  {isAdded?<Button type="primary">Added to Bill</Button>:
                  <Button type="primary" onClick={hanldeAddBill}>Add to Bill</Button>}
                </TableCell>
                <TableCell>
                  <TableCell className="text-danger">
                    <IoClose
                      style={{ cursor: "pointer" }}
                      onClick={handleReset}
                    />
                  </TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="text-end my-3 me-2">
        <Button className="c-btn me-4">Cancel</Button>
        <Button className="s-btn" onClick={handleAssign}>
          Assign
        </Button>
      </div>
    </>
  );
};

export default PmBedManagement;
