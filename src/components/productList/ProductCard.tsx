import React, { ReactNode, useEffect } from "react";
import { styled } from "@mui/material/styles";
import styles from "./ProductList.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "100%",
  height: "100%",
});

interface productData {
  children?: ReactNode;
  product?: any;
  setCartProducts?: any;
}
const ProductCard: React.FC<productData> = (props) => {
  const defaultVariant = props.product.productVariants[0].product_variant_id;
  const [variant, setVariant] = React.useState(defaultVariant);

  useEffect(() => {
    setVariant(defaultVariant);
  }, [defaultVariant]);

  const variantData: any = props?.product?.productVariants.filter(
    (el: any) => el.product_variant_id === variant
  )[0];

  const imageUrl = variantData?.product_image;
  const actualProductPrice = parseFloat(variantData?.product_price);
  const productDiscount = parseFloat(variantData?.discount_percent);
  const discountedProductPrice =
    actualProductPrice * (1 - productDiscount * 0.01);

  const productVariants = props.product.productVariants.map((el: any) => {
    return { label: el.packaging_desc, value: el.product_variant_id };
  });
  const handleChange = (event: SelectChangeEvent) => {
    setVariant(event.target.value as string);
  };

  const addProductHandler = () => {
    props.setCartProducts((prev: number) => prev + 1);
  };

  return (
    <div
      key={props?.product?.product_id}
      className={styles.productListCard}
      id={props?.product?.product_id}
    >
      <div className={styles.imageGrid}>
        <div className={styles.discountTag}>{`${productDiscount}% OFF`}</div>
        <div className={styles.productImage}>
          <Img src={imageUrl} />
        </div>
        <div className={styles.isVegTag}>
          <div
            className={
              props?.product?.is_veg ? styles.isVegDot : styles.isNonVegDot
            }
          ></div>
        </div>
      </div>
      <div>
        <div className={styles.productBrand}>{props?.product?.brand_name}</div>
        <div className={styles.productTitleDiv}>
          <div className={styles.productTitle}>
            {props?.product?.product_name}
          </div>
        </div>
      </div>
      <div>
        <Select
          sx={{ m: 1, width: 210, height: 30, border: "none" }}
          labelId="product-variant"
          id={props?.product?.product_id}
          value={variant}
          onChange={handleChange}
        >
          {productVariants.map((variant: any) => {
            return <MenuItem value={variant.value}>{variant.label}</MenuItem>;
          })}
        </Select>

        <div className={styles.priceDiv}>
          <div className={styles.discountedPrice}>
            <span>&#8377;</span>
            <span>{discountedProductPrice.toFixed(2)}</span>
          </div>
          <div className={styles.actualPrice}>
            <span>&#8377;</span> <span>{actualProductPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className={styles.addItemDiv}>
        <button className={styles.addItem} onClick={addProductHandler}>
          {" "}
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
