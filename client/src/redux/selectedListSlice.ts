import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedListState = {
  selected: Entity[],
  coords: Coords;
} 


const initialState: SelectedListState = {
  selected: [],
  // coords: {} as Coords,
  coords: {xMin: 0, yMin: 0, xMax: 0, yMax: 0},
}

export const selectedListSlice = createSlice({
  name: "selectedList",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Entity[]>) => {
      state.selected = action.payload;
    },
    setCoords: (state, action: PayloadAction<Partial<Coords>>) => {
      state.coords = {...state.coords, ...action.payload};
    },
  }
});

export const { setSelected, setCoords } = selectedListSlice.actions;

export default selectedListSlice.reducer;