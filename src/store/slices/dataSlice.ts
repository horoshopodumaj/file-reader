import { type IDataState, type IRowData } from "../../types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FETCH_FAILED_DATA, UPLOAD_FAILED_DATA } from "../../components/consts";

import { fetchData } from "../../services/endpoints/fetchData";
import { uploadData } from "../../services/endpoints/uploadData";

const initialState: IDataState = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
  searchQuery: "",
  uploadProgress: 0,
  isUploading: false,
  columns: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IRowData[]>) => {
      state.data = action.payload;
      state.filteredData = action.payload;

      if (action.payload.length > 0) {
        state.columns = Object.keys(action.payload[0]);
      } else {
        state.columns = [];
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase().trim();

      if (!query) {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(item => {
          return Object.values(item).some(value => {
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(query);
          });
        });
      }
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      console.log(state, "state");
      console.log(action.payload, "action.payload");
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
        if (action.payload.length > 0) {
          state.columns = Object.keys(action.payload[0]);
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || FETCH_FAILED_DATA;
      })
      .addCase(uploadData.pending, state => {
        state.error = null;
      })
      .addCase(uploadData.fulfilled, state => {
        console.log(state, "state");
      })
      .addCase(uploadData.rejected, (state, action) => {
        state.error = (action.payload as string) || UPLOAD_FAILED_DATA;
      });
  },
});

export const { setData, setSearchQuery, setUploadProgress, setUploading, clearError, setError } = dataSlice.actions;

export default dataSlice.reducer;
