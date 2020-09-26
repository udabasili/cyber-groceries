import React, { Component } from 'react';
import RevenueGraph from '../../components/revenue-graph.component';
import NewUsersGraphs from '../../components/new-users-graph.component';

export default class AdminHome extends Component {
  render() { 
    const{currentUser} = this.props
    return (
      <div className='admin-home'>  
        <NewUsersGraphs currentUser={currentUser}/>
        <RevenueGraph/>
      </div>
    );
  }
}
