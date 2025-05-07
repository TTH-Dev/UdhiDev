import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, TimePicker, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";

const CatractSurgeryNotes = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };
  return (
    <div>
      <div className="emr-complaints-box mx-3 p-3 mt-5">
        <div className="d-flex justify-content-between">
          <div>
            <p className="emr-search-text mb-0 py-3">Cataract Surgery Notes</p>
          </div>
          <div className="p-3">
            <span>QF/0T/F/09</span>
          </div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item name="dos" label="DOS" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="diagnosis"
                label="Diagnosis"
                className="emr-label"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="operatedEye"
                label="Operated Eye"
                className="emr-label"
              >
                <Radio.Group>
                  <Radio value="od" style={{ color: "#595959" }}>
                    OD
                  </Radio>
                  <Radio value="os" style={{ color: "#595959" }}>
                    OS
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="IOLType" label="IOL Type" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="surgereon"
                label="Surgereon"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IOLPower"
                label="IOL Power"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="coSurgeon"
                label="Co Surgeon"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IOLSticker"
                label="IOL Sticker"
                className="emr-label"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="anaesthetist"
                label="Anaesthetist"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
            <Col span={12}>
              <Form.Item
                name="phacoTime"
                label="Phaco Time"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="EPT" label="EPT" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="surgeryInTime"
                label="Surgery In Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="SurgeryOutTime"
                label="Surgery Out Time"
                className="emr-label"
              >
                <TimePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="BSSBatchNo"
                label="B.S.S Batch No"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />{" "}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tryphanblueBatchNo"
                label="Tryphan blue Batch No"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />{" "}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="viscoBatchNo"
                label="Visco Batch No"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />{" "}
              </Form.Item>
            </Col>
          </Row>
          <div>
            <p className="emr-search-text mb-0 py-3">
              Anaesthetist Notes (Intraoperative)
            </p>
          </div>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                name="anaesthetistName"
                label="Anaesthetist Name"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <div>
                <p className="emr-search-text mb-0 py-3">IV Sedation</p>
              </div>
              <div className="d-flex ">
                <Col span={12}>
                  <Form.Item
                    name="InjMidazolam"
                    label="Inj.Midazolam"
                    className="emr-label"
                  >
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="InjFentanyl"
                    label="Inj.Fentanyl"
                    className="emr-label"
                  >
                    <Input style={{ height: "40px" }} />
                  </Form.Item>
                </Col>
              </div>
            </Col>

            <Col span={12}>
              <Form.Item name="CVS" label="CVS" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p>
                <strong>Note</strong> : Procedure done by local anaesthesia : 2%
                Licnocaine 3Ml + 0.5% Sensorcaine3Ml with Hynidase 25 units/Ml
              </p>
            </Col>
            <Col span={12}>
              <Form.Item name="BP" label="BP" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="oxygenSaturation"
                label="Oxygen Saturation"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="pulse" label="Pulse" className="emr-label">
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="anyAdverseEvents"
                label="Any Adverse Events"
                className="emr-label"
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="signature"
                label=" Signature Document (Anasthetist)"
                className="emr-label"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Form.Item>
          <Button className="c-btn me-4 my-4">Cancel</Button>
          <Button className="s-btn me-3" onClick={() => form.submit()}>
            Save
          </Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default CatractSurgeryNotes;
