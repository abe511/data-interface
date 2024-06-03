import { useState, ChangeEvent } from "react";

const BASE_URL = "http://127.0.0.1:5000";


type NewEntityProps = {
  setEntities: SetState,
  setIsOpenEntityForm: SetState,
};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setState: SetState) => {
  if(!(e.target.name === "x" || e.target.name === "y")) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value}));
  } else if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
    setState((prev: Entity) => ({...prev, [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value)}));
  }
};

const handleCreate = async (newEntityData: NewEntity, setEntities: SetState, setEntityData: SetState, setIsOpenEntityForm: SetState) => {
  try {
    const response = await fetch(`${BASE_URL}/api/data/entity`, {
      method: "POST",
      body: JSON.stringify(newEntityData),
      headers: {
        "Content-type": "application/json"
      }
    });
    if(!response.ok) throw new Error("Failed to create a new entity");

    const newEntity = await response.json();
    setEntities((prev: Entity[]) => [...prev, newEntity]);
    setEntityData({x: 0, y: 0, name: "", labels: []});
    setIsOpenEntityForm(false);
  } catch(error) {
    console.log(error);
  }
};

const handleCancel = (setEntityData: SetState, setIsOpenEntityForm: SetState) => {
  setEntityData({x: 0, y: 0, name: "", labels: []});
  setIsOpenEntityForm(false);
};

const addLabel = (newLabel: string, setEntityData: SetState, setNewLabel: SetState) => {
  setEntityData((prev: Entity) => ({...prev, labels: [...prev.labels, newLabel]}));
  setNewLabel('');
};

const removeLabel = (labelIndex: number, setEntityData: SetState) => {
  setEntityData((prev: Entity) => ({...prev, labels: prev.labels.filter((_, idx) => idx !== labelIndex)}));
};


const NewEntity = ({ setEntities, setIsOpenEntityForm }: NewEntityProps) => {
  const [newEntityData, setEntityData] = useState({x: 0, y: 0, name: "", labels: []});
  const [newLabel, setNewLabel ] = useState("");

  return (
    <>
      <article>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" value={newEntityData.name} onChange={(e) => handleInputChange(e, setEntityData)} />
        <label htmlFor="x-coord">X:</label>
        <input id="x-coord" name="x" value={newEntityData.x} onChange={(e) => handleInputChange(e, setEntityData)} />
        <label htmlFor="y-coord">Y:</label>
        <input id="y-coord" name="y"  value={newEntityData.y} onChange={(e) => handleInputChange(e, setEntityData)} />
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
        <input name="label" placeholder="Add new label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
        <button type="button" onClick={() => addLabel(newLabel, setEntityData, setNewLabel)}>Add</button>
      </article>
      <button type="button" onClick={() => handleCreate(newEntityData, setEntities, setEntityData ,setIsOpenEntityForm)}>Create</button>
      <button type="button" onClick={() => handleCancel(setEntityData ,setIsOpenEntityForm)}>Cancel</button>
    </>
  );
};

export default NewEntity;