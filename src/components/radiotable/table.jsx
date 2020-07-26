import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data,onPlay,isList}) => {

  return (
    <table className='table'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} isList={isList}/>
      <TableBody columns={columns} data={data} onPlay={onPlay}/>
    </table>
  );
};

export default Table;
