import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "../../hooks/useDebounce";
import { type RootState } from "../../store";
import { setSearchQuery } from "../../store/slices/dataSlice";
import Button from "../Button";

import "./style.scss";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.data.searchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const debouncedQuery = useDebounce(localQuery, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleClear = () => {
    setLocalQuery("");
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input type="text" className="search-input" placeholder="Поиск..." value={localQuery} onChange={handleChange} />
        {localQuery && (
          <Button className="search-clear" onClick={handleClear}>
            ✕
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
