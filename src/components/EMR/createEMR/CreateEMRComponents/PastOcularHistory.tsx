import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { message, Pagination } from "antd";
import axios from "axios";
import { api_url } from "../../../../Config";
import { useEffect, useState } from "react";

const PastOcularHistory = () => {
  const columns = [ "H/O Trauma","H/O OcularSx","PG Use"];

     const [datas,setDatas]=useState<any>([])
      const [totalPages, setTotalPages] = useState(0);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize=10
    
    
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
  
    const handleGet = async (id:any) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      try {
        const res=await axios.get(`${api_url}/api/past-ocular-history?limit=${pageSize}&patientId=${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setTotalPages(res.data.totalPages)
  
        setDatas(res.data.data.pastOcularHistories)
       
        
      } catch (error: any) {
        console.log(error);
        message.error("SOmething went wrong!");
      }
    };
  
    useEffect(() => {
      const id = sessionStorage.getItem("patientId");
      if (id) {
        handleGet(id);
      }
    }, [currentPage]);


    

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Past Ocular History</p>
        <div>
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
                {datas.length>0&&datas.map((row:any, index:any) => (
                  <TableRow key={index}>
                    <TableCell>{row?.hoTrauma? "True" : "False"}</TableCell>
                    <TableCell>{row?.hoOcularSx? "True" : "False"}</TableCell>
                    <TableCell>{row.pgUse ? "True" : "False"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

       
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

export default PastOcularHistory;