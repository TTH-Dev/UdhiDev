import React, { useState, useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
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
import { Button, Checkbox } from "antd";

type EyeExamData = {
  [key: string]: { od: string; os: string };
};

const initialData: EyeExamData = {
  media: { od: "", os: "" },
  Vitreous: { od: "", os: "" },
  Retina: { od: "", os: "" },
  ONH: { od: "", os: "" },
  Macula: { od: "", os: "" },
  Periphery: { od: "", os: "" },
};

const PosteriorSegment: React.FC = () => {
  const osCanvasRef = useRef<HTMLCanvasElement>(null!);
  const osCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const odCanvasRef = useRef<HTMLCanvasElement>(null!);
  const odCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState<"OS" | "OD" | null>(null);
  const [data, setData] = useState<EyeExamData>(initialData);

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

  const handleChange = (field: string, eye: "od" | "os", value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [eye]: value },
    }));
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
          ctx.lineWidth = 3;
        }
      }
    };

    initCanvas(osCanvasRef, osCtxRef);
    initCanvas(odCanvasRef, odCtxRef);
  }, []);

  // Start Drawing
  const startDrawing = (e: React.MouseEvent, canvasType: "OS" | "OD") => {
    const ctx = canvasType === "OS" ? osCtxRef.current : odCtxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    setActiveCanvas(canvasType);
  };

  // Draw on Canvas
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !activeCanvas) return;
    const ctx = activeCanvas === "OS" ? osCtxRef.current : odCtxRef.current;
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  // Stop Drawing
  const stopDrawing = () => {
    setIsDrawing(false);
    setActiveCanvas(null);
  };

  // const saveImage = () => {
  //   const element = document.getElementById("canvas-container");
  //   if (!element) return;

  //   html2canvas(element, { backgroundColor: null }).then((canvas) => {
  //     const dataUrl = canvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = dataUrl;
  //     link.download = "Confrontation.png";
  //     link.click();
  //   });
  // };
  return (
    <>
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
      <div id="canvas-container">
        <div className="row py-3">
          {/* OS Canvas */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div style={{ width: "240px" }}>
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
            </div>
          </div>

          {/* OD Canvas */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="position-relative" style={{ width: "240px" }}>
              <h6 className="text-center pb-3">OD</h6>
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

      <div className="d-flex justify-content-end save-cancel-btn ">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default PosteriorSegment;
