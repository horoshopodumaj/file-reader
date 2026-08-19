import type { IRowData } from "../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { UPLOAD_FAILED } from "../../components/consts";

import { setUploadProgress, setUploading } from "../../store/slices/dataSlice";
import api from "../api";

let abortController: AbortController | null = null;

export const uploadData = createAsyncThunk(
  "data/uploadData",
  async (data: IRowData[], { dispatch, rejectWithValue, signal }) => {
    try {
      dispatch(setUploading(true));

      abortController = new AbortController();

      for (let i = 0; i <= 100; i += 5) {
        if (abortController.signal.aborted) {
          dispatch(setUploading(false));
          dispatch(setUploadProgress(0));
          return rejectWithValue("Upload cancelled");
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        dispatch(setUploadProgress(i));
      }

      const response = await api.post<IRowData[]>(`/posts`, { data, timestamp: new Date().toISOString() }, { signal });

      dispatch(setUploading(false));
      dispatch(setUploadProgress(0));
      abortController = null;

      return response.data;
    } catch (error) {
      dispatch(setUploading(false));
      dispatch(setUploadProgress(0));
      abortController = null;

      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(UPLOAD_FAILED);
    }
  },
);

export const cancelUpload = () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
};
