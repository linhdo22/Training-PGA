import { debug } from "console";
import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "react-redux";

import { Photo, ModifiedInfo } from "../redux/photoListReducer";
import PhotoComponent from "./PhotoComponent";

interface Props {
  photoList?: Photo[];
  loading: boolean;
  updatePhotoList(modifiedPhotos: ModifiedInfo[]): void;
}

function PhotoListComponent(props: Props) {
  const [modifiedPhotos, setModifiedPhotos] = useState<ModifiedInfo[]>([]);
  const [photoList, setPhotoList] = useState(props.photoList);
  const [resetFlag, setResetFlag] = useState(false);

  const updatePhoto = useCallback((id: number, data: { title: string }) => {
    setModifiedPhotos((prev) => {
      const index = prev.findIndex((photo) => photo.id == id);
      const newList = prev.slice();
      // debug;
      console.log(prev);
      // console.log(index);
      if (index < 0) {
        newList.push({ id: id, title: data.title });
      } else {
        newList[index].title = data.title;
      }
      return newList;
    });
  }, []);

  useEffect(() => {
    if (props.photoList) {
      setPhotoList([...props.photoList]);
    }
  }, [props.photoList]);

  const handleReset = () => {
    setModifiedPhotos([]);
    setResetFlag(!resetFlag);
  };

  const handleConfirm = () => {
    console.log(modifiedPhotos);
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
          photoList.map((photo, index) => {
            if (index > 10) {
              return;
            }
            const inx = modifiedPhotos.findIndex((modifiedPhoto) => {
              return modifiedPhoto.id == photo.id;
            });
            return (
              <PhotoComponent
                photo={photo}
                key={photo.id}
                updatePhoto={updatePhoto}
                isModified={inx >= 0 ? true : false}
                resetFlag={resetFlag}
              />
            );
          })}
      </div>
    </>
  );
}

export default PhotoListComponent;