import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import appReducer from "./appSlice";
import entityReducer from "./entityListSlice";
import selectedReducer from "./selectedListSlice";
import { entityApi } from "./entityApiSlice";


export const store = configureStore({
  reducer: {
    [entityApi.reducerPath]: entityApi.reducer,
    app: appReducer,
    entityList: entityReducer,
    selectedList: selectedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(entityApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
