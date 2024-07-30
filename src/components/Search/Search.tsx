import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Search.module.css";
import { useAppDispatch } from "@/hooks";
import { setSearchFilters } from "@/store/features/playlistSlice";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchFilters({ searchValue: searchValue.trim() }));
  }, [dispatch, searchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use href="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}