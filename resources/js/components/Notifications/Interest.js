import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'

let link = URL;


const url = link.url;
const url2 = link.url2;

/**
 * This component render notification Interest 
 */
class Interest extends Component{
    constructor(props){
        super(props);

        this.chooseApplicant = this.chooseApplicant.bind(this);
        this.isChoosen = this.isChoosen.bind(this);
        this.open = this.open.bind(this);
    }

    /**
     * This method send request to choose a user on position
     */
    chooseApplicant(){
        const choose = { 
            position_id: this.props.notification.position_id,
            user_id: this.props.notification.sender_id,
            type:'choose',

        };

        axios.post(url + 'api/ChooseUser', choose)
        .then(response=> {
            this.props.getData();  
        })
        .catch(error=> {
        })
    }

    /**
     * Method which render button to choose user
     */
    isChoosen(e){
        if( this.props.notification.position.user_id == 0 && this.props.notification.interest != null){
            return <button  className=" InterestButton" onClick={this.chooseApplicant} style={{display:'block'}}>Choose</button>;
        }
        if( this.props.notification.interest == null){
            return <div> </div>;
        }
        return <div>Position is full </div>;
    }

    open(){
        this.props.getProjectData(this.props.notification.project_id);
        this.props.close();   
    }

    render(){
        return(
            <div className="NotificationPanel" style={this.props.notification.read_at === null ?{backgroundColor:'#ededed'}:null}>
                <div className="InterestPosition">
                    <NavLink className="LinkText" to={url2 + "user/"+this.props.notification.sender_id} onClick={this.open}>{this.props.notification.sender.firstname} {this.props.notification.sender.lastname}</NavLink> is interested in the position   <NavLink className="LinkText" to={url2 + "project/"+this.props.notification.project_id} onClick={this.open}>{this.props.notification.position.title}</NavLink>
                </div>
                <div className="NotificationFooter">
                    <div className="ChooseButtonNotification ">
                        {this.isChoosen()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Interest