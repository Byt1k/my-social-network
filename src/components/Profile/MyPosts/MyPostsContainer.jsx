import MyPosts from "./MyPosts";
import {addPost} from "../../../redux/profile-reducer";
import React from "react";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer;