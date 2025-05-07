import { Button, Col, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";

const PIAddproduct = () => {
  const navigate = useNavigate();

  return (
    <div className="cont">
          <div className=" ms-3 " style={{ marginTop: "90px" }}>
          <span className="" style={{ cursor: "pointer", fontSize: "18px" }} onClick={()=>navigate(-1)}>
            {" "}
            <i
              className="fi fi-br-angle-left "
              style={{ fontSize: "14px" }}
            ></i>
            Back{" "}
          </span>
        </div>
        <div className="emr-complaints-box mt-5 mx-3 rounded">
      <div>
        <p className="emr-search-text mb-0 p-3 pt-4">Add products</p>
      </div>
      <Row className="p-3" gutter={32}>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Batch No </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Minimum Stock </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Product Name </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
        <Col span={12} className="my-2">
          <div>
            <label className="emr-label mb-2">Actual Stock </label>
            <br />
            <Input style={{ height: "35px" }} />
          </div>
        </Col>
      </Row>
    </div>
    <div className="text-end my-4">

        <Button className="c-btn me-4">Cancel</Button>
        <Button className="s-btn me-3">Save</Button>
    </div>
      
    </div>
  )
}

export default PIAddproduct
