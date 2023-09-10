import React, { ReactNode } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBox.module.css";

interface searchProps {
  children?: ReactNode;
  setSearch: any;
}

const SearchBox: React.FC<searchProps> = (props) => {
  const handleSearchChange: any = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setSearch(event?.target?.value);
  };
  return (
    <>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search For Products..."
          onChange={handleSearchChange}
          className={styles.searchBoxInput}
        />
      </div>
    </>
  );
};
export default SearchBox;
