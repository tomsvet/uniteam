import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'
let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component show buttons on deletion or edit users data and pop-up windows
 */
class UsersPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email: this.props.user.email,
            password: '',
            password_confirmation: '',
            showEdit:false,
            errorMessage:'',
            showPassword:false,

        }
       
        this.editUser = this.editUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleShowEditUser =this.handleShowEditUser.bind(this);
        this.handleCloseEditUser = this.handleCloseEditUser.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleClosePassword = this.handleClosePassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    /**
     * This method send request to edit user's data
     * @param {input data} e 
     */
    editUser(e){
        e.preventDefault();
    
        const project = {
            user_id: this.props.user.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname, 
            email:this.state.email,
           
        }
        const thisUrl = url + "api/getAdminUsers";
    
        axios.post(url + 'api/updateUser', project).then(response=> {
            this.props.getData(thisUrl);
            this.handleCloseEditUser();
        })
        .catch(error=> {
        })
    }

    /**
     * This method show pop-up window to edit
     */
    handleShowEditUser(){
        this.setState({
           showEdit: true, 
          })
    }
    
    /**
     * This method close pop-up window to edit
     */
    handleCloseEditUser(){
        this.setState({
           showEdit: false,
            
          })
    }

    /**
     * This method show Reset password pop-up
     */
    handleShowPassword(){
        this.setState({
           showPassword: true,
            
          })
    }
    
    /**
     * This method close Reset password pop-up
     */
    handleClosePassword(){
        this.setState({
           showPassword: false,
            
          })
    }

    /**
     * This method delete user
     */
    handleDeleteUser(event){
        const thisUrl = url + "api/getAdminUsers";

        let data = {
            user_id: event.target.attributes.value.value,
        }

        axios.delete(url + 'api/deletePerson',{params:data}).then(response=> {
            this.props.getData(thisUrl);   
        })
        .catch(error=> {  
        })
    }

    show(id){
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id + "2").innerHTML ="";
    }

    /**
     * Method which show alert
     * @param {user id} id 
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

    resetPassword(){
        const email = this.props.user.email;

        axios.post(url + 'api/password/email', {email})
            .then(response=> { 
                this.handleClosePassword();
            })
        .catch(error=> {
        });
    }

    render(){
        return(
            <div>
                <div  className="myrow PositionIcon ">
                    <div className="column UserPassword" onClick={this.handleShowPassword} value={this.props.user.email} data-toggle="tooltip" data-placement="bottom" title="Change Password"></div>
                    <div className="column PositionUpdate" onClick={this.handleShowEditUser} data-toggle="tooltip" data-placement="bottom" title="Edit User"></div>
                    <div className="column PositionDelete" onClick={this.handleDeleteUser} value={this.props.user.id} data-toggle="tooltip" data-placement="bottom" title="Delete User"></div>
                </div>

                <Modal show={this.state.showEdit} onHide={this.handleCloseEditUser}> 
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleCloseEditUser}>
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change User information?</h2>
                        </div>
                        <form onSubmit={this.editUser} >     
                            <div className="FormField form-row justify-content-center">
                                <div className="form-group col-md-4"> 
                                    <label className="FormField_Label" htmlFor="firstname">   
                                        First name
                                    </label>
                                    <input type="text" id="firstname" className="form-control" placeholder="Enter your First name" value={this.state.firstname} name="firstname" onChange={this.onChange}></input> 
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="FormField_Label" htmlFor="lastname">  
                                        Last name
                                    </label>
                                    <input type="text" id="lastname" className="form-control" placeholder="Enter your Last name" value={this.state.lastname} name="lastname" ref="lastname" onChange={this.onChange} required onInvalid={this.InvalidMsg}></input>
                                </div>
                            </div>
                            <div className="FormField form-row justify-content-center">
                                <div className=" col-md-10">
                                    <label className="FormField_Label" htmlFor="email">
                                        E-mail adress
                                    </label> 
                                    <input type="email" id="email" className="form-control" placeholder="Enter your email" name="email" value={this.state.email} ref="email" onChange={this.onChange}  ></input>
                                </div>
                            </div>
                            <div className="FormButtons">
                                <button type="submit" className="FormField_Button " >Change</button> 
                            </div>
                        </form>        
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showPassword} onHide={this.handleClosePassword}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClosePassword}>
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Reset Password?</h2>
                            <div className="panel-body reset">
                                <div className="form-group">
                                    <Button className="FormField_Button" type="submit" onClick={this.resetPassword}>
                                        Reset 
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>    
                </Modal>
            </div>
        )
    }
}

export default UsersPopup