import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

import { setViewingDetailProductAction } from "../redux/productReducer";
import moment from "moment";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { IProduct } from "../../../models/product";

function ProductDetailModalComponent() {
  const viewingProduct = useSelector<AppState, IProduct | null>(
    (state) => state.products.viewingDetailProduct
  );
  const dispatch = useDispatch();
  const modal = useRef<Modal | null>(null);

  useEffect(() => {
    const modalTarget = document.getElementById("product-detail-modal");
    if (modalTarget) {
      modal.current = new Modal(modalTarget);
      modalTarget.addEventListener("hidden.bs.modal", () => {
        dispatch(setViewingDetailProductAction(null));
      });
      return () => {
        if (modal.current) {
          modal.current.dispose();
        }
      };
    }
  }, [dispatch]);

  useEffect(() => {
    if (viewingProduct) {
      modal.current?.show();
    }
  }, [viewingProduct]);

  const handleCloseModal = () => {
    if (!modal.current) {
      return;
    }
    modal.current.hide();
  };
  return (
    <>
      <div id="product-detail-modal" className="modal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Product detail</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {/* status  */}
              <div className="mb-3">
                <label htmlFor="detail-product-status" className="form-label">
                  Status
                </label>
                <input
                  onChange={() => {}}
                  className="form-control"
                  id="detail-product-status"
                  value={viewingProduct?.status || ""}
                />
              </div>
              {/* createDate  */}
              <div className="mb-3">
                <label
                  htmlFor="detail-product-create-date"
                  className="form-label"
                >
                  Date
                </label>
                <input
                  onChange={() => {}}
                  className="form-control"
                  id="detail-product-create-date"
                  value={moment(viewingProduct?.time_created || "").format(
                    "DD/MM/YYYY"
                  )}
                />
              </div>
              {/* currency  */}
              <div className="mb-3">
                <label htmlFor="detail-product-currency" className="form-label">
                  Currency
                </label>
                <input
                  onChange={() => {}}
                  className="form-control"
                  id="detail-product-currency"
                  value={viewingProduct?.currency || ""}
                />
              </div>
              {/* Total  */}
              <div className="mb-3">
                <label htmlFor="detail-product-total" className="form-label">
                  Total
                </label>
                <input
                  onChange={() => {}}
                  className="form-control"
                  id="detail-product-total"
                  value={
                    viewingProduct
                      ? viewingProduct.fees +
                        viewingProduct.volume_input_in_input_currency
                      : ""
                  }
                />
              </div>
              {/* order  */}
              <div className="mb-3">
                <label
                  htmlFor="detail-product-create-date"
                  className="form-label"
                >
                  Order
                </label>
                <input
                  onChange={() => {}}
                  className="form-control"
                  id="detail-product-create-date"
                  value={viewingProduct?.payroll_id || ""}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default React.memo(ProductDetailModalComponent);
