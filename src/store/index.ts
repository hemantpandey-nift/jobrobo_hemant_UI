import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import { useDispatch } from "react-redux";

const store = configureStore({ reducer: { products: productReducer } });

type RootState = ReturnType<typeof store.getState>;

export const productState = (state: RootState) => state.products;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
