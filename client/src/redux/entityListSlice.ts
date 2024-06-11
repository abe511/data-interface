import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type EntityListState = {
  entities: Entity[];
}

const initialState: EntityListState = {
  entities: [],
};


export const entityListSlice = createSlice({
  name: "entityList",
  initialState,
  reducers: {
    setEntities: (state, action: PayloadAction<Entity[]>) => {
      state.entities = action.payload;
    },
  }
});

export const { setEntities } = entityListSlice.actions;

export default entityListSlice.reducer;