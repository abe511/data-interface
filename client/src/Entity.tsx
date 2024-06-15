import { ChangeEvent, useState } from "react"; 
import { AngleUpIcon, AngleDownIcon, CloseIcon } from "./Icons";
import { useUpdateEntityMutation, useDeleteEntityMutation } from "./redux/entityApiSlice";

import "./styles/Entity.css";

type EntityProps = {
  data: Entity;
}

const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setState: SetState) => {
  if(!(e.target.name === "x" || e.target.name === "y")) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value}));
  } else if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value)}));
  }
};


const Entity = ({ data }: EntityProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entityData, setEntityData] = useState({id: data.id, x: data.x, y: data.y, name: data.name, labels: data.labels});
  const [newLabel, setNewLabel] = useState("");

  const [updateEntity] = useUpdateEntityMutation();
  const [deleteEntity, {isUninitialized: isUninitializedDelete}] = useDeleteEntityMutation();

  const addLabel = () => {
    setEntityData((prev: Entity) => ({...prev, labels: [...prev.labels, newLabel]}));
    setNewLabel('');
  };
  
  const removeLabel = (labelIndex: number) => {
    setEntityData((prev: Entity) => ({...prev, labels: prev.labels.filter((_, idx) => idx !== labelIndex)}));
  };

  const handleEdit = async (entityData: Entity, setIsOpen: SetState) => {
    await updateEntity(entityData);
    setIsOpen(false);
  };
  
  const handleRemove = async (id: string) => {
    await deleteEntity(id);
  };

  return (
    <section className="entity">
      <article className={`entity-closed ${isOpen ? "entity-open": ""}`} onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <span>{`${data.name}`}</span>
        {isOpen
          ? <AngleUpIcon fill="white" stroke="white" width={16} height={16} />
          : <AngleDownIcon fill="white" stroke="white" width={16} height={16} />
        }
      </article>
      {isOpen &&
        <form className="entity-form">
          <article className="entity-fields">
            <div>
              <label htmlFor="name">Name:</label>
              <input id="name" name="name" value={entityData.name} onChange={(e) => handleInputChange(e, setEntityData)} />
            </div>
            <div>
              <label htmlFor="x-coord">X:</label>
              <input id="x-coord" name="x" value={entityData.x} onChange={(e) => handleInputChange(e, setEntityData)} />
            </div>
            <div>
              <label htmlFor="y-coord">Y:</label>
              <input id="y-coord" name="y"  value={entityData.y} onChange={(e) => handleInputChange(e, setEntityData)} />
            </div>
            <section className="label-section">
              {entityData.labels.map((label, idx) => {
                return (
                  <article className="label-container" key={`${idx}${label}`}>
                    <span className="entity-label">{label}</span>
                    <CloseIcon className="label-close-btn" fill="white" stroke="white" width={16} height={16} onClick={() => removeLabel(idx)} />
                  </article>
                );
              })}
            </section>
            <section className="new-label-container">
              <input className="new-label-input" name="label" placeholder="Add new label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
              <button className="new-label-add-btn" type="button" onClick={() => addLabel()}>Add</button>
            </section>
          </article>
          <div className="entity-buttons">
            <button className="entity-save-btn" type="button" onClick={() => handleEdit(entityData, setIsOpen)}>Save</button>
            <button className="entity-remove-btn" type="button" onClick={() => handleRemove(data.id)} disabled={!isUninitializedDelete}>Remove</button>
          </div>
        </form>
      }
    </section>
  );
};

export default Entity;