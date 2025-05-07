import { TableCell, TableRow } from "@mui/material";
import { Button, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../Config";

const AddProduct = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState({
    productName: "",
    productRate: 0,
    purchaseTax1: 0,
    purchaseTax2: 0,
    purchaseTax3: 0,
    purchaseTax4: 0,
    purchaseAccount: "",
    itemCode: "",
    mrp: 0,
    orderQuantity: 0,
    productQuantity: 0,
    manufacturerName: "",
    note: "",
    hsnCode: "",
    units: "",
    productType: "",
    minimumTax: "",
    collectionCategory: "",
    status: "",
    purchaseReturnAccount: "",
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.post(`${api_url}/api/product`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/laboratory/products");
      message.success("Added Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      await axios.patch(`${api_url}/api/product/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/laboratory/products");
      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const getProduct = async (ids: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/product/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data.product);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [dropVendor,setDropVendor]=useState([])

  const getVendor=async()=>{
    try{
      const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }

    const res=await axios.get(`${api_url}/api/vendor/dm-menu`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    console.log(res.data.data.data,"resres");
    let ghf=res.data.data.data.map((val:any)=>({
      label:val.vendorName,
      value:val.vendorName
    }))
    setDropVendor(ghf)

    }catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  useEffect(()=>{
    getVendor()
  },[])

  return (
    <>
      <div className="cont">
        <div className="back-box-doc mt-5 ms-3">
          <p className="back pt-5 pb-3" style={{ color: "#414141" }}>
            <Link
              to="/laboratory/products"
              style={{ color: "#414141", textDecoration: "none" }}
            >
              <i
                className="fi fi-br-angle-left"
                style={{ cursor: "pointer" }}
              ></i>
              <span
                className="ms-2"
                style={{
                  zIndex: "99",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "0",
                  color: "#414141",
                  cursor: "pointer",
                }}
              >
                Back
              </span>
            </Link>
          </p>
        </div>
        <div
          className="act-cont-c   ms-4"
          style={{ marginBottom: "10px", color: "#595959" }}
        >
          <Container fluid className="emr-doc-box py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="emr-search-text mb-0">
                  {id ? "Edit" : "Add New"} Product
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Name</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.productName}
                        onChange={(e) =>
                          setData({ ...data, productName: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Rate</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        type="number"
                        value={data.productRate || ""}
                        onChange={(value: any) =>
                          setData({ ...data, productRate: value })
                        }
                        className="me-1"
                        style={{ width: "100px", height: 35 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Tax- 1
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                      type="number"
                        style={{ height: 35, width: "100px" }}
                        value={data.purchaseTax1||""}
                        onChange={(value:any) =>
                          setData({ ...data, purchaseTax1: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Tax- 2
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                      type="number"
                        style={{ height: 35, width: "100px" }}
                        value={data.purchaseTax2||""}
                        onChange={(value:any) =>
                          setData({ ...data, purchaseTax2: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Tax- 3
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                      type="number"
                        style={{ height: 35, width: "100px" }}
                        value={data.purchaseTax3||""}
                        onChange={(value:any) =>
                          setData({ ...data, purchaseTax3: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Tax- 4
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                      type="number"
                        style={{ height: 35, width: "100px" }}
                        value={data.purchaseTax4||""}
                        onChange={(value:any) =>
                          setData({ ...data, purchaseTax4: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Account
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.purchaseAccount}
                        onChange={(e) =>
                          setData({ ...data, purchaseAccount: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Item Code</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.itemCode}
                        onChange={(e) =>
                          setData({ ...data, itemCode: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Mrp</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        type="number"
                        style={{ width: "100px", height: 35 }}
                        value={data.mrp || ""}
                        onChange={(value: any) =>
                          setData({ ...data, mrp: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Order Quantity
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        type="number"
                        style={{ height: 35, width: "100px" }}
                        value={data.orderQuantity || ""}
                        onChange={(value: any) =>
                          setData({ ...data, orderQuantity: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Product Quantity
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <InputNumber
                        type="number"
                        style={{ height: 35, width: "100px" }}
                        value={data.productQuantity || ""}
                        onChange={(value: any) =>
                          setData({ ...data, productQuantity: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Manufacturer Name
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Select
                      showSearch
                        style={{ height: 35, width: "100px" }}
                        value={data.manufacturerName}
                        options={dropVendor}
                        onChange={(value) =>
                          setData({ ...data, manufacturerName: value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Note</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <TextArea
                        style={{ width: "140px" }}
                        value={data.note}
                        onChange={(e) =>
                          setData({ ...data, note: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>HSN Code</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.hsnCode}
                        onChange={(e) =>
                          setData({ ...data, hsnCode: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Units</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ width: "100px", height: 35 }}
                        value={data.units}
                        onChange={(e) =>
                          setData({ ...data, units: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Type</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.productType}
                        onChange={(e) =>
                          setData({ ...data, productType: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Minimum Tax
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.minimumTax}
                        onChange={(e) =>
                          setData({ ...data, minimumTax: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Collection Category
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ height: 35, width: "100px" }}
                        value={data.collectionCategory}
                        onChange={(e) =>
                          setData({
                            ...data,
                            collectionCategory: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>Status</TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ width: "100px", height: 35 }}
                        value={data.status}
                        onChange={(e) =>
                          setData({ ...data, status: e.target.value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: "none" }}>
                      Purchase Return Account
                    </TableCell>
                    <TableCell style={{ border: "none" }}>
                      <Input
                        style={{ width: "100px", height: 35 }}
                        value={data.purchaseReturnAccount}
                        onChange={(e) =>
                          setData({
                            ...data,
                            purchaseReturnAccount: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="d-flex justify-content-end save-cancel-btn pb-4">
          <Button className="s-btn" onClick={id ? handleUpdate : handleSave}>
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
