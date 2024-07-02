import { useState, ChangeEvent } from "react";
import { useAddEntityMutation } from "./redux/entityApiSlice";
import { setOpenForm } from "./redux/appSlice";
import { useAppDispatch } from "./hooks/redux";
import { CloseIcon } from "./Icons";

import "./styles/Entity.css";


const resetFormData = {x: 0, y: 0, name: "", labels: []};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setState: SetState) => {
  if(!(e.target.name === "x" || e.target.name === "y")) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value}));
  } else if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value)}));
  }
};


const NewEntity = () => {
  const [newEntityData, setEntityData] = useState(resetFormData);
  const [newLabel, setNewLabel ] = useState("");
  
  const [addEntity] = useAddEntityMutation();

  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setEntityData(resetFormData);
    dispatch(setOpenForm(false));
  };
  
  const handleCreate = async () => {
    // VALIDATE NEW ENTITY INPUT
    await addEntity(newEntityData).unwrap();
    handleCancel();
  };
  
  const addLabel = (newLabel: string, setEntityData: SetState) => {
    setEntityData((prev: Entity) => ({...prev, labels: [...prev.labels, newLabel]}));
    setNewLabel('');
  };
  
  const removeLabel = (labelIndex: number, setEntityData: SetState) => {
    setEntityData((prev: Entity) => ({...prev, labels: prev.labels.filter((_, idx) => idx !== labelIndex)}));
  };


  return (
    <form className="new-entity-form">
      <article className="entity-fields">
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" value={newEntityData.name} onChange={(e) => handleInputChange(e, setEntityData)} />
        </div>
        <div>
          <label htmlFor="x-coord">X:</label>
          <input id="x-coord" name="x" value={newEntityData.x} onChange={(e) => handleInputChange(e, setEntityData)} />
        </div>
        <div>
          <label htmlFor="y-coord">Y:</label>
          <input id="y-coord" name="y"  value={newEntityData.y} onChange={(e) => handleInputChange(e, setEntityData)} />
        </div>
        <div className="label-section-wrapper">
          <section className="label-section">
            {newEntityData.labels.map((label, idx) => {
              return (
                <article className="label-container" key={`${idx}${label}`}>
                  <span className="entity-label" >{label}</span>
                  <CloseIcon className="label-close-btn" fill="white" stroke="white" width={16} height={16} onClick={() => removeLabel(idx, setEntityData)} />
                </article>
              );
            })}
          </section>
        </div>
        <section className="new-label-container">
          <input className="new-label-input" name="label" placeholder="Add new label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
          <button className="new-label-add-btn" type="button" onClick={() => addLabel(newLabel, setEntityData)}>Add</button>
        </section>
      </article>
      <div className="entity-buttons">
        <button className="entity-save-btn" type="button" onClick={() => handleCreate()}>Create</button>
        <button className="entity-remove-btn" type="button" onClick={() => handleCancel()}>Cancel</button>
      </div>
    </form>
  );
};

export default NewEntity;