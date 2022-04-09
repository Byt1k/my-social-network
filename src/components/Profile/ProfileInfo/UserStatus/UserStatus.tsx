import {ChangeEvent, FC, useEffect, useState} from "react";
// @ts-ignore
import s from './UserStatus.module.css'

type PropsType = {
    userStatus: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
}

const UserStatus: FC<PropsType> = ({userStatus, updateUserStatus, isOwner}) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(userStatus);

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus])

    const activateEditMode = () => {
        isOwner && setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatus(status);
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    return (
        <div className={s.statusWrapper}>
            {!editMode && <em onClick={activateEditMode} className={isOwner ? `${s.status} ${s.statusOfOwner}` : s.status}>{userStatus || 'no status'}</em>}
            {editMode && <input onBlur={deactivateEditMode} value={status} onChange={onStatusChange} autoFocus={true} className={s.editStatusInput}/>}
        </div>

    )

}

export default UserStatus;