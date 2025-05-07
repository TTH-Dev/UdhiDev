import React, { useEffect, useRef, useState } from "react";
import { Button, message, Pagination } from "antd";
import * as XLSX from "xlsx";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { api_url } from "../../../../../Config";
import moment from "moment";

type fam = {
  enteredDate: string;
  systemicDisease: string;
  ophthalmicDisease: string;

};

const MFamilyHistory: React.FC = () => {
    const [data, setData] = useState<fam[]>([]);
  
  const printRef = useRef<HTMLDivElement>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

  const columns = ["Entered Date", "Systemic Disease","Ophthalmic Disease"];



  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleDownloadExcel = () => {
    const exportData = data.map((row) => ({
      "Entered Date": row.enteredDate,
      "Systemic Disease": row.systemicDisease,
      "Ophthalmic Disease": row.ophthalmicDisease,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Family History");
  
    XLSX.writeFile(workbook, "Family_History_Report.xlsx");
  };
  
  const fetchData = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login Required");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/past-history/getBy-section?section=familyHistory&patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = res?.data?.data?.familyHistory?.map(
        (fam: any) => ({
          enteredDate: fam.enteredDate
            ? moment(fam.enteredDate).format("DD-MM-YYYY")
            : "-",
            ophthalmicDisease: fam?.ophthalmicDisease,
            systemicDisease: fam?.systemicDisease,
          
          
        })
      );
      setData(response);
      setTotalPages(Math.ceil(response.length / pageSize));

    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error("Failed to load Family History. Please try again.");
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, [currentPage]);



  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
     
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button onClick={handleDownloadExcel} className="s-btn me-3">
          Download as Excel
        </Button>
      </div>

      <div className="emr-complaints-box mt-2 rounded p-4">
       
        <div ref={printRef}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      sx={{ backgroundColor: "transparent", color: "#595959" }}
                      className="emr-label"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
  {paginatedData && paginatedData.length > 0 ? (
    paginatedData.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.enteredDate || "-"}</TableCell>
        <TableCell>{row.systemicDisease || "-"}</TableCell>
        <TableCell>{row.ophthalmicDisease || "-"}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3} style={{ textAlign: "center" }}>
        No Data Available
      </TableCell>
    </TableRow>
  )}
</TableBody>

            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3 pb-3">

      <Pagination
            current={currentPage}
            total={totalPages*pageSize}
            pageSize={pageSize}
            
            onChange={handlePageChange}
            showSizeChanger={false}
            
            />
            </div>
    </>
  );
};

export default MFamilyHistory;
