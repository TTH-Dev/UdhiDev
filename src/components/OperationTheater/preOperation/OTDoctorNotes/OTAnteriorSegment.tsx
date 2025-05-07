import React, { useEffect, useRef, useState } from "react";
import { Button, message, Pagination } from "antd";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as XLSX from "xlsx";

import moment from "moment";
import axios from "axios";
import { api_url } from "../../../../Config";

type ODOS = {
  OD: string;
  OS: string;
};

type TableRowData = {
  enteredDate: string;
  Face: ODOS;
  Lids: ODOS;
  LacrimalSystem: ODOS;
  Conjunctiva: ODOS;
  Cornea: ODOS;
  Sclera: ODOS;
  AnteriorChamber: ODOS;
  Iris: ODOS;
  Pupil: ODOS;
  Lens: ODOS;
};

const OTAnteriorSegment: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState<TableRowData[]>([]);
  const pageSize = 10;
  const printRef = useRef<HTMLDivElement>(null);

  const columns: (keyof Omit<TableRowData, "enteredDate">)[] = [
    "Face",
    "Lids",
    "LacrimalSystem",
    "Conjunctiva",
    "Cornea",
    "Sclera",
    "AnteriorChamber",
    "Iris",
    "Pupil",
    "Lens",
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
        `${api_url}/api/antriorSegment?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const as = res.data.data.antriorSegment;

      const ants = as.map((ast: any) => ({
        enteredDate: ast.enteredDate
          ? moment(ast.enteredDate).format("DD-MM-YYYY")
          : "-",
        Face: {
          OD: ast.face?.od || "-",
          OS: ast.face?.os || "-",
        },
        Lids: {
          OD: ast.lids?.od || "-",
          OS: ast.lids?.os || "-",
        },
        LacrimalSystem: {
          OD: ast.lacrimalSystem?.od || "-",
          OS: ast.lacrimalSystem?.os || "-",
        },
        Conjunctiva: {
          OD: ast.conjunctiva?.od || "-",
          OS: ast.conjunctiva?.os || "-",
        },
        Cornea: {
          OD: ast.cornea?.od || "-",
          OS: ast.cornea?.os || "-",
        },
        Sclera: {
          OD: ast.sclera?.od || "-",
          OS: ast.sclera?.os || "-",
        },
        AnteriorChamber: {
          OD: ast.anteriorChamber?.od || "-",
          OS: ast.anteriorChamber?.os || "-",
        },
        Iris: {
          OD: ast.iris?.od || "-",
          OS: ast.iris?.os || "-",
        },
        Pupil: {
          OD: ast.pupil?.od || "-",
          OS: ast.pupil?.os || "-",
        },
        Lens: {
          OD: ast.lens?.od || "-",
          OS: ast.lens?.os || "-",
        },
      }));

      setRows(ants);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data.");
    }
  };
  const handleDownloadExcel = (id: string) => {
    const exportData = rows.map((row) => ({
      "Entered Date": row.enteredDate,
      "Face OD": row.Face?.OD,
      "Face OS": row.Face?.OS,
      "Lids OD": row.Lids?.OD,
      "Lids OS": row.Lids?.OS,
      "Conjunctiva OD": row.Conjunctiva?.OD,
      "Conjunctiva OS": row.Conjunctiva?.OS,
      "Cornea OD": row.Cornea?.OD,
      "Cornea OS": row.Cornea?.OS,
      "Sclera OD": row.Sclera?.OD,
      "Sclera OS": row.Sclera?.OS,
      "AnteriorChamber OD": row.AnteriorChamber?.OD,
      "AnteriorChamber OS": row.AnteriorChamber?.OS,
      "Iris OD": row.Iris?.OD,
      "Iris OS": row.Iris?.OS,
      "Pupil OD": row.Pupil?.OD,
      "Pupil OS": row.Pupil?.OS,
      "Lens OD": row.Lens?.OD,
      "Lens OS": row.Lens?.OS,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Anterior Segment");

    XLSX.writeFile(workbook, `Anterior Segment ${id.slice(-5)}.xlsx`);
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

  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
            <Table sx={{ minWidth: "max-content", width: "100%" }}>
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
                  {columns.map((_, index) => (
                    <React.Fragment key={index}>
                      <TableCell
                        sx={{
                          backgroundColor: "transparent",
                          color: "#595959",
                          borderLeft: "1px solid #ccc",
                        }}
                      >
                        OD
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "transparent",
                          color: "#595959",
                          borderLeft: "1px solid #ccc",
                        }}
                      >
                        OS
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.enteredDate}</TableCell>
                    {columns.map((col) => (
                      <React.Fragment key={col}>
                        <TableCell>{row[col]?.OD || "-"}</TableCell>
                        <TableCell>{row[col]?.OS || "-"}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={currentPage}
          total={rows.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};


export default OTAnteriorSegment;
