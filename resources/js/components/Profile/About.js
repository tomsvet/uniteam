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
 * This component render page to update profile information
 */
class About extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            cv:this.props.user.cv,
            showName:false,
            showFaculty:false,
            showPosition:false,
            showAbout:false,
            err:false,
            positionCategories:[],
            firstname:this.props.user.firstname ,
            lastname:this.props.user.lastname,
            faculty: (this.props.user.faculty == null ? '': this.props.user.faculty ),
            position: (this.props.user.position == null ? '': this.props.user.position ),
            about: (this.props.user.about == null ? '': this.props.user.about ),
        }

        this.handleShowName = this.handleShowName.bind(this);
        this.handleShowFaculty = this.handleShowFaculty.bind(this);
        this.handleShowPosition = this.handleShowPosition.bind(this);
        this.handleShowAbout = this.handleShowAbout.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateFaculty = this.updateFaculty.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.updateAbout = this.updateAbout.bind(this);
        this.setCV = this.setCV.bind(this);
        this.isUpload = this.isUpload.bind(this);
        this.downloadCV = this.downloadCV.bind(this);
        this.deleteCV = this.deleteCV.bind(this);
    }

    componentDidMount(e){
        axios.get(url + 'api/positionCategory')
        .then(response => {
            this.setState({
                positionCategories: response.data
            })
        })
    }

     /**
     * Show update About pop-up
     */
    handleShowName(){
        this.setState({ 
            showName: true 
        });
    }

     /**
     * Show update Faculty pop-up
     */
    handleShowFaculty(){
        this.setState({ 
            showFaculty: true 
        });
    }

     /**
     * Show update Position pop-up
     */
    handleShowPosition(){
        this.setState({ 
            showPosition: true 
        });
    }

    /**
     * Show update About pop-up
     */
    handleShowAbout(){
        this.setState({ 
            showAbout: true 
        });
    }

    /**
     * Close all pop-up windows
     */
    handleClose(){
        this.setState({ 
            showName: false,
            showFaculty: false,
            showPosition: false,
            showAbout: false,
        });
 
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
     * This method upload CV
     * @param {input data} e 
     */
    setCV(e) {
        const formData = new FormData();
        formData.append('cv', e.target.files[0]);
        formData.append('user_id', this.props.user.id);
        axios.post(url +'api/saveCV',formData).then(response=> {
            this.props.getUser();
        })   
    }

    /**
     * This method show CV
     */
    downloadCV(e){
        const Id = this.props.user.id;

        axios.get(url + `api/downloadCV/${Id}`).then(response=> {
            window.open(response.data); 
        })
    }

    /**
     * This method delete CV
     */
    deleteCV(){
        const data = {
            id : this.props.user.id,
        }

        axios.post(url + 'api/deleteCV', data).then(response=> {
            this.props.getUser();
        })
    }

    /**
     * Render delete button and link on CV
     */
    isUpload(){
        if(this.props.user.cv == null){
            return;
        }else{
            return(
                <div className="myrow">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="LinkCV"  onClick={this.downloadCV}> 
                            Show CV
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 text-center">
                        <button type="button" className="FormField_Button size" onClick={this.deleteCV}> 
                            Delete
                         </button>  
                    </div>
                </div>  
            ) ; 
        }

    }

    updateName(e){
        e.preventDefault();

        const data = {
            newFirstname: this.state.firstname,
            newLastname: this.state.lastname,
            user_id: this.props.user.id,

        }
        axios.post(url +'api/updateName', data).then(response=> {
            this.handleClose();
            this.props.getUser();
        })
        .catch(error=> {
        })
    }
    
     /**
      * Method which update information Faculty
      * @param {input data} e 
      */
    updateFaculty(e){
       e.preventDefault();

        const data = {
            faculty: this.state.faculty,
            user_id: this.props.user.id,

        }
       
        axios.post(url +'api/updateFaculty', data ).then(response=> {
            this.handleClose();
            this.props.getUser();
        })
        .catch(error=> {
        })
    }

     /**
      * Method which update information Position
      * @param {input data} e 
      */
    updatePosition(e){
        e.preventDefault();
 
        const data = {
            position_id: this.state.position,
            user_id: this.props.user.id,
 
        }
        axios.post(url +'api/updateMyPosition', data).then(response=> {
            this.handleClose();
            this.props.getUser();
        })
        .catch(error=> {
        })
     }

     /**
      * Method which update information About
      * @param {input data} e 
      */
     updateAbout(e){
        e.preventDefault();
 
        const data = {
            about: this.state.about,
            user_id: this.props.user.id,
 
        }
        axios.post(url +'api/updateAbout', data)
        .then(response=> {
            this.handleClose();
            this.props.getUser();
        })
        .catch(error=> {
        })
     }
    
    
    render(){
        return(
            <div className="Page">
                <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />

                <div className=' justify-content-center'>
                    <div className="PageContent">
                        <div className='row'>
                            <div className='col-md-3 col-sm-12 col-12'>
                                <LeftCard user={this.props.user} getUser={this.props.getUser} />
                            </div>
                    
                        <div className='col-lg-8 col-md-9 col-sm-12 col-12 '>
                            <div className="ContentPlace">
                                <div className="ContentHead">
                                About Me
                                </div>
                                <div className="ContentBorder">
                                    <div className="Content">
                                        <div className="FirstLine">
                                            <div className="row ">
                                                <div className='col-3 col-sm-3 col-md-3  '>
                                                    <div className="FirstRow">
                                                        Name:
                                                    </div>
                                                </div>
                                                <div className='col-9 col-sm-9 col-md-6 '>
                                                    {this.props.user.firstname} {this.props.user.lastname}
                                                </div>
                                                <div className='col-12 col-sm-12 col-md-3 text-center'>
                                                    <button type="button" className="AddPositionButton" onClick={this.handleShowName}> 
                                                        Change
                                                    </button>   
                        
                                                </div>
                                            </div>
                                        </div>

                                        <div className="MiddleLine">
                                            <div className="row ">
                                                <div className='col-3 col-sm-3 col-md-3  '>
                                                    <div className="FirstRow">
                                                        Faculty:
                                                    </div>
                                                </div>
                                                <div className='col-9 col-sm-9 col-md-6 '>
                                                {this.props.user.faculty} 
                                                </div>
                                                <div className='col-12 col-sm-12 col-md-3 text-center'>   
                                                    <button type="button" className="AddPositionButton" onClick={this.handleShowFaculty}>
                                                        Change
                                                    </button>        
                                                </div>
                                            </div>
                                        </div>

                                        <div className="MiddleLine">
                                            <div className="row ">
                                                <div className='col-3 col-sm-3 col-md-3  '>
                                                    <div className="FirstRow">
                                                        Position:
                                                    </div>
                                                </div>
                                                <div className='col-9 col-sm-9  col-md-6 '>
                                                    {this.props.user.position_name} 
                                                </div>
                                                <div className='col-12 col-sm-12 col-md-3 text-center'>  
                                                    <button type="button" className="AddPositionButton" onClick={this.handleShowPosition}>
                                                        Change
                                                    </button>        
                                                </div>
                                            </div>
                                        </div>

                                        <div className="MiddleLine">
                                            <div className="row ">
                                                <div className='col-6 col-sm-4 col-md-3 '>
                                                    <div className="FirstRow">
                                                        Curriculum vitae:
                                                    </div>
                                                </div>
                                                <div className=' col-6 col-sm-8  col-md-6'>
                                                    {this.isUpload()}
                                                </div>
                                                <div className=' col-12 col-sm-12 col-md-3 text-center'>
                                                <div className="CVUpload">
                                                        <label htmlFor="file-input2" >
                                                            <div  className="AddPositionButton dev" >
                                                                Upload
                                                            </div>
                                                        </label>
                                                        <input type="file" id="file-input2" name="cv"  onChange={this.setCV}/>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>

                                        <div className="LastLine">
                                            <div className="row ">
                                                <div className='col-12 col-sm-12 col-md-3 '>
                                                    <div className="FirstRow">
                                                        About me:
                                                    </div>
                                                </div>
                                                <div className='col-12 col-sm-12 col-md-6'>
                                                    {this.props.user.about} 
                                                </div>
                                                <div className='col-12 col-sm-12 col-md-3 text-center'> 
                                                    <button type="button" className="AddPositionButton" onClick={this.handleShowAbout}> 
                                                        Change
                                                    </button>          
                                                </div>
                                            </div>
                                        </div>  
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="col-md-0 col-lg-1">
                        </div>
                    </div>
                    </div>
                </div>



                <Modal show={this.state.showName} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change your Name?</h2>
                            <p>You can change your name here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.updateName}>
                                    <div className="FormField form-row">
                                        <div className="form-group col-md-6"> 
                                            <label className="FormField_Label" htmlFor="firstname">
                                                First name
                                            </label>
                                            <input type="text" id="firstname" className="form-control" placeholder="Enter your First name" value={this.state.firstname} name="firstname" ref="firstname" onChange={this.onChange} required ></input> 
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label className="FormField_Label" htmlFor="lastname">
                                                Last name
                                            </label>
                                            <input type="text" id="lastname" className="form-control" placeholder="Enter your Last name" value={this.state.lastname} name="lastname" ref="lastname" onChange={this.onChange} ></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                            Change Name
                                        </Button>
                                    </div>    
                                </form>                     
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showFaculty} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change your Faculty?</h2>
                            <p>You can change your faculty here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.updateFaculty}>
                                    <div className="form-group">
                                        <label className="FormField_Label" htmlFor="faculty">Faculty</label>
                                        <select  id="faculty" className="form-control" placeholder="Enter your Faculty" name="faculty" ref="faculty" value={this.state.faculty} onChange={this.onChange} >
                                            <option  value=''>None</option>
                                            <option  value='FA'>FA</option>
                                            <option  value='FAST'>FAST</option>
                                            <option  value='FaVU'>FaVU</option>
                                            <option  value='FEKT'>FEKT</option>
                                            <option  value='FCH'>FCH</option>
                                            <option  value='FIT'>FIT</option>
                                            <option  value='FP'>FP</option>
                                            <option  value='FSI'>FSI</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                            Change Faculty
                                        </Button>
                                    </div>         
                                </form>                    
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>


                <Modal show={this.state.showPosition} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change your Position?</h2>
                            <p>You can change your Position Category here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.updatePosition}>
                                    <div className="form-group">
                                        <label className="FormField_Label" htmlFor="inputState">Category</label>
                                        <select id="inputState" className="form-control" placeholder="Enter your Position" name="position" ref="position" value={this.state.position} onChange={this.onChange} >
                                        <option  value=''>Choose some position</option>
                                        {this.state.positionCategories.map(category => (
                                            <option key={category.category_id} value={category.category_id}>{category.name}</option>
                                        ))}
                                         </select>
                                    </div>
    
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                                Change Position
                                        </Button>
                                    </div>           
                                </form>                    
                            </div>
                        </div>
                    </Modal.Body>  
                </Modal>


                <Modal show={this.state.showAbout} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change information about you?</h2>
                            <p>You can change your information about you here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.updateAbout}>
                                    <div className="form-group">
                                        <label className="FormField_Label" htmlFor="about">About me</label>
                                        <textarea id='about' row='10' placeholder="Enter your information" ref="about" className='form-control' name='about' value={this.state.about} onChange={this.onChange} />
                                        
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                                Change About
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

export default About