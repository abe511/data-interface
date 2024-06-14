import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useGetSelectedEntitiesQuery } from "./redux/entityApiSlice";
import { setSelected } from "./redux/selectedListSlice";
import SelectedEntity from "./SelectedEntity";


const SelectionList = () => {
  const coords = useAppSelector(state => state.selectedList.coords);
  const {data: selected, error, isLoading} = useGetSelectedEntitiesQuery(coords);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelected(selected));
  }, [selected, dispatch]);

  return (
    <aside className="selection-list">
      {isLoading && <p>Loading selected entities...</p>}
      {error && <p>Error: Could not load selected entities</p>}
      <ul>
        {selected && selected.map((entity: Entity) => {
          return (
            <SelectedEntity key={entity.id} data={entity} />
          );
        })}
      </ul>
    </aside>
  );
};

export default SelectionList;