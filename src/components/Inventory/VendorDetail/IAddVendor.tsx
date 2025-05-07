import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Container } from "react-bootstrap";
import { Button, Checkbox, Input, InputNumber, message, Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../../Config";
import axios from "axios";

const IAddVendor = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: "",
    bankIFSCCode: "",
    location: "",
    purchaseLimit: 0, 
    deliveryDay: "",
    bankAccountNumber: "",
    paymentType: "",
    daysToDeliver: 0, 
    GSTNo: "",
    taxType: "",
    bankName: "",
    creditPeriod: 0, 
    status: "",
    hospital: "",
    stockAdjustment: false, 
  });
  
  const handleUpdate = async () => {
    try {
     

      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.patch(
        `${api_url}/api/pharmacy-vendor/${id}`,
      formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201 || res.status === 200) {
        message.success("Vendor Updated successfully!");
        navigate(-1);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to Edit vendor. Please try again.");
      return
    }
  };
  const handleSubmit = async () => {
    try {
     

      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.post(
        `${api_url}/api/pharmacy-vendor`,
      formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201 || res.status === 200) {
        message.success("Product added successfully!");
        navigate(-1);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add product. Please try again.");
      return
    }
  };
  const handleRetrieve = async () => {
    try {
    

      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/pharmacy-vendor/${id}`,
     
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (res.status === 200) {
    
        setFormData(res.data.data.vendor);

      }
    
  

    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error("Failed to add vendor. Please try again.");
      return
    }
  };

useEffect(()=>{
  if(id){
    handleRetrieve()

  }
},[id])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      stockAdjustment: e.target.checked,
    }));
  };


  return (
    <div className="cont pt-5 my-5 px-4">
      <form onSubmit={handleSubmit}>
        <Container fluid className="emr-doc-box py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
              <i className="fi fi-br-angle-left px-1"></i>
              <span className="emr-search-text mb-0">  {id?"Edit":"Edit"} Vendor</span>
            </div>
          </div>

          <div className="row">
            {/* Column 1 */}
            <div className="col-lg-4 col-md-6">
              <TableRow >
                <TableCell style={{border:"none",width:"140px"}}>Vendor Name</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="vendorName" value={formData.vendorName} onChange={handleChange} />
                </TableCell>
              </TableRow>

              <TableRow >
                <TableCell style={{border:"none",width:"140px"}}>Bank IFSC Code</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="bankIFSCCode" value={formData.bankIFSCCode} onChange={handleChange} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Location</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="location" value={formData.location} onChange={handleChange} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Purchase Limit</TableCell>
                <TableCell style={{border:"none"}}>
                  <InputNumber style={{width:"100%"}} type="number" name="purchaseLimit" value={formData.purchaseLimit||""} onChange={(value:any)=>setFormData({...formData,purchaseLimit:value})} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Delivery Day</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="deliveryDay" value={formData.deliveryDay} onChange={handleChange} />
                </TableCell>
              </TableRow>
            </div>

            {/* Column 2 */}
            <div className="col-lg-4 col-md-6">
            

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Bank Account Number</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Payment Type</TableCell>
                <TableCell style={{border:"none"}}>
                  <Select style={{width:"100%"}} options={[{
                    label:"Cash",
                    value:"Cash"
                  },
                  {
                    label:"Online",
                    value:"Online"
                  },
                  {
                    label:"Credit",
                    value:"Credit"
                  }]} value={formData.paymentType} onChange={(value)=>setFormData({...formData,paymentType:value})} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Days to Deliver</TableCell>
                <TableCell style={{border:"none"}}>
                  <InputNumber type="number" style={{width:"100%"}} name="daysToDeliver" value={formData.daysToDeliver||""} 
                  onChange={(value:any)=>setFormData({...formData,daysToDeliver:value})} 
                   />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>GST No</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="GSTNo" value={formData.GSTNo} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Tax Type</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="taxType" value={formData.taxType} onChange={handleChange} />
                </TableCell>
              </TableRow>
            </div>

            {/* Column 3 */}
            <div className="col-lg-4 col-md-6">
             

           

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Bank Name</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="bankName" value={formData.bankName} onChange={handleChange} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Credit Period</TableCell>
                <TableCell style={{border:"none"}}>
                  <InputNumber style={{width:"100%"}} type="number" name="creditPeriod" value={formData.creditPeriod||""} 
                  onChange={(value:any)=>setFormData({...formData,creditPeriod:value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Status</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="status" value={formData.status} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Hospital</TableCell>
                <TableCell style={{border:"none"}}>
                  <Input name="hospital" value={formData.hospital} onChange={handleChange} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{border:"none",width:"140px"}}>Stock Adjustment</TableCell>
                <TableCell style={{border:"none"}}>
                  <Checkbox checked={formData.stockAdjustment} onChange={handleCheckboxChange} />
                </TableCell>
              </TableRow>
            </div>

          </div>
        </Container>
      </form>

      <div className="d-flex justify-content-end save-cancel-btn mt-4">
        <Button className="s-btn" onClick={ id?handleUpdate:handleSubmit}>
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default IAddVendor;
