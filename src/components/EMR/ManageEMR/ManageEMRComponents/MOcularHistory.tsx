import React, { useEffect, useRef, useState } from "react";
import { Button, message ,
  Pagination

} from "antd";
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
import { api_url } from "../../../../Config";
import moment from "moment";
import * as XLSX from "xlsx";


type Ocu = {
  enteredDate: string;
  HOTrauma: boolean;
  HOOcularSx: boolean;
  PGUse: boolean;
};

const MOcularHistory: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [data,setData]=useState<Ocu[]>([]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const paginatedData = data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  const columns = ["Entered Date", "H/O Trauma", "H/O OcularSx", "PG Use"];



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
 const handleDownloadExcel = (id: string) => {
    const exportData = data.map((row) => ({
      "Entered Date": row.enteredDate,
      "HOTrauma": row.HOTrauma,
          "HOOcularSx":row.HOOcularSx ,
          "PGUse": row.HOOcularSx
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Past Ocular History");

    XLSX.writeFile(workbook, `Past Ocular History ${id.slice(-5)}.xlsx`);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        `${api_url}/api/past-ocular-history?patientId=${id}`,{
          headers:{ Authorization:`Bearer ${token}`,
          "Content-Type":"application/json",
        },
        }
      );

      const response = res?.data?.data?.pastOcularHistories?.map((ocu:any)=>(

        { enteredDate:ocu.enteredDate ? moment(ocu.enteredDate).format("DD-MM-YYYY"): "-",
          HOTrauma: ocu.hoTrauma !== undefined && ocu.hoTrauma !== null ? (ocu.hoTrauma ? "Yes" : "No") : "-",
          HOOcularSx:ocu.hoOcularSx !== undefined && ocu.hoOcularSx !== null ? (ocu.hoOcularSx ? "Yes" : "No") : "-",
          PGUse: ocu.pgUse !== undefined && ocu.pgUse !== null ? (ocu.pgUse ? "Yes" : "No") : "-",


        }

      ))
      setData(response)
    } catch (error: any) {

        console.error("Error fetching data:", error);
        message.error("Failed to load complaints. Please try again.");
    }
  };

  useEffect(()=>{
    const id = sessionStorage.getItem("patientId")
    if (id) {
      fetchData(id);
    }

  },[currentPage])
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={handlePrint} className="c-btn me-3">
          Print
        </Button>
        <Button
                      onClick={() => {
                        const id = sessionStorage.getItem("patientId");
                        if (id) handleDownloadExcel(id);
                      }}
                      className="s-btn me-3"
                    >
                      Download as Excel
                    </Button>
      </div>

      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Past Ocular History</p>
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
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    <TableCell>{row.HOTrauma}</TableCell>
                    <TableCell>{row.HOOcularSx}</TableCell>
                    <TableCell>{row.PGUse}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
       {paginatedData.length > 0 && (
      <div className="d-flex justify-content-end mt-3 pb-4">
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    )}

    </>
  );
};

export default MOcularHistory;
