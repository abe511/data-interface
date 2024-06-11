type Entity = {
  id: string;
  name: string;
  x: number;
  y: number;
  labels: string[];
};

type NewEntity = Omit<Entity, "id">;

type Coords = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

type SetState = Dispatch<S | SetStateAction<S>>;
