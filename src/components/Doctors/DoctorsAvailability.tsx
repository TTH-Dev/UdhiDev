import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Modal, Select, Button, message, Pagination } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdEdit, MdOutlineReplay } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";

const DOctorsAvailablity: React.FC = () => {
  const [applied, setIsApplied] = useState(false);

  const [ismodalopen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    navigate("/doctors/doctors-availability/add-timing");
  };



  const handleapply = () => {
    setIsApplied(true);
    setIsModalOpen(false);
    getAllDoctor()
  };

  const [alldoctor, setAllDoctor] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
  const pageSize = 10;

  const getAllDoctor = async () => {
    const token = localStorage.getItem("authToken");
    if(!token){
      localStorage.clear()
      message.error("Login required!")
      return
    }
    try {
      const res = await axios.get(
        `${api_url}/api/doctor/filter?limit=${pageSize}&page=${currentPage}&doctorName=${filterData.name}&specialist=${filterData.specs}`,
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
    <div
      className="cont-da p-2 mx-3 rounded mb-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-between my-3">
        <div>
          <p className="emr-search-text p-3">Doctors Availability</p>
        </div>
        <div className="d-flex  p-3 ">
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
            className="doc-fil-btn mt-1 mx-2"
            style={{ display: applied ? "block" : "none" }}
            onClick={handleReset}
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
                value={filterData.name}
                onChange={(value)=>setFilterData({...filterData,name:value})}
              />

              <br />
              <label className="mod-label mb-2">Specailities</label>
              <br />
              <Select
                placeholder="Select an option"
                style={{ width: "400px", borderRadius: "2px" }}
                className="custom-select-doc"
                options={doctorSpecialties}
                value={filterData.specs}
                onChange={(value)=>setFilterData({...filterData,specs:value})}
              />
            </div>
          </Modal>
        </div>
      </div>
      <div className="mb-5 mx-3">
        <TableContainer
          component={Paper}
          elevation={0}
          className="doc-avail-tabl"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="emr-label">Doctor Name</TableCell>
                <TableCell className="emr-label">Specialty</TableCell>
                <TableCell className="emr-label">Availability Days</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alldoctor.map((doctor: any, index: any) => (
                <TableRow key={index}>
                  <TableCell className="emr-pat-text-dd">
                    {doctor?.doctorName}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {doctor?.specialist}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {doctor?.availabilityDays.length} days
                  </TableCell>
                  <TableCell>
                    <Link to={`/doctors/doctors-availability/edit-timing?id=${doctor?._id}`}>
                    <Button
                      style={{ backgroundColor: "#3497F9", color: "white" }}
                     
                    >
                      <MdEdit />
                    </Button></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
  );
};

export default DOctorsAvailablity;
