import React, { useCallback, useEffect, useState } from "react";

import { IPhoto, IModifiedInfo } from "../redux/photoListReducer";
import PhotoComponent from "./PhotoComponent";

interface Props {
  photoList?: IPhoto[];
  loading: boolean;
  updatePhotoList(modifiedPhotos: IModifiedInfo[]): void;
}

function PhotoListComponent(props: Props) {
  const [modifiedPhotos, setModifiedPhotos] = useState<IModifiedInfo[]>([]);
  const [photoList, setPhotoList] = useState(props.photoList);

  const updatePhoto = useCallback(
    (id: number, data: { title: string; isDifferent: boolean }) => {
      setModifiedPhotos((prev) => {
        const index = prev.findIndex((photo) => photo.id == id);
        const newList = prev.slice();
        if (index < 0) {
          newList.push({ id: id, title: data.title });
        } else {
          if (data.isDifferent) {
            newList[index].title = data.title;
          } else {
            newList.splice(index, 1);
          }
        }
        return newList;
      });
    },
    []
  );

  useEffect(() => {
    if (props.photoList) {
      setPhotoList([...props.photoList]);
    }
  }, [props.photoList]);

  const handleReset = () => {
    setModifiedPhotos([]);
  };

  const handleConfirm = () => {
    if (modifiedPhotos.length) {
      props.updatePhotoList(modifiedPhotos);
      setModifiedPhotos([]);
    }
  };
  return (
    <>
      <div className="d-flex my-2">
        <div className="ms-auto">
          <div
            className={`btn btn-primary me-2 ${
              modifiedPhotos.length ? "" : "disabled"
            }`}
            onClick={handleConfirm}
          >
            Confirm
          </div>
          <div
            className={`btn btn-warning text-white ${
              modifiedPhotos.length ? "" : "disabled"
            }`}
            onClick={handleReset}
          >
            Reset
          </div>
        </div>
      </div>
      <div className="d-flex flex-column my-2">
        {!!photoList &&
          photoList.map((photo) => {
            const inx = modifiedPhotos.findIndex(
              (modifiedPhoto) => photo.id == modifiedPhoto.id
            );
            return (
              <PhotoComponent
                photo={photo}
                title={inx > -1 ? modifiedPhotos[inx].title : photo.title}
                key={photo.id}
                updatePhoto={updatePhoto}
              />
            );
          })}
      </div>
    </>
  );
}

export default PhotoListComponent;
