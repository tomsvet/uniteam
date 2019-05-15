import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;


/**
 * This component render Message's notification
 */
class Message extends Component{
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
                    <span className="mainWords"><Link className="LinkText" to={url2 + "user/"+this.props.notification.sender.id} onClick={this.open}>{this.props.notification.sender.firstname} {this.props.notification.sender.lastname}</Link></span> sent You a <Link className="LinkText" to={url2 + "message/"+this.props.notification.data.message} onClick={this.open}>message</Link> about position <Link className="LinkText" to={url2 + "project/"+this.props.notification.project_id} onClick={this.open}>{this.props.notification.position.title}</Link>
                </div>
            </div>
        )
    }
}

export default Message