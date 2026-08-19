import type { IRowData } from "../../types";
import { type Table, flexRender } from "@tanstack/react-table";

interface ITableHeadProps<T> {
  table: Table<T>;
}
function TableHead<T extends IRowData>({ table }: ITableHeadProps<T>) {
  return (
    <thead className="thead">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id} className="theadTr">
          {headerGroup.headers.map(header => (
            <th
              key={header.id}
              className="theadTh"
              style={{
                width: header.getSize(),
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default TableHead;
