import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render Cancel Interst notification
 */
class CancelInterest extends Component{
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
                    <NavLink className="LinkText" to={url2 + "user/"+this.props.notification.sender_id} onClick={this.open}>{this.props.notification.sender.firstname} {this.props.notification.sender.lastname}</NavLink> canceled interest in the position  <NavLink className="LinkText" to={url2 + "project/"+this.props.notification.project_id} onClick={this.open}>{this.props.notification.position.title}</NavLink>
                </div>
                
            </div>
        )
    }
}

export default CancelInterest