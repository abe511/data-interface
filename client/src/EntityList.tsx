import Entity from "./Entity";
import { useGetEntitiesQuery } from "./redux/entityApiSlice";


  const EntityList = () => {
  const {data: entities, error, isLoading} = useGetEntitiesQuery();

  // console.log("loading", isLoading, error);
  // console.log("data", data);

  return (
    <>
      {isLoading && <p>Loading entity list...</p>} 
      {error && <p>Error: Could not load entity list</p>} 
      <ul>
        {entities && entities!.map((entity: Entity) => {
            return (
              <Entity key={entity.id} data={entity} />
            );
          })
        }
      </ul>
    </>
  );
};

export default EntityList;
