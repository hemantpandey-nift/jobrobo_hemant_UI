import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import styles from "./ProductList.module.css";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "100%",
  height: "100%",
});

interface productData {
  children?: ReactNode;
  product?: any;
}
const ProductCard: React.FC<productData> = (props) => {
  console.log("product----------****-----------", props.product);
  const imageUrl = props?.product?.productVariants?.[0]?.product_image;

  return (
    <div
      key={props?.product?.product_id}
      className={styles.productListCard}
      id={props?.product?.product_id}
    >
      <div className={styles.imageCard}>
        <Img src={imageUrl} />
      </div>
      <div className={styles.descriptionCard}>
        <div className={styles.productTitleDiv}>
          <div className={styles.productTitle}>
            {props?.product?.product_name}
          </div>
          <div className={styles.productRating}>
            ({props?.product?.product_rating})
          </div>
        </div>
        <div className={styles.description}>
          {props?.product?.category_name}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
