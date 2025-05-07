import React, { useEffect, useRef, useState } from "react";
import { Button, message, Pagination } from "antd";
import axios from "axios";
import moment from "moment";
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
import { api_url } from "../../../../../Config";

const pageSize = 10;

interface EyeData {
  OD: string;
  OS: string;
}

interface TableRowData {
  enteredDate: string;
  Media: EyeData;
  Vitreous: EyeData;
  Retina: EyeData;
  ONH: EyeData;
  Macula: EyeData;
  Periphery: EyeData;
}

const MPosteriorSegment: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns: (keyof Omit<TableRowData, "enteredDate">)[] = [
    "Media",
    "Vitreous",
    "Retina",
    "ONH",
    "Macula",
    "Periphery",
  ];

  const fetchData = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/posteriorSegment?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const ps = res?.data?.data?.posteriorSegment || [];

      const processed = ps.map((p: any) => ({
        enteredDate: p.enteredDate
          ? moment(p.enteredDate).format("DD-MM-YYYY")
          : "-",
        Media: {
          OD: p.media?.od || "-",
          OS: p.media?.os || "-",
        },
        Vitreous: {
          OD: p.vitreous?.od || "-",
          OS: p.vitreous?.os || "-",
        },
        Retina: {
          OD: p.retina?.od || "-",
          OS: p.retina?.os || "-",
        },
        ONH: {
          OD: p.onh?.od || "-",
          OS: p.onh?.os || "-",
        },
        Macula: {
          OD: p.macula?.od || "-",
          OS: p.macula?.os || "-",
        },
        Periphery: {
          OD: p.periphery?.od || "-",
          OS: p.periphery?.os || "-",
        },
      }));

      setRows(processed);
    } catch (error) {
      console.error("Error fetching posterior segment data:", error);
    }
  };

  const handleDownloadExcel = (id: string) => {
    const exportData = rows.map((row) => ({
      "Entered Date": row.enteredDate,
      "Media OD": row.Media?.OD,
      "Media OS": row.Media?.OS,
      "Vitreous OD": row.Vitreous?.OD,
      "Vitreous OS": row.Vitreous?.OS,
      "Retina OD": row.Retina?.OD,
      "Retina OS": row.Retina?.OS,
      "ONH OD": row.ONH?.OD,
      "ONH OS": row.ONH?.OS,
      "Macula OD": row.Macula?.OD,
      "Macula OS": row.Macula?.OS,
      "Periphery OD": row.Periphery?.OD,
      "Periphery OS": row.Periphery?.OS,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posterior Segment");

    XLSX.writeFile(workbook, `Posterior Segment ${id.slice(-5)}.xlsx`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const id = sessionStorage.getItem("patientId");
    if (id) {
      fetchData(id);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end button-container-ort">
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
        <div ref={printRef}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ maxWidth: "100%", overflowX: "auto" }}
          >
            <Table
              sx={{
                minWidth: "max-content",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    sx={{ backgroundColor: "transparent", color: "#595959" }}
                  >
                    Entered Date
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col} colSpan={2} sx={{ textAlign: "center" }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {columns.map(() => (
                    <React.Fragment key={Math.random()}>
                      <TableCell sx={{ border: "1px solid #ccc", color: "#595959" }}>
                        OD
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc", color: "#595959" }}>
                        OS
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    {columns.map((col) => (
                      <React.Fragment key={col}>
                        <TableCell sx={{ borderLeft: "1px solid #ccc" }}>
                          {row[col]?.OD || "-"}
                        </TableCell>
                        <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                          {row[col]?.OS || "-"}
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="d-flex justify-content-end mt-3 pb-4">
          <Pagination
            current={currentPage}
            total={rows.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default MPosteriorSegment;
