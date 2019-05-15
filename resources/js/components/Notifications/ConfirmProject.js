import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render Confirm Project notification
 */
class ConfirmProject extends Component{
    constructor(props){
        super(props)

        this.ApproveProject = this.ApproveProject.bind(this);
        this.RefuseProject = this.RefuseProject.bind(this);
        this.isConfirm = this.isConfirm.bind(this);
        this.open = this.open.bind(this);
    }

    /**
     * This method send request to approve a project
     */
    ApproveProject(){
        const approve = { 
            project_id: this.props.notification.project_id,
            recipient_id: this.props.clickedPerson.id,
            sender_id: this.props.user.id,
            

        };

        axios.post(url + 'api/ApproveProject', approve)
        .then(response=> {
            this.props.getData(); 
        })
        .catch(error=> {
        })
    }

    /**
     * This method send request to reject a project
     */
    RefuseProject(e){
        const approve = { 
            project_id: this.props.notification.project.id,
            recipient_id: this.props.clickedPerson.id,
            sender_id: this.props.user.id,
            type:'rejectProject',

        };

        axios.delete(url + 'api/RejectProject', {params:approve})
        .then(response=> {
            this.props.getData();
        })
        .catch(error=> {
        })
    }


    /**
     * Render approve and reject button 
     */
    isConfirm(){
        if( this.props.notification.visibility == 0){
           return(
            <div>
                <span className="mr-20">
                    <button id={this.props.notification.id} className=" InterestButton" onClick={this.RefuseProject} style={{display:'inline-block'}}>Reject</button>
                </span>
                <button id={this.props.notification.id} className=" InterestButton" onClick={this.ApproveProject} style={{display:'inline-block'}}>Approve</button>
            </div>)
        }else if(this.props.notification.visibility == -1){

            return<div>Rejected</div>;

        }else{
            return <div>Approved</div>;
            }
        
    }


    open(){
        
        this.props.getProjectData(this.props.notification.project.id);
        this.props.close();
        
    }


    render(){
        return(
            <div className="NotificationPanel">
                <div className="InterestPosition">
                   
                    <NavLink className="LinkText" to={url2 + "user/"+this.props.clickedPerson.user.id} onClick={this.open}>
                        {this.props.clickedPerson.user.firstname} {this.props.clickedPerson.user.lastname}
                    </NavLink> wants  to create a project <NavLink className="LinkText" to={url2 + "project/"+this.props.notification.project.id} onClick={this.open}>
                        {this.props.notification.project.title}
                    </NavLink>
                </div>

                <div className="NotificationFooter">
                    <div className="ChooseButtonNotification ">
                        {this.isConfirm()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmProject