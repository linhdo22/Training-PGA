import React, { useMemo, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'

import { CustomThunkDispatch } from '../../../redux/thunk'
import { RESPONSE_STATUS_OK } from '../../../utils/httpResponseCode'
import { getProfileThunk } from '../../common/redux/thunk'
import { uploadAvatar } from '../utils'

interface Props {
    onClose(): void
    file: File | null
}

const ChangeAvatarModalComponent = (props: Props) => {
    const { file, onClose } = props
    const imageRef = useRef<HTMLImageElement>()
    const dispatch = useDispatch<CustomThunkDispatch>()
    const [croppedImageUrl, setCroppedImageUrl] = useState('')
    const [crop, setCrop] = useState<Crop | object>({
        unit: '%',
        height: 20,
        aspect: 1,
    })

    const srcUrl = useMemo(
        () => (file ? URL.createObjectURL(file) : ''),
        [file],
    )

    const handleCropChange = (crop: Crop) => {
        setCrop(crop)
    }
    const handleImageLoaded = (image: HTMLImageElement) => {
        imageRef.current = image
    }
    const handleComplete = (crop: Crop) => {
        makeClientCrop(crop)
    }

    const makeClientCrop = async (crop: Crop) => {
        if (imageRef.current && crop) {
            const image = imageRef.current
            const canvas = document.createElement('canvas')
            const pixelRatio = window.devicePixelRatio
            const scaleX = image.naturalWidth / image.width
            const scaleY = image.naturalHeight / image.height
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = crop.width * pixelRatio * scaleX
            canvas.height = crop.height * pixelRatio * scaleY

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY,
            )
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error('Canvas is empty')
                        return
                    }
                    URL.revokeObjectURL(croppedImageUrl)
                    const newFileUrl = URL.createObjectURL(blob)
                    setCroppedImageUrl(newFileUrl)
                },
                'image/jpeg',
                1,
            )
        }
    }
    const handleUpload = async () => {
        const reponse = await uploadAvatar(croppedImageUrl)
        if (reponse?.code !== RESPONSE_STATUS_OK) {
            return
        }
        dispatch(getProfileThunk())
    }

    if (!file) {
        return <></>
    }
    return (
        <>
            <div className="modal-backdrop show"></div>
            <div
                className="modal fade show"
                style={{ display: 'block' }}
                tabIndex={-1}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <FormattedMessage id="changeAvatarTitle" />
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center w-100">
                                {!!file && (
                                    <ReactCrop
                                        style={{ zIndex: 100 }}
                                        crop={crop}
                                        src={srcUrl}
                                        onChange={handleCropChange}
                                        onComplete={handleComplete}
                                        onImageLoaded={handleImageLoaded}
                                    />
                                )}
                            </div>
                            <div className="my-3 fw-bold">
                                <FormattedMessage id="changeAvatarPreview" />
                            </div>
                            {croppedImageUrl && (
                                <div
                                    style={{
                                        width: 144,
                                        height: 144,
                                    }}
                                >
                                    <img
                                        className="avatar border border-3 border-primary bg-white w-100 h-100 rounded-circle"
                                        src={croppedImageUrl}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                <FormattedMessage id="stopChange" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleUpload}
                            >
                                <FormattedMessage id="saveChange" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeAvatarModalComponent
