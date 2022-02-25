import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IUser } from '../../../models/user'
import { AppState } from '../../../redux/reducers'
import AvatarComponent from '../components/AvatarComponent'
import ChangeAvatarModalComponent from '../components/ChangeAvatarModalComponent'
import UserDetail from '../components/UserDetailComponent'

export default function ProfilePage() {
    const user = useSelector<AppState>((state) => state.auth.user) as IUser
    const fileUpload = useRef<HTMLInputElement>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const handleClickAvatar = () => {
        if (fileUpload) {
            fileUpload.current?.click()
        }
    }
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0])
        }
    }
    const handleFinishChangeAvatar = useCallback(() => {
        setImageFile(null)
    }, [])
    return (
        <div className="my-5 container">
            <div className="row mb-3">
                <div className="col d-flex justify-content-center">
                    <AvatarComponent
                        onClick={handleClickAvatar}
                        src={user.avatar}
                        width={144}
                        height={144}
                    />
                    <input
                        type="file"
                        ref={fileUpload}
                        hidden
                        onChange={handleChangeImage}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2 border border-primary p-3 d-flex">
                    <UserDetail user={user} />
                </div>
            </div>
            <ChangeAvatarModalComponent
                file={imageFile}
                onClose={handleFinishChangeAvatar}
            />
        </div>
    )
}
