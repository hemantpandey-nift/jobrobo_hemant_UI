import http from "../utils/http";
import END_POINTS from "../constants/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTopProductsList = createAsyncThunk(
  END_POINTS.GET_TOP_PRODUCTS,
  async (params: any, { rejectWithValue }) => {
    try {
      const data: any = await http.get(END_POINTS.GET_TOP_PRODUCTS);
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchAllProductsList = createAsyncThunk(
  END_POINTS.GET_ALL_PRODUCTS,
  async (params: any, { rejectWithValue }) => {
    try {
      const data: any = await http.get(END_POINTS.GET_ALL_PRODUCTS, { params });

      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchAllCategoriesList = createAsyncThunk(
  END_POINTS.GET_ALL_CATEGORIES,
  async (params: any, { rejectWithValue }) => {
    try {
      const data: any = await http.get(END_POINTS.GET_ALL_CATEGORIES, {
        params,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

interface productSliceProps {
  topProductsData: { productList: any[] };
  allProductsData: { productList: any[] };
  allCategoriesData: { categoryList: any[] };
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: productSliceProps = {
  topProductsData: { productList: [] },
  allProductsData: { productList: [] },
  allCategoriesData: { categoryList: [] },
  loading: false,
  error: null,
  success: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopProductsList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.topProductsData = {
          productList: payload.data.data,
        };
      })
      .addCase(fetchTopProductsList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.topProductsData = { productList: [] };
        state.success = false;
      })
      .addCase(fetchAllProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.allProductsData = {
          productList: payload.data.data,
        };
      })
      .addCase(fetchAllProductsList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.allProductsData = { productList: [] };
        state.success = false;
      })
      .addCase(fetchAllCategoriesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategoriesList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.allCategoriesData = {
          categoryList: payload.data.data,
        };
      })
      .addCase(fetchAllCategoriesList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.allCategoriesData = { categoryList: [] };
        state.success = false;
      });
  },
});

export default productSlice.reducer;
