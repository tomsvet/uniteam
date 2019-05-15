import React, { Component } from 'react'



/**
 * This component show project preview in notifications
 */
class ProjectNotification extends Component{
    constructor(props){
        super(props)
        this.state = {
            clicked : false,
        }
        this.clicked = this.clicked.bind(this);
        this.isNewProjectNotification = this.isNewProjectNotification.bind(this);
    }       

    clicked(){
        this.props.handleShowId(this.props.notifications);

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
            <div className={this.props.clickedProject === this.props.notifications.project_id ? 'NotificationProjectActive' : 'NotificationProject'} onClick={this.clicked} >
                <div className="NotificationProjectText">
                    {this.props.notifications.title}
                </div>
                <div className="NotificationProjectAuthor">
                    Author: {this.props.notifications.author.firstname} {this.props.notifications.author.lastname}
                </div>
                {this.isNewProjectNotification()}
            </div>
        )
    }
}

export default ProjectNotification