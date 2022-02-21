import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getMe} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
      this.props.getMe();
    }

    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {getMe})(HeaderContainer);