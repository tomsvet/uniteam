import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap'
import URL from '../URL.jsx'

let link = URL;


const url = link.url;
const url2 = link.url2;

/**
 * This component render SignIn page.
 */
class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            resetEmail:'',
            showForgot: false,
            errorMessage:'',
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.way = this.way.bind(this);
        this.validateData = this.validateData.bind(this);
        this.showNotice = this.showNotice.bind(this);
    }

    /**
     * Methods to load data from forms
     * @param {form data} e 
     */
    onChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
        });
    }

    /**
     * Form data validation 
     */
    validateData(){
        var retValue = true;

        /* Email validation */ 
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)))
        {
            retValue = false;
            if(this.state.email == ''){
                document.getElementById("emailAlert").style.visibility = "visible";
                document.getElementById("emailAlert2").innerHTML = "Please fill out this field!";
            }else{
                document.getElementById("emailAlert").style.visibility = "visible";
                document.getElementById("emailAlert2").innerHTML = "You have entered an invalid email address!";
            }  
        }else{
            document.getElementById("emailAlert").style.visibility = "hidden";
        }
       
        if (this.state.password == ''){
            retValue = false;
                document.getElementById("passwordAlert").style.visibility = "visible";
                document.getElementById("passwordAlert2").innerHTML = "Please fill out this field!";
            
        }else if(this.state.password.length < 6 ){
            retValue = false;
            document.getElementById("passwordAlert").style.visibility = "visible";
            document.getElementById("passwordAlert2").innerHTML = "Password must have at least 6 character!";
        }else{
            document.getElementById("passwordAlert").style.visibility = "hidden";
        }

        return  retValue;
      
    }


    way(type){
        if(type == 'admin'){
            setTimeout(this.props.history.push("admin/dashboard"),500);    
        }else{
            this.props.history.push(url2 + "projects");
        }
    }


    /**
     * Sending login form
     * @param {*} e 
     */
    onSubmit(e){
        var type;
        e.preventDefault();

        if( this.validateData() == false){
           return false;
        }
        
        const {email , password} = this.state;
        axios.post(url + 'api/login', {email,password})
        .then(response=> {
            this.setState({err:false});
            this.props.setUser(this.way);   
        })
        .catch(error=> {

            if (typeof error.response.data.errors.email !== 'undefined') {
                document.getElementById("passwordAlert").style.visibility = "visible";
                document.getElementById("passwordAlert2").innerHTML = "Wrong combination email/password!";
            }
        });

    }

    show(id){
        document.getElementById(id).style.visibility = "hidden";
    }
    /**
     * Rendering alert to the component
     * @param {*} id 
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

    /**
     * Show Forget password pop-up.
     */
    handleShow(){
        this.setState({ 
            showForgot: true 
        });
    }

    /**
     * Close Forget password pop-up
     */
    handleClose(){
        this.setState({ 
            showForgot: false 
        });
    }

    /**
     * Reset password method
     * @param {form data} e 
     */
    resetPassword(e){
       e.preventDefault();

       if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.resetEmail)))
        {
            if(this.state.resetEmail == ''){
                document.getElementById("resetEmailAlert").style.visibility = "visible";
                document.getElementById("resetEmailAlert2").innerHTML = "Please fill out this field!";
            }else{
                document.getElementById("resetEmailAlert").style.visibility = "visible";
                document.getElementById("resetEmailAlert2").innerHTML = "You have entered an invalid email address!";
            }
            
            return false;
            
        }else{
            document.getElementById("emailAlert").style.visibility = "hidden";
        }

        const email = this.state.resetEmail;
        axios.post(url + 'api/password/email', {email})
        .then(response=> { 
            this.handleClose();
        })
        .catch(error=> {
            
        });


        
    }

    /**
     * Render alert after registration.
     */

    showNotice(){
       if(this.props.registered == 1){
           return (
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Your supervisor must approve you,then you can login.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
           );
       }else if(this.props.registered == 2){
            return(
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                You are registered successfully,now you can login.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            );
       }
       return;
    }

    

    render() {
        return (
            <>
                <Modal show={this.state.showForgot} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Forgot Password?</h2>
                            <p>You can reset your password here.</p>
                            <div className="panel-body">
                                <form id="register-form" role="form" autoComplete="off" className="form" method="post">

                                    <label className="FormField_Label" htmlFor="email">
                                        <div className="myrow">
                                            <div className="rightcolumn40 pad10"
                                                >E-mail adress
                                            </div> 
                                            <div id="resetEmailAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                {this.showAlert("resetEmailAlert")}
                                            </div>
                                        </div> 
                                    </label>
                                    <div className="form-group">
                                        <input id=" resetEmail" name="resetEmail" placeholder="Enter your email" className="form-control"  type="email" value={this.state.resetEmail} ref="email" onChange={this.onChange} required />
                                    </div>

                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" onClick={this.resetPassword}>
                                            Reset Password
                                        </Button>
                                    </div>
                                            
                                </form>                    
                            
                            </div>
                        </div>
                    </Modal.Body>    
                </Modal>

                <div className= "Main myrow">
                    <div className="Main_Left col-md-6 col-sm-12 col-12">
                        <div className="info">
                            <div className="infoPlace"/>
                            <div className="infoText">
                                Do you want to be a part of project?
                            </div>
                            <div className="infoText">
                                Do you have an idea but no people?
                            </div>
                            <div className="infoHeader">
                                Start now to be part of a UNI.TEAM
                            </div>
                        </div>
                    </div>
                    <div className="Main_Right col-md-6 col-sm-12 col-12 SignIn_Content">
                        <div className="">
                            <div className="FormHead_SignIn">
                                Sign in to <span className="uniteam">UNI.TEAM</span>
                            </div>
                            <div className="Main_Form">

                                <div className="SignNotice ">
                                    {this.showNotice()}
                                </div>

                                <div className="FormBody_SignIn">
                                    <form  noValidate className="FormFields" role="form" method="POST" onSubmit={this.onSubmit} >

                                        <div className="FormField">
                                            <label className="FormField_Label" htmlFor="email">
                                                <div className="myrow">
                                                    <div className="rightcolumn40 pad10">E-mail adress</div> 
                                                    <div id="emailAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                        {this.showAlert("emailAlert")}
                                                    </div>
                                                </div>
                                            </label>
                                            <input type="email" id="email" className="form-control" placeholder="Enter your email" name="email" value={this.state.email} ref="email" onChange={this.onChange} ></input>
                                        </div>

                                        <div className="FormField">
                                            <label className="FormField_Label" htmlFor="Password">
                                                <div className="myrow">
                                                    <div className="rightcolumn40 pad10">Password</div> 
                                                    <div id="passwordAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                        {this.showAlert("passwordAlert")}
                                                    </div>
                                                </div>
                                            </label>
                                            <input type="password" id="password" className="form-control" placeholder="Enter your password" name="password" value={this.state.password} ref="password" onChange={this.onChange}></input>
                                            <div className="FormForgot">
                                                <div className="forgot-link" onClick={this.handleShow}> Forgot your password ?</div>
                                            </div>
                                        </div>
                                

                                        <div className="FormButtons">
                                            <button type="submit" className="FormField_Button">
                                                Sign In
                                            </button> 
                                        </div>

                                        <div className="FormButtons">
                                            <Link className='FormField_Link ' to={url2+'signup'} >
                                                Create new account
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </>
        );
    }
}

export default SignIn;