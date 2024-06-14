import { useState, ChangeEvent } from "react";
import { useAddEntityMutation } from "./redux/entityApiSlice";
import { setOpenForm } from "./redux/appSlice";
import { useAppDispatch } from "./hooks/redux";

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
    <article className="new-entity">
      <div>
        <label htmlFor="name">Name:</label>
        <input className="text-input" id="name" name="name" value={newEntityData.name} onChange={(e) => handleInputChange(e, setEntityData)} />
      </div>
      <div>
        <label htmlFor="x-coord">X:</label>
        <input className="number-input" id="x-coord" name="x" value={newEntityData.x} onChange={(e) => handleInputChange(e, setEntityData)} />
      </div>
      <div>
        <label htmlFor="y-coord">Y:</label>
        <input className="number-input" id="y-coord" name="y"  value={newEntityData.y} onChange={(e) => handleInputChange(e, setEntityData)} />
      </div>
      <section>
        {newEntityData.labels.map((label, idx) => {
          return (
            <article key={`${idx}${label}`}>
              <span >{label}</span>
              <button type="button" onClick={() => removeLabel(idx, setEntityData)}>x</button>
            </article>
          );
        })}
      </section>
      <div>
        <input className="text-input" name="label" placeholder="New label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
        <button type="button" onClick={() => addLabel(newLabel, setEntityData)}>Add</button>
      </div>
      <div>
        <button type="button" onClick={() => handleCreate()}>Create</button>
        <button type="button" onClick={() => handleCancel()}>Cancel</button>
      </div>
    </article>
  );
};

export default NewEntity;