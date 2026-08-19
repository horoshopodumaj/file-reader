export interface IRowData {
  [key: string]: string | number | boolean | null;
}

export interface IDataState {
  data: IRowData[];
  filteredData: IRowData[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  uploadProgress: number;
  isUploading: boolean;
  columns: string[];
}
