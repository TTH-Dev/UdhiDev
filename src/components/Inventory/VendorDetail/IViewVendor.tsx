import { Button, message, Modal, Pagination, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { api_url } from "../../../Config";
import { useSearchParams } from "react-router-dom";
interface Vendor {
  id?: string;

  VendorName?: string;
  location?: string;
}

const IViewVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [vendor, setVendor] = useState<Vendor | null>(null);

  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isdelmodalopen, setIsDelModalOpen] = useState(false);
  const [deltext, setDelText] = useState<Vendor | null>(null);

  const pageSize = 10;
  const handledel = (record: any) => {
    setIsDelModalOpen(true);
    setDelText(record);
    console.log(record);
  };
  const handledelconfirm = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.delete(`${api_url}/api/pharmacy-vendor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 204) {
        message.success("Deleted Successfully");
        fetchData();
        setIsDelModalOpen(false);
      }
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/pharmacy-product/filter?vendorId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const vendor =
        res.data?.data?.products?.map((vendor: any) => ({
          itemCode: vendor.itemCode,
          productName: vendor.name,
          mrp: vendor.MRP,
        })) || [];

      setData(vendor);
      console.log("venddd", vendor);

      await getVendor();
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
    }
  };

  const getVendor = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/pharmacy-vendor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const vendorog = res.data?.data?.vendor;

      setVendor({
        VendorName: vendorog.vendorName,
        location: vendorog.location,
      });
    } catch (error: any) {
      console.error(error);
      message.error("Something went wrong while fetching product data!");
    }
  };

  const appointmentColumns = [
    {
      title: <span style={{ fontWeight: "400" }}>Sl.no</span>,

      dataIndex: "index",
      key: "index",
      render: (_text: any, _record: any, index: number) => (
        <>{(currentPage - 1) * pageSize + index + 1}</>
      ),
    },
    {
      title: <span style={{ fontWeight: "400" }}>Item Code</span>,

      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: <span style={{ fontWeight: "400" }}>Product Name</span>,

      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <span style={{ fontWeight: "400" }}>MRP</span>,

      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: <span style={{ fontWeight: "400" }}>Action</span>,

      key: "action",
      width: 130,
      render: (_: any, __: { itemCode: number }, record: any) => (
        <Button
          className="p-0 ms-1"
          style={{
            border: "none",
            width: "30px",
            height: "30px",
            color: "#fff",
            backgroundColor: "#3497F9",
          }}
          onClick={(e) => {
            e.stopPropagation();

            handledel(record);
          }}
        >
          <MdDeleteForever style={{ fontSize: "18px" }} />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cont mt-5 pt-5 ps-4">
      <div className="vendor-name-box p-4 rounded">
        <Row className="align-items-center justify-content-between">
          <Col xs={3} md={3} className="d-flex align-items-center gap-4">
            <img
              alt="Vendor"
              style={{ width: 75, height: 75, borderRadius: "50%" }}
              src="/assets/user.png"
            />
            <div>
              <span className="box-title">{vendor?.VendorName}</span>
              <br />
              <span className="emr-doc-id">{id?.slice(-5)}</span>
            </div>
          </Col>
          <Col xs={3} md={4} className="d-flex">
            <span className="box-title" style={{ width: "80px" }}>
              Location :{" "}
            </span>
            <span className="emr-doc-text-dd pt-1 px-2">
              {vendor?.location}{" "}
            </span>
          </Col>
          <Col xs={3} md={4} className="d-flex">
            <span className="box-title" style={{ width: "100px" }}>
              Vendor ID :{" "}
            </span>
            <span className="emr-doc-text-dd pt-1 px-2"> {id}</span>
          </Col>
        </Row>
      </div>

      <Table
        className="mt-4"
        columns={appointmentColumns}
        dataSource={data}
        pagination={false}
      />

      {data.length > 0 && (
        <div className="d-flex justify-content-end mt-4">
          <Pagination
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
      <Modal
        title="Delete ?"
        onCancel={() => setIsDelModalOpen(false)}
        onClose={() => setIsDelModalOpen(false)}
        open={isdelmodalopen}
        footer={
          <div className="d-flex justify-content-between">
            <Button className="c-btn" onClick={() => setIsDelModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="s-btn"
              onClick={() => handledelconfirm(deltext?.id ?? "Unknown Product")}
            >
              Delete
            </Button>
          </div>
        }
      >
        <>{deltext?.VendorName}</>
      </Modal>
    </div>
  );
};

export default IViewVendor;
