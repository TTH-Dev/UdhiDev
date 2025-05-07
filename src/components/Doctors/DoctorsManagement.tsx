import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Select,
} from "antd";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineReplay } from "react-icons/md";
import axios from "axios";
import { api_url } from "../../Config";

const { Meta } = Card;

const DoctorsManagement: React.FC = () => {
  const [applied, setIsApplied] = useState(false);

  const [ismodalopen, setIsModalOpen] = useState(false);

  const handleAddDoctor = () => {
    navigate("/doctors/doctors-management/add-doctor");
  };

  const handleapply = () => {
    getAllDoctor();
    setIsApplied(true);
    setIsModalOpen(false);
  };

  const [alldoctor, setAllDoctor] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [doctorName, setDoctorName] = useState<
    { label: string; value: string }[]
  >([]);
  const [doctorSpecialties, setDoctorSpecialties] = useState<
    { label: string; value: string }[]
  >([]);
  const [filterData, setFilterData] = useState({
    name: "",
    specs: "",
    number: "",
  });
  

  const getAllDoctor = async () => {
    const token = localStorage.getItem("authToken");
    if(!token){
      localStorage.clear()
      message.error("Login required!")
      return
    }
    try {
      const res = await axios.get(
        `${api_url}/api/doctor/filter?limit=${pageSize}&page=${currentPage}&doctorName=${filterData.name}&specialist=${filterData.specs}&phoneNo=${filterData.number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllDoctor(res.data.data.doctors);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const handledocdetailsnav = (id: any) => {
    navigate(`/doctors/doctors-management/doctors-details?id=${id}`);
  };

  const handleReset = async () => {
    setFilterData({
      name: "",
      specs: "",
      number: "",
    });
    await getAllDoctor();
  };

  const getDropDown = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(`${api_url}/api/doctor/d-menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dropdownDoctor = res.data.data.dmMenu.map((val: any) => ({
        label: val.label,
        value: val.value,
      }));
      const dropdownSpecialties = res.data.data.dmMenu.map((val: any) => ({
        label: val.specialties,
        value: val.specialties,
      }));

      setDoctorName(dropdownDoctor);
      setDoctorSpecialties(dropdownSpecialties);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDropDown();
  }, []);

  useEffect(() => {
    getAllDoctor();
  }, [currentPage]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4 ms-3">
        <div className="d-flex justify-content-between my-3">
          <div>
            <p className="emr-search-text">Doctors Management</p>
          </div>
          <div className="d-flex ">
            <Button
              className="doc-fil-btn mt-1"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaFilter />
              Filter{" "}
            </Button>
            <Button
              className="doc-fil-btn mx-2 mt-1"
              onClick={handleReset}
              style={{ display: applied ? "block" : "none" }}
            >
              <MdOutlineReplay />
            </Button>

            <Button className="s-btn ms-2" onClick={handleAddDoctor}>
              Add
            </Button>
            <Modal
              modalRender={(modal) => <div>{modal}</div>}
              width={"28rem"}
              title={"Filter"}
              open={ismodalopen}
              onCancel={() => {
                setIsModalOpen(false);
              }}
              footer={
                <div>
                  <div className="d-flex justify-content-between  my-4">
                    <Button className="c-btn me-3">Cancel</Button>
                    <Button className="s-btn " onClick={handleapply}>
                      Apply
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="mt-3">
                <label className="mod-label mb-2">Doctor Name</label>
                <br />
                <Select
                  placeholder="Select an option"
                  style={{ width: "400px", borderRadius: "2px" }}
                  className="custom-select-doc"
                  options={doctorName}
                  onChange={(value) =>
                    setFilterData({ ...filterData, name: value })
                  }
                />

                <br />
                <label className="mod-label mb-2">Specailities</label>
                <br />
                <Select
                  placeholder="Select an option"
                  style={{ width: "400px", borderRadius: "2px" }}
                  className="custom-select-doc"
                  options={doctorSpecialties}
                  onChange={(value) =>
                    setFilterData({ ...filterData, specs: value })
                  }
                />

                <br />

                <label className="mod-label mb-2">Phone Number</label>
                <Input
                  style={{ borderRadius: "3px" }}
                  onChange={(e) =>
                    setFilterData({ ...filterData, number: e.target.value })
                  }
                />
              </div>
            </Modal>
          </div>
        </div>
        <div className="">
          <Row gutter={[16, 16]} justify="start">
            {alldoctor.map((item: any, index: any) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className="doc-card"
                  onClick={() => handledocdetailsnav(item._id)}
                  hoverable
                  style={{ width: "100%", height: "auto" }}
                  cover={
                    <img
                      alt={"img"}
                      src={`${api_url}/public/images/${item?.doctorImage}`}
                      className="text-center doc-card-img mt-5"
                    />
                  }
                >
                  <Meta
                    className="text-center"
                    title={
                      <span className=" box-title">{item?.doctorName}</span>
                    }
                    description={
                      <span className="doc-card-title">{item?.phoneNo}</span>
                    }
                  />
                  <div className="text-center mt-3">
                    <Button className="cardio-btn">
                      {item?.specialist.toLocaleUpperCase()}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination Component */}
          <div className="d-flex justify-content-end mt-4">
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsManagement;
