import { Button, Col, Input, InputNumber, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../../Config";

const CPackageAdd = () => {
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const type = searchParam.get("type");
  const id=searchParam.get("id")
  const [data, setData] = useState({
    name: "",
    code: "",
    type: [
      {
        iol: "",
        amount: 0,
      },
    ],
    patientType: type,
  });

  const handleAddMore = () => {
    setData({ ...data, type: [...data.type, { iol: "", amount: 0 }] });
  };

  const handleRemove = (index: number) => {
    const updated = [...data.type];
    updated.splice(index, 1);
    setData({ ...data, type: updated });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      await axios.post(`${api_url}/api/surgery`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Saved Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getData=async(ids:any)=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res=await axios.get(`${api_url}/api/surgery/${ids}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      console.log(res?.data?.data?.surgery);
      setData(res?.data?.data?.surgery)
      

    }catch(error:any){
      console.log(error);
      
    }
  }

  const hanldeUpdate=async()=>{
try{
  const token = localStorage.getItem("authToken");
  if (!token) {
    localStorage.clear();
    message.error("Login required!");
    return;
  }
  await axios.patch(`${api_url}/api/surgery/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
message.success("Updated Successfully!")

}catch(error:any){
console.log(error);
message.error("Something went wrong!")
}
  }


  useEffect(()=>{
if(id){
  getData(id)
}
  },[id])

  return (
    <>
      <div className=" mb-3 ms-4 mb-0" onClick={() => navigate(-1)}>
        <p className="back" style={{ color: "#414141" }}>
          <i className="fi fi-br-angle-left" style={{ cursor: "pointer" }}></i>
          <span
            style={{
              zIndex: "999",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "0",
              color: "#414141",
              cursor: "pointer",
            }}
            className="ms-2 "
          >
            Back
          </span>
        </p>
      </div>
      <div className="emr-complaints-box py-4 px-3 mx-3 rounded mb-5">
        <div>
          <p className="emr-search-text mb-0 p-3">Add Surgery Details</p>
        </div>
        <Row gutter={32} className="px-4">
          <Col span={12}>
            <label className="emr-label my-2"> Surgery Name</label>
            <br />
            <Input
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              style={{ width: "50%" }}
            />
          </Col>
          <Col span={12}>
            <label className="emr-label my-2">Code</label>
            <br />
            <Input
              value={data?.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              style={{ width: "50%" }}
            />
          </Col>
          {data?.type.map((val: any, i: any) => (
            <React.Fragment key={i}>
              <Col span={12}>
                <label className="emr-label my-2"> IOL</label>
                <br />
                <Input
                  value={val?.iol}
                  onChange={(e) => {
                    const type = data?.type.map((item: any, idx: any) =>
                      idx === i ? { ...item, iol: e.target.value } : item
                    );
                    setData({ ...data, type });
                  }}
                  style={{ width: "50%" }}
                />
              </Col>
              <Col span={12}>
                <label className="emr-label my-2">Amount</label>
                <br />
                <InputNumber
                  type="number"
                  value={val?.amount || ""}
                  onChange={(value) => {
                    const type = data?.type.map((item: any, idx: any) =>
                      idx === i ? { ...item, amount: value } : item
                    );
                    setData({ ...data, type });
                  }}
                  style={{ width: "50%" }}
                />
                {i === 0 ? (
                  ""
                ) : (
                  <IoMdClose
                    onClick={() => handleRemove(i)}
                    className="ms-2"
                    style={{ color: "red", cursor: "pointer" }}
                  />
                )}
              </Col>
            </React.Fragment>
          ))}
        </Row>
        <div className="ms-4 mt-3">
          <span className="add-ud" onClick={handleAddMore}>
            + Add More
          </span>
        </div>
      </div>
      <div className="text-end mb-5 me-3">
        <Button className="c-btn me-5">Cancel</Button>
        <Button className="s-btn" onClick={id?hanldeUpdate:handleSave}>
          {id?"Update":"Save"}
        </Button>
      </div>
    </>
  );
};

export default CPackageAdd;
