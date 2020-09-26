import React from 'react'

export default function Search({searchUsersHandler}) {
    return (
        <div className="search-box">
            <input type="search"
                placeholder="Search for Users by username, id or name....."
                onChange={searchUsersHandler}
                className="search-box__input" ></input>
        </div> 
    )
}
