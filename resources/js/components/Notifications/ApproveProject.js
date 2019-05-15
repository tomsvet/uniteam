import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render Approve Project notification
 */
class ApproveProject extends Component{
    constructor(props){
        super(props)

        this.open = this.open.bind(this);
    }

    open(){
        this.props.getProjectData(this.props.notification.project.id);
        this.props.close();
    }

    render(){
        return(
            <div className="NotificationPanel">
                <div className="InterestPosition">
                    This    <NavLink className="LinkText" to={url2 + "project/"+this.props.notification.project_id} onClick={this.open}>project</NavLink> was approved by supervisor  <NavLink className="LinkText" to={url2 + "user/"+this.props.notification.project_id} onClick={this.open}>{this.props.notification.sender.firstname} {this.props.notification.sender.lastname}</NavLink>
                </div>  
            </div>
        )
    }
}

export default ApproveProject