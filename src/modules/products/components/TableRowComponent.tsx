import moment from "moment";
import React, { useMemo } from "react";
import { FormattedNumber } from "react-intl";
import { useDispatch } from "react-redux";

import { IProduct } from "../../../models/product";
import {
  setRemovingProductAction,
  setViewingDetailProductAction,
} from "../redux/productReducer";
import { getStatus } from "../utils";

interface Props {
  product: IProduct;
}

function TableRowComponent(props: Props) {
  const { product } = props;
  const dispatch = useDispatch();
  const status = useMemo(() => {
    return getStatus(product!);
  }, [product]);
  const statusColor = useMemo(() => {
    switch (status) {
      case "processing":
        return "text-warning";
      case "fulfilled":
        return "text-success";
      case "pending":
        return "text-secondary";
      case "canceled":
        return "text-danger";
      case "received":
        return "text-primary";
      default:
        return "";
    }
  }, [status]);

  const handleViewDetail = () => {
    dispatch(setViewingDetailProductAction(product));
  };
  const handleTryRemove = () => {
    dispatch(setRemovingProductAction(product));
  };
  return (
    <tr className="product-table-row">
      <td className={`text-capitalize fw-bold ${statusColor}`}>{status}</td>
      <td>{moment(product.time_created).format("DD/MM/YYYY")}</td>
      <td>{product?.currency}</td>
      <td className="fw-bold">
        <FormattedNumber
          value={product.fees + product.volume_input_in_input_currency}
          minimumFractionDigits={2}
        />
      </td>
      <td>{product.payroll_id}</td>
      <td>
        <div className="view-detail-btn" onClick={handleViewDetail}>
          {Date.now()}
        </div>
      </td>
      <td
        className="btn"
        style={{ display: "table-cell" }}
        onClick={handleTryRemove}
      >
        <i className="fa-solid fa-trash text-danger"></i>
      </td>
    </tr>
  );
}

export default React.memo(TableRowComponent);
