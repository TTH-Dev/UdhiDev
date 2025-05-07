import { useEffect, useState } from "react";
import { Checkbox, Row, Col, Button, message, Input } from "antd";
import axios from "axios";
import { api_url } from "../../../Config";
import moment from "moment";

const PastOcularHistory = () => {
  const id = sessionStorage.getItem("patientId");
  const [datas, setDatas] = useState({
    patientId: id,
    enteredDate: Date.now,
    hoTrauma: {
      inputField: "",
      inputBox: false,
    },
    hoOcularSx: {
      inputField: "",
      inputBox: false,
    },
    pgUse: {
      inputField: "",
      inputBox: false,
    },
  });

  const handleCheckboxChange = (fieldName: any) => {
    setDatas((prevState: any) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        inputBox: !prevState[fieldName]?.inputBox,
      },
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.post(`${api_url}/api/past-ocular-history`, {...datas,patientId:id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDatas({
        patientId: id,
        enteredDate: Date.now,
        hoTrauma: {
          inputField: "",
          inputBox: false,
        },
        hoOcularSx: {
          inputField: "",
          inputBox: false,
        },
        pgUse: {
          inputField: "",
          inputBox: false,
        },
      });

      message.success("Added Successfully!");
      await getDetails(id)
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateID] = useState("");

  const getDetails = async (ids: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/past-ocular-history?patientId=${ids}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      setDatas(res?.data?.data?.pastOcularHistories[0])
let df=res?.data?.data?.pastOcularHistories[0]
      if(df?.hoOcularSx?.inputField||df?.hoTrauma?.inputField||df?.pgUse?.inputField){
        setIsUpdate(true)
        setUpdateID(df._id)
      }
      
    } catch (error: any) {
      console.log(error);
    }
  };


  const handleUpdate=async()=>{
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try{

      await axios.patch(`${api_url}/api/past-ocular-history/getById/${updateId}`,datas,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Updated successfully!")

      await getDetails(id)

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }

  }

  useEffect(() => {
    if (id) {
      getDetails(id);
    }
  }, [id]);

  return (
    <>
      <div style={{ padding: "16px" }} className="emr-complaints-box rounded">
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">Past Ocular History</p>
          <p className="emr-search-text">QF/OP/F/01</p>
        </div>

        <Row className="pt-3">
          <Col span={8}>
            <p className="emr-label">H/O Trauma</p>
          </Col>
          <Col span={4}>
            <Checkbox
              checked={datas?.hoTrauma?.inputBox}
              onChange={() => handleCheckboxChange("hoTrauma")}
            >
              Yes
            </Checkbox>
          </Col>
          <Col span={4}>
            <Checkbox
              checked={!datas?.hoTrauma?.inputBox}
              onChange={() => handleCheckboxChange("hoTrauma")}
            >
              No
            </Checkbox>
          </Col>
          <Col span={4}>
            <Input
              value={datas?.hoTrauma?.inputField}
              onChange={(e) =>
                setDatas((prevState) => ({
                  ...prevState,
                  hoTrauma: {
                    ...prevState?.hoTrauma,
                    inputField: e.target.value,
                  },
                }))
              }
            />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="emr-label">H/O Ocular Sx</p>
          </Col>
          <Col span={4}>
            <Checkbox
              checked={datas?.hoOcularSx?.inputBox}
              onChange={() => handleCheckboxChange("hoOcularSx")}
            >
              Yes
            </Checkbox>
          </Col>
          <Col span={4}>
            <Checkbox
              checked={!datas?.hoOcularSx?.inputBox}
              onChange={() => handleCheckboxChange("hoOcularSx")}
            >
              No
            </Checkbox>
          </Col>
          <Col span={4}>
            <Input
              value={datas?.hoOcularSx?.inputField}
              onChange={(e) =>
                setDatas((prevState) => ({
                  ...prevState,
                  hoOcularSx: {
                    ...prevState?.hoOcularSx,
                    inputField: e.target.value,
                  },
                }))
              }
            />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="emr-label">PG Use</p>
          </Col>
          <Col span={4}>
            <Checkbox
              checked={datas?.pgUse?.inputBox}
              onChange={() => handleCheckboxChange("pgUse")}
            >
              Yes
            </Checkbox>
          </Col>
          <Col span={4}>
            <Checkbox
              checked={!datas?.pgUse?.inputBox}
              onChange={() => handleCheckboxChange("pgUse")}
            >
              No
            </Checkbox>
          </Col>
          <Col span={4}>
            <Input
              value={datas?.pgUse?.inputField}
              onChange={(e) =>
                setDatas((prevState) => ({
                  ...prevState,
                  pgUse: {
                    ...prevState?.pgUse,
                    inputField: e.target.value,
                  },
                }))
              }
            />
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn " onClick={isUpdate?handleUpdate:handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default PastOcularHistory;
