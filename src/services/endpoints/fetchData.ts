import { UNKNOWN_ERROR } from "../../consts";
import type { IRowData } from "../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import api from "../api";

export const fetchData = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<IRowData[]>(`/users`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(UNKNOWN_ERROR);
  }
});
