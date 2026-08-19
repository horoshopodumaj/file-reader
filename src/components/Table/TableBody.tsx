import type { IRowData } from "../../types";
import { type Table, flexRender } from "@tanstack/react-table";
import type { ReactVirtualizer } from "@tanstack/react-virtual";

interface ITableBodyProps<T> {
  table: Table<T>;
  rowVirtualizer: ReactVirtualizer<HTMLDivElement, Element>;
}

function TableBody<T extends IRowData>({ table, rowVirtualizer }: ITableBodyProps<T>) {
  const { rows } = table.getRowModel();
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <tbody
      className="tbody"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {virtualRows.map(virtualRow => {
        const row = rows[virtualRow.index];
        return (
          <tr
            key={row.id}
            className="tbodyTr"
            data-index={virtualRow.index}
            ref={node => rowVirtualizer.measureElement(node)}
            style={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="tbodyTd"
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
