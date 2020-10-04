import React, { Component } from 'react';
import Search from '../../components/search.component';

export default class UsersList extends Component {
	constructor(){
		super();
		this.state ={
			searchString: ''
		}
	}

	searchUser = (e) => {

		this.setState({searchString:e.target.value })

	}
  render() {
	const {allUsers, history} = this.props
	const {searchString} = this.state
	let filteredUser = allUsers.filter((user) => {
		if (!searchString){
			return user
		}
		else {
			return user.username.includes(searchString.toLowerCase()) ||
				user.userId.includes(searchString.toLowerCase()) ||
				user.name.includes(searchString.toLowerCase())
		}
	})
    return (
		<div className='user-list'> 
			<Search searchUsersHandler={this.searchUser}/>
			<table>
				<thead>
					<tr>
						<th>UserId</th>
						<th>Name</th>
						<th>UserName</th>
						<th>age Verified</th>
					</tr>
				</thead>
				<tbody>
					{(filteredUser  && filteredUser !== undefined) && 
					filteredUser.map((user) => (
					< tr key = {
						user.userId
					}
					onClick = {
						() => history.push(`/admin/users/${user._id}`)
					} >
						<td>{user.userId.split('_')[1]}</td>
						<td>{user.name}</td>
						<td>{user.username}</td>
						<td>{user.ageVerified.toString()}</td>
					</tr>
				))}
				</tbody>
			</table>
			<ul>
        </ul>
      </div>
    );
  }
}
