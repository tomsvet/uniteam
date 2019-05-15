import React, { Component } from 'react'
import { Button, Modal} from 'react-bootstrap'
import LeftCard from './LeftCard';
import { Link } from 'react-router-dom'
import Navbar from '../Home/Navbar'
import axios from 'axios'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component show message
 */
class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            answer:'',
            message:{},
            project:{},
            position:{},
            sender:{},
            loading:0,
            checkBox:false,
        }
        this.onChange = this.onChange.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.downloadCV = this.downloadCV.bind(this);
        this.isCV = this.isCV.bind(this);
        this.isMyCV = this.isMyCV.bind(this);
    }

    componentDidMount(e){
        this.getMessage();
    }

    /**
     * Method which get message's data 
     */
    getMessage(){
        const messageId = this.props.match.params.id;

        axios.get(url + `api/message/${messageId}`).then(response => {
            this.setState({
                message: response.data,
                loading:1,
            })  
        })
    }

    /**
     * Method to send answer 
     * @param {input data} e 
     */
    sendAnswer(e){
        e.preventDefault();
        const answer = {
            message: this.state.answer,
            project_id: this.state.message.project.id,
            position_id: this.state.message.position_id,
            sender_id: this.props.user.id,
            recipient_id: this.state.message.sender_id,
            type: 'message',
            cv:this.state.checkBox ,
            
          }

        axios.post(url + 'api/message/sendAnswer',answer )
        .then(response=> {
            this.props.history.push(url2+'messages');
           
        })
        .catch(error=> {
            
        });
    }

     /**
     * Methods to load data from forms
     * @param {form data} e 
     */
    onChange(e){
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        });
    }

    /**
     * Method to download a CV
     */
    downloadCV(){
        const Id = this.state.message.sender_id;

        axios.get(url + `api/downloadCV/${Id}`)
        .then(response=> {
            window.open(response.data); 
        })
    }

    /**
     * This method render CV link . 
     */
    isCV(){
        if (this.state.message.cv){
            return(
                <div className="MessageCV">
                <span>
                    Additions: 
                    <span className="MessageHeadText">
                        <div className="ShowCV"  onClick={this.downloadCV}> 
                            Show CV
                        </div>
                    </span> 
                </span>
            </div>
                
            );
        }else{
            return ; 
        }
    }

     /**
     * This method render checkBox to send a CV . 
     */
    isMyCV(){
        if(this.props.user.cv == null){
            return <input type="checkbox" className="form-check-input" id="exampleCheck1" name="checkBox" checked={this.state.checkBox}  onChange={this.onChange} disabled  data-toggle="tooltip" data-placement="bottom" title="You haven't got any CV in profile"/>; 
        }else{
            return <input type="checkbox" className="form-check-input" id="exampleCheck1" name="checkBox" checked={this.state.checkBox}  onChange={this.onChange}/>;
        }
    }

    render(){

        if (this.state.loading != 1){
            return(
                <></>
            );
        }else{

       
        return(
            <div className="Page">
                <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />
                <div className=' justify-content-center'>
                    <div className="PageContent">
                        <div className='row '>
                            <div className='col-md-3 col-sm-12 col-12'>
                                <LeftCard user={this.props.user}  getUser={this.props.getUser} />
                            </div>
                            <div className='col-md-8 col-sm-12 col-12'>
                                <div className="ContentPlaceMessage">
                                    <div className="ContentHead">
                                        Message
                                    </div>
                                    <div className='card '>
                                        <div className="MessageContent">
                                            <div className="MessageAuthor">
                                                Author: <span className="MessageHeadText">{this.state.message.sender.firstname} {this.state.message.sender.lastname}</span>
                                            </div>

                                            <div className="MessageProject">
                                                Project: <span className="MessageHeadText">{this.state.message.project.title}</span>
                                            </div>

                                            <div className="MessageProject">
                                                Position: <span className="MessageHeadText">{this.state.message.position.title} </span>
                                            </div>

                                            <div className="MessageMessage">
                                                <div className="MessageContentText">
                                                    {this.state.message.message}
                                                    <div>{this.isCV()}</div>
                                                    
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className='AnswerTextArea' >  
                                                    <textarea id='answer' row='5' className='form-control' placeholder="Enter your answer" name='answer' value={this.state.answer} onChange={this.onChange} />
                                                </div> 
                                                <div className="MessageProjectCheck">
                                                    <div className="form-check">
                                                        {this.isMyCV()}
                                                        <label className="form-check-label" htmlFor="exampleCheck1">Send CV</label>
                                                    </div> 
                                                </div> 
                                                <div className="text-center">
                                                    <button type="button" className="Answer_Button " onClick={this.sendAnswer}>Send</button> 
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) }
    }
}

export default Message