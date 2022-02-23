import React, { useCallback, useState } from "react";

import "../style/filter-selection.scss";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  title: string;
  list: SelectOption[];
  onSelect(selection: SelectOption): void;
  selectedValue: string;
  width?: number;
}

function SelectionComponent(props: Props) {
  const { title, list, onSelect, selectedValue, width } = props;
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleBlur = useCallback(() => {
    setExpand(false);
  }, []);

  const handleSelect = (selection: SelectOption) => {
    onSelect(selection);
    setExpand(false);
  };

  return (
    <div className="filter-custom-selection" tabIndex={0} onBlur={handleBlur}>
      <div
        className="filter-custom-selection__title "
        onClick={handleExpand}
        style={width ? { width } : {}}
      >
        {selectedValue
          ? list.find((option) => option.value == selectedValue)?.label
          : title}
        <i className="fa-solid fa-angle-down"></i>
      </div>
      <div
        className={`filter-custom-selection__content ${expand ? "" : "d-none"}`}
        style={{ minWidth: "100%" }}
      >
        {list.map((value: SelectOption, index) => {
          return (
            <div
              key={index}
              className={`${value.value == selectedValue ? "selected" : ""}`}
              onClick={() => handleSelect(value)}
            >
              {value.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectionComponent;
