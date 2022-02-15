import React, { useEffect, useRef, useState } from "react";

import "../style/photo.css";
import { Photo } from "../redux/photoListReducer";

interface Props {
  photo: Photo;
  updatePhoto(id: number, data: object): any;
  isModified: boolean;
  resetFlag: boolean;
}

const borderWidthx2 = 4;

function PhotoComponent(props: Props) {
  const { photo, updatePhoto, resetFlag } = props;
  const [editting, setEditting] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(photo.title);
  // const [isModified, setIsModified] = useState(false);
  const inputElement = useRef<any>(null);

  const handleSetEdit = (e: any) => {
    setEditting(true);
    inputElement.current.style.height =
      e.target.scrollHeight + borderWidthx2 + "px";
    setTimeout(() => {
      inputElement.current.focus();
    }, 10);
  };

  const handleTextChange = (e: any) => {
    const target = e.target;
    if (e.nativeEvent.inputType == "insertLineBreak") {
      target.blur();
      return;
    }
    setCurrentTitle(target.value);
    updatePhoto(photo.id, { title: target.value });
    target.style.height = "44px";
    if (target.scrollHeight > target.offsetHeight) {
      target.style.height = target.scrollHeight + borderWidthx2 + "px";
    }
  };

  useEffect(() => {
    setCurrentTitle(photo.title);
    // other reset
  }, [resetFlag, photo.title]);

  return (
    <div
      className={`d-flex p-3 my-2 align-items-stretch border border-${
        props.isModified ? "danger" : "primary"
      }`}
    >
      <div className="me-3">
        <img src={photo.thumbnailUrl} style={{ height: 100 }} />
      </div>
      <div className="flex-fill">
        <textarea
          className={`photo-title-editing fs-5 ${
            editting ? "d-block" : "d-none"
          }`}
          ref={inputElement}
          value={currentTitle}
          // rows={1}
          onBlur={() => setEditting(false)}
          onChange={handleTextChange}
        />
        <label
          className={`photo-title-editable fs-5 ${
            editting ? "d-none" : "d-block"
          }`}
          onClick={handleSetEdit}
        >
          {currentTitle}
        </label>
        <p className="p-2">Time: {Date.now()}</p>
      </div>
    </div>
  );
}

export default React.memo(PhotoComponent);
// export default PhotoComponent;
