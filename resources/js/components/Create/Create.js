import React, { Component } from 'react';
import Navbar from '../Home/Navbar';
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap';
import PositionMark from './PositionMark';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * Component which render Create project page.
 */
class Create extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            title:'',
            super:'',
            description:'',
            positions:[],
            file:"",
            showCover:'',
            showAddPosition:false,
            showChangePosition:false,
            supervisors:[],
            positionC:'1',
            position:{name:'',description:''},
            positionCounter:0,
            positionN:'',
            positionD:'',
            
            positionFee:'Paid Work',
            user:{},
            positionCategories:[],
            endDate: new Date(),
            err: false,
            updatedId:'',
            hover:false,
            
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.AddPosition = this.AddPosition.bind(this); 
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.ChangeDate = this.ChangeDate.bind(this);
        this.DeletePosition = this.DeletePosition.bind(this);
        this.UpdatePosition = this.UpdatePosition.bind(this);
        this.handleShowChange = this.handleShowChange.bind(this);
        this.handleCloseChange = this.handleCloseChange.bind(this);
        this.validateData = this.validateData.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);

    }

    


    /**
     * Method to load data from forms
     * @param {form data} e 
     */
    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    ChangeDate(date){
        this.setState({
            endDate: date
          });
    }

    /**
     * Form data validation 
     */
    validateData(){
       var retValue = true;
        /* Firstname validation */
    if (this.state.title == ''){
        retValue = false;
        document.getElementById("titleAlert").style.visibility = "visible";
        document.getElementById("titleAlert2").innerHTML = "Please fill out field!";
        
    }else{
        document.getElementById("titleAlert").style.visibility = "hidden";
    }
    return retValue;
    }

    /**
     * This methods send request to create a project
     * @param {*} e 
     */
    onSubmit(e){
        e.preventDefault();

        
        if( this.validateData() == false){
            return false;
        }

        const project = {
            title: this.state.title,
            description: this.state.description,
            user_id: this.props.user.id,
            supervisor: this.state.super,
            positions: this.state.positions,
            endDate: this.state.endDate,
          }
          
        const formData = new FormData();
        formData.append('image', this.state.file);

        axios.post(url +'api/projects', project)
        .then(response=> {
            this.props.history.push(url2 + 'project/'+response.data.id); 
        })
        .catch(error=> {
           
        })
    }

    handleChange(event) {
        this.setState({
          file: event.target.files[0],
          showCover: URL.createObjectURL(event.target.files[0]),
        })   
    }

    /**
     * Methods which create project position in form
     */

    AddPosition(e){
        if (this.state.positionN == ''){
            document.getElementById("positionTitleAlert").style.visibility = "visible";
            document.getElementById("positionTitleAlert2").innerHTML = "Please fill out field!";

            return false; 
        }else{
            document.getElementById("positionTitleAlert").style.visibility = "hidden";
        }

        this.handleClose();
        var a = this.state.positionCounter + 1;
        var category_name = '';
        this.state.positionCategories.forEach(category => {
           if (this.state.positionC == category.category_id){
               category_name = category.name;
           }   
        });
        
        const newItem = {id:a, name:this.state.positionN,description:this.state.positionD,category_id:this.state.positionC,fee:this.state.positionFee,category_name:category_name};
        this.setState({positions :[...this.state.positions, newItem]});
        this.setState({
            positionN: '',
            positionD:'',
            positionFee:'Paid Work',
            positionCounter: a,
            positionC:this.state.positionCategories[0].category_id, 
          });
       
    }

    /**
     * Delete a position from form
     * @param {id of position} id 
     */

    DeletePosition(id){
        var copy = [...this.state.positions];
        var i = -1;
        var index = -1;
        this.state.positions.forEach(position => {
            i++;
            if (position.id == id){
                index = i;
            }
        });
        
        if (index !== -1) {
            copy.splice(index, 1);
            this.setState({positions: copy});
          }  
    }

    /**
     * This method update informations about position
     */
    UpdatePosition(){
        var category_name = '';
        this.state.positionCategories.forEach(category => {
           if (this.state.positionC == category.category_id){
               category_name = category.name;
           }  
        });

        this.state.positions.forEach(position => {            
            if (position.id == this.state.updatedId){
                position.name = this.state.positionN;
                position.description = this.state.positionD;
                position.fee = this.state.positionFee;
                position.category_id = this.state.positionC;
                position.category_name = category_name;
            }
        });

        this.handleCloseChange(); 
    }

    handleShowChange(id){
        this.state.positions.forEach(position => {            
            if (position.id == id){
                this.setState({
                    positionN: position.name,
                    positionD: position.description,
                    positionFee: position.fee,
                    positionC: position.category_id, 
                    updatedId: position.id, 
                });
            }
        });

        this.setState({ showChangePosition: true });
    }

    /**
     * Close Change position pop-up.
     */
    handleCloseChange(){
        this.setState({ 
            showChangePosition: false 
        });
        this.setState({
            positionN: '',
            positionD:'',
            positionFee:'Paid Work',
            positionC:this.state.positionCategories[0].id, 
        });
    }

    /**
     * Show Add position pop-up.
     */
    handleShow(){
        this.setState({ 
            showAddPosition: true 
        });
    }

    /**
     * Close Add position pop-up.
     */
    handleClose(){
        this.setState({ 
            showAddPosition: false 
        });
    }

    componentDidMount () {
        /**
         * Get all supervisors
         */
        axios.get(url + 'api/supervisor').then(response => {
          this.setState({
            supervisors: response.data
            
          })
          this.setState({super :this.state.supervisors[0].id});
        })

        /**
         * Get all position categories
         */
        axios.get(url + 'api/positionCategory').then(response => {
            this.setState({
              positionCategories: response.data
              
            })
            this.setState({positionC :this.state.positionCategories[0].category_id});
          })

    }

    show(id){
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id + "2").innerHTML ="";
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

    hoverOn(id){
        this.setState({
             hover: true,
           })
           document.getElementById(id).style.display = "block";
    }
 
    hoverOff(id){
        this.setState({
            hover:false,
        })
        document.getElementById(id).style.display = "none";
    }
  

    render(){
        const { positions } = this.state
        const { supervisors } = this.state
        const { positionCategories } = this.state

        return(
            <div className="Page">
                <div >
                    <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />          
                    <div className= "Main ">
                        <div className=''>
                            <div className='myrow justify-content-center'>
                                <div className="column col-12 .col-sm-12 col-lg-2 ">
                                    <button  className="BackButton mt-10 ml5" onClick={this.props.history.goBack}>Back</button>
                                </div>
                                <div className='column col-12 .col-sm-12 col-lg-8'>
                                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center ml-m15 mr-m15  border-bottom mb-10">
                                        <h1 class="HeaderTitle ">Create new Project</h1>
                                    </div>
                                    <div className='card'>
                                         <div className='card-body CreateBody'>
                                            <form onSubmit={this.onSubmit} noValidate>
                                                <div className='form-group ' >
                                                    <label htmlFor='title' className="FormField_Label">
                                                        <div className="myrow">
                                                            <div className="column pad10">
                                                                Project title
                                                            </div> 
                                                            <div id="titleAlert" className="column" style={{visibility:"hidden"}}> 
                                                                {this.showAlert("titleAlert")}
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <input id='title' type='text' className='form-control ' name='title' value={this.state.name} onChange={this.onChange} />
                                                </div>  
                                                <div className='form-group ' >  
                                                    <label htmlFor='description'>Description</label>
                                                    <textarea id='description' row='10' className='form-control' name='description' value={this.state.description} onChange={this.onChange} />
                                                </div>    
                        
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group ">
                                                            <label htmlFor="inputState">Supervisor </label>
                                                            <div className=" PositionInfo" onMouseEnter={() =>this.hoverOn("superInfo")} onMouseLeave={() =>this.hoverOff("superInfo")}  >
                                                                <div id="superInfo" className="hoverCard" style={{display:'none'}}>
                                                                    <div className="PositionHoverPanelContent">
                                                                        You must choose some supervisor. 
                                                                        Supervisor checks your project and approves or rejects him.
                                                                    </div>
                                                                </div>                                                                          
                                                                <div className="InfoCreate">
                                                                </div>
                                                            </div>
                                                            <select id="inputState" className="form-control" name="super" value={this.state.super} onChange={this.onChange}>
                                                                {supervisors.map(supervisor => (
                                                                    <option key={supervisor.id} value={supervisor.id}>{supervisor.firstname} {supervisor.lastname}</option>
                                                                ))}  
                                                            </select>
                                                        </div>
                                                    </div>                       
                                                    <div className=" col-md-6 ">
                                                        <div className="form-group ">
                                                            <label htmlFor="endDate"> Starting date</label>
                                                            <div className=" PositionInfo" onMouseEnter={() =>this.hoverOn("dateInfo")} onMouseLeave={() =>this.hoverOff("dateInfo")} >
                                                                <div id="dateInfo" className="hoverCard" style={{display:'none'}}>
                                                                    <div className="PositionHoverPanelContent">
                                                                        It is date, when you want to start work on the project. 
                                                                        At this date you will stop looking a co-workers.
                                                                    </div>
                                                                </div>
                                                                <div className="InfoCreate">
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <DatePicker className="form-control" id="endDate" name="endDate" selected={this.state.endDate} onChange={this.ChangeDate}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                  
                                                <div className="form-group">
                                                    <div className="title">
                                                        Position
                                                    </div>
                                                    <div id="positions">
                                                        {positions.map(position => (
                                                            <PositionMark key={position.id} position={position} DeletePosition={this.DeletePosition} ChangePosition={this.handleShowChange}/>
                                                        ))}   
                                                    </div>
                                                    <div className="PlusPlace">
                                                        <button type="button" className="AddPositionButton" onClick={this.handleShow}>+ New</button>   
                                                    </div>
                                                </div>
                                                <div className="FormButtons">
                                                    <button type="submit" className="FormField_Button " >Create</button> 
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>  
                                <div className="column col-12 .col-sm-12 col-lg-2 ">
                                </div>  
                            </div>
                        </div>    
                    </div>
                </div> 

                <Modal show={this.state.showAddPosition} onHide={this.handleClose}>
                <Modal.Body>
                    <button type="button" class="close" onClick={this.handleClose}>
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close</span>
                    </button>                   
                    <div className="text-center">
                        <h3><i className="fa fa-lock fa-4x"></i></h3>
                        <h4 className="text-center">Add a new position</h4>
                        <div className="panel-body">
                            <form action={this.AddPosition} noValidate>                       
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="inputState">Category</label>
                                    <select id="inputState" className="form-control"  name="positionC" value={this.state.positionC} onChange={this.onChange}>
                                        {positionCategories.map(category => (
                                            <option key={category.id} value={category.category_id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="position_name">
                                        <div className="myrow">
                                            <div className="column pad10">
                                                Position title
                                            </div> 
                                            <div id="positionTitleAlert" className="column" style={{visibility:"hidden"}}> 
                                                {this.showAlert("positionTitleAlert")}
                                            </div>
                                        </div>
                                    </label>
                                    <input id="position_name" name="positionN" placeholder="Position title" className="form-control"  type="name" value={this.state.positionN} onChange={this.onChange}/>                                 
                                </div>
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="inputFee">Fee category</label>
                                    <select id="inputFee" name="positionFee" className="form-control" value={this.state.positionFee} onChange={this.onChange}>
                                        <option value="Paid Work">Paid Work</option>
                                        <option value="Wageless">Wageless</option>
                                        <option value="Voluntering">Volunteering</option>
                                    </select>
                                </div>
                                <div className='form-group ' >  
                                    <label className="FormField_Label" htmlFor='description'>Description</label>
                                    <textarea id='description' row='10' className='form-control' name='positionD' value={this.state.positionD} onChange={this.onChange} />
                                </div> 
                                <div className="form-group">
                                    <Button type="button" className="FormField_Button" onClick={this.AddPosition}>
                                        Add
                                    </Button>
                                </div>      
                            </form>                    
                        </div>
                    </div>
                </Modal.Body>
                </Modal>

                <Modal show={this.state.showChangePosition} onHide={this.handleCloseChange}>
                <Modal.Body>
                    <button type="button" class="close" onClick={this.handleCloseChange}>
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <div className="text-center">
                        <h3><i className="fa fa-lock fa-4x"></i></h3>
                        <h4 className="text-center">Change information about position</h4>
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="inputState">Category</label>
                                    <select id="inputState" className="form-control" name="positionC" value={this.state.positionC} onChange={this.onChange}>
                                        {positionCategories.map(category => (
                                            <option key={category.id} value={category.category_id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="position_name">Position name</label>
                                    <input id="position_name" name="positionN" placeholder="Position name" className="form-control"  type="name" value={this.state.positionN} onChange={this.onChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="inputFee">Fee category</label>
                                    <select id="inputFee" name="positionFee" className="form-control" value={this.state.positionFee} onChange={this.onChange}>
                                        <option value="Paid Work">Paid Work</option>
                                        <option value="Wageless">Wageless</option>
                                        <option value="Voluntering">Volunteering</option>
                                    </select>
                                </div>
                                <div className='form-group ' >  
                                    <label className="FormField_Label" htmlFor='description'>Description</label>
                                    <textarea id='description' row='10' className='form-control' name='positionD' value={this.state.positionD} onChange={this.onChange} />
                                </div> 
                                <div className="form-group">
                                    <Button className="FormField_Button" onClick={this.UpdatePosition}>
                                        Change
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

export default Create