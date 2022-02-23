import React from "react";

import { ISortInfo, SortBy, SortType } from "../../../models/product";

interface Props {
  sortBy: SortBy;
  sortInfo: ISortInfo;
}

function SortIconComponent(props: Props) {
  const { sortInfo, sortBy } = props;
  return (
    <span className="ms-2" style={{ cursor: "pointer" }}>
      {sortInfo.by == sortBy ? (
        sortInfo.type == SortType.asc ? (
          <i className="fa-solid fa-sort-up"></i>
        ) : (
          <i className="fa-solid fa-sort-down"></i>
        )
      ) : (
        <i className="fa-solid fa-sort"></i>
      )}
    </span>
  );
}

export default React.memo(SortIconComponent);
