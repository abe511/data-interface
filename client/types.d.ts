type Entity = {
  id: string;
  name: string;
  x: number;
  y: number;
  labels: string[];
};

type NewEntity = {
  name: string;
  x: number;
  y: number;
  labels: string[];
};

type SelectionCoords = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};


type SetState = Dispatch<S | SetStateAction<S>>;
