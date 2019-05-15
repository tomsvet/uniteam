import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import URL from '../URL.jsx'


let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render admin navbar
 */
class AdminNavbar extends Component{
    constructor(props){
        super(props);
        
        this.logout = this.logout.bind(this); 
    }

    /**
     * Method to logout user
     */
    logout(){
        axios.post(url2 + 'api/logout')
        .then(response=> {
            this.props.DeleteUser();
            this.props.history.push(url2);
        })
        .catch(error=> {
        });
    }

    render(){
        return(
            <div>
                <nav className="navbar  navbar-expand-md navbar-dark fixed-top navbar-bg flex-nowrap p-0  justify-content-between">
                    <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-center" href={url2+"/admin/dashboard"}>UNI.TEAM</a>
                    <button  className="navbar-toggler relative" onClick={this.logout} data-toggle="tooltip" data-placement="bottom" title="Show Notifications">
                            <div className="logout" ></div>           
                    </button>
                    <div className="relative visibility" >
                        <ul className="navbar-nav px-3  mr5">
                            <li className="nav-item text-nowrap">
                                <a className="nav-link signOut" onClick={this.logout}>Sign out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <div className="collapse navbar-collapse sidebarShow" id="navbarCollapse">
                        <nav className="col-md-2  bg-light sidebar ">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'admin/dashboard'}>
                                            <span className="dashboardIcon"></span>
                                            <span className="menuItem">Dashboard </span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'admin/projects'}>  
                                            <span className="projectsIcon"></span>
                                            <span className="menuItem">Projects </span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'admin/users'}>                                       
                                            <span className="usersIcon"></span>
                                            <span className="menuItem">Users </span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'admin/positions'}>                                 
                                            <span className="positionsIcon"></span>
                                            <span className="menuItem">Positions </span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'admin/categories'}>                                      
                                            <span className="categoriesIcon"></span>
                                            <span className="menuItem">Types of position </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminNavbar
