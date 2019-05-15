import React, { Component } from 'react'
import { Button, Modal} from 'react-bootstrap'
import LeftCard from './LeftCard';
import Navbar from '../Home/Navbar'
import axios from 'axios'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render page to update account information
 */
class Account extends Component{
    constructor(props){
        super(props);
        this.state = {
            showEmail:false,
            showPassword:false,
            err: false,
            newEmail:'',
            newPassword:'',
            newPasswordConfirm:'',
            oldPassword:'',
        }

        this.handleShowEmail = this.handleShowEmail.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Methods to load data from forms
     * @param {form data} e 
     */
    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    /**
     * Show Change email pop-up
     */
    handleShowEmail(){
        this.setState({ 
            showEmail: true 
        });
    }

    /**
     * Show Change password pop-up
     */
    handleShowPassword(){
        this.setState({ 
            showPassword: true 
        });
    }

    /**
     * Close all pop-up windows
     */
    handleClose(){
        this.setState({ 
            showEmail: false,
            showPassword: false,
        });
    }

    /**
     * This method send request to change email
     * @param {input data} e 
     */
    updateEmail(e){
        e.preventDefault();

        const data = {
            email: this.state.newEmail,
            id: this.props.user.id,
        }

        axios.post(url + 'api/updateEmail', data).then(response=> {
            this.handleClose();
            this.props.history.push(url2 + "account");
        })
        .catch(error=> {
            this.setState({err:true});
        })
    }

    /**
     * This method send request to change password
     * @param {input data} e 
     */
    updatePassword(e){
        e.preventDefault();

        const data = {
            password: this.state.newPassword,
            password_confirmation: this.state.newPasswordConfirm,
            old_password: this.state.oldPassword,
        }

        axios.post(url + 'api/updatePassword', data).then(response=> {
            this.handleClose();
            this.props.history.push(url2);
        })
        .catch(error=> {
            this.setState({err:true});
        })
    }



    render(){
        return(
            <div className="Page">
                <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />

                <div className=' justify-content-center'>
                    <div className="PageContent">
                        <div className='row '>
                            <div className='col-md-3'>
                                <LeftCard user={this.props.user}  getUser={this.props.getUser} />
                            </div>
                            <div className='col-lg-8 col-md-9 col-sm-12 col-12'>
                                <div className="ContentPlace">
                                    <div className="ContentHead">
                                        Account Settings
                                    </div>
                                    <div className="ContentBorder">
                                        <div className="Content">
                                            <div className="FirstLine">
                                                <div className="row ">
                                                    <div className=' col-3 col-sm-3 col-md-3  '>
                                                        <div className="FirstRow">
                                                            Email:
                                                        </div>
                                                    </div>
                                                    <div className=' col-9 col-sm-9 col-md-6'>
                                                        {this.props.user.email}
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-3 text-center'>
                                                        <button type="button" className="AddPositionButton" onClick={this.handleShowEmail}> Change</button>   
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="LastLine">
                                                <div className="row ">
                                                    <div className='col-3 col-sm-3 col-md-3  '>
                                                        <div className="FirstRow">
                                                            Password:
                                                        </div>
                                                    </div>
                                                    <div className='col-9 col-sm-9 col-md-6'>
                                                        *******
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-3 text-center'>
                                                        <button type="button" className="AddPositionButton" onClick={this.handleShowPassword}>  Change</button>        
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

                <Modal show={this.state.showEmail} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change Email?</h2>
                            <p>You can change your email here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.updateEmail}>
                                    <div className="form-group">
                                        <input id="email" name="newEmail" value={this.state.newEmail} placeholder="Enter your new email address" className="form-control"  type="email" onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                            Change Email
                                        </Button>
                                    </div>    
                                </form>                    
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showPassword} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change Password?</h2>
                            <p>You can change your password here.</p>
                            <div className="panel-body">
                                <form role="form" autoComplete="off" className="form" method="post" onSubmit={this.updatePassword} >
                                    <div className="form-group">
                                        <label className="FormField_Label" htmlFor="password">Old Password</label>
                                        <input id="oldPassword" name="oldPassword" placeholder="Enter your password" className="form-control"  type="password" value={this.state.oldPassword} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="FormField_Label" htmlFor="newPassword">New Password</label>
                                        <input id="newPassword" name="newPassword" placeholder="Enter your new password" className="form-control"  type="password" value={this.state.newPassword} onChange={this.onChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label className="FormField_Label" htmlFor="newPasswordConfirm">New Password Confirmation</label>
                                        <input id="newPasswordConfirm" name="newPasswordConfirm" placeholder="Enter your new password" className="form-control"  type="password" value={this.state.newPasswordConfirm} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                            Reset Password
                                        </Button>
                                    </div>
                                </form>                    
                            </div>
                        </div>
                    
                    </Modal.Body> 
                </Modal>
            </div>
        )
    }
}

export default Account