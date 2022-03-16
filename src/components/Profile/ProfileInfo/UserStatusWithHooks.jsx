import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'

const UserStatusWithHooks = props => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.userStatus);

    useEffect(() => {
        setStatus(props.userStatus);
    }, [props.userStatus])

    const activateExitMode = () => {
        setEditMode(true);
    }

    const deactivateExitMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }

    const onStatusChange = e => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={s.statusWrapper}>
            {!editMode && <em onClick={activateExitMode} className={s.status}>{props.userStatus ? props.userStatus : 'no status'}</em>}
            {editMode && <input onBlur={deactivateExitMode} value={status} onChange={onStatusChange} autoFocus={true} className={s.editStatusInput}/>}
        </div>

    )

}

export default UserStatusWithHooks;