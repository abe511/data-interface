import { useEffect, useState } from 'react';
import EntityList from './EntityList';
import Canvas from './Canvas';
import Selector from './Selector';
import SelectorInteractive from './SelectorInteractive';
import NewEntity from './NewEntity';
import SelectionList from './SelectionList';
import { setOpenForm } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';

import "./styles/App.css";


const handleModeChange = (setInteractiveMode: SetState) => {
  setInteractiveMode((prev: boolean) => !prev);
};

const App = () => {
  const isOpenForm = useAppSelector(state => state.app.isOpenForm);
  const [isInteractiveMode, setInteractiveMode] = useState(false);
  const dispatch = useAppDispatch();
  const [dimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    const handleResize = () => {
      setDimensions({width: window.innerWidth, height: window.innerHeight});
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="main-container">
      <section className="display-container">
        <article className="canvas-wrapper">
          <Canvas width={dimensions.width} height={dimensions.height} />
        </article>
        <article className="controls-container">
          <aside className="selector-container">
            {isInteractiveMode ? <SelectorInteractive /> : <Selector />}
            <div className="selector-mode-switch">
              <label htmlFor="interactive">Interactive Mode:</label>
              <input id="interactive" type="checkbox" onChange={() => handleModeChange(setInteractiveMode)}/>
            </div>
          </aside>
          <aside className="new-entity-container">
            {!isOpenForm
              ? <button className="add-entity-btn" type="button" onClick={() => dispatch(setOpenForm(!isOpenForm))}>Add Entity</button>
              : <NewEntity />
            }
          </aside>
        </article>
      </section>
      <section className="list-container">
        <EntityList />
        <SelectionList />
      </section>
    </main>
  )
}

export default App;
