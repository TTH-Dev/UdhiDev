import { Button, Input } from "antd"

const VitalChart = () => {
    const row=[{
        key:"Weight",
        value:"weight"
    },{
        key:"BP Systolic",
        value:"BP Systolic"
    },{
        key:"BP Diastolic",
        value:"BP Diastolic"
    },{
        key:"Hr",
        value:"Hr"
    },{
        key:"SPO2",
        value:"SPO2"
    },{
        key:"Temperature",
        value:"Temperature"
    },{
        key:"GRBS",
        value:"GRBS"
    },{
        key:"Notes",
        value:"Notes"
    },]
  return (
    <>
        <div className="row">
            {row.map((label:any,i:any)=>(
            <div className="col-lg-3 py-2" key={i}>
                <label className="pb-2" style={{fontSize:"16px",fontWeight:500,color:"#595959"}}>{label.key}</label><br />
                <Input style={{height:35}}/>
            </div>))}
        </div>
        <div className="d-flex justify-content-end save-cancel-btn mt-0 mb-3" style={{background:"#fff"}}>
        <Button className="c-btn me-3">Cancel</Button>
        <Button
          className="s-btn "
       
        >
        Save
        </Button>
      </div>
    </>
  )
}

export default VitalChart