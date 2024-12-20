import { configureStore } from "@reduxjs/toolkit";
// Add your reducers here
import rootMiddleWare from "./rootMiddleWare";
import reducer from "./rootReducer";


// import logger from "redux-logger";

// const middlewares = [...rootMiddleWare];

// process.env.NODE_ENV !== "production" && middlewares.push(logger);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(rootMiddleWare),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
