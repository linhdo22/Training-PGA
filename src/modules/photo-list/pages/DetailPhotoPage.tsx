import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { API_PATH } from "../../../config/api";
import { ROUTES } from "../../../config/routes";
import { IPhoto } from "../../../models/photo";
import { AppState } from "../../../redux/reducers";
import { CustomFetch } from "../../common/utils";

const DetailPhotoPage = () => {
  const params = useParams<{ id: string }>();
  const photos = useSelector<AppState, IPhoto[]>(
    (state) => state.photoList.list
  );
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<IPhoto>();
  useEffect(() => {
    async function loadPhoto() {
      if (params.id) {
        const id = parseInt(params.id);
        let target = photos.find((photo) => photo.id === id);
        if (!target) {
          target = (
            (await CustomFetch(API_PATH.getPhotos + "?id=" + id)) as IPhoto[]
          )[0];
        }
        setPhoto(target);
      }
      setLoading(false);
    }
    loadPhoto();
  }, [params.id, photos]);
  return (
    <>
      {!loading && !photo && <Redirect to={ROUTES.photoList} />}
      <div className="container my-5  ">
        <div className="row my-3 p-3 border border-primary rounded">
          <div className="col-6">
            <div className="d-flex">
              <div className="fw-bold me-2">Id: </div>
              <div>{photo?.id}</div>
            </div>
            <div className="d-flex">
              <div className="fw-bold me-2">Album Id: </div>
              <div>{photo?.albumId}</div>
            </div>
            <div className="d-flex">
              <div className="fw-bold me-2">Title: </div>
              <div>{photo?.title}</div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-center">
              <img src={photo?.thumbnailUrl} />
            </div>
          </div>
        </div>
        <div className="row my-3 p-3 border border-danger rounded">
          <div className="col d-flex justify-content-center">
            <img src={photo?.url} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPhotoPage;
