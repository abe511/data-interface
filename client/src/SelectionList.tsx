import SelectedEntity from "./SelectedEntity";

type SelectionListProps = {
  selected: Entity[];
}

const SelectionList = ({ selected }: SelectionListProps) => {
  return (
    <ul>
      {selected.map((entity: Entity) => {
        return (
          <SelectedEntity key={entity.id} data={entity} />
        );
      })}
  </ul>
  );
};

export default SelectionList;