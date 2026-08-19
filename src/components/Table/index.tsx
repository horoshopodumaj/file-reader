import { type IRowData } from "../../types";
import Stats from "./Stats";
import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useMemo, useRef } from "react";

import { formatValue } from "../../helpers/formatValue";

import EmptyTable from "./EmptyTable";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

import "./style.scss";

interface ITableProps {
  data: IRowData[];
  columns: string[];
  searchQuery: string;
}

const Table: React.FC<ITableProps> = ({ data, columns, searchQuery }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const tableColumns = useMemo<ColumnDef<IRowData>[]>(() => {
    return columns.map(col => ({
      accessorKey: col,
      header: col,
      cell: ({ getValue }) => {
        const value = getValue() ?? "";
        const formattedValue = formatValue(value);

        if (!formattedValue) return <span className="empty-cell">—</span>;

        if (!searchQuery.trim()) return formattedValue;

        const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        const parts = formattedValue.split(regex);

        return parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          ),
        );
      },
    }));
  }, [columns, searchQuery]);

  //eslint-disable-next-line
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter: searchQuery,
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  if (data.length === 0) {
    return <EmptyTable />;
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <Stats value={rows.length || 0} />
      </div>

      <div className="table-container" ref={tableContainerRef}>
        <table className="table">
          <TableHead table={table} />
          <TableBody table={table} rowVirtualizer={rowVirtualizer} />
        </table>
      </div>
    </div>
  );
};

export default Table;
