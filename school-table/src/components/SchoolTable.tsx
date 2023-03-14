import React, {
  useMemo,
  useContext,
  ReactElement,
  useState,
  useEffect,
} from "react";
import {
  IRatesListContext,
  LessonsList,
  RateList,
  Schoolboy,
  SchoolboyList,
} from "../types/types";
import styled from "styled-components";
import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { TableContext } from "../context/context";
import { useTable, usePagination, CellProps } from "react-table";
import { tableColumns } from "./TableColumns";
import SkipBlock from "./SkipBlock";

const StyledTableBlock = styled.div`
  table {
    border: 1px solid ${({ theme }): string => theme.grey};

    thead {
      tr {
        background-color: ${({ theme }): string => theme.greyDark};
      }
    }

    td,
    th {
      border: 1px solid ${({ theme }): string => theme.grey};
    }

    td {
      padding: 5px;
    }

    tr:nth-child(even) {
      background-color: ${({ theme }): string => theme.bcWhite};
    }
  }

  input,
  .MuiSelect-select {
    padding: 10px;
  }

  .tablePagination {
    margin: 10px 0 0;
  }
`;

interface IProps {
  lessons: LessonsList;
  rates?: RateList;
  schoolboys: SchoolboyList;
}

const SchoolTable: React.FC<IProps> = ({ lessons, schoolboys }) => {
  const { rates } = useContext<IRatesListContext>(TableContext);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const schoolboysData = useMemo(
    () =>
      schoolboys?.Items.map((student) => {
        return {
          ...student,
          rates: rates?.Items.filter((rate) => rate.SchoolboyId === student.Id),
        };
      }),

    [rates, schoolboys?.Items]
  );

  const data = useMemo(() => schoolboysData, [schoolboysData]);

  const lessonsColumns = lessons?.Items.map((item) => {
    const { Id, Title } = item;

    return {
      Header: `${Title} (${Id})`,
      accessor: `${Id}`,
      Cell: ({ row }: CellProps<Schoolboy, string>): ReactElement => {
        if (row.original.rates?.some((rate) => rate.ColumnId === Id)) {
          return (
            <SkipBlock Title="H" SchoolboyId={row.original.Id} ColumnId={Id} />
          );
        }

        return (
          <SkipBlock Title="" SchoolboyId={row.original.Id} ColumnId={Id} />
        );
      },
    };
  });

  // eslint-disable-next-line
  const columns = useMemo(() => [...tableColumns, ...lessonsColumns], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      //@ts-ignore
      columns,
      data,
      initialState: { pageIndex: currentPage },
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;

  useEffect(() => {
    setCurrentPage(pageIndex);
  }, [pageIndex]);

  return (
    <>
      <StyledTableBlock>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="tablePagination">
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </Button>{" "}
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>{" "}
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>{" "}
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <TextField
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>{" "}
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </div>
      </StyledTableBlock>
    </>
  );
};

export default SchoolTable;
