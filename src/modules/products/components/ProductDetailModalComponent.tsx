import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

import {
  setUpdateProductAction,
  setViewingDetailProductAction,
} from "../redux/productReducer";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { IProduct } from "../../../models/product";
import SelectionComponent from "./SelectionComponent";
import { statusSelectionOptions } from "../utils";
import PickDateComponent from "./PickDateComponent";

function ProductDetailModalComponent() {
  const viewingProduct = useSelector<AppState, IProduct | null>(
    (state) => state.products.viewingDetailProduct
  );
  const [localProduct, setLocalProduct] = useState<IProduct | null>(null);
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
      setLocalProduct(viewingProduct);
      modal.current?.show();
    }
  }, [viewingProduct]);

  const handleCloseModal = () => {
    if (!modal.current) {
      return;
    }
    modal.current.hide();
  };
  const handleUpdate = () => {
    //validate
    dispatch(setUpdateProductAction(localProduct));
    handleCloseModal();
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
                <label className="form-label">Status</label>
                <SelectionComponent
                  width={200}
                  title="Status"
                  list={statusSelectionOptions}
                  onSelect={(data) =>
                    setLocalProduct({
                      ...localProduct!,
                      status: data.value,
                    })
                  }
                  selectedValue={localProduct?.status!}
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
                <div>
                  <PickDateComponent
                    onChange={(date) =>
                      setLocalProduct({
                        ...localProduct!,
                        time_created: date!.toString(),
                      })
                    }
                    selectedValue={
                      localProduct?.time_created
                        ? new Date(localProduct?.time_created)
                        : null
                    }
                  />
                </div>
              </div>
              {/* currency  */}
              <div className="mb-3">
                <label htmlFor="detail-product-currency" className="form-label">
                  Currency
                </label>
                <input
                  disabled
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
                  disabled
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
                  disabled
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
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
