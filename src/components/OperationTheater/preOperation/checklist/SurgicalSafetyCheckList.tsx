import { UploadOutlined } from "@ant-design/icons";
import { Row, Col, Checkbox, Button, Radio, Input, Upload } from "antd";
import { useState } from "react";

const SurgicalSafetyCheckList = () => {
  const [postData, setPostData] = useState({
    anesthesia: {
      operatedEye: {
        IDENTITY: false,
        Site: false,
        Procedure: false,
        Consent: false,
        SiteMarked: false,
        AnesthesiaSafetyCheckCompleted: false,
      },
      knownAllergy: false,
      airwayAspriationRisk: false,
      SurgeonsName: "",
      SurgeonSignatureDocument: "",
    },
    beforeSkinIncision: {
      first: {
        conformAllTeam: false,
        Patient: false,
        Site: false,
        Procedure: false,
      },
      AnticipatedCriticalevents: {
        surgeonReview: false,
        anesthesiaReviewTeam: false,
        nursingTeam: false,
      },
      antibioticProphylaxis: false,
      imagingChecked: false,
      AnesthetistName: "",
      AnesthetistsSignatureDocument: "",
    },
    beforePatient: {
      nurseVerbally: false,
      specimen: false,
      equipmentproblems: false,
      managmentofthisPatient: false,
      NursingstaffName: "",
      NursingStaffSignatureDocument: "",
    },
  });


    const res=async()=>{
      
    }

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
                <Checkbox
                  checked={postData?.anesthesia?.operatedEye?.IDENTITY}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        operatedEye: {
                          ...postData?.anesthesia?.operatedEye,
                          IDENTITY: e.target.checked,
                        },
                      },
                    })
                  }
                  className="check-grey"
                >
                  IDENTITY
                </Checkbox>
                <br />

                <Checkbox
                  checked={postData?.anesthesia?.operatedEye?.Site}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        operatedEye: {
                          ...postData?.anesthesia?.operatedEye,
                          Site: e.target.checked,
                        },
                      },
                    })
                  }
                  className="check-grey"
                >
                  Site
                </Checkbox>
                <br />

                <Checkbox
                  checked={postData?.anesthesia?.operatedEye?.Procedure}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        operatedEye: {
                          ...postData?.anesthesia?.operatedEye,
                          Procedure: e.target.checked,
                        },
                      },
                    })
                  }
                  className="check-grey"
                >
                  Procedure
                </Checkbox>
                <br />

                <Checkbox
                  checked={postData?.anesthesia?.operatedEye?.Consent}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        operatedEye: {
                          ...postData.anesthesia?.operatedEye,
                          Consent: e.target.checked,
                        },
                      },
                    })
                  }
                  className="check-grey"
                >
                  Consent
                </Checkbox>
                <br />

                <Checkbox
                  checked={postData?.anesthesia?.operatedEye?.SiteMarked}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        operatedEye: {
                          ...postData?.anesthesia?.operatedEye,
                          SiteMarked: e.target.checked,
                        },
                      },
                    })
                  }
                  className="check-grey"
                >
                  Site Marked
                </Checkbox>
                <br />

                <Checkbox
                  checked={
                    postData?.anesthesia?.operatedEye
                      ?.AnesthesiaSafetyCheckCompleted
                  }
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        operatedEye: {
                          ...postData?.anesthesia?.operatedEye,
                          AnesthesiaSafetyCheckCompleted: e.target.checked,
                        },
                      },
                    })
                  }
                  className="check-grey"
                >
                  Anesthesia Safety Check Completed
                </Checkbox>
              </div>

              <div className="ps-3 mt-4">
                <p className="emr-label"> Does Patient have a known allergy</p>
                <Radio.Group
                  value={postData?.anesthesia?.knownAllergy}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        knownAllergy: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={true} className="check-grey">
                    Yes
                  </Radio>
                  <Radio value={false} className="check-grey">
                    No
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label">
                  {" "}
                  Difficult Airway / Aspiration Risk?
                </p>
                <Radio.Group
                  value={postData?.anesthesia?.airwayAspriationRisk}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      anesthesia: {
                        ...postData?.anesthesia,
                        airwayAspriationRisk: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={false} className="check-grey">
                    No
                  </Radio>
                  <Radio value={true} className="check-grey">
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
                <Checkbox
                  className="check-grey align-top-cl"
                  checked={postData?.beforeSkinIncision?.first?.conformAllTeam}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        first: {
                          ...postData?.beforeSkinIncision?.first,
                          conformAllTeam: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  <div>
                    Confirm all team members have introduced themself by name
                    and role Surgeon, Anesthesia professional & nurse verbally
                    confirm
                  </div>
                </Checkbox>
                <br />
                <Checkbox
                  className="check-grey"
                  checked={postData?.beforeSkinIncision?.first?.Patient}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        first: {
                          ...postData?.beforeSkinIncision?.first,
                          Patient: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  Patient
                </Checkbox>
                <br />
                <Checkbox
                  className="check-grey"
                  checked={postData?.beforeSkinIncision?.first?.Site}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        first: {
                          ...postData?.beforeSkinIncision?.first,
                          Site: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  Site
                </Checkbox>
                <br />
                <Checkbox
                  className="check-grey"
                  checked={postData?.beforeSkinIncision?.first?.Procedure}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        first: {
                          ...postData?.beforeSkinIncision?.first,
                          Procedure: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  Procedure
                </Checkbox>
              </div>
              <p className="emr-label ps-3 pt-3">Anticipated Critical events</p>
              <div className="ps-3">
                <Checkbox
                  className="check-grey align-top-cl"
                  checked={
                    postData?.beforeSkinIncision?.AnticipatedCriticalevents
                      ?.surgeonReview
                  }
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        AnticipatedCriticalevents: {
                          ...postData?.beforeSkinIncision
                            ?.AnticipatedCriticalevents,
                          surgeonReview: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  Surgeon Reviews: what are the critical or unexpected steps
                  operative duration, anticipated blood loss?
                </Checkbox>
                <br />
                <Checkbox
                  className="check-grey align-top-cl"
                  checked={
                    postData?.beforeSkinIncision?.AnticipatedCriticalevents
                      ?.anesthesiaReviewTeam
                  }
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        AnticipatedCriticalevents: {
                          ...postData?.beforeSkinIncision
                            ?.AnticipatedCriticalevents,
                          anesthesiaReviewTeam: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  Anesthesia team Reviews: Are there any patient- Specific
                  Concerns?
                </Checkbox>
                <br />
                <Checkbox
                  className="check-grey align-top-cl"
                  checked={
                    postData?.beforeSkinIncision?.AnticipatedCriticalevents
                      ?.nursingTeam
                  }
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        AnticipatedCriticalevents: {
                          ...postData?.beforeSkinIncision
                            ?.AnticipatedCriticalevents,
                          nursingTeam: e.target.checked,
                        },
                      },
                    })
                  }
                >
                  Nursing Team Review: Has Sterility (including indicator
                  results) Been Confirmed
                </Checkbox>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label ">
                  {" "}
                  Has Antibiotic prophylaxis been given Within the last 60
                  minutes
                </p>
                <Radio.Group
                  value={postData?.beforeSkinIncision?.antibioticProphylaxis}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        antibioticProphylaxis: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={true} className="check-grey">
                    Yes
                  </Radio>
                  <Radio value={false} className="check-grey">
                    Not Applicable
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label"> Is essential imaging Checked?</p>
                <Radio.Group
                  value={postData?.beforeSkinIncision?.imagingChecked}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforeSkinIncision: {
                        ...postData?.beforeSkinIncision,
                        imagingChecked: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={true} className="check-grey">
                    Yes
                  </Radio>
                  <Radio value={false} className="check-grey">
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
                <p className="emr-label pt-3">
                  Nurse Verbally Confirms with the Team:The name of the
                  procedure recorded.
                </p>

                <Radio.Group
                  value={postData?.beforePatient?.nurseVerbally}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforePatient: {
                        ...postData?.beforePatient,
                        nurseVerbally: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={true} className="check-grey">
                    Yes
                  </Radio>
                  <Radio value={false} className="check-grey">
                    Not Applicable
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label pt-3">
                  The Specimen is labeled (including Patient name ,op no.date,
                  Hospital name)
                </p>

                <Radio.Group
                  value={postData?.beforePatient?.specimen}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforePatient: {
                        ...postData?.beforePatient,
                        specimen: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={true} className="check-grey">
                    Yes
                  </Radio>
                  <Radio value={false} className="check-grey">
                    No
                  </Radio>
                </Radio.Group>
              </div>
              <div className="ps-3 mt-4">
                <p className="emr-label pt-3">
                  Whether there are any Equipment problems to be addessed
                </p>

                <Radio.Group
                  value={postData?.beforePatient?.equipmentproblems}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforePatient: {
                        ...postData?.beforePatient,
                        equipmentproblems: e.target.value,
                      },
                    })
                  }
                >
                  <Radio value={true} className="check-grey">
                    Yes
                  </Radio>
                  <Radio value={false} className="check-grey">
                    No
                  </Radio>
                </Radio.Group>
              </div>

              <div className="ps-3 pt-3">
                <Checkbox
                  className="check-grey align-top-cl"
                  value={postData?.beforePatient?.managmentofthisPatient}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      beforePatient: {
                        ...postData?.beforePatient,
                        managmentofthisPatient: e.target.checked,
                      },
                    })
                  }
                >
                  <div>
                    Surgeon, Anesthesia Professional nurse review the key
                    concerns for recovery and management of this patient.
                  </div>
                </Checkbox>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="px-3 my-5">
            <div className="mb-3">
              <label className="emr-label mb-2">Surgeons Name</label>
              <br />
              <Input
                style={{ height: "35px" }}
                value={postData?.anesthesia?.SurgeonsName}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    anesthesia: {
                      ...postData?.anesthesia,
                      SurgeonsName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="emr-label mb-2">
                Surgeon Signature Document
              </label>
              <br />
              <Upload
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  reader.onload = () => {
                    setPostData((prevData: any) => ({
                      ...prevData,
                      anesthesia: {
                        ...prevData.anesthesia,
                        SurgeonSignatureDocument: reader.result,
                      },
                    }));
                  };

                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
          <Col span={8} className="px-3 my-5">
            <div className="mb-3">
              <label className="emr-label mb-2">
                Anesthetists Signature Document
              </label>
              <br />
              <Input
                style={{ height: "35px" }}
                value={postData?.beforeSkinIncision?.AnesthetistName}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    beforeSkinIncision: {
                      ...postData?.beforeSkinIncision,
                      AnesthetistName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="emr-label mb-2">
                Nursing Staff Signature Document
              </label>
              <br />
              <Upload
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  reader.onload = () => {
                    setPostData((prevData: any) => ({
                      ...prevData,
                      beforeSkinIncision: {
                        ...prevData.beforeSkinIncision,
                        AnesthetistsSignatureDocument: reader.result,
                      },
                    }));
                  };

                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
          <Col span={8} className="px-3 my-5">
            <div className="mb-3">
              <label className="emr-label mb-2">Nursing staff Name</label>
              <br />
              <Input
                style={{ height: "35px" }}
                value={postData?.beforePatient?.NursingstaffName}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    beforePatient: {
                      ...postData?.beforePatient,
                      NursingstaffName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="emr-label mb-2">
                Surgeon Signature Document
              </label>
              <br />
              <Upload
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  reader.onload = () => {
                    setPostData((prevData: any) => ({
                      ...prevData,
                      beforePatient: {
                        ...prevData.beforePatient,
                        NursingStaffSignatureDocument: reader.result,
                      },
                    }));
                  };

                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
        </Row>
      </div>
      <div className="text-end  my-4">
        <Button className="c-btn me-5">Cancel</Button>
        <Button className="s-btn me-3">Save</Button>
      </div>
    </>
  );
};

export default SurgicalSafetyCheckList;
