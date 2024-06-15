import { useState } from "react"; 
import { AngleUpIcon, AngleDownIcon } from "./Icons";

import "./styles/Entity.css";

type SelectedEntityProps = {
  data: Entity;
}

const SelectedEntity = ({ data }: SelectedEntityProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="selected-entity">
      <article className={`entity-closed ${isOpen ? "entity-open": ""}`} onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <span>{`${data.name}`}</span>
        {isOpen
          ? <AngleUpIcon fill="white" stroke="white" width={16} height={16} />
          : <AngleDownIcon fill="white" stroke="white" width={16} height={16} />
        }
      </article>
      {isOpen &&
        <section className="selected-label-section">
          {data.labels.map((label, idx) => {
            return (
              <article className="selected-label-container" key={`${idx}${label}`}>
                <span className="entity-label">{label}</span>
              </article>
            );
          })}
        </section>
      }
    </section>
  );
};

export default SelectedEntity;