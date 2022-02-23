import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../style/filter-date.scss";

const CustomDateInput = React.forwardRef(function DateInput(
  props: any,
  ref: any
) {
  const { value, onClick, isClearable, placeholder, onChange, onRemove } =
    props;
  return (
    <div className="filter-custom-date">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
      />
      {value && isClearable && (
        <i
          className="fa-solid fa-circle-xmark text-danger remove"
          onClick={onRemove}
        ></i>
      )}
      <i className="fa-solid fa-calendar-days"></i>
    </div>
  );
});

interface Props {
  placeholder?: string;
  onChange(date: Date | null): void;
  selectedValue: Date | null;
  isClearable?: boolean;
}

function PickDateComponent(props: Props) {
  const { placeholder, selectedValue, isClearable } = props;
  const handleChange = (date: Date | null) => {
    props.onChange(date);
  };
  const handleRemove = () => {
    props.onChange(null);
  };
  return (
    <DatePicker
      selected={selectedValue}
      onChange={handleChange}
      customInput={
        <CustomDateInput onRemove={handleRemove} isClearable={isClearable} />
      }
      placeholderText={placeholder}
    />
  );
}

export default PickDateComponent;
