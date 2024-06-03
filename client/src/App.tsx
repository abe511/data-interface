import { useState, useEffect } from 'react';
import List from './List';
import Canvas from './Canvas';
import NewEntity from './NewEntity';

import "./App.css";

const BASE_URL = "http://127.0.0.1:5000";

const fetchEntities = async (setEntities: SetState) => {
  const response = await fetch(`${BASE_URL}/api/data/entities`);
  if(!response.ok) throw Error("No data");
  const data = await response.json();

  // check if response is ok
  setEntities(data);
};

const getEntity = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/data/entity/${id}`);
  const data = await response.json();
  console.log(data.id);
};

const showNewEntityForm = (setIsOpenEntityForm: SetState) => {
  setIsOpenEntityForm((prev: boolean) => !prev);
};

const handleRemove = async (id: string, setEntities: SetState) => {
  const response = await fetch(`${BASE_URL}/api/data/entity/${id}`, {
    method: "DELETE",
  });
  
  // check if response is ok
  setEntities((prev: Entity[]) => {
    return prev.filter((entity: Entity) => entity.id !== id);
  });
}

  const handleEdit = async (data: Entity, setIsOpen: SetState, setEntities: SetState) => {
  const response = await fetch(`${BASE_URL}/api/data/entity/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  });

  // check if response is ok
  setEntities((prev: Entity[]) => {
    return prev.map((entity: Entity) => entity.id === data.id ? {...entity, ...data} : entity);
  });

  setIsOpen((prev: boolean) => !prev);
}


const App = () => {

  const [entities, setEntities] = useState([]);
  const [isOpenEntityForm, setIsOpenEntityForm] = useState(false);  

  useEffect(() => {
    fetchEntities(setEntities);
  }, []);

  console.log(window.innerWidth, window.innerHeight);

  return (
    <>
      <Canvas width={500} height={500} points={entities}/>
      <button type="button" onClick={() => getEntity("f7c5857d-fa08-4e30-a2a8-a4c0f13a2dee")}>Get Entity</button>
      <button type="button" onClick={() => showNewEntityForm(setIsOpenEntityForm)}>New Entity</button>
      {isOpenEntityForm && <NewEntity setEntities={setEntities} setIsOpenEntityForm={setIsOpenEntityForm} />}
      <List entities={entities} handleEdit={handleEdit} handleRemove={handleRemove} setEntities={setEntities} />
    </>
  )
}

export default App;
