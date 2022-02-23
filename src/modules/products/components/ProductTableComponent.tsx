import React, { useEffect, useMemo, useState } from "react";

import TableRowComponent from "./TableRowComponent";
import TablePaginationCompoent from "./TablePaginationComponent";
import SortIconComponent from "./SortIconComponent";
import "../style/product-table.scss";
import { sortAsc, sortDesc } from "../utils";
import {
  IFilterObject,
  IProduct,
  ISortInfo,
  SortBy,
  SortType,
} from "../../../models/product";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { setViewingListAction } from "../redux/productReducer";

const productPerPage = 5;

function ProductTableComponent() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useSelector<AppState, IProduct[]>(
    (state) => state.products.filteredList
  );
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const filterObject = useSelector<AppState, IFilterObject>(
    (state) => state.products.filter
  );
  const [sortInfo, setSortInfo] = useState<ISortInfo>({
    type: SortType.normal,
    by: SortBy.none,
  });

  useEffect(() => {
    // only run when filter change - for prevent back to page 1 when changing data
    setCurrentPage(1);
  }, [filterObject]);

  useEffect(() => {
    let tempList = [];
    if (sortInfo.type == SortType.asc) {
      tempList = sortAsc(sortInfo.by, [...filteredProducts]);
    } else if (sortInfo.type == SortType.desc) {
      tempList = sortDesc(sortInfo.by, [...filteredProducts]);
    } else {
      tempList = [...filteredProducts];
    }
    setSortedProducts(tempList);
  }, [filteredProducts, sortInfo]);

  const pagesLength = useMemo(
    () => Math.ceil(filteredProducts.length / productPerPage),
    [filteredProducts]
  );
  const startIndex = useMemo(
    () => (currentPage - 1) * productPerPage,
    [currentPage]
  );

  const viewingProducts = useMemo(() => {
    const newViewing = sortedProducts.slice(
      startIndex,
      startIndex + productPerPage + 1
    );
    dispatch(setViewingListAction(newViewing));
    return newViewing;
  }, [dispatch, sortedProducts, startIndex]);

  const handleSort = (sortBy: SortBy) => {
    setSortInfo((prev) => {
      // behavior on click - 1: asc -> 2: desc -> 3: normal
      if (prev.by == sortBy) {
        if (prev.type == SortType.desc) {
          return { type: SortType.normal, by: SortBy.none };
        }
        return { ...prev, type: SortType.desc };
      }
      return { type: SortType.asc, by: sortBy };
    });
  };
  console.log("rerender");
  return (
    <div className="w-100 py-3">
      <table className="w-100 product-table">
        <thead>
          <tr>
            <th>Status</th>
            <th onClick={() => handleSort(SortBy.date)}>
              Date
              <SortIconComponent sortBy={SortBy.date} sortInfo={sortInfo} />
            </th>
            <th onClick={() => handleSort(SortBy.currency)}>
              Currency
              <SortIconComponent sortBy={SortBy.currency} sortInfo={sortInfo} />
            </th>
            <th onClick={() => handleSort(SortBy.total)}>
              Total
              <SortIconComponent sortBy={SortBy.total} sortInfo={sortInfo} />
            </th>
            <th colSpan={3}>Order</th>
          </tr>
        </thead>
        <tbody>
          {viewingProducts?.map((product) => {
            return (
              <TableRowComponent product={product} key={product.payroll_id} />
            );
          })}
        </tbody>
      </table>
      <div className="d-flex w-100 px-5">
        <div>
          Showing {startIndex} to{" "}
          {Math.min(startIndex + productPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </div>
        <div className="ms-auto">
          <TablePaginationCompoent
            currentPage={currentPage}
            pagesLength={pagesLength}
            setPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductTableComponent);
