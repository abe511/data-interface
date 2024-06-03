import { ChangeEvent, useState } from "react"; 
import { AngleUpIcon, AngleDownIcon } from "./Icons";

type EntityProps = {
  data: Entity;
  handleEdit: SetState;
  handleRemove: SetState;
  setEntities: SetState;
}

const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setState: SetState) => {
  if(!(e.target.name === "x" || e.target.name === "y")) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value}));
  } else if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value)}));
  }
};

const addLabel = (newLabel: string, setEntityData: SetState, setNewLabel: SetState) => {
  setEntityData((prev: Entity) => ({...prev, labels: [...prev.labels, newLabel]}));
  setNewLabel('');
};

const removeLabel = (labelIndex: number, setEntityData: SetState) => {
  setEntityData((prev: Entity) => ({...prev, labels: prev.labels.filter((_, idx) => idx !== labelIndex)}));
};


const Entity = ({ data, handleEdit, handleRemove, setEntities }: EntityProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entityData, setEntityData] = useState({id: data.id, x: data.x, y: data.y, name: data.name, labels: data.labels});
  const [newLabel, setNewLabel ] = useState("");

  return (
    <section>
      <article onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <span>{`${data.id} ${data.name}`}</span>
        {isOpen
          ? <AngleUpIcon fill="white" stroke="white" width={16} height={16} />
          : <AngleDownIcon fill="white" stroke="white" width={16} height={16} />
        }
      </article>
      {isOpen &&
        <>
          <article>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" value={entityData.name} onChange={(e) => handleInputChange(e, setEntityData)} />
            <label htmlFor="x-coord">X:</label>
            <input id="x-coord" name="x" value={entityData.x} onChange={(e) => handleInputChange(e, setEntityData)} />
            <label htmlFor="y-coord">Y:</label>
            <input id="y-coord" name="y"  value={entityData.y} onChange={(e) => handleInputChange(e, setEntityData)} />
            <section>
              {entityData.labels.map((label, idx) => {
                return (
                  <article key={`${idx}${label}`}>
                    <span >{label}</span>
                    <button type="button" onClick={() => removeLabel(idx, setEntityData)}>x</button>
                  </article>
                );
              })}
            </section>
            <input name="label" placeholder="Add new label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
            <button type="button" onClick={() => addLabel(newLabel, setEntityData, setNewLabel)}>Add</button>
          </article>
          <button type="button" onClick={() => handleEdit(entityData, setIsOpen, setEntities)}>Save</button>
          <button type="button" onClick={() => handleRemove(data.id, setEntities)}>Remove</button>
        </>
      }
    </section>
  );
};

export default Entity;