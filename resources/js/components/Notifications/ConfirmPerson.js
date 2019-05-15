import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render Confirm Person notification
 */
class ConfirmPerson extends Component{
    constructor(props){
        super(props);

        this.AddPerson = this.AddPerson.bind(this);
        this.isActivate = this.isActivate.bind(this);
        this.RejectPerson = this.RejectPerson.bind(this);
        this.open = this.open.bind(this);
    }

    /**
     * This method send request to add a person
     */
    AddPerson(e){
        const person = { 
            user_id: this.props.clickedPerson.user.id,
        };

        axios.post(url + 'api/AddPerson', person)
        .then(response=> {
            this.props.getData();
        })
        .catch(error=> {
        })
    }

    /**
     * This method send request to reject a person
     */
    RejectPerson(e){
        const person = { 
            user_id: this.props.clickedPerson.user.id,
        };

        axios.post(url + 'api/RejectPerson', person)
        .then(response=> {
            this.props.getData();  
        })
        .catch(error=> {
        })
    }

    open(){
        
        this.props.getProjectData(this.props.notification.project.id);
        this.props.close();
        
    }

    /**
     * Render Add or Reject buttons
     */
    isActivate(){
        if(this.props.clickedPerson.activate == 0){
            return(
                <div>
                    <span className="mr-20">
                        <button  className=" InterestButton" onClick={this.RejectPerson} style={{display:'inline-block'}}>Reject</button>
                    </span>
                    <button className=" InterestButton" onClick={this.AddPerson} style={{display:'inline-block'}}>Add</button>
                </div>
                
            ); 
        }else{
            return <div>Added</div>
        }
    }

    render(){
        return(
            <div className="NotificationPanel">
                <div className="InterestPosition">
                    <NavLink className="LinkText" to={url2 + "user/"+this.props.clickedPerson.user.id} onClick={this.open}>{this.props.clickedPerson.user.firstname} {this.props.clickedPerson.user.lastname}</NavLink> wants to be added to   <span className="mainWords">UNI.TEAM</span>
                </div>
                <div className="NotificationFooter"> 
                    <div className="ChooseButtonNotification ">
                        {this.isActivate()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmPerson
