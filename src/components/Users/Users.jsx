import React from "react";
import s from './Users.module.css'
import * as axios from 'axios';
import defaultImage from '../../assets/images/user.png'

class Users extends React.Component {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            });

    }

    onChangePage = pageNumber => {
        this.props.setCurrenPage(pageNumber);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        let pageCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
        return (
            <div>
                <div className={s.pagination}>
                    {
                        pages.map(p => {
                            return <button onClick={() => this.onChangePage(p)} key={p}
                                           className={this.props.currentPage === p ? s.active : ''}>{p}</button>
                        })
                    }
                </div>
                {
                    this.props.users.map(u => {
                        return (
                            <div key={u.id}>
                                <div>
                                    <img src={u.photos.small ? u.photos.small : defaultImage} className={s.avatar}/>
                                </div>
                                <div>
                                    <p>{u.name}</p>
                                    <p>{`${'u.location.city'}, ${'u.location.country'}`}</p>
                                    <button onClick={() => this.props.toggleFollow(u.id)}>
                                        {u.followed ? 'Unfollow' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Users;