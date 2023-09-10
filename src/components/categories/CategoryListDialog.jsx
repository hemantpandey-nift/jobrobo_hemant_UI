import React, { useState, useEffect } from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "../../App.css";
import { Dialog, DialogContent } from "@mui/material";
import styles from "./CategoryList.module.css";
import { productState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { fetchAllCategoriesList } from "../../store/productSlice";

export default function CategoryListDialog({
  addDialog,
  setAddDialog,
  setCategory,
  setSearch,
}) {
  const [dropdownActive, setDropdownActive] = useState(true);

  const productData = useSelector(productState);
  const categoryList = productData?.allCategoriesData?.categoryList;
    const loading = productData?.loading ?? true;
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = {};
    dispatch(fetchAllCategoriesList(params));
  }, [dispatch]);

  return (
    <Dialog
      open={addDialog}
      onClose={() => {
        setAddDialog(false);
      }}
    >
      <DialogContent className={styles.mainDialogContent}>
        <MDBDropdown isOpen={dropdownActive}>
          <MDBDropdownMenu>
            {categoryList.map((data) => {
              return (
                <MDBDropdownItem>
                  <div
                    key={data.category_id}
                    id={data.category_id}
                    onClick={() => {
                      setSearch("");
                      setCategory(data.category_id);
                      setAddDialog(false);
                    }}
                  >
                    {data.category_name}
                  </div>
                  {data.subCategories.length && (
                    <ul className="dropdown-menu dropdown-submenu">
                      {data.subCategories.map((sub) => {
                        return (
                          <MDBDropdownItem>
                            <Link href="#">{sub.sub_category_name}</Link>
                          </MDBDropdownItem>
                        );
                      })}
                    </ul>
                  )}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
      </DialogContent>
    </Dialog>
  );
}
