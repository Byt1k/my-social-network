import React from "react";
import s from './ProfileInfo.module.css'

class UserStatus extends React.Component{
    state = {
        exitMode: false
    }
    activateExitMode = () => {
        this.setState({
            exitMode: true
        })
    }
    deactivateExitMode = () => {
        this.setState({
            exitMode: false
        })
    }
    render() {
        return (
            !this.state.exitMode ?
                <em onDoubleClick={this.activateExitMode}>{this.props.userStatus ? this.props.userStatus : 'no status'}</em> :
                <input autoFocus={true} onBlur={this.deactivateExitMode} className={s.editStatusInput} type="text" value={this.props.userStatus} />
        )
    }
}

export default UserStatus;