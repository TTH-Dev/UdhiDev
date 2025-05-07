import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";

const labelStyle = {
    flex: 1,
    fontSize:"16px",
    fontWeight:"500",
    color:"#595959"
  };
  
  const inputStyle = {
    width: '100px',
    height:"35px"
   
  };

const AnesthetistsNotes = () => {
  return (
    <>
      <div className="emr-complaints-box mx-3">
        <p className="emr-label ps-3 pt-3"> Anesthetist Notes (Post Operative)</p>
        <Row gutter={32} className="px-3">
          <Col span={12}>
            <label className="emr-label my-2">Conscious level</label>
            <Input style={{ height: "35px" }} />
          </Col>
          <Col span={12} className="">
          <div className="d-flex">

            <div>

            <Col span={24} className="ps-0">
              <label className="emr-label my-2 ">BP</label>
              <Input style={{ height: "35px" }} />
            </Col>
            </div>
            <div>
            <Col span={24}>
              <label className="emr-label my-2">Pulse</label>
              <Input style={{ height: "35px" ,width:"100%" }} />
            </Col>

            </div>
          </div>
            
           
          </Col>
          <Col span={12}>
            <label className="emr-label my-2">Oxygen Saturation</label>
            <Input style={{ height: "35px" }} />
          </Col>
          <Col span={12} >
            <label className="emr-label my-2">Remark</label>
            <TextArea rows={4}  />
          </Col>
          <Col span={12} style={{marginTop:"-65px"}}>
            <label className="emr-label my-2">CVS</label>
            <Input style={{ height: "35px" }} />
          </Col>
          <Col span={12}></Col>
          <Col span={12} >
            <label className="emr-label my-2">Date</label><br/>
            <DatePicker style={{ height: "35px",width:"100%" }} />
          </Col>
          <Col span={12} >
            <label className="emr-label my-2">RS</label>
            <Input style={{ height: "35px" }} />
          </Col>
        </Row>
        <div className="ps-3 my-3">
              <label className="emr-label mb-2">Surgeon Signature Document</label><br/>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>

            <Row gutter={32}>
                
                <Col span={12}>
        <p className="emr-label ps-3 my-4"> Respiration</p>

                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>2=Able to take  deep breath and cough</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>1= Dyspnea / Shallow breathing</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>0= Apnea</label>
                <Input style={inputStyle}/>

                </div>
        <p className="emr-label ps-3 my-4"> O2 Saturation</p>

             
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>2= Maintains &gt;92% on room air</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>1= Needs O2 inhalation to maintain O2 Saturation &gt; 90%</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>0= Saturation &lt; 90% even with supermental Oxygen</label>
                <Input style={inputStyle}/>

                </div>
        <p className="emr-label ps-3 my-4"> Consciousness</p>

                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>2=Full Awake</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>1= Arousable on calling</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>0=Not Responding</label>
                <Input style={inputStyle}/>

                </div>
              <div className="px-3">
                <label className="emr-label mb-2">Date</label><br/>
                <DatePicker style={{width:"100%",height:"35px"}}/>
              </div>
                
                </Col>
                <Col span={12}>
        <p className="emr-label ps-3 my-4"> Circulation</p>

                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>2= BP + 20mm HG pre OP</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>1= BP + 20 - 50mm HG pre OP</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>0= BP + 50mm HF pre OP</label>
                <Input style={inputStyle}/>

                </div>
             
        <p className="emr-label ps-3 my-4"> Activity</p>

             
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>2=Able to move 4 extremities</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>1= Able to move 2 extremities</label>
                <Input style={inputStyle}/>

                </div>
                <div className="d-flex justify-content-between ps-3 my-3">
                <label style={labelStyle}>0= Able to move 0 extremities</label>
                <Input style={inputStyle}/>

                </div>
                <div style={{border:"1px solid #D1D1D1"}} className="m-3 p-2 rounded ">


                    <p className="emr-label">
                    The total  score is 10 . Patient scoring  ≥8 ( and / ore are returned to similar pre op status ) are considered  fit for transfer from recovery room to wards.
                    </p>
                </div>
                <div style={{marginTop:"85px"}}>
              <label className="emr-label mb-2 mt-5 px-3">Signature Document</label><br/>
              <Upload className="px-3">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
    
               
            
                
                </Col>
            </Row>
            
      </div>
      <div className="text-end  my-4">
        <Button className="c-btn me-5">
            Cancel
        </Button>
        <Button className="s-btn me-3">
            Save
        </Button>
      </div>
    </>
  );
};

export default AnesthetistsNotes;
