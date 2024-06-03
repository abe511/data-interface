import { RefObject, useRef, useEffect } from "react";

const drawCanvas = (ref: RefObject<HTMLCanvasElement>, width: number, height: number, points) => {
  const canvas = ref.current;
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  if(!ctx) return;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  for(let i = 0; i <= canvas.width; i += 10) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
  }
  ctx.strokeStyle = "#ddd";
  ctx.stroke();

  points.forEach((point) => {
    console.log(point);
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(point.x + width / 2, point.y + height / 2, 5, 0, Math.PI * 2);
    ctx.fill();
  });

};

const Canvas = ({width, height, points}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCanvas(canvasRef, width, height, points);
  }, [points]);



  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;