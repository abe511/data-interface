import { useState, useRef, useEffect, RefObject, MouseEvent } from "react";
import { useGetEntitiesQuery } from "./redux/entityApiSlice";
import { useDispatch } from "react-redux";
import { setCoords } from "./redux/selectedListSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks/redux";

const handleMouseDown = (e: MouseEvent, setIsSelecting: SetState, setRegion: SetState) => {
  const {offsetX, offsetY} = e.nativeEvent;
  setIsSelecting(true);
  setRegion({xMin: offsetX, yMin: offsetY, xMax: offsetX, yMax: offsetY});
};

const handleMouseMove = (e: MouseEvent, isSelecting: boolean, setRegion: SetState) => {
  if(!isSelecting) return;
  const {offsetX, offsetY} = e.nativeEvent;
  setRegion((prev: Coords) => ({...prev, xMax: offsetX, yMax: offsetY}));
}

const minmax = (x1: number, y1: number, x2: number, y2: number) => {
  const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);
  const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);
  return {xMin, yMin, xMax, yMax};
}

const handleMouseUp = (setIsSelecting: SetState, region: Coords | null, setRegion: SetState, dispatch: Dispatch, setCoords: SetState, canvasRef: RefObject<HTMLCanvasElement>) => {
  if(region) {
    const centerWidth = canvasRef.current!.clientWidth * 0.5;
    const centerHeight = canvasRef.current!.clientHeight * 0.5;
    const {xMin, yMin, xMax, yMax} = minmax(region.xMin - centerWidth, -region.yMin + centerHeight, region.xMax - centerWidth, -region.yMax + centerHeight);
    dispatch(setCoords({xMin, yMin, xMax, yMax}));
  }
  setIsSelecting(false);
  setRegion(null);
};

const drawPoints = (ctx: CanvasRenderingContext2D, points: Entity[], selected: [] | Entity[] | undefined) => {
  for(let i = 0, j = 0; i < points.length; ++i) {
    let isSelected = false; 
    if(selected && selected[j]) {
      isSelected = points[i].id === selected[j].id;
    }
    if(isSelected) ++j;
    ctx.beginPath();
    ctx.fillStyle = isSelected ? "gold" : "silver";
    ctx.arc(points[i].x + ctx.canvas.clientWidth * 0.5, -points[i].y + ctx.canvas.clientHeight * 0.5, isSelected ? 2 : 1, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawRegion = (ctx: CanvasRenderingContext2D, region: Coords | null) => {
  if(region){
    const {xMin, yMin, xMax, yMax} = region;
    ctx.fillStyle = "#aaa1";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    ctx.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);
    ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
    ctx.setLineDash([]);
  }
};

const drawCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  const canvas = ref.current;
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  if(!ctx) return;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const centerWidth = canvas.clientWidth * 0.5;
  const centerHeight = canvas.clientHeight * 0.5;
  const step = 10;

  ctx.lineWidth = 1;
  // draw vertical lines
  for(let i = centerWidth, j = centerWidth; i <= canvas.clientWidth; i += step, j-= step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.clientHeight);
    ctx.moveTo(j, 0);
    ctx.lineTo(j, canvas.clientHeight);
    ctx.strokeStyle = i === centerWidth ? "#000" : "#151515";
    ctx.stroke();
  }

  // draw horizontal lines
  for(let i = centerHeight, j = centerHeight; i <= canvas.clientHeight; i += step, j-= step) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.clientWidth, i);
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.clientWidth, j);
    ctx.strokeStyle = i === centerHeight ? "#111" : "#151515";
    ctx.stroke();
  }

  return ctx;
};

type CanvasProps = {
  width: number;
  height: number;
};


const Canvas = ({width, height}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {data: points = []} = useGetEntitiesQuery();
  const [isSelecting, setIsSelecting] = useState(false);
  const [region, setRegion] = useState<Coords | null>(null);
  const selected = useAppSelector((state) => state.selectedList.selected);
  const dispatch = useDispatch();

  useEffect(() => {
    const ctx = drawCanvas(canvasRef);
    if(ctx) {
      drawPoints(ctx, points, selected);
      drawRegion(ctx, region);
    }
  }, [canvasRef, width, height, points, selected,region, dispatch]);

  return <canvas
    ref={canvasRef}
    onMouseDown={(e) => handleMouseDown(e, setIsSelecting, setRegion)}
    onMouseMove={(e) => handleMouseMove(e, isSelecting, setRegion)}
    onMouseUp={() => handleMouseUp(setIsSelecting, region, setRegion, dispatch, setCoords, canvasRef)}
  />;
};

export default Canvas;