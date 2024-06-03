import { useState } from "react"; 
import { AngleUpIcon, AngleDownIcon } from "./Icons";

type SelectedEntityProps = {
  data: Entity;
}

const SelectedEntity = ({ data }: SelectedEntityProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <article onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <span>{`${data.name}`}</span>
        {isOpen
          ? <AngleUpIcon fill="white" stroke="white" width={16} height={16} />
          : <AngleDownIcon fill="white" stroke="white" width={16} height={16} />
        }
      </article>
      {isOpen &&
        <section>
          {data.labels.map((label, idx) => {
            return (
              <article key={`${idx}${label}`}>
                <span>{label}</span>
              </article>
            );
          })}
        </section>
      }
    </section>
  );
};

export default SelectedEntity;