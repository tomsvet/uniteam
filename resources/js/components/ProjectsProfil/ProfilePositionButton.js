import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap';
import PopupInterest from '../Home/PopupInterest';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

class ProfilePositionButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            hover:false,
            err:false,
            cancel:false,
            interests:this.props.interests,
            showSendMessage:false,
            message:'',
        }

       
        this.CreateInterest = this.CreateInterest.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleCloseSendMessage = this.handleCloseSendMessage.bind(this);
        this.handleShowSendMessage = this.handleShowSendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showButton = this.showButton.bind(this);
        this.setCancel = this.setCancel.bind(this);

    
    }


    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }


    componentDidMount(e){
        var a = 0;
        this.props.position.interests.map(interest => {
            if (interest.user_id ==  this.props.user.id){
                a = 1
            }
        })

        if (a === 1){
            this.setState({
                    cancel:true,
                })
        }else{
            this.setState({
                cancel:false,
            })   
        }  
    }

    setCancel(){
        this.setState({
            cancel:true,
        })
    }

    CreateInterest(){
        this.onClick();
        this.handleCloseSendMessage();
    }


    onClick(){
        const interest = {
            user_id:this.props.user.id,
            position_id:this.props.position.id,
            message:this.state.message,
            project_id:this.props.project.id,
            type:'interest',
            author_id:this.props.project.author.id,
        }
            
        axios.delete(url + 'api/interestCancel', {params:interest}).then(response=> {
            this.setState({
                cancel:false,
            })
                /*document.getElementById("but-interest-"+this.props.position.id).style.display = "block";
                document.getElementById("but-cancel-"+this.props.position.id).style.display = "none";*/
        })
        .catch(error=> {
            this.setState({err:true});
        })
    }

    handleShowSendMessage(){
        this.setState({  
            showSendMessage: true 
        });
    }
  
    handleCloseSendMessage(){
        this.setState({  
            showSendMessage: false 
        });
    }

    showButton(){
        if(this.state.cancel == false){
            return <button id={"but-interest-"+this.props.position.id} className=" InterestButton" onClick={this.handleShowSendMessage} >Interest</button>;
        }else{
            return <button id={"but-cancel-"+this.props.position.id} className=" CancelButton" onClick={this.onClick} >Interested</button>;
       }
    }

    render(){

        if (this.props.project.state != '1' && this.props.project.state != '2'){
            return(
                <div>

                </div>
            )
        }else{
        return(
            <div>
                <div className="mb5 mt5">
                    {this.showButton()} 
                </div>

                <PopupInterest setCancel={this.setCancel} position={this.props.position} user={this.props.user} project={this.props.project} showSendMessage={this.state.showSendMessage} handleCloseSendMessage={this.handleCloseSendMessage}/>
            </div>
        )}
    }
}

export default ProfilePositionButton