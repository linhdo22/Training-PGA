import React, { useEffect } from "react";
import { CSVLink } from "react-csv";

import "../style/style.scss";
import ProductTableComponent from "../components/ProductTableComponent";
import ProductFilterComponent from "../components/ProductFilterComponent";
import ProductDetailModalComponent from "../components/ProductDetailModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/reducers";
import ProductRemoveAlertComponent from "../components/ProductRemoveAlertComponent";
import { IFilterObject, IProduct } from "../../../models/product";
import { setFilteredListAction } from "../redux/productReducer";

export default function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector<AppState, IProduct[] | undefined>(
    (state) => state.products.list
  );
  const viewingProducts = useSelector<AppState, IProduct[] | undefined>(
    (state) => state.products.viewingList
  );
  const filterObject = useSelector<AppState, IFilterObject>(
    (state) => state.products.filter
  );

  useEffect(() => {
    // if pull lastest products from sv then re-assign to filteredList
    dispatch(
      setFilteredListAction(
        products!.filter((product) => {
          let valid = true;
          if (
            filterObject.status !== "" &&
            filterObject.status !== product.status
          ) {
            valid = false;
          }
          if (
            valid && // if false then skip rest conditions
            filterObject.from &&
            filterObject.from.getTime() >
              new Date(product.time_created).getTime()
          ) {
            valid = false;
          }
          if (
            valid && // if false then skip rest conditions
            filterObject.to &&
            filterObject.to.getTime() < new Date(product.time_created).getTime()
          ) {
            valid = false;
          }
          return valid;
        })
      )
    );
  }, [products, filterObject, dispatch]);

  return (
    <div className="container" id="table-container">
      <div className="row my-5">
        <div className="col p-3">
          <div className="d-flex my-2 ">
            <div id="table-title" className="fs-3 fw-bold ">
              Pay-roll transistion list
            </div>
            <div className="ms-auto">
              <button className="btn btn-info ">
                <CSVLink
                  data={viewingProducts!}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Export CSV
                </CSVLink>
              </button>
            </div>
          </div>
          <ProductFilterComponent />
          <ProductTableComponent />
          <ProductDetailModalComponent />
          <ProductRemoveAlertComponent />
        </div>
      </div>
    </div>
  );
}
