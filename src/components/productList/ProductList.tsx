import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { productState, useAppDispatch } from "../../store";
import CONSTANTS from "../../constants/constants";
import ProductCard from "./ProductCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./ProductList.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../loader/Loader";
import SearchBox from "../searchBox/SearchBox";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import {
  fetchAllProductsList,
  fetchTopProductsList,
} from "../../store/productSlice";

const ProductList: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const productData = useSelector(productState);
  console.log("productData----------------", productData);

  const productsList: any[] = search
    ? productData?.allProductsData?.productList
    : productData?.topProductsData?.productList;

  console.log("productsList----------------", productsList);

  const loading = productData?.loading ?? true;

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const params: any = { search };

    if (!search) {
      dispatch(fetchTopProductsList(params));
    } else {
      dispatch(fetchAllProductsList(params));
    }
  }, [dispatch, search]);

  return (
    <Box sx={{ flexGrow: 1, minWidth: "400px", marginTop: "80px" }}>
      {loading && <Loader />}
      <Grid item xs={12} sm={12} md={12}>
        <div className={styles.searchBar}>
          <SearchBox setSearch={setSearch} />
          <HomeIcon style={{ marginRight: "20px" }} />
        </div>
      </Grid>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {productsList?.map((product: any) => (
          <Grid item xs={12} sm={4} md={2.3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* <div className={styles.paginationDiv}>
        <Stack spacing={2}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </div> */}
    </Box>
  );
};

export default ProductList;
