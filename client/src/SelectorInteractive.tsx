import { useState, useEffect, ChangeEvent} from "react";
import { useGetSelectedEntitiesQuery } from "./redux/entityApiSlice";
import { setCoords } from "./redux/selectedListSlice";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { Dispatch } from "@reduxjs/toolkit";

import "./styles/Selector.css";


const handleCoordChange = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch) => {
  if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
    dispatch(setCoords({[e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value)}));
  }
};

const SelectorInteractive = () => {
  const [skipFetching, setSkipFetching] = useState(true);
  const coords = useAppSelector((state) => state.selectedList.coords);
  const {refetch} = useGetSelectedEntitiesQuery(coords, {skip: skipFetching});

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(skipFetching)
      setSkipFetching(false);
  }, [coords, skipFetching]);

  return (
    <article className="selector">
      <div>
        <label htmlFor="xMin">Start X:</label>
        <input id="xMin" type="text" name="xMin" value={coords.xMin} onChange={(e) => handleCoordChange(e, dispatch)} />
      </div>
      <div>
        <label htmlFor="yMin">Start Y:</label>
        <input id="yMin" type="text" name="yMin" value={coords.yMin} onChange={(e) => handleCoordChange(e, dispatch)} />
      </div>
      <div>
        <label htmlFor="xMax">End X:</label>
        <input id="xMax" type="text" name="xMax" value={coords.xMax} onChange={(e) => handleCoordChange(e, dispatch)} />
      </div>
      <div>
        <label htmlFor="yMax">End Y:</label>
        <input id="yMax" type="text" name="yMax" value={coords.yMax} onChange={(e) => handleCoordChange(e, dispatch)} />
      </div>
      <button className="select-btn" type="button" onClick={() => refetch()}>Select</button>
    </article>
  );
};

export default SelectorInteractive;