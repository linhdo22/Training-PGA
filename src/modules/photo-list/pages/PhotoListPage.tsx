import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../redux/reducers";
import { updatePhotoListAction } from "../redux/photoListReducer";
import PhotoListComponent from "../components/PhotoListComponent";
import { loadMorePhotos } from "../utils";
import { CustomThunkDispatch } from "../../../redux/thunk";
import { IPhoto } from "../../../models/photo";

declare global {
  interface Window {
    customTest: any;
  }
}

function PhotoListPage() {
  const [inserting, setInserting] = useState(false);
  const [start, setStart] = useState(20);
  const dispatch = useDispatch<CustomThunkDispatch>();
  const photoList = useSelector<AppState, IPhoto[] | undefined>(
    (state) => state.photoList.list
  );

  const handleInsertPhotos = useCallback(async () => {
    await dispatch(loadMorePhotos(start));
    setStart(start + 10);
    setInserting(false);
  }, [start, dispatch]);

  useEffect(() => {
    // prevent multiple initial load (this page -> other page -> this page)
    if (photoList?.[photoList.length - 1]?.id! >= 20) {
      return;
    }
    async function firstLoadPhotos() {
      setInserting(true);
      await dispatch(loadMorePhotos(0, 20));
      setInserting(false);
    }
    firstLoadPhotos();
  }, [dispatch, photoList]); //initial load 20 photos

  useEffect(() => {
    const scrollEvent = () => {
      if (inserting) {
        return;
      }
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const threshHold = 200;
      if (threshHold + clientHeight + scrollTop > scrollHeight) {
        setInserting(true);
        handleInsertPhotos();
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [inserting, handleInsertPhotos]); // scroll to load

  const updatePhotoList = (modifiedPhotos: IPhoto[]) => {
    const newList = photoList!.map((photo) => {
      const modifiedPhoto = modifiedPhotos.find(
        (modifiedPhoto) => modifiedPhoto.id == photo.id
      );
      if (modifiedPhoto) {
        return { ...photo, title: modifiedPhoto.title };
      }
      return photo;
    });
    dispatch(updatePhotoListAction(newList));
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-6 offset-3 border-primary border rounded-3">
          <PhotoListComponent
            photoList={photoList}
            updatePhotoList={updatePhotoList}
          />
          {inserting && (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border text-primary"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotoListPage;
