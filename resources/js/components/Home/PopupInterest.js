import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx';

let link = URL;


const url = link.url;
const url2 = link.url2;

/**
 * This component render Interest pop-up window
 */
class PopupInterest extends Component{
    constructor(props){
        super(props);
        this.state = {
            err:false,
            message:'',
            checkBox:false,
        }

        this.onChange = this.onChange.bind(this);
        this.isCV = this.isCV.bind(this);
        this.CreateInterest = this.CreateInterest.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    /**
     * Method to load data from forms
     * @param {form data} e 
     */
    onChange(e){
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        });
    }

    isCV(){
        if(this.props.user.cv == null){
            return <input type="checkbox" className="form-check-input" id="exampleCheck1" name="checkBox" checked={this.state.checkBox}  onChange={this.onChange} disabled  data-toggle="tooltip" data-placement="bottom" title="You haven't got any CV in profile"/>; 
        }else{
            return <input type="checkbox" className="form-check-input" id="exampleCheck1" name="checkBox" checked={this.state.checkBox}  onChange={this.onChange}/>;
        }
    }

    /**
     * Method which send request to create interest
     */
    CreateInterest(){

        if (this.state.message == '') {
            document.getElementById("passwordAlert").style.visibility = "visible";
            document.getElementById("passwordAlert2").innerHTML = "Message can't be empty!";
            return;
        }

        const interest = {
            user_id:this.props.user.id,
            position_id:this.props.position.id,
            message:this.state.message,
            project_id:this.props.project.id,
            type:'interest',
            author_id:this.props.project.author.id,
            cv:this.state.checkBox ,
        }
        axios.post(url  + 'api/interest', interest)
                .then(response=> {
                    this.props.setCancel();
                }).catch(error=> {
                    this.setState({err:true});
                })
        this.props.handleCloseSendMessage();
    }



    handleClose(){
        this.props.handleCloseSendMessage;
    }

    show(id){
        document.getElementById(id).style.visibility = "hidden";
    }

    /**
     * Render alert after mistake in form.
     */
    showAlert(id){
        return(
            <div  className=" alert alert-danger alert-dismissible fade show" role="alert">
                <span id={id+"2"}></span>
                <button type="button" className="close"  onClick={() =>this.show(id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }


    render(){
        return(
            <div>
                <Modal show={this.props.showSendMessage} dialogClassName="modal-50w" centered onHide={this.props.handleCloseSendMessage}> 
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.props.handleCloseSendMessage}>
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Send a request?</h2>
                            <p>Write a message to the author of the project.</p>
                        </div>

                        <div className="myrow  justify-content-center">
                            <div className="col-md-12 ">
                                <div className="">
                                    <div className="MessageMessage">
                                        <div className="MessageAuthor">
                                            Author: 
                                            <span className="MessageHeadText">{this.props.project.author.firstname} {this.props.project.author.lastname}</span>
                                        </div>
                                        <div className="MessageProject">
                                            Project: 
                                            <span className="MessageHeadText">{this.props.project.title}</span>
                                        </div>
                                        <div className="MessageProject">
                                            Position: 
                                            <span className="MessageHeadText">{this.props.position.title} </span>
                                        </div>
                                        <div className="">
                                            <div>  
                                                <label className="FormField_Label" htmlFor='message'>
                                                    <div className="myrow">
                                                        <div className="rightcolumn40 pad10"> 
                                                            Message:
                                                        </div>
                                                        <div id="passwordAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                                {this.showAlert("passwordAlert")}
                                                        </div>
                                                    </div>
                                                </label>
                                                <textarea id='message' row='10' className='form-control' name='message' value={this.state.message} onChange={this.onChange} />
                                            </div> 
                                        </div>
                                        <div className="MessageProjectCheck">
                                            <div className="form-check">
                                                {this.isCV()}
                                                <label className="form-check-label" for="exampleCheck1">
                                                    Send CV
                                                </label>
                                            </div> 
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div className="FormButtons">
                            <button type="button" className="FormField_Button " onClick={this.CreateInterest}>Send and Interest</button> 
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default PopupInterest