import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import {setUserProfile, setUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/status/2`)
            .then(response => {
                this.props.setUserStatus(response.data);
            });
    }
    render() {
        return (
            <Profile profile={this.props.profile} userStatus={this.props.userStatus}/>
        )
    }
}

let mapStateToProps = state => {
    return ({
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus
    })
}

let UserUrlComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile, setUserStatus})(UserUrlComponent);