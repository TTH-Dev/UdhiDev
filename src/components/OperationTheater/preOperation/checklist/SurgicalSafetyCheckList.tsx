import { UploadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Checkbox,
  Button,
  Radio,
  RadioChangeEvent,
  Input,
  Upload,
} from "antd";
import { useState } from "react";

const SurgicalSafetyCheckList = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const onChange = (checkedValues: string[]) => {
    setCheckedItems(checkedValues);
  };
  const [alcohol, setAlcohol] = useState<string>("");

  const onRadioChange = (e: RadioChangeEvent) => {
    setAlcohol(e.target.value);
  };
  return (
    <>
      <div className="emr-complaints-box">
        <p className="emr-search-text mb-0 py-3 ps-3">
          Surgical Safety Check List
        </p>

        <Row>
          <Col span={8}>
            <div>
              <p className="emr-label ps-3"> Before Induction Of Anesthesia</p>
              <div className="ps-3">
                <div className="g-btn user-text ">Sign In</div>
              </div>
              <p className="emr-label ps-3 pt-3"> Operated eye</p>
              <div className="ps-3">
                <Checkbox.Group
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  onChange={onChange}
                  value={checkedItems}
                >
                  <Checkbox value="Identity Confirmed" className="check-grey">
                    Identity Confirmed
                  </Checkbox>
                  <Checkbox
                    value="Correct Site Identified"
                    className="check-grey"
                  >
                    Correct Site Identified
                  </Checkbox>
                  <Checkbox value="Procedure Verified" className="check-grey">
                    Procedure Verified
                  </Checkbox>
                  <Checkbox value="Consent Obtained" className="check-grey">
                    Consent Obtained
                  </Checkbox>
                  <Checkbox value="Surgical Site Marked" className="check-grey">
                    Surgical Site Marked
                  </Checkbox>
                  <Checkbox
                    value="Anesthesia Safety Check Completed"
                    className="check-grey"
                  >
                    Anesthesia Safety Check Completed
                  </Checkbox>
                  <Checkbox
                    value="Pulse Oximeter Applied and Functioning"
                    className="check-grey"
                  >
                    Pulse Oximeter Applied and Functioning
                  </Checkbox>
                </Checkbox.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3">
                  {" "}
                  Does Patient have a known allergy
                </p>
                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="Yes" className="check-grey">
                    Yes
                  </Radio>
                  <Radio value="No" className="check-grey">
                    No
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3">
                  {" "}
                  Difficult Airway / Aspiration Risk?
                </p>
                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="No" className="check-grey">
                    No
                  </Radio>
                  <Radio value="Yes" className="check-grey">
                    Yes & Equipment / Assistance Available
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                borderRight: " 1px solid #CFCFCF",
                borderLeft: " 1px solid #CFCFCF",
              }}
            >
              <p className="emr-label ps-3"> Before Skin Incision</p>
              <div className="ps-3">
                <div className="g-btn user-text ">Time Out</div>
              </div>
              <div className="ps-3 pt-3">
                <Checkbox.Group
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  onChange={onChange}
                  value={checkedItems}
                >
                  <Checkbox
                    value="Identity Confirmed"
                    className="check-grey align-top-cl"
                  >
                    <div>
                      Confirm all team members have introduced themself by name
                      and role Surgeon, Anesthesia professional & nurse verbally
                      confirm
                    </div>
                  </Checkbox>
                  <Checkbox value="Patient" className="check-grey">
                    Patient
                  </Checkbox>
                  <Checkbox value="Site" className="check-grey">
                    Site
                  </Checkbox>
                  <Checkbox value="Procedure" className="check-grey">
                    Procedure
                  </Checkbox>
                </Checkbox.Group>
              </div>
              <p className="emr-label ps-3 pt-3">Anticipated Critical events</p>
              <div className="ps-3">
                <Checkbox.Group
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  onChange={onChange}
                  value={checkedItems}
                >
                  <Checkbox
                    value="Identity Confirmed"
                    className="check-grey align-top-cl"
                  >
                    Surgeon Reviews: what are the critical or unexpected steps
                    operative duration, anticipated blood loss?
                  </Checkbox>
                  <Checkbox
                    value="Identity Confirmed"
                    className="check-grey align-top-cl"
                  >
                    Anesthesia team Reviews: Are there any patient- Specific
                    Concerns?
                  </Checkbox>
                  <Checkbox
                    value=" Nursing Team Review"
                    className="check-grey align-top-cl"
                  >
                    Nursing Team Review: Has Sterility (including indicator
                    results) Been Confirmed
                  </Checkbox>
                </Checkbox.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3">
                  {" "}
                  Has Antibiotic prophylaxis been given Within the last 60
                  minutes
                </p>
                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="Yes" className="check-grey">
                    Yes
                  </Radio>
                  <Radio value="No" className="check-grey">
                    Not Applicable
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3"> Is essential imaging Checked?</p>
                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="Yes" className="check-grey">
                    Yes
                  </Radio>
                  <Radio value="No" className="check-grey">
                    Not Applicable
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <p className="emr-label ps-3">
                {" "}
                Before Patient leaves operating room
              </p>
              <div className="ps-3">
                <div className="g-btn user-text ">Sign Out</div>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3 pt-3">
                  Nurse Verbally Confirms with the Team:The name of the
                  procedure recorded.
                </p>

                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="Yes" className="check-grey">
                    Yes
                  </Radio>
                  <Radio value="No" className="check-grey">
                    Not Applicable
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3 pt-3">
                  The Specimen is labeled (including Patient name ,op no.date,
                  Hospital name)
                </p>

                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="Yes" className="check-grey">
                    Yes
                  </Radio>
                  <Radio value="No" className="check-grey">
                    No
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ps-3 pt-3">
                  Whether there are any Equipment problems to be addessed
                </p>

                <Radio.Group onChange={onRadioChange} value={alcohol}>
                  <Radio value="Yes" className="check-grey">
                    Yes
                  </Radio>
                  <Radio value="No" className="check-grey">
                    No
                  </Radio>
                </Radio.Group>
              </div>

              <div className="ps-3 pt-3">
                <Checkbox.Group
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  onChange={onChange}
                  value={checkedItems}
                >
                  <Checkbox
                    value="Identity Confirmed"
                    className="check-grey align-top-cl"
                  >
                    <div>
                      Surgeon, Anesthesia Professional nurse review the key
                      concerns for recovery and management of this patient.
                    </div>
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="px-3 my-5">
            <div className="mb-3">
              <label  className="emr-label mb-2">Surgeons Name</label>
              <br />
              <Input style={{height:"35px"}} />
            </div>
            <div>
              <label className="emr-label mb-2">Surgeon Signature Document</label><br/>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
          <Col span={8} className="px-3 my-5">
            <div className="mb-3">
              <label  className="emr-label mb-2">Anesthetists Signature Document</label>
              <br />
              <Input style={{height:"35px"}} />
            </div>
            <div>
              <label className="emr-label mb-2">Nursing Staff Signature Document</label><br/>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
          <Col span={8} className="px-3 my-5">
            <div className="mb-3">
              <label  className="emr-label mb-2">Surgeons Name</label>
              <br />
              <Input style={{height:"35px"}} />
            </div>
            <div>
              <label className="emr-label mb-2">Surgeon Signature Document</label><br/>
              <Upload>
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

export default SurgicalSafetyCheckList;
