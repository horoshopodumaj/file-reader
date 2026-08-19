import { type IRowData } from "../../types";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cancelUpload, uploadData } from "../../services/endpoints/uploadData";
import { type AppDispatch, type RootState } from "../../store";
import { clearError, setData, setError } from "../../store/slices/dataSlice";
import Button from "../Button";
import ProgressBar from "../ProgressBar";

import Info from "./Info";

import "./style.scss";

const FileUploader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, uploadProgress, error, data } = useSelector((state: RootState) => state.data);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);

        if (Array.isArray(jsonData)) {
          const validData = jsonData.every(item => typeof item === "object" && item !== null && !Array.isArray(item));

          if (validData) {
            dispatch(setData(jsonData as IRowData[]));
          } else {
            dispatch(setError("Неверный формат JSON: ожидается массив объектов"));
          }
        } else {
          dispatch(setError("Неверный формат JSON: ожидается массив объектов"));
        }
      } catch (error) {
        dispatch(setError("Загрузите JSON"));
        console.error("JSON parse error:", error);
      }
    };

    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (data.length === 0) return;

    dispatch(clearError());
    dispatch(uploadData(data));
  };

  const handleCancelUpload = () => {
    cancelUpload();
    dispatch(clearError());
  };
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const resetData = () => {
    dispatch(setData([]));
    dispatch(clearError());
  };

  return (
    <div className="upload-container">
      <div className="upload-controls">
        <Button className="button-primary" onClick={handleFileInputClick}>
          Загрузить JSON
        </Button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="upload-input" />

        <Button className="button-success" onClick={handleUpload} disabled={isUploading || data.length === 0}>
          Загрузить на сервер
        </Button>

        <Button className="button-reset" onClick={resetData} disabled={data.length === 0}>
          Очистить таблицу
        </Button>

        {isUploading && (
          <Button className="button-danger" onClick={handleCancelUpload}>
            Отмена
          </Button>
        )}
      </div>

      {error && (
        <div className="upload-error">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}

      {(isUploading || uploadProgress > 0) && <ProgressBar progress={uploadProgress} />}

      <Info value={data.length || 0} />
    </div>
  );
};

export default FileUploader;
