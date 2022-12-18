import { applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Action, AnyAction } from "redux";
import { eLearningApi } from "../services/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import course from "./slice/courseSlice";
const bindmiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const rootReducer = combineReducers({});

// export const store = configureStore({
//   reducer: {
//     [eLearningApi.reducerPath]: eLearningApi.reducer,
//   },
//   // Adding the api middleware enables caching, invalidation, polling,
//   // and other useful features of `rtk-query`.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(eLearningApi.middleware),
// });

export const makeStore = () =>
  configureStore({
    reducer: {
      [eLearningApi.reducerPath]: eLearningApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(eLearningApi.middleware),
  });

// export const store = configureStore({
//     reducer : combineReducer,
// })

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>;

// export type RootState = ReturnType<AppStore["getState"]>;
export type RootState = ReturnType<AppStore["getState"]>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
// export type AppDispatch = typeof makeStore.dispatch;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

// setupListeners(makeStore["dispatch"]);

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
