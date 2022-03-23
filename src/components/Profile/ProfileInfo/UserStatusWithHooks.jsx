import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'

const UserStatusWithHooks = ({userStatus, updateUserStatus, isOwner}) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(userStatus);

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus])

    const activateExitMode = () => {
        isOwner && setEditMode(true);
    }

    const deactivateExitMode = () => {
        setEditMode(false)
        updateUserStatus(status);
    }

    const onStatusChange = e => {
        setStatus(e.currentTarget.value);
    }
    return (
        <div className={s.statusWrapper}>
            {!editMode && <em onClick={activateExitMode} className={isOwner ? `${s.status} ${s.statusOfOwner}` : `${s.status}`}>{userStatus || 'no status'}</em>}
            {editMode && <input onBlur={deactivateExitMode} value={status} onChange={onStatusChange} autoFocus={true} className={s.editStatusInput}/>}
        </div>

    )

}

export default UserStatusWithHooks;