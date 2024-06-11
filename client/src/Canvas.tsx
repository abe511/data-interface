import { RefObject, useRef, useEffect } from "react";
import { useGetEntitiesQuery } from "./redux/entityApiSlice";

const drawCanvas = (ref: RefObject<HTMLCanvasElement>, width: number, height: number, points: Entity[]) => {
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

  if(points.length) {
    points.forEach((point) => {
      // console.log(point);
      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(point.x + width / 2, point.y + height / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }
};

type CanvasProps = {
  width: number;
  height: number;
}

const Canvas = ({width, height}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {data: points = []} = useGetEntitiesQuery();

  useEffect(() => {
    drawCanvas(canvasRef, width, height, points);
  }, [canvasRef, width, height, points]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;