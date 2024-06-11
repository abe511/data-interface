import { useAppSelector } from "./hooks/redux";
import { useGetSelectedEntitiesQuery } from "./redux/entityApiSlice";
import SelectedEntity from "./SelectedEntity";


const SelectionList = () => {
  const coords = useAppSelector(state => state.selectedList.coords);
  const {data: selected, error, isLoading} = useGetSelectedEntitiesQuery(coords);

  return (
    <>
      {isLoading && <p>Loading selected entities...</p>}
      {error && <p>Error: Could not load selected entities</p>}
      <ul>
        {selected && selected.map((entity: Entity) => {
          return (
            <SelectedEntity key={entity.id} data={entity} />
          );
        })}
      </ul>
    </>
  );
};

export default SelectionList;