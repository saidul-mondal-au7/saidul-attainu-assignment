import React, { useMemo, useContext } from 'react'
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'
import { COLUMNS } from './columns'
import './table.css';
import { Link } from "react-router-dom";
import {
  Button
} from "reactstrap";

import { GlobalContext } from "../context/GlobalState";

import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

const Layout = (props) => {
  const columns = useMemo(() => COLUMNS, [])
  // const data = props.data;
  const { data, removeUser } = useContext(GlobalContext);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

  const {
    Id,
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
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { pageIndex: 0 }
  }, 
  useFilters,
  useGlobalFilter,
  usePagination
  )
  // console.log(page.map((user) => user.original.Id))
  const { pageIndex, pageSize } = state;
  const { globalFilter } = state
  
  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (  
                    <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                    
                    </td>
                   
                    )
                })}
                <td>
                <Link to={`/edit/${row.original.Id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                <Button onClick={() => removeUser(row.original.Id)} color="danger">Delete</Button>
                </td>    
              </tr>
            )
          })}
         
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[10, 15, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Layout;