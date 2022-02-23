import React from "react";

import FilterDateComponent from "./FilterDateComponent";
import FilterSelectionComponent from "./FilterSelectionComponent";
import { statusSelectionOptions, validateDate } from "../utils";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { setFilterObjectAction } from "../redux/productReducer";
import { IFilterObject } from "../../../models/product";

function ProductFilterComponent() {
  const filterObject = useSelector<AppState, IFilterObject>(
    (state) => state.products.filter
  );
  const dispatch = useDispatch();

  const handleChangeFilter = (
    type: string,
    value: string | Date | null = null
  ) => {
    let newFilterObject = { ...filterObject };
    if (type == "clear") {
      newFilterObject = { status: "", client: "", from: null, to: null };
    } else if (type == "status" && typeof value == "string") {
      newFilterObject[type] = value;
    } else if (type == "from" && typeof value != "string") {
      if (validateDate(value, filterObject.to)) {
        newFilterObject[type] = value;
      }
    } else if (type == "to" && typeof value != "string") {
      if (validateDate(filterObject.from, value)) {
        newFilterObject[type] = value;
      }
    }
    dispatch(setFilterObjectAction(newFilterObject));
  };

  return (
    <div className="d-flex align-items-center py-3">
      <div className="d-flex me-auto">
        {/* filter status */}
        <div className="me-3">
          <FilterSelectionComponent
            title="Status"
            list={statusSelectionOptions}
            onSelect={(data) => handleChangeFilter("status", data.value)}
            selectedValue={filterObject.status}
          />
        </div>
        {/* filter client */}
        {/* <div className="me-3">
          <FilterSelectionComponent
            title="Client"
            list={statusSelectionOptions}
            onSelect={(data) => console.log(data)}
          />
        </div> */}
        {/* filter from  */}
        <div className="me-3">
          <FilterDateComponent
            placeholder="From "
            onChange={(date) => handleChangeFilter("from", date)}
            selectedValue={filterObject.from}
          />
        </div>
        {/* filter to  */}
        <div className="me-3">
          <FilterDateComponent
            placeholder="To "
            onChange={(date) => handleChangeFilter("to", date)}
            selectedValue={filterObject.to}
          />
        </div>
      </div>
      <div className="d-flex">
        <div className="btn btn-outline-primary rounded-3 border-2 fw-bold me-3">
          Apply
        </div>
        <div
          className="btn btn-outline-danger rounded-3 border-2 fw-bold"
          onClick={() => handleChangeFilter("clear")}
        >
          Clear
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductFilterComponent);
