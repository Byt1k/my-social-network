// @ts-ignore
import s from './UploadAvatarForm.module.css'
import {ChangeEvent, FC} from "react";

type PropsType = {
    updateMainPhoto: (e: ChangeEvent<HTMLInputElement>) => void
}

const UploadAvatarForm:FC<PropsType> = ({updateMainPhoto}) => {
    return (
        <div className={s.form}>
            <p className={s.title}>Upload a new photo</p>
            <p className={s.text}>It will be easier for friends to recognize you if you upload your real photo. <br/>
                You can upload an image with a maximum size of 10 MB</p>
            <input type="file" id="avatar" onChange={updateMainPhoto} />
            <label htmlFor='avatar'>Select a file</label>
        </div>
    )
}

export default UploadAvatarForm;