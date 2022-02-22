import React from "react";
import s from './ProfileInfo.module.css'

class UserStatus extends React.Component{
    state = {
        exitMode: false,
        status: this.props.userStatus
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                status: this.props.userStatus
            })
        }
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
        this.props.updateUserStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    render() {
        return (
            !this.state.exitMode ?
                <em onClick={this.activateExitMode}>{this.props.userStatus ? this.props.userStatus : 'no status'}</em> :
                <input autoFocus={true} onBlur={this.deactivateExitMode} className={s.editStatusInput} value={this.state.status} onChange={this.onStatusChange} />
        )
    }
}

export default UserStatus;