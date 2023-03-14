import { CellProps, Column } from "react-table";
import { ReactElement } from "react";
import { Schoolboy } from "../types/types";

export const tableColumns: Array<Column<Schoolboy>> = [
  {
    Header: "№",
    id: "number_sign",
    Cell: ({ row }: CellProps<Schoolboy, string>): ReactElement => (
      <div>{+row.id + 1}</div>
    ),
  },
  {
    Header: "Student",
    accessor: (row) => row.Id,
    Cell: ({ row }: CellProps<Schoolboy, string>): ReactElement => {
      const { FirstName, SecondName, LastName } = row.original;

      return (
        <div>{`${!!FirstName ? FirstName : ""} ${
          !!SecondName ? SecondName : ""
        } ${!!LastName ? LastName : ""}`}</div>
      );
    },
  },
];
