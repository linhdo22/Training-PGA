import React, { useEffect, useMemo, useState } from "react";

import "../style/photo.css";
import { IPhoto } from "../redux/photoListReducer";
import EditableLableCompoent from "./EditableLabelComponent";
interface Props {
  photo: IPhoto;
  updatePhoto(id: number, data: object): any;
  isModified: boolean;
  resetFlag: boolean;
}

function PhotoComponent(props: Props) {
  const { photo, updatePhoto, resetFlag, isModified } = props;
  const [currentTitle, setCurrentTitle] = useState(photo.title);

  useEffect(() => {
    setCurrentTitle(photo.title);
  }, [resetFlag, photo.title]);

  const isEven = useMemo(() => photo.id % 2 == 0, [photo.id]);

  const handleTitleChange = (title: string) => {
    setCurrentTitle(title);
    updatePhoto(photo.id, { title });
  };

  return (
    <div
      className={`d-flex p-3 my-2 align-items-stretch border border-2 border-${
        isModified ? "danger" : "primary"
      } ${isEven ? "bg-secondary" : ""}`}
    >
      <div className="me-3">
        <img src={photo.thumbnailUrl} style={{ height: 100 }} />
      </div>
      <div className="flex-fill">
        <EditableLableCompoent
          label={currentTitle}
          onChange={handleTitleChange}
        />
        <div className="d-flex">
          <p className="p-2">ID: {photo.id}</p>
          <p className="p-2">Time: {Date.now()}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PhotoComponent);
// export default PhotoComponent;
