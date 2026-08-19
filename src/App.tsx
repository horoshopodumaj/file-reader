import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FileUploader from "./components/FileUploader";
import SearchInput from "./components/SearchInput";
import Table from "./components/Table";

import { fetchData } from "./services/endpoints/fetchData";
import { type AppDispatch, type RootState } from "./store";

import "./App.scss";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredData, columns, searchQuery, loading } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Таблица данных</h1>
        <p className="app-subtitle">Загрузка, поиск и выгрузка данных</p>
      </header>

      <main className="app-main">
        <FileUploader />
        <SearchInput />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Загрузка...</p>
          </div>
        ) : (
          <Table data={filteredData} columns={columns} searchQuery={searchQuery} />
        )}
      </main>
    </div>
  );
};

export default App;
