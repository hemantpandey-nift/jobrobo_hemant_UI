import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: { products: productReducer, auth: authReducer },
});

type RootState = ReturnType<typeof store.getState>;

export const productState = (state: RootState) => state.products;
export const authState = (state: RootState) => state.auth;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
