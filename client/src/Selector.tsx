import { ChangeEvent, useState } from "react";

const BASE_URL = "http://127.0.0.1:5000";

const handleCoordChange = (e: ChangeEvent<HTMLInputElement>, setCoords: SetState) => {
  if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
    setCoords((prev: SelectionCoords) => ({...prev, [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value)}))
  }
};

const selectEntities = async ({ startX, startY, endX, endY }: SelectionCoords, setSelected: SetState) => {
  const params = {startX: startX.toString(), startY: startY.toString(), endX: endX.toString(), endY: endY.toString()};
  const query = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${BASE_URL}/api/data/entities?${query}`, {method: "GET"});
    if(!response.ok) throw Error("Failed to get selected data");
    const selected = await response.json();
    setSelected(selected);
  } catch(error) {
    console.log(error);
  }
};

type SelectorProps = {
  setSelected: SetState
}

const Selector = ({ setSelected }: SelectorProps) => {
  const [ coords, setCoords ] = useState({startX: 0, startY: 0, endX: 0, endY: 0});

  return (
    <>
      <label htmlFor="startX">Start X:</label>
      <input id="startX" type="text" name="startX" value={coords.startX} onChange={(e) => handleCoordChange(e, setCoords)} />
      <label htmlFor="startY">Start Y:</label>
      <input id="startY" type="text" name="startY" value={coords.startY} onChange={(e) => handleCoordChange(e, setCoords)} />
      <label htmlFor="endX">End X:</label>
      <input id="endX" type="text" name="endX" value={coords.endX} onChange={(e) => handleCoordChange(e, setCoords)} />
      <label htmlFor="endY">End Y:</label>
      <input id="endY" type="text" name="endY" value={coords.endY} onChange={(e) => handleCoordChange(e, setCoords)} />
      <button type="button" onClick={() => selectEntities(coords, setSelected)}>Select</button>
    </>
  );
};

export default Selector;