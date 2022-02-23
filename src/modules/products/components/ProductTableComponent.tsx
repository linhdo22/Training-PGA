import React from "react";

import TableRowComponent from "./TableRowComponent";
import SortIconComponent from "./SortIconComponent";
import "../style/product-table.scss";
import { IProduct, ISortInfo, SortBy } from "../../../models/product";

interface Props {
  onSort(sortBy: SortBy): void;
  sortInfo: ISortInfo;
  viewingProducts: IProduct[];
}

function ProductTableComponent(props: Props) {
  const { onSort, sortInfo, viewingProducts } = props;

  return (
    <div className="w-100 py-3">
      <table className="w-100 product-table">
        <thead>
          <tr>
            <th>Status</th>
            <th onClick={() => onSort(SortBy.date)}>
              Date
              <SortIconComponent sortBy={SortBy.date} sortInfo={sortInfo} />
            </th>
            <th onClick={() => onSort(SortBy.currency)}>
              Currency
              <SortIconComponent sortBy={SortBy.currency} sortInfo={sortInfo} />
            </th>
            <th onClick={() => onSort(SortBy.total)}>
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
    </div>
  );
}

export default React.memo(ProductTableComponent);
