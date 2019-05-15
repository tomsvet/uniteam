import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'
import PopupInterest from './PopupInterest';

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * Component which render position element (position information and button)
 */
class PositionButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            hover:false,
            err:false,
            cancel:false,
            interests:this.props.interests,
            showSendMessage:false,
            message:'',
            checkBox:false,
        }

        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.CreateInterest = this.CreateInterest.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleCloseSendMessage = this.handleCloseSendMessage.bind(this);
        this.handleShowSendMessage = this.handleShowSendMessage.bind(this);
        this.setButton = this.setButton.bind(this);
        this.showButton = this.showButton.bind(this);
        this.setCancel = this.setCancel.bind(this);

    
    }

    hoverOn(){
       this.setState({
            hover: true,
          })
          document.getElementById(this.props.position.id).style.display = "block";
    }

    hoverOff(){
         this.setState({
            hover:false,
          })
          document.getElementById(this.props.position.id).style.display = "none";
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

    onChange(e){
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[name]: value});
    }

    componentDidMount(e){
        if (this.props.project.author.id != this.props.user.id){
            this.setButton();
        }
    }

    setButton(){
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

    /**
     * Method which send request to cancel interest
     */
    onClick(){
        const interest = {
            user_id:this.props.user.id,
            position_id:this.props.position.id,
            message:this.state.message,
            project_id:this.props.project.id,
            type:'interest',
            author_id:this.props.project.author.id,
            cv:this.state.checkBox ,
        }
            
            axios.delete(url + 'api/interestCancel',{params:interest})
            .then(response=> {
                this.setState({
                    cancel:false,
                })
                
            }).catch(error=> {
                this.setState({err:true});
            })
       
    }

    /**
     * Render interest button
     */
    showButton(){
        if(this.state.cancel == false){
            return <button id={"but-interest-"+this.props.position.id} className=" InterestButton" onClick={this.handleShowSendMessage} >Interest</button>;
           
        }else{
            return <button id={"but-cancel-"+this.props.position.id} className=" CancelButton" onClick={this.onClick} >Interested</button>;
       }
    }

    handleShowSendMessage(){
        this.setState({  
            showSendMessage: true 
        });
    }
  
    handleCloseSendMessage(){
        this.setState({  
            showSendMessage: false,
         });
    }


    render(){

          const {user }= this.props.user;

          if (this.props.project.author.id == this.props.user.id ){
            return(
                <div>
                    <div className=" PositionTitle" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}  >
                        <div id={this.props.position.id} className="hoverCard" style={{display:'none'}}>
                            <div className="PositionTitleHoverPanel"> 
                                {this.props.position.title}
                            </div>
                            <div className="PositionHoverPanelContent">
                                <div className="PositionHoverPanelType"> 
                                    <div className="">
                                        Category: {this.props.position.category.name} 
                                    </div> 
                                    <div className="">
                                        Fee: {this.props.position.fee}
                                    </div> 
                                </div>
                                <div className="PositionHoverPanelDescription"> 
                                    {this.props.position.description} 
                                </div>
                            </div> 
                        </div>
                        {this.props.position.title}
                    </div>                  
                </div> 
            )      
          }else{

        return(
            <div>
                <div className="myrow">
                    <div className="column">
                        <div className=" PositionTitle" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}  >
                            <div id={this.props.position.id} className="hoverCard" style={{display:'none'}}>
                                <div className="PositionTitleHoverPanel"> 
                                    {this.props.position.title}
                                </div>
                                <div className="PositionHoverPanelContent">
                                    <div className="PositionHoverPanelType"> 
                                        <div className="">
                                            Category: {this.props.position.category.name} 
                                        </div> 
                                        <div className="">
                                            Fee: {this.props.position.fee}
                                        </div> 
                                    </div>
                                    <div className="PositionHoverPanelDescription">
                                        {this.props.position.description}
                                    </div>
                                </div>
                            </div>
                            {this.props.position.title}
                        </div>
                    </div>
                    <div className="column">
                        <div className="height-center">
                            {this.showButton()}
                        </div>
                    </div>
                </div>
                <PopupInterest setCancel={this.setCancel} position={this.props.position} user={this.props.user} project={this.props.project} showSendMessage={this.state.showSendMessage} handleCloseSendMessage={this.handleCloseSendMessage}/>
            </div>
        )
    }}
}

export default PositionButton
