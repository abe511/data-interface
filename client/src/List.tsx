import Entity from "./Entity";

type ListProps = {
  entities: Entity[];
  handleEdit: SetState;
  handleRemove: SetState;
  setEntities: SetState;
}

const List = ({ entities, handleEdit, handleRemove, setEntities }: ListProps) => {

  return (
    <ul>
      {entities.map((entity: Entity) => {
        return (
          <Entity key={entity.id} data={entity} handleEdit={handleEdit} handleRemove={handleRemove} setEntities={setEntities} />
        );
      })}
  </ul>
  );
};

export default List;