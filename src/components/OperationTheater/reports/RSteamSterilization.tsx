import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { Button } from "antd";
  import { FaFilter } from "react-icons/fa";
  import { MdOutlineReplay } from "react-icons/md";
  
  const data = [
    {
      date: "12/02/2025",
      machine: "A",
      batchNo: "I",
      items: [
        { itemName: "Bin (Ioi Instrumental)", nos: 6, opWard: "12.00 pm" },
        { itemName: "Bin (Iol instrumentals)", nos: 6, opWard: "12.00 pm" },
        { itemName: "Gown Paik", nos: 5, opWard: "12.00 pm" },
        { itemName: "Eye Paik", nos: 5, opWard: "12.00 pm" },
        { itemName: "Phaw set", nos: 2, opWard: "12.00 pm" },
        { itemName: "Pound", nos: 1, opWard: "12.00 pm" },
        { itemName: "Bin (Dressing)", nos: 7, opWard: "12.00 pm" },
        { itemName: "Cheale Forcess", nos: 7, opWard: "12.00 pm" },
      ],
      tempPressure: "121°C",
      loadingTime: "12.30 pm",
      holingTime: "12.55 pm",
      unloadingTime: "12.00",
      operatorName: "Augestin",
      indicator: "pappammal",
      otTechnician: "",
    },
  ];
  
  const RSteamSterilization = () => {
    return (
      <>
        <div className="emr-complaints-box pb-3">
          <div className="d-flex justify-content-between">
            <p className="emr-search-text mb-0 p-4">Steam Sterilization Detail</p>
            <div className="text-end py-3 pe-3">
              <Button className="doc-fil-btn mt-1"><FaFilter /> Filter</Button>
              <Button className="doc-fil-btn mx-2 mt-1"><MdOutlineReplay /></Button>
            </div>
          </div>
  
          <div className="mx-2">
            <TableContainer component={Paper} style={{ overflowX: "auto" }} elevation={0}>
              <Table sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    <TableCell className="emr-label">Date</TableCell>
                    <TableCell className="emr-label">Machine</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Batch No</TableCell>
                    <TableCell className="emr-label"style={{ minWidth: 200 }}>Name Of the Item</TableCell>
                    <TableCell className="emr-label">No’s</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Op & Ward</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Temp Pressure</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Loading Time</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Holing Time</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Unloading Time</TableCell>
                    <TableCell className="emr-label" style={{ minWidth: 150 }}>Operator Name</TableCell>
                    <TableCell className="emr-label">Indicator</TableCell>
                    <TableCell className="emr-label "  style={{ minWidth: 200 }}>OT Technician Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((entry, index) =>
                    entry.items.map((item, i) => (
                      <TableRow key={`${index}-${i}`}>
                        <TableCell className="b-n">{i === 0 ? entry.date : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.machine : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.batchNo : ""}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.nos}</TableCell>
                        <TableCell>{item.opWard}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.tempPressure : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.loadingTime : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.holingTime : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.unloadingTime : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.operatorName : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.indicator : ""}</TableCell>
                        <TableCell className="b-n">{i === 0 ? entry.otTechnician : ""}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
  
      
        </div>
        <div className="text-end">
            <Button className="c-btn me-4 my-4">Cancel</Button>
            <Button className="s-btn me-3">Save</Button>
          </div>
      </>
    );
  };
  
  export default RSteamSterilization;
  