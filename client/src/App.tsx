import { useState, useEffect } from 'react';
import List from './List';
import Canvas from './Canvas';
import Selector from './Selector';
import NewEntity from './NewEntity';
import SelectionList from './SelectionList';

import "./App.css";

const BASE_URL = "http://127.0.0.1:5000";

const fetchEntities = async (setEntities: SetState) => {
  try {
    const response = await fetch(`${BASE_URL}/api/data/entities`);
    if(!response.ok) throw Error("No data");
    const data = await response.json();
    setEntities(data);
  } catch(error) {
    console.log(error);
  }

};

// // check
// const getEntity = async (id: string) => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/data/entity/${id}`);
//     if(!response.ok) throw new Error("Failed to fetch entity data");
//     const data = await response.json();
//     console.log(data);
//   } catch(error) {
//     console.log(error);
//   }
// };


const handleRemove = async (id: string, setEntities: SetState) => {
  try {
    const response = await fetch(`${BASE_URL}/api/data/entity/${id}`, {
      method: "DELETE",
    });
    if(!response.ok) throw Error("Failed to remove entity");
    setEntities((prev: Entity[]) => {
      return prev.filter((entity: Entity) => entity.id !== id);
    });
  } catch(error) {
    console.log(error);
  }
}

const handleEdit = async (data: Entity, setIsOpen: SetState, setEntities: SetState) => {
  try {
    const response = await fetch(`${BASE_URL}/api/data/entity/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    });
    if(!response.ok) throw Error("Failed to modify entity");
    setEntities((prev: Entity[]) => {
      return prev.map((entity: Entity) => entity.id === data.id ? {...entity, ...data} : entity);
    });
    setIsOpen((prev: boolean) => !prev);
  } catch(error) {
    console.log(error);
  }
  }


const App = () => {

  const [entities, setEntities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isOpenEntityForm, setIsOpenEntityForm] = useState(false);  


  useEffect(() => {
    fetchEntities(setEntities);
  }, []);

  console.log(window.innerWidth, window.innerHeight);

  return (
    <>
      <Canvas width={500} height={500} points={entities}/>
      <Selector setSelected={setSelected} />
      {/* <button type="button" onClick={() => getEntity("f7c5857d-fa08-4e30-a2a8-a4c0f13a2dee")}>Get Entity</button> */}
      <button type="button" onClick={() => setIsOpenEntityForm((prev: boolean) => !prev)}>New Entity</button>
      {isOpenEntityForm && <NewEntity setEntities={setEntities} setIsOpenEntityForm={setIsOpenEntityForm} />}
      <List entities={entities} handleEdit={handleEdit} handleRemove={handleRemove} setEntities={setEntities} />
      <SelectionList selected={selected} />
    </>
  )
}

export default App;
