import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';


/**
 * This component show person preview in notifications
 */
class PeopleNotification extends Component{
    constructor(props){
        super(props)
        this.state = {
            clicked : false,
        }
        this.clicked = this.clicked.bind(this);
        this.isNewProjectNotification = this.isNewProjectNotification.bind(this);
    }       

    clicked(){
        this.props.handleShowPerson(this.props.notifications);
    }

    /**
     * Method to render an alert of new notification
     */
    isNewProjectNotification(){
        if(this.props.new != 0){
            return <div className="newProjectNotification">{this.props.new}</div>; 
        }else{
            return;
        }
    }
    

    render(){
        return(
            <div className={this.props.clickedPerson.id === this.props.notifications.id ? 'NotificationProjectActive' : 'NotificationProject'} onClick={this.clicked} >
                <div className="NotificationPersonText">
                    {this.props.notifications.user.firstname} {this.props.notifications.user.lastname}
                </div>
                {this.isNewProjectNotification()}
            </div>
        )
    }
}

export default PeopleNotification