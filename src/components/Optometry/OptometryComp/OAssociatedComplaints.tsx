import { Button, Checkbox, Form, Input, message } from "antd";
import { api_url } from "../../../Config";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const AssociatedComplaints = () => {
  const [form] = Form.useForm();

  const id = sessionStorage.getItem("patientId");
  const [emojiData, setEmojiData] = useState([
    {
      img: "/assets/emoji1.png",
      value: 0,
      message: "No Hurt",
      isChecked: false,
    },
    {
      img: "/assets/emoji2.png",
      value: 2,
      message: "Hurt Little Bit",
      isChecked: false,
    },
    {
      img: "/assets/emoji3.png",
      value: 4,
      message: "Hurt Little More",
      isChecked: false,
    },
    {
      img: "/assets/emoji4.png",
      value: 6,
      message: "Hurt Even More",
      isChecked: false,
    },
    {
      img: "/assets/emoji5.png",
      value: 8,
      message: "Hurt Whole Lot",
      isChecked: false,
    },
    {
      img: "/assets/emoji6.png",
      value: 10,
      message: "Hurt Worst",
      isChecked: false,
    },
  ]);

  const [datas, setDatas] = useState({
    patientId: id,
    enteredDate: Date.now,
    admissionReason: "",
    reactionName: "",
    since: { year: "", month: "", day: "" },
  });

  const handleCheckboxChange = (index: number) => {
    const updatedEmojiData = emojiData.map((item, i) => ({
      ...item,
      isChecked: i === index,
    }));

    setEmojiData(updatedEmojiData);
    setDatas((prev) => ({
      ...prev,
      reactionName: updatedEmojiData[index].message,
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
      await form.validateFields();
      await axios.post(`${api_url}/api/associated-complaints`, datas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.resetFields();

      setDatas({
        patientId: id,
        enteredDate: Date.now,
        admissionReason: "",
        reactionName: "",
        since: { year: "", month: "", day: "" },
      });
      setEmojiData((prevEmojiData) =>
        prevEmojiData.map((item) => ({
          ...item,
          isChecked: false,
        }))
      );

      message.success("Added Successfully!");
      await handleUpdate()
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleFormChange = (_changedValues: any, allValues: any) => {
    setDatas((prevState: any) => ({
      ...prevState,
      ...allValues,
      since: {
        ...prevState.since,
        year: allValues.year || prevState.since.year,
        month: allValues?.month || prevState.since.month,
        day: allValues.day || prevState.since.day,
      },
    }));
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
        `${api_url}/api/associated-complaints?patientId=${ids}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.data?.associatedComplaints.length > 0) {
        form.setFieldsValue(res?.data?.data?.associatedComplaints[0]);
        form.setFieldsValue(res?.data?.data?.associatedComplaints[0]?.since)
        let df = res?.data?.data?.associatedComplaints[0];
        setDatas({
          patientId: ids,
          enteredDate: Date.now,
          admissionReason: df?.admissionReason,
          reactionName: df?.reactionName,
          since: {
            year: df?.since?.year,
            month: df?.since?.month,
            day: df?.since?.day,
          },
        });
        if (
          df?.admissionReason ||
          df?.since?.year ||
          df?.since?.month ||
          df?.since?.day
        ) {
          setUpdateID(df?._id);
          setIsUpdate(true);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try{
      const token=localStorage.getItem("authToken")
      if(!token){
        localStorage.clear()
        message.error("Login required!")
        return
      }

      await axios.patch(`${api_url}/api/associated-complaints/getById/${updateId}`,datas,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      message.success("Updated successfully!")

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  };

  useEffect(() => {
    if (id) {
      getDetails(id);
    }
  }, [id]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <div className="d-flex justify-content-between align-items-center">
          <p className="emr-search-text">Associated Complaints</p>
          <p className="emr-search-text">QF/OP/F/01</p>
        </div>
        <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div>
                <Form.Item
                  label={<span className="emr-label">Reason</span>}
                  name="admissionReason"
                  rules={[{ message: "Please enter reason" }]}
                >
                  <Input
                    placeholder="Enter Reason"
                    style={{ width: "100%", height: 40 }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div>
                <div className="d-flex justify-content-around align-items-center">
                  <Form.Item
                    label={<span className="emr-label">Year</span>}
                    name="year"
                    rules={[{ message: "Please enter year" }]}
                  >
                    <Input
                      value={datas?.since?.year}
                      style={{ width: "100%", height: 40 }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div>
                <div className="d-flex justify-content-around align-items-center">
                  <Form.Item
                    label={<span className="emr-label">Month</span>}
                    name="month"
                    rules={[{ message: "Please enter month" }]}
                  >
                    <Input
                      value={datas?.since?.month}
                      style={{ width: "100%", height: 40 }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div>
                <div className="d-flex justify-content-around align-items-center">
                  <Form.Item
                    label={<span className="emr-label">Date</span>}
                    name="day"
                    rules={[{ message: "Please enter date" }]}
                  >
                    <Input
                      value={datas?.since?.day}
                      style={{ width: "100%", height: 40 }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-2">
            {emojiData.map((val: any, i: any) => (
              <div className="col-lg-2 col-md-2">
                <div className="text-center" key={i}>
                  <img
                    src={val.img}
                    alt="emoji"
                    className="img-fluid"
                    style={{ width: "75px" }}
                    loading="lazy"
                  />
                  <div className="emoji-position">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#595959",
                      }}
                    >
                      {val.value}
                    </p>
                    <p
                      className="mb-1"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#595959",
                      }}
                    >
                      {val.message}
                    </p>
                    {updateId&&datas.reactionName===val.message? <Form.Item name="reactionName">
                      <Checkbox
                        checked={true}
                        onChange={() => handleCheckboxChange(i)}
                      />
                    </Form.Item>:
                    <Form.Item name="reactionName">
                      <Checkbox
                        checked={val.isChecked}
                        onChange={() => handleCheckboxChange(i)}
                      />
                    </Form.Item>}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </Form>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        {updateId&&
        <Button className="c-btn me-3" onClick={()=>getDetails(id)}>Cancel</Button>}
        <Button
          className="s-btn "
          onClick={isUpdate ? handleUpdate : handleSave}
        >
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default AssociatedComplaints;
