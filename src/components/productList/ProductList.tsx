import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { productState, useAppDispatch } from "../../store";
import ProductCard from "./ProductCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./ProductList.module.css";
import Loader from "../loader/Loader";
import SearchBox from "../searchBox/SearchBox";
import { styled } from "@mui/material/styles";
import {
  fetchAllProductsList,
  fetchTopProductsList,
} from "../../store/productSlice";
import bbLogo from "../../images/bb_logo.png";
import LoginDialog from "../login/LoginDialog";
import { getLoggedUserData, userLogout } from "../../utils/helper";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "40px",
  height: "40px",
});

const ProductList: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [openLogin, setOpenLogin] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [userData, setUserData] = React.useState({ user_name: "" });
  const [cartProducts, setCartProducts] = React.useState(0);

  useEffect(() => {
    const user: any = getLoggedUserData();
    setUserData(user);
  }, [toggle]);

  const productData = useSelector(productState);

  const productsList: any[] = search
    ? productData?.allProductsData?.productList
    : productData?.topProductsData?.productList;

  const loading = productData?.loading ?? true;

  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    userLogout();
    setToggle((prev) => !prev);
  };
  const loginHandler = () => {
    setOpenLogin(true);
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
    <>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: "400px",
          marginTop: "80px",
          backgroundColor: "rgba(247,247,247)",
        }}
      >
        {loading && <Loader />}
        <Grid item xs={12} sm={12} md={12}>
          <div className={styles.searchBar}>
            <div>
              <Img src={bbLogo} />
            </div>
            <button className={styles.shopCategoryDiv}>
              <div className={styles.shopCategoryText}>Shop by</div>
              <div className={styles.shopCategoryText}>Category</div>
            </button>
            <SearchBox setSearch={setSearch} />
            {!userData.user_name ? (
              <button className={styles.loginDiv} onClick={loginHandler}>
                Login/Sign Up
              </button>
            ) : (
              <>
                <div className={styles.loginDiv}>{userData.user_name}</div>
                <button className={styles.loginDiv} onClick={logOutHandler}>
                  Sign Out
                </button>
              </>
            )}

            <div className={styles.cartDiv}>
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="12" fill="#D63333"></rect>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.795 10.2H18.3c.385 0 .7.315.7.7 0 .385-.315.7-.7.7H5.7a.702.702 0 0 1-.7-.7c0-.385.315-.7.7-.7h1.505l.998-3.01A1.75 1.75 0 0 1 9.864 6h4.27c.752 0 1.435.473 1.662 1.19l.998 3.01ZM8.867 7.418 7.94 10.2h8.12l-.91-2.782a1.035 1.035 0 0 0-.998-.718H9.866c-.455 0-.857.28-.998.718ZM6.05 16.85V12.3h11.9v4.55c0 .962-.787 1.75-1.75 1.75H7.8c-.962 0-1.75-.788-1.75-1.75Zm3.465.367c.157 0 .297-.14.297-.314v-2.888c0-.175-.122-.315-.297-.315a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888A.314.314 0 0 0 12 13.7a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888a.314.314 0 0 0-.315-.315c-.157 0-.297.14-.297.315v2.887c0 .175.122.316.297.316Z"
                  fill="#fff"
                ></path>
                <mask
                  id="basket_svg__a"
                  maskUnits="userSpaceOnUse"
                  x="5"
                  y="6"
                  width="14"
                  height="13"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.795 10.2H18.3c.385 0 .7.315.7.7 0 .385-.315.7-.7.7H5.7a.702.702 0 0 1-.7-.7c0-.385.315-.7.7-.7h1.505l.998-3.01A1.75 1.75 0 0 1 9.864 6h4.27c.752 0 1.435.473 1.662 1.19l.998 3.01ZM8.867 7.418 7.94 10.2h8.12l-.91-2.782a1.035 1.035 0 0 0-.998-.718H9.866c-.455 0-.857.28-.998.718ZM6.05 16.85V12.3h11.9v4.55c0 .962-.787 1.75-1.75 1.75H7.8c-.962 0-1.75-.788-1.75-1.75Zm3.465.367c.157 0 .297-.14.297-.314v-2.888c0-.175-.122-.315-.297-.315a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888A.314.314 0 0 0 12 13.7a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888a.314.314 0 0 0-.315-.315c-.157 0-.297.14-.297.315v2.887c0 .175.122.316.297.316Z"
                    fill="#606060"
                  ></path>
                </mask>
                <g mask="url(#basket_svg__a)">
                  <path fill="#fff" d="M0 0h24v24H0z"></path>
                </g>
              </svg>
              <div className={styles.carQtyDiv}>{cartProducts}</div>
            </div>
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
              <ProductCard
                product={product}
                setCartProducts={setCartProducts}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {openLogin && (
        <LoginDialog
          addDialog={openLogin}
          setAddDialog={setOpenLogin}
          setToggle={setToggle}
        />
      )}
    </>
  );
};

export default ProductList;
