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
import { Modal, Button, Select, Input, message, Pagination } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";
import { api_url } from "../../Config";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";

const NavPatientDetails: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const handleEditPatient = (id: number) => {
    navigate(`/out-patient/patient-details/details?id=${id}`);
  };

  const handleapply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await getDetails();
  };

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<any>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [filterValues, setFilterValue] = useState({
    type: "",
    uhid: "",
    number: "",
  });

  const getDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/patient/filter?page=${currentPage}&limit=${pageSize}&patientType=${filterValues.type}&UHIDId=${filterValues.uhid}&phoneNo=${filterValues.number}&date=${dayjs().format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res?.data?.data?.patients);
      setTotalPages(res?.data?.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handleReset = async () => {
    setFilterValue({
      type: "",
      uhid: "",
      number: "",
    });
    await getDetails();
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div
      className="cont-da p-2 mx-3 rounded mb-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text p-3">Patient Details</p>
        <div className="d-flex p-3">
          <Button
            className="doc-fil-btn mt-1"
            onClick={() => setIsModalOpen(true)}
          >
            <FaFilter /> Filter
          </Button>
          {isApplied && (
            <Button className="doc-fil-btn mx-2 mt-1">
              <MdOutlineReplay onClick={handleReset} />
            </Button>
          )}
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
                <TableCell className="emr-label">S. No</TableCell>
                <TableCell className="emr-label">UHID</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Patient Type</TableCell>
                <TableCell className="emr-label">Email Id</TableCell>
                <TableCell className="emr-label">Phone No</TableCell>
                <TableCell className="emr-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((patient: any, index: any) => (
               <TableRow
               key={patient.id}
               className={
                 patient.patientType === "General"
                   ? "inpatient-General"
                   : patient.patientType === "Insurance"
                   ? "inpatient-Insurance"
                   : patient.patientType === "Corporate"
                   ? "inpatient-Corporate"
                   : ""
               }
             >
             
                  <TableCell className="emr-pat-text-dd">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient?.UHIDId || "-"}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient?.PatientName || "-"}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.patientType || "-"}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.emailId || "-"}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.phoneNo || "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ backgroundColor: "#3497F9", color: "white" }}
                      onClick={() => handleEditPatient(patient._id)}
                    >
                      <SlOptionsVertical />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Component */}
        {data.length > 0 && (
          <div className="d-flex justify-content-end mt-4">
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      <Modal
        modalRender={(modal) => <div>{modal}</div>}
        width={"28rem"}
        title={"Filter"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={
          <div>
            <div className="d-flex justify-content-between  my-4">
              <Button
                className="c-btn me-3"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="s-btn " onClick={handleapply}>
                Apply
              </Button>
            </div>
          </div>
        }
      >
        <div className="mt-3">
          <label className="mod-label mb-2">Patient Type</label>
          <br />
          <Select
            placeholder="Select an option"
            style={{ width: "400px", borderRadius: "2px" }}
            className="custom-select-doc"
            value={filterValues.type}
            onChange={(value) =>
              setFilterValue({ ...filterValues, type: value })
            }
            options={[
              {
                value: "General",
                label: (
                  <>
                    <span>General</span>
                    <GoDotFill style={{ color: "#00BE4F" }} />
                  </>
                ),
              },
              {
                value: "Corporate",
                label: (
                  <>
                    <span>Corporate</span>
                    <GoDotFill style={{ color: "#FFAE00" }} />
                  </>
                ),
              },
              {
                value: "Insurance",
                label: (
                  <>
                    <span>Insurance</span>
                    <GoDotFill style={{ color: "#3497F9" }} />
                  </>
                ),
              },
            ]}
          />

          <br />
          <label className="mod-label mb-2">UHID</label>
          <br />
          <Input
            style={{ borderRadius: "3px" }}
            value={filterValues.uhid}
            onChange={(e) =>
              setFilterValue({ ...filterValues, uhid: e.target.value })
            }
          />
          <br />

          <label className="mod-label mb-2">Phone Number</label>
          <Input
            style={{ borderRadius: "3px" }}
            value={filterValues.number}
            onChange={(e) =>
              setFilterValue({ ...filterValues, number: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default NavPatientDetails;
