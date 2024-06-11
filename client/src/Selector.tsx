import { useRef, RefObject } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { setCoords } from "./redux/selectedListSlice";
import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";

type InputRef = RefObject<HTMLInputElement>;

const validateInput = (inputs: InputRef[]) => {
  const res: boolean[] = inputs.map((input) => {
    if(/^\d*$/.test(input.current!.value)) {
      input.current!.style.borderColor = "initial";
      return true;
    }
    input.current!.style.borderColor = "crimson";
    return false;
  });
  return res.every(el => el);
};

const handleSelect = (dispatch: Dispatch, setCoords: ActionCreatorWithPayload<Partial<Coords>>, xMinRef: InputRef, yMinRef: InputRef, xMaxRef: InputRef, yMaxRef: InputRef) => {
  if(validateInput([xMinRef, yMinRef, xMaxRef, yMaxRef])) {
    const xMin = xMinRef.current!.value;
    const yMin = yMinRef.current!.value;
    const xMax = xMaxRef.current!.value;
    const yMax = yMaxRef.current!.value;
    dispatch(setCoords({xMin: parseInt(xMin), yMin: parseInt(yMin), xMax: parseInt(xMax), yMax: parseInt(yMax)}));
  }
};

const Selector = () => {
  const coords = useAppSelector((state) => state.selectedList.coords);
  const xMinRef = useRef<HTMLInputElement>(null);
  const yMinRef = useRef<HTMLInputElement>(null);
  const xMaxRef = useRef<HTMLInputElement>(null);
  const yMaxRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  return (
    <>
      <label htmlFor="xMin">Start X:</label>
      <input id="xMin" type="text" name="xMin" ref={xMinRef} defaultValue={coords.xMin} />
      <label htmlFor="yMin">Start Y:</label>
      <input id="yMin" type="text" name="yMin" ref={yMinRef} defaultValue={coords.yMin} />
      <label htmlFor="xMax">End X:</label>
      <input id="xMax" type="text" name="xMax" ref={xMaxRef} defaultValue={coords.xMax} />
      <label htmlFor="yMax">End Y:</label>
      <input id="yMax" type="text" name="yMax" ref={yMaxRef} defaultValue={coords.yMax} />
      <button type="button" onClick={() =>  handleSelect(dispatch, setCoords, xMinRef, yMinRef, xMaxRef, yMaxRef)}>Select</button>
    </>
  );
};

export default Selector;