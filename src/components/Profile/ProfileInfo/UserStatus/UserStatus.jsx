import React, {useEffect, useState} from "react";
import s from './UserStatus.module.css'

const UserStatus = ({userStatus, updateUserStatus, isOwner}) => {

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

    const onStatusChange = e => {
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