import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

import { IPhoto } from "../../../models/photo";
import "../style/photo.css";
import EditableLableCompoent from "./EditableLabelComponent";

interface Props {
  photo: IPhoto;
  updatePhoto(id: number, data: object): any;
  title: string;
}

function PhotoComponent(props: Props) {
  const { photo, updatePhoto, title } = props;

  const isEven = useMemo(() => photo.id % 2 == 0, [photo.id]);

  const handleTitleChange = (title: string) => {
    updatePhoto(photo.id, { title, isDifferent: title != photo.title });
  };

  return (
    <div
      className={`d-flex p-3 my-2 align-items-stretch border border-2 border-${
        title !== photo.title ? "danger" : "primary"
      } ${isEven ? "bg-secondary" : ""}`}
    >
      <div className="me-3">
        <Link to={`${ROUTES.photoList}/${photo.id}`}>
          <img src={photo.thumbnailUrl} style={{ height: 100 }} />
        </Link>
      </div>
      <div className="flex-fill">
        <EditableLableCompoent label={title} onChange={handleTitleChange} />
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
