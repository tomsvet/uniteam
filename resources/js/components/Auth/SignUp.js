import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;



/**
 * Component which render Registration page.
 */
class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email: '',
            password: '',
            password_confirmation: '',
            type:'university',
            supervisor:0,
            supervisors:[],
            errorMessage:'',

        }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showSupervisor = this.showSupervisor.bind(this);
    this.Twofunctions = this.Twofunctions.bind(this);
    this.getSupervisors = this.getSupervisors.bind(this);
    this.way = this.way.bind(this);
    this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount(e){
        this.getSupervisors();
    }

    way(type){     
        this.props.history.push(url2);    
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
                document.getElementById("emailAlert2").innerHTML = "Please fill out field!";
            }else{
                document.getElementById("emailAlert").style.visibility = "visible";
                document.getElementById("emailAlert2").innerHTML = "You have entered an invalid email address!";
            }  
        }else{
            document.getElementById("emailAlert").style.visibility = "hidden";
        }
    
        /* Password validation */
        if (this.state.password == ''){
            retValue = false;
            document.getElementById("passwordAlert").style.visibility = "visible";
            document.getElementById("passwordAlert2").innerHTML = "Please fill out field!";
            
        }else if(this.state.password.length < 6 ){
            retValue = false;
            document.getElementById("passwordAlert").style.visibility = "visible";
            document.getElementById("passwordAlert2").innerHTML = "Password must have at least 6 character!";
        }else{
            document.getElementById("passwordAlert").style.visibility = "hidden";
        }

        /* Password confirm validation */
        if (this.state.password_confirmation == ''){
            retValue = false;
            document.getElementById("passwordConfirmAlert").style.visibility = "visible";
            document.getElementById("passwordConfirmAlert2").innerHTML = "Please fill out field!";
            
        }else if(this.state.password_confirmation.length < 6 ){
            retValue = false;
            document.getElementById("passwordConfirmAlert").style.visibility = "visible";
            document.getElementById("passwordConfirmAlert2").innerHTML = "Password must have at least 6 character!";
        }else if(this.state.password != this.state.password_confirmation ){
            retValue = false;
            document.getElementById("passwordAlert").style.visibility = "visible";
            document.getElementById("passwordAlert2").innerHTML = "The password confirmation does not match.";
        }else{
            document.getElementById("passwordConfirmAlert").style.visibility = "hidden";
        }

        /* Firstname validation */
        if (this.state.firstname == ''){
            retValue = false;
            document.getElementById("firstnameAlert").style.visibility = "visible";
            document.getElementById("firstnameAlert2").innerHTML = "Please fill out field!";
            
        }else{
            document.getElementById("firstnameAlert").style.visibility = "hidden";
        }

        /* Lastname validation */
        if (this.state.lastname == ''){
            retValue = false;
            document.getElementById("lastnameAlert").style.visibility = "visible";
            document.getElementById("lastnameAlert2").innerHTML = "Please fill out this field!";
            
        }else{
            document.getElementById("lastnameAlert").style.visibility = "hidden";
        }
        return  retValue;
  
    }

    /**
     * Methods which send request to get all supervisors
     * 
     */
    getSupervisors(){
        axios.get(url + 'api/supervisor')
        .then(response => {
            this.setState({
              supervisors: response.data 
            })
          })
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
     * Method to create registration
     * @param {form data} e 
     */
    onSubmit(e){
        e.preventDefault();

        if( this.validateData() == false){
            this.setState({
               password:'',
               password_confirmation:'',
            })
            document.getElementById("password").value = "";
            document.getElementById("passwordConfirm").value = "";
            return false;
        }

      
        if(this.state.type === "university"){
            this.setState({
                supervisor:0,
            })
        }

        const user = {
            firstname:this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            type: this.state.type,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            supervisor_id:this.state.supervisor,
        }

        axios.post(url+'api/register',user )
        .then(response=> {
            this.props.setUser(this.way,user.type);
        })
        .catch(error =>{
            if (typeof error.response.data.errors.email !== 'undefined') {
                document.getElementById("emailAlert").style.visibility = "visible";
                document.getElementById("emailAlert2").innerHTML = "The email has already been taken.";
            }
        })
    }

    showSupervisor(e){
        if(this.state.type === "university"){
            this.setState({supervisor: 1});
            document.getElementById("show").style.display = "block";
        }else{
            this.setState({supervisor: 0});
            document.getElementById("show").style.display = "none";
        }
    }

    Twofunctions(e){
        this.onChange(e); 
        this.showSupervisor(e);
    }


    

    show(id){
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id + "2").innerHTML ="";
    }


    /**
     * Render alert after bad registration.
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


    render() {
        return (
           
            <div className="row justify-content-center">
                <div className=" col-lg-7 col-md-8 col-sm-10 col-11 ">
                    <div className="FormHead_SignUp text-center">
                        Sign Up to <span className="uniteam">UNI.TEAM</span>
                    </div>

                    <div className="FormBody_SignUp   justify-content-center">
                        <form noValidate className="FormFields" role="post" method="POST" onSubmit={this.onSubmit}>
                            <div className="FormField form-row justify-content-center">

                                <div className="form-group col-md-4"> 
                                    <label className="FormField_Label" htmlFor="firstname">
                                        <div className="myrow">
                                            <div className="rightcolumn40 pad10">
                                                First name
                                            </div> 
                                            <div id="firstnameAlert" className="leftcolumn65" style={{visibility:"hidden"}}>
                                                {this.showAlert("firstnameAlert")}
                                            </div>
                                        </div>
                                    </label>
                                    <input type="text" id="firstname" className="form-control" placeholder="Enter your First name" value={this.state.firstname} name="firstname" onChange={this.onChange}></input> 
                                </div>

                                <div className="form-group col-md-6">
                                    <label className="FormField_Label" htmlFor="lastname">
                                        <div className="myrow">
                                            <div className="rightcolumn40 pad10">
                                                Last name
                                            </div> 
                                            <div id="lastnameAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                {this.showAlert("lastnameAlert")}
                                            </div>
                                        </div>
                                    </label>
                                    <input type="text" id="lastname" className="form-control" placeholder="Enter your Last name" value={this.state.lastname} name="lastname" ref="lastname" onChange={this.onChange} required onInvalid={this.InvalidMsg}></input>
                                </div>
                            </div>

                            <div className="FormField form-row justify-content-center">
                                <div className=" col-md-10">
                                    <label className="FormField_Label" htmlFor="email">
                                        <div className="myrow">
                                            <div className="rightcolumn40 pad10">
                                                E-mail adress
                                            </div> 
                                            <div id="emailAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                {this.showAlert("emailAlert")}
                                            </div>
                                        </div>
                                    </label> 
                                    <input type="email" id="email" className="form-control" placeholder="Enter your email" name="email" value={this.state.email} ref="email" onChange={this.onChange}  ></input>
                                </div>
                            </div>

                            <div className="FormField form-row justify-content-center">
                                <div className="form-group col-md-5">
                                    <label className="FormField_Label" htmlFor="password">
                                        <div className="myrow">
                                            <div className="rightcolumn40 pad10">
                                                Password
                                            </div> 
                                            <div id="passwordAlert" className="leftcolumn65" style={{visibility:"hidden"}}> 
                                                {this.showAlert("passwordAlert")}
                                            </div>
                                        </div> 
                                    </label>
                                    <input type="password" id="password" className="form-control" placeholder="Enter your password" name="password" ref="password" onChange={this.onChange} ></input>
                                </div>

                                <div className="form-group col-md-5 justify-content-center">
                                    <label className="FormField_Label" htmlFor="password-confirm">
                                        <div className="myrow">
                                            <div className="column pad10">
                                                Password confirm
                                            </div> 
                                        <div id="passwordConfirmAlert" className="column" style={{visibility:"hidden"}}> 
                                            {this.showAlert("passwordConfirmAlert")}
                                        </div>
                                        </div>
                                    </label>
                                    <input type="password" id="passwordConfirm" className="form-control" placeholder="Enter your password" name="password_confirmation" ref="confirm" onChange={this.onChange}></input>
                                </div>
                            </div>

                            <div className="FormField form-row justify-content-center">
                                <div className="col-md-5">
                                    <label className="FormField_Label" id="type" htmlFor="type">
                                        User type
                                    </label>
                                    <select className="form-control" name="type" ref="type" value={this.state.type} onChange={this.Twofunctions} >
                                        <option value="university">User from university</option>
                                        <option value="normal">Someone else</option>
                                    </select>
                                </div>
                                       
                                <div className="col-md-5">
                                    <div id="show" >
                                         <label className="FormField_Label" id="supervisor" htmlFor="type">
                                            Supervisor
                                        </label>
                                        <select className="form-control" name="supervisor"  value={this.state.supervisor} onChange={this.onChange} >
                                            {this.state.supervisors.map(supervisor => (
                                                <option key={supervisor.id} value={supervisor.id}>{supervisor.firstname} {supervisor.lastname}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="FormButtons">
                                <button type="submit" className="FormField_Button mr-20" >
                                    Sign up
                                </button> 
                            </div>
                            <div className="FormButtons">
                                <Link className='HaveAccount_Link ' to={url2}>
                                    I have an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        );
    }
}

export default SignUp;