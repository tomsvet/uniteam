import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render Expired Project notification
 */
class ExpiredProject extends Component{
    constructor(props){
        super(props)

        this.open = this.open.bind(this);
    }
    
    open(){
        this.props.getProjectData(this.props.notification.project_id);
        this.props.close(); 
    }

    render(){
        return(
            <div className="NotificationPanel">
                <div className="InterestPosition">
                    <NavLink className="LinkText" to={url2 + "project/"+this.props.notification.project_id} onClick={this.open}>This project</NavLink> was expired.
                </div>
            </div>
        )
    }
}

export default ExpiredProject