import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';



const PreAnestheticFitness: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <>
    
    <div className='emr-complaints-box mx-3 p-3'>
        <div className='d-flex justify-content-between'>

            <div>
            <p className="emr-search-text mb-0 py-3">Pre Anesthetist Fitness</p>

            </div>
            <div className='p-3'>
                <span>QF/0T/F/09</span>
            </div>
        </div>



    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item name="presentComplaint" label="Present Complaint" className='emr-label'>
           <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cvs" label="CVS" className='emr-label'>
            <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="pastIllness" label="Past Illness" className='emr-label'>
           <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="rs" label="RS" className='emr-label'>
            <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="presentMedication" label="Present Medication" className='emr-label'>
            <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
         
        <Col span={12}>
          <Form.Item name="bp" label="BP" className='emr-label'>
            <Input style={{height:"40px"}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="presentInvestigation" label="Present Investigation" className='emr-label'>
            <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
     
      
   
    
        <Col span={12}>
          <Form.Item name="pulse" label="Pulse" className='emr-label'>
            <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
      
        <Col span={12}>
       
        </Col>
        <Col span={12}>
          <Form.Item name="ecg" label="ECG" className='emr-label'>
            <Input style={{height:"40px"}}/>
          </Form.Item>
        </Col>
      
       
       <Col span={8}>
       <Input style={{height:"40px"}}/>

       </Col>
     
       <Col span={8}>
       <span className=''>Examined by me She/He is fit to undergo</span>
       </Col>
     
       <Col span={8}>
       <Input style={{height:"40px"}}/>

       </Col>
     
       
     
      </Row>

   

    </Form>
   
    </div>
    <div className='text-end'>

<Form.Item>
    <Button className='c-btn me-4 my-4'>
    Cancel
    </Button>
    <Button className='s-btn me-3' onClick={() => form.submit()}>
    Save
    </Button>
  </Form.Item>
</div>
    </>



  );
};

export default PreAnestheticFitness;
