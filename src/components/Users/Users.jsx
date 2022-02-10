import React from "react";

const Users = props => {
   // if(!props.users.length) {
   //      props.setUsers([
   //          {id: 1, followed: false, fullName: 'Lukas Podolski', avatar: 'https://grantavto.com.ua/files/photos/4/32.jpg', location: {country: 'Belarus', city: 'Minsk'}},
   //          {id: 2, followed: true, fullName: 'Eva Martines', avatar: 'https://c4.wallpaperflare.com/wallpaper/691/864/895/women-face-portrait-gray-eyes-wallpaper-preview.jpg', location: {country: 'Belarus', city: 'Minsk'}},
   //          {id: 3, followed: false, fullName: 'Anna Ferdinandes', avatar: 'https://t3.ftcdn.net/jpg/02/30/78/14/360_F_230781458_ER2KGThsKsV05VBN2sFlIDLMP0JEkZ0o.jpg', location: {country: 'Belarus', city: 'Minsk'}}
   //      ])
   //  }

    let users = props.users.map(u =>  {
        return (
            <div key={u.id}>
                <div>
                    <img src={u.avatar} />
                </div>
                <div>
                    <p>{u.fullName}</p>
                    <p>{`${u.location.city}, ${u.location.country}`}</p>
                    <button onClick={() => props.toggleFollow(u.id)}>
                        {u.followed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
        )
    })

    return <div>{users}</div>
}

export default Users;