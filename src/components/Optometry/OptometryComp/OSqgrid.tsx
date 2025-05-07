import { Input } from "@mui/material";
import React, { useRef, useState } from "react";
import { BiUndo } from "react-icons/bi";

const DrawableGrid: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const historyStack = useRef<{ index: number; imageData: ImageData }[]>([]);
  const isDrawing = useRef(false);

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    index: number
  ) => {
    const canvas = canvasRefs.current[index];
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    saveCanvasState(index);
    isDrawing.current = true;

    const event = "touches" in e ? e.nativeEvent.touches[0] : e.nativeEvent;
    const { offsetX, offsetY } = getCoordinates(event, canvas);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    const drawListener = (event: MouseEvent | TouchEvent) => draw(event, index);
    const stopListener = () => stopDrawing(drawListener);

    document.addEventListener("mousemove", drawListener);
    document.addEventListener("mouseup", stopListener);
    document.addEventListener("touchmove", drawListener);
    document.addEventListener("touchend", stopListener);
  };

  const draw = (e: MouseEvent | TouchEvent, index: number) => {
    if (!isDrawing.current) return;

    const canvas = canvasRefs.current[index];
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const event = e instanceof TouchEvent ? e.touches[0] : e;
    const { offsetX, offsetY } = getCoordinates(event, canvas);

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const stopDrawing = (
    drawListener: (event: MouseEvent | TouchEvent) => void
  ) => {
    isDrawing.current = false;
    document.removeEventListener("mousemove", drawListener);
    document.removeEventListener("mouseup", () => stopDrawing(drawListener));
    document.removeEventListener("touchmove", drawListener);
    document.removeEventListener("touchend", () => stopDrawing(drawListener));
  };

  const getCoordinates = (e: MouseEvent | Touch, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      offsetX: (e.clientX - rect.left) * scaleX,
      offsetY: (e.clientY - rect.top) * scaleY,
    };
  };

  const saveCanvasState = (index: number) => {
    const canvas = canvasRefs.current[index];
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyStack.current.push({ index, imageData });
  };

  const undoLastAction = () => {
    if (historyStack.current.length === 0) return;

    const lastAction = historyStack.current.pop();
    if (!lastAction) return;

    const { index, imageData } = lastAction;
    const canvas = canvasRefs.current[index];
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {["#ff0000", "#0000ff", "#90EE90"].map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              backgroundColor: color,
              width: "20px",
              height: "20px",
              borderRadius: "0%",
              border:
                selectedColor === color ? "2px solid black" : "1px solid gray",
              cursor: "pointer",
            }}
          />
        ))}
        <button
          onClick={undoLastAction}
          style={{
            width: "40px",
            height: "20px",
            borderRadius: "0%",
           padding:"0px",
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
          }}
        >
         <BiUndo className="mb-1"/>
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: "20px",
        }}
      >
      {[...Array(9)].map((_, index) => (
  <div
    key={index}
    className="sq-dr-box"
    style={{
      width: "100%",
      height: "8rem",
      border: "1px solid black",
      position: "relative",
    }}
  >
    <Input    style={{
        position: "absolute",
        top: "2px",
        left: "2px",
        right: "2px",
        zIndex: 2,
        height:20,
        padding: "4px 4px",
        width:"120px",
        fontSize: "12px",
        border:"none",
        borderBottom: "1px solid #aaa",
        backgroundColor: "#ffffffc9",
        margin:"auto"
      }}/>
   
    <canvas
      ref={(el) => {
        canvasRefs.current[index] = el;
      }}
      width={200}
      height={128}
      style={{
        width: "100%",
        height: "8rem",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      onMouseDown={(e) => startDrawing(e, index)}
      onTouchStart={(e) => startDrawing(e, index)}
    />
  </div>
))}

      </div>
    </div>
  );
};

export default DrawableGrid;
