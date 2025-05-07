import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import html2canvas from "html2canvas";
import { Button, Checkbox, message } from "antd";
import axios from "axios";
import { api_url } from "../../../../../Config";
import moment from "moment";

type EyeExamData = {
  [key: string]: { od: string; os: string };
};

const initialData: EyeExamData = {
  media: { od: "", os: "" },
  vitreous: { od: "", os: "" },
  retina: { od: "", os: "" },
  onh: { od: "", os: "" },
  macula: { od: "", os: "" },
  periphery: { od: "", os: "" },
};

const PosteriorSegment: React.FC = () => {
  const [data, setData] = useState<EyeExamData>(initialData);

  const osCanvasRef = useRef<HTMLCanvasElement>(null!);
  const osCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [hasDrawnOS, setHasDrawnOS] = useState(false);
const [hasDrawnOD, setHasDrawnOD] = useState(false);

  const [osHistory, setOsHistory] = useState<ImageData[]>([]);
const [odHistory, setOdHistory] = useState<ImageData[]>([]);


  const odCanvasRef = useRef<HTMLCanvasElement>(null!);
  const odCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState<"OS" | "OD" | null>(null);

  const drawPlusSign = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 3]);

    ctx.moveTo(0, 120);
    ctx.lineTo(240, 120);
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 240);

    ctx.stroke();
    ctx.closePath();
  };

  useEffect(() => {
    const initCanvas = (
      canvasRef: React.RefObject<HTMLCanvasElement>,
      ctxRef: React.RefObject<CanvasRenderingContext2D | null>
    ) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 5;
          ctxRef.current = ctx;

          drawPlusSign(ctx);
          ctx.setLineDash([]);
        }
      }
    };

    initCanvas(osCanvasRef, osCtxRef);
    initCanvas(odCanvasRef, odCtxRef);
  }, []);

  const startDrawing = (e: React.MouseEvent, canvasType: "OS" | "OD") => {
    const canvas = canvasType === "OS" ? osCanvasRef.current : odCanvasRef.current;
    const ctx = canvasType === "OS" ? osCtxRef.current : odCtxRef.current;
    if (!ctx || !canvas) return;
  
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    if (canvasType === "OS") {
      setOsHistory((prev) => [...prev, snapshot]);
    } else {
      setOdHistory((prev) => [...prev, snapshot]);
    }
  
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    setActiveCanvas(canvasType);
    
    // Save current canvas state before drawing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (canvasType === "OS") {
      setOsHistory((prev) => [...prev, imageData]);
      setHasDrawnOS(true);
    } else {
      setOdHistory((prev) => [...prev, imageData]);
      setHasDrawnOD(true);
    }
    
  };

  const handleUndo = (canvasType: "OS" | "OD") => {
    const canvasRef = canvasType === "OS" ? osCanvasRef : odCanvasRef;
    const ctxRef = canvasType === "OS" ? osCtxRef : odCtxRef;
    const history = canvasType === "OS" ? osHistory : odHistory;
    const setHistory = canvasType === "OS" ? setOsHistory : setOdHistory;
    const setHasDrawn = canvasType === "OS" ? setHasDrawnOS : setHasDrawnOD;
  
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
  
    if (history.length > 0 && canvas && ctx) {
      const newHistory = [...history];
      const previous = newHistory.pop(); 
      setHistory(newHistory);
  
      // Clear canvas before applying previous state
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Apply the previous drawing state
      if (previous) {
        ctx.putImageData(previous, 0, 0);
      }
  
      // Update hasDrawn status
      if (newHistory.length === 0) {
        setHasDrawn(false);
      }
    }
  };
  
  
  
  

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !activeCanvas) return;
    const ctx = activeCanvas === "OS" ? osCtxRef.current : odCtxRef.current;
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setActiveCanvas(null);
  };

  const id = sessionStorage.getItem("patientId");
  const [datas, setDatas] = useState<any>({
    patientId: id,
    enteredDate: new Date(),
    section: "posteriorSegment",
    datas: {
      patientId: id,
      enteredDate: new Date(),
      ...initialData,
    },
  });

  const handleChange = (field: string, eye: "od" | "os", value: string) => {
    setData((prev) => {
      const updated = {
        ...prev,
        [field]: { ...prev[field], [eye]: value },
      };

      setDatas((prevDatas: { datas: any }) => ({
        ...prevDatas,
        datas: {
          ...prevDatas.datas,
          [field]: { ...updated[field] },
        },
      }));

      return updated;
    });
  };

  function dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  const handleSave = async () => {
    const element = document.getElementById("canvas-container");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { backgroundColor: null });
      const base64 = canvas.toDataURL("image/png");
      const blob = dataURItoBlob(base64);
      const file = new File([blob], "posterior-segment.png", {
        type: "image/png",
      });

      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formData = new FormData();
      formData.append("posteriorSegmentImage", file);
      formData.append("datas", JSON.stringify(datas.datas));

      await axios.post(`${api_url}/api/posteriorSegment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await handleGetDatas()

      message.success("Saved Successfully!");
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  const [isUpdate,setIsUpdate]=useState(false)

  const handleGetDatas=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/posteriorSegment?patientId=${id}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );  
      
      
    

      const responseData=res?.data?.data?.posteriorSegment[0]

      if(responseData){
        setIsUpdate(true)
        const newData={
          macula:responseData.macula,
          media:responseData.media,
          onh:responseData.onh,
          periphery:responseData.periphery,
          retina:responseData.retina,
          vitreous:responseData.vitreous
        }
  
        setData(newData)
        setDatas(responseData)
      }


 
    
      
    }catch(error:any){
      console.log(error);
    }
  }

  const handleUpdate=async()=>{
    const element = document.getElementById("canvas-container");
    if (!element) return;
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const formData = new FormData();

      if (hasDrawnOS || hasDrawnOD) {
        const canvas = await html2canvas(element, { backgroundColor: null });
        const base64 = canvas.toDataURL("image/png");
        const blob = dataURItoBlob(base64);
        const file = new File([blob], "posterior-segment.png", {
          type: "image/png",
        });
        formData.append("posteriorSegmentImage", file);
      }
      


    
      formData.append("datas", JSON.stringify(datas.datas));
      await axios.patch(`${api_url}/api/posteriorSegment/${datas._id}`,formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      

      await handleGetDatas()
      message.success("Updated Successfully!")
    }
    catch(error:any){
      console.log(error);
      message.error("Something went wrong!")
    }
  }

  useEffect(()=>{
    handleGetDatas()
  },[])

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded ps-4">
        <p className="emr-search-text">Posterior Segment</p>
      </div>

      <TableContainer component={Paper} elevation={0} className="px-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="emr-label">Name</TableCell>
              <TableCell className="emr-label">OD</TableCell>
              <TableCell className="emr-label">OS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([field, values]) => (
              <TableRow key={field}>
                <TableCell className="emr-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                    value={values.od}
                    onChange={(e) => handleChange(field, "od", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                    value={values.os}
                    onChange={(e) => handleChange(field, "os", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div id="canvas-container" className="mt-4">
        <div className="row py-3">
          {/* OS Canvas */}
          <div className="col-lg-6 d-flex justify-content-center">

            <div className="position-relative" style={{ width: "240px" }}>
              <h6 className="text-center pb-3">OS</h6>
              <canvas
                ref={osCanvasRef}
                width={240}
                height={240}
                style={{
                  border: "2px solid black",
                  cursor: "crosshair",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                }}
                onMouseDown={(e) => startDrawing(e, "OS")}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
              />
              <p className="text-center">
              <a style={{textDecoration:"underLine"}} onClick={() => handleUndo("OS")}>Undo</a>
              </p>
              <br />
              <div className="corner odtop-left">
                <Checkbox>T</Checkbox>
              </div>
              <div className="corner odtop-right">
                <Checkbox>N</Checkbox>
              </div>
              <div className="corner odbottom-left">
                <Checkbox>I</Checkbox>
              </div>
              <div className="corner odbottom-right">
                <Checkbox>I</Checkbox>
              </div>
            </div>
          </div>

          {/* OD Canvas */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="position-relative" style={{ width: "240px" }}>
              <h6 className="text-center pb-3">OD </h6>

              <canvas
                ref={odCanvasRef}
                width={240}
                height={240}
                style={{
                  border: "2px solid black",
                  cursor: "crosshair",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                }}
                onMouseDown={(e) => startDrawing(e, "OD")}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
              />
              <p className="text-center">
              <a style={{textDecoration:"underLine"}} onClick={() => handleUndo("OD")}>Undo</a>
              </p>
              <br />
              <div className="corner odtop-left">
                <Checkbox>T</Checkbox>
              </div>
              <div className="corner odtop-right">
                <Checkbox>N</Checkbox>
              </div>
              <div className="corner odbottom-left">
                <Checkbox>I</Checkbox>
              </div>
              <div className="corner odbottom-right">
                <Checkbox>I</Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end save-cancel-btn-s pt-5">
        <Button className="s-btn me-5" onClick={isUpdate?handleUpdate:handleSave}>
          {isUpdate?"Update":"Save"}
        </Button>
     
      </div>
    </>
  );
};

export default PosteriorSegment;
