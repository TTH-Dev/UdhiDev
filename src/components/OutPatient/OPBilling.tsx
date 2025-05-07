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
import { Modal, Button, Input, message, Pagination } from "antd";
import { FaFilter } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Config";
import dayjs from "dayjs";

const OPBilling: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const handleBilling = (id: number) => {
    navigate(`/out-patient/op-billing/create?id=${id}`);
  };

  const handleApply = async () => {
    setIsApplied(true);
    setIsModalOpen(false);
    await handlegetBilling();
  };

  const [filterValues, setFilterValues] = useState({
    name: "",
    uhid: "",
  });

  const handleReset = async () => {
    setFilterValues({
      name: "",
      uhid: "",
    });
    await handlegetBilling();
  };

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<any>([]);

  const handlegetBilling = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/patient/opto-data?billStatus=Not-Generated&limit=${pageSize}&page=${currentPage}&patientName=${filterValues.name}&UHID=${filterValues.uhid}&date=${dayjs().format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res,"dfs");

      setData(res.data.data.mergedData);
      setTotalPages(res.data.totalPages);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handlegetBilling();
  }, [currentPage]);

  return (
    <div
      className="cont-da p-2 mx-3 rounded mb-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center my-3">
        <p className="emr-search-text mb-0 p-3">Patient Details</p>
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
                <TableCell className="emr-label">OP / AP No</TableCell>
                <TableCell className="emr-label">Patient Name</TableCell>
                <TableCell className="emr-label">Patient Type</TableCell>
                <TableCell className="emr-label">Consult Dr</TableCell>
                <TableCell className="emr-label">Billing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((patient: any, index: any) => (
                <TableRow key={index}    className={
                  patient.patientType === "General"
                    ? "inpatient-General"
                    : patient.patientType === "Insurance"
                    ? "inpatient-Insurance"
                    : patient.patientType === "Corporate"
                    ? "inpatient-Corporate"
                    : ""
                }>
                  <TableCell className="emr-pat-text-dd">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.appointmentNo
                      ? patient.appointmentNo
                      : patient.patientId.opNo}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.patientName || "-"}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.patientType || "-"}
                  </TableCell>
                  <TableCell className="emr-pat-text-dd">
                    {patient.doctorName || "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ backgroundColor: "#3497F9", color: "white" }}
                      onClick={() => handleBilling(patient.patientId._id)}
                    >
                      Create Bill
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
          setFilterValues({
            name: "",
            uhid: "",
          });
        }}
        footer={
          <div>
            <div className="d-flex justify-content-between  my-4">
              <Button
                className="c-btn me-3"
                onClick={() => {
                  setIsModalOpen(false);
                  setFilterValues({
                    name: "",
                    uhid: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button className="s-btn" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        }
      >
        <div className="mt-3">
          <label className="mod-label mb-2">Patient Name</label>
          <br />
          <Input
            style={{ borderRadius: "3px" }}
            onChange={(e) =>
              setFilterValues({ ...filterValues, name: e.target.value })
            }
            value={filterValues.name}
          />

          <br />
          <label className="mod-label mb-2">UHID</label>
          <br />
          <Input
            style={{ borderRadius: "3px" }}
            onChange={(e) =>
              setFilterValues({ ...filterValues, uhid: e.target.value })
            }
            value={filterValues.uhid}
          />
        </div>
      </Modal>
    </div>
  );
};

export default OPBilling;