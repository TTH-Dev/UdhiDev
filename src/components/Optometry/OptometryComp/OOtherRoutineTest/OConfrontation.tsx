import { Button, Checkbox, message } from "antd";
import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { api_url } from "../../../../Config";
import moment from "moment";

const OConfrontation = () => {
  const patientId = sessionStorage.getItem("patientId");

  const osCanvasRef = useRef<HTMLCanvasElement>(null!);
  const osCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const odCanvasRef = useRef<HTMLCanvasElement>(null!);
  const odCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState<"OS" | "OD" | null>(null);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [confrontationImageUrl, setConfrontationImageUrl] = useState<string | null>(null);


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

  useEffect(() => {
    initCanvas(osCanvasRef, osCtxRef);
    initCanvas(odCanvasRef, odCtxRef);
    getData(patientId);
  }, [patientId]);

  const startDrawing = (e: React.MouseEvent, canvasType: "OS" | "OD") => {
    const ctx = canvasType === "OS" ? osCtxRef.current : odCtxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    setActiveCanvas(canvasType);
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

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }

    const element = document.getElementById("canvas-container");
    if (!element) return;

    html2canvas(element, { backgroundColor: null }).then(async (canvas) => {

      canvas.toBlob(async (blob) => {
        if (!blob) {
          message.error("Failed to capture canvas");
          return;
        }

        const file = new File([blob], "confrontation.png", { type: "image/png" });

        const formData = new FormData();
        formData.append("patientId", patientId || "");
        formData.append("enteredDate", new Date().toISOString());
        formData.append("section", "confrontation");
        formData.append("confrontationImage", file);
        formData.append(
          "datas",
          JSON.stringify({ patientId: patientId, enteredDate: new Date() })
        );

        try {
          if (isUpdate) {
            await axios.post(`${api_url}/api/other-routine-test/edit-image/${updateId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            message.success("Updated successfully!");
          } else {
            await axios.post(`${api_url}/api/other-routine-test/add`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            message.success("Saved successfully!");
          }
          getData(patientId);
        } catch (error) {
          console.error(error);
          message.error("Something went wrong!");
        }
      }, "image/png");
    });
  };

  const getData = async (id: string | null) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const res = await axios.get(
        `${api_url}/api/other-routine-test/get-by-date?section=confrontation&patientId=${id}&enteredDate=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = res.data?.data?.confrontation?.results?.[0];
      if (result && result._id) {
        setUpdateId(result._id);
        setIsUpdate(true);
        setConfrontationImageUrl(`${api_url}/public/images/${result.confrontationImage}`); 

      } else {
        setIsUpdate(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div id="canvas-container">
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
              <div className="corner odtop-left"><Checkbox>T</Checkbox></div>
              <div className="corner odtop-right"><Checkbox>N</Checkbox></div>
              <div className="corner odbottom-left"><Checkbox>I</Checkbox></div>
              <div className="corner odbottom-right"><Checkbox>I</Checkbox></div>
              <div className="text-center"><Checkbox className="me-1" />Full</div>
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
              <div className="corner odtop-left"><Checkbox>T</Checkbox></div>
              <div className="corner odtop-right"><Checkbox>N</Checkbox></div>
              <div className="corner odbottom-left"><Checkbox>I</Checkbox></div>
              <div className="corner odbottom-right"><Checkbox>I</Checkbox></div>
              <div className="text-center"><Checkbox className="me-1" />Full</div>
            </div>
          </div>
        </div>
      </div>
      {confrontationImageUrl && (
        <div className="text-center mt-4">
          <h6>Uploaded Confrontation Image</h6>
          <img
            src={confrontationImageUrl}
            alt="Confrontation Drawing"
            style={{ maxWidth: "480px", border: "1px solid #ccc", borderRadius: 8 }}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="d-flex justify-content-end save-cancel-btn">
        <Button className="s-btn" onClick={handleSubmit}>
          {isUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default OConfrontation;
