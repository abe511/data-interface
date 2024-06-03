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

type SetState = Dispatch<S | SetStateAction<S>>;
