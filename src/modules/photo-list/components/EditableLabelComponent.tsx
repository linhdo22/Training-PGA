import React, { useRef, useState } from "react";

interface Props {
  label: string;
  onChange(label: string): void;
}

const borderWidthx2 = 4;

function EditableLabelComponent(props: Props) {
  const [editting, setEditting] = useState(false);
  const inputElement = useRef<HTMLTextAreaElement>(null);

  const handleSetEdit = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!inputElement.current) {
      return;
    }
    setEditting(true);
    inputElement.current.style.height = e.currentTarget.offsetHeight + "px";
    setTimeout(() => {
      inputElement.current?.focus();
    }, 10);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    if ((e.nativeEvent as any).inputType == "insertLineBreak") {
      target.blur();
      return;
    }
    props.onChange(target.value);
    target.style.height = "44px";
    if (target.scrollHeight > target.offsetHeight) {
      target.style.height = target.scrollHeight + borderWidthx2 + "px";
    }
  };

  return (
    <>
      <textarea
        className={`photo-title-editing fs-5 ${
          editting ? "d-block" : "d-none"
        }`}
        ref={inputElement}
        value={props.label}
        onBlur={() => setEditting(false)}
        onChange={handleTextChange}
      />
      <label
        className={`photo-title-editable fs-5 ${
          editting ? "d-none" : "d-block"
        }`}
        onClick={handleSetEdit}
      >
        {props.label}
      </label>
    </>
  );
}

export default EditableLabelComponent;
