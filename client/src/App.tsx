import { useState } from 'react';
import EntityList from './EntityList';
import Canvas from './Canvas';
import Selector from './Selector';
import SelectorInteractive from './SelectorInteractive';
import NewEntity from './NewEntity';
import SelectionList from './SelectionList';
import { setOpenForm } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';

import "./App.css";


const handleModeChange = (setInteractiveMode: SetState) => {
  setInteractiveMode((prev: boolean) => !prev);
}

const App = () => {
  const isOpenForm = useAppSelector(state => state.app.isOpenForm);
  const [isInteractiveMode, setInteractiveMode] = useState(false);
  const dispatch = useAppDispatch();

  console.log("from app. window wh:", window.innerWidth, window.innerHeight);

  return (
    <>
      <Canvas width={500} height={500} />
      <label htmlFor="interactive">Interactive Mode:</label>
      <input id="interactive" type="checkbox" onChange={() => handleModeChange(setInteractiveMode)}/>
      {isInteractiveMode ? <SelectorInteractive /> : <Selector />}
      <button type="button" onClick={() => dispatch(setOpenForm(!isOpenForm))}>New Entity</button>
      {isOpenForm && <NewEntity />}
      <EntityList />
      <SelectionList />
    </>
  )
}

export default App;
