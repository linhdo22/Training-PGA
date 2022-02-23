import React from "react";

import "../style/filter-input.scss";

interface Props {
  value: string;
  onChange(value: string): void;
  placeholder: string;
}

function InputComponent(props: Props) {
  return (
    <div className="filter-custom-input">
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default React.memo(InputComponent);
