import React, { Component } from 'react';
import Navbar from '../Home/Navbar';
import UserLists from './UserLists';

/**
 * Component which render users page
 */
class Users extends Component {

    render() {
        return (
            <div className="Page"> 
                <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser}/> 
                <div className= "Main ">
                    <div className='container '>
                        <div className='row justify-content-center'>
                            <div className='col-md-9'>
                                <UserLists auth_user={this.props.user}/>
                            </div>            
                        </div>            
                    </div>      
                </div>    
            </div>
        );
    }
}

export default Users;