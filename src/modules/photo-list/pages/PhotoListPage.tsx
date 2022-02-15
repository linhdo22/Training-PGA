import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_PATH } from "../../../config/api";
import { AppState } from "../../../redux/reducers";
import { CustomFetch } from "../../common/utils";
import {
  Photo,
  setPhotoListAction,
  updatePhotoListAction,
} from "../redux/photoListReducer";
import PhotoListComponent from "../components/PhotoListComponent";

declare global {
  interface Window {
    customTest: any;
  }
}

function PhotoListPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const photoList = useSelector<AppState, Photo[] | undefined>(
    (state) => state.photoList.list
  );
  useEffect(() => {
    (async function () {
      setLoading(true);
      const response = await CustomFetch(API_PATH.getPhotos);
      setLoading(false);
      dispatch(setPhotoListAction(response));
    })();
  }, [dispatch]);

  const updatePhotoList = (modifiedPhotos: Photo[]) => {
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
      <div className="row mt-5">
        <div className="col-6 offset-3 border-primary border rounded-3">
          <PhotoListComponent
            loading={loading}
            photoList={photoList}
            updatePhotoList={updatePhotoList}
          />
        </div>
      </div>
    </div>
  );
}

export default PhotoListPage;
