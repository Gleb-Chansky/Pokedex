import React from 'react';
import { observer } from 'mobx-react-lite';
import ReactPaginate from 'react-paginate';
import paginationStore from '../stores/pagination-store';

export const Pagination = observer(() => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={paginationStore.paginate}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={Math.ceil(paginationStore.totalPages)}
      ageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
});
