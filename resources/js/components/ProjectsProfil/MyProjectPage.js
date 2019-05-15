import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import axios from 'axios';
import PositionButton from '../Home/PositionButton';
import { Button, Modal} from 'react-bootstrap';
import MyProjectPositionElement from './MyProjectPositionElement';
import DatePicker from "react-datepicker";
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;


class ProjectPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            project: {},
            author:{},
            photo:'',
            state:this.props.project.state,
            positions:[],
            positionCategories:[],
            showUpdate:false,
            showDelete:false,
            showCreate:false,
            title: this.props.project.title,
            description: this.props.project.description,
            end:new Date(),
            titlePosittion: '',
            descriptionPosittion: '',
            category:'',
            fee:'Paid Work',
            file:this.props.project.cover,
        }

        this.handleCloseUpdate = this.handleCloseUpdate.bind(this);
        this.handleShowUpdate = this.handleShowUpdate.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleShowDelete = this.handleShowDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.ChangeDate = this.ChangeDate.bind(this);
        this.DeleteProject = this.DeleteProject.bind(this);
        this.handleShowCreatePosition = this.handleShowCreatePosition.bind(this);
        this.handleCloseCreatePosition = this.handleCloseCreatePosition.bind(this);
        this.CreatePosition = this.CreatePosition.bind(this);
        this.getPositionCategories = this.getPositionCategories.bind(this);
        this.getPositionInterests =  this.getPositionInterests.bind(this);
        this.ProjectIsActive = this.ProjectIsActive.bind(this);
        this.isPicture = this.isPicture.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.getData = this.getData.bind(this);
        this.notice = this.notice.bind(this);
    }

    handleChange(e) {
    	this.setState({
        	file:e.target.files[0],
    	})

		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('project_id', this.props.project.id);

		axios.post(url + 'api/saveCover',formData).then(response=> {
			this.props.getData();
		})
		
      

    }



	handleShowUpdate(){
		this.setState({  
			showUpdate: true 
		});
	}

	handleCloseUpdate(){
		this.setState({
			showUpdate: false,
		});
	}

	handleShowDelete(){
		this.setState({  
			showDelete: true
		});
	}

	handleCloseDelete(){
		this.setState({  
			showDelete: false 
		});
	}

	onChange(e){
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

	ChangeDate(date){
		this.setState({
			end: date,
		});
	}

	onSubmit(e){
		e.preventDefault();

		const project = {
			title: this.state.title,
			description: this.state.description, 
			endDate: this.state.end,
			project_id: this.props.project.id,
		}

		axios.post(url + 'api/update', project).then(response=> {
			this.props.getData();
			this.handleCloseUpdate()
		})
		.catch(error=> {
			this.setState({err:true});
		})
	}

    DeleteProject(e){
		e.preventDefault();
		const project = {
			positions: this.props.positions,
			project_id: this.props.project.id,
		}

		axios.delete(url + 'api/deleteProject',{params:project}).then(response=> {
			this.handleCloseDelete()
			this.props.history.push(url2 + "projects");
		})
		.catch(error=> {
			this.setState({err:true});
		})
    }

    handleShowCreatePosition(){
      	this.setState({  
			  showCreate: true 
		});
    }

    handleCloseCreatePosition(){
		this.setState({  
			showCreate: false,
			titlePosittion:'',
			descriptionPosittion:'',
		});
    }

    CreatePosition(e){
		e.preventDefault();

		const position = {
			title: this.state.titlePosittion,
			description: this.state.descriptionPosittion, 
			category_id:this.state.category,
			project_id:this.props.project.id,
			fee:this.state.fee,
		}
	  
      	axios.post(url + 'api/createPosition', position).then(response=> {
			this.props.getData();
			this.handleCloseCreatePosition();
		})
		.catch(error=> {
			this.setState({err:true});
		})
    }
  

    getPositionCategories(){
        axios.get(url + 'api/positionCategory').then(response => {
          this.setState({
            positionCategories: response.data,
            category:response.data[0].category_id
          })
          
      })

   }

   	getPositionInterests(){
		const projectId = this.props.project.id;
		axios.get(url + `api/getInterests/${projectId}`).then(response => {
			this.setState({
				positions: response.data,
			})
		
		})
   	}

	getData(){
		this.getPositionInterests();
		this.props.getData();
	
	}

    componentDidMount(e){
      this.getPositionCategories();
      this.getPositionInterests();
    }

    onChangeState(e){
		this.setState({
			state: e.target.value
		});

		const param = {
			project_id : this.props.project.id,
			state : e.target.value,
		}

		axios.post(url + `api/changeState`,param).then(response => {
			this.props.getData();
		})
    }

    ProjectIsActive(e){
		if(this.props.project.state == 2)
		{
    		return(
            	<select  className="StatusRunning"  name="state" value={this.state.state} onChange={this.onChangeState}>
                    <option value='2' className="StatusRunning">Running </option>
                    <option value='3' className="StatusFinished">Finished</option>
                </select>
          	)
      	}else if(this.props.project.state == 3){
          	return (
            	<select className="StatusFinished"  name="state" value={this.state.state} onChange={this.onChangeState}>
                    <option value='2' className="StatusRunning">Running </option>
                    <option value='3' className="StatusFinished">Finished</option>
                </select>
          	)
      	}else if(this.props.project.state == 0){
			return <div className="StatusUnapproved">Unapproved</div>;
		}else if(this.props.project.state == 1) {   
			return <div className="StatusActive">Active</div>;
		}else if(this.props.project.state == 4){
			return <div className="StatusExpired">Expired</div>;
		}  
  	}

  	isPicture(){
			var picture;
			if (this.state.file == ""){
				picture = <div height="200" width="300" className="ProjectProfilePhoto"></div>;
			}else{
			 	picture = <img height="200" width="300" className="ProjectProfilePhoto"  src={ this.props.project.cover}/>;
			}

        return(
          	<div className="CoverUpload CoverProfile">
                <label htmlFor="file-input"  >
										{picture}
                    <div  className="CoverProfileHoverText">
						<div className="TextCover">
							Click to upload
						</div>
					</div>
                </label>
                <input id="file-input" name="file" type="file" onChange={this.handleChange}/>
           </div>
        ) 
  	}

  	notice(){
		if(this.props.project.visibility == 0 && this.props.project.state == 0){
			return(
				<div class="alert alert-warning alert-dismissible fade show" role="alert">
					You created a project but supervisor have to approve it.
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			)
		}
	}

    render(){
        return(
            <div>
                <Modal show={this.state.showCreate} onHide={this.handleCloseCreatePosition}> 
					<Modal.Header closeButton> 
					</Modal.Header>
					<Modal.Body>
						<div className="text-center">
							<h3><i className="fa fa-lock fa-4x"></i></h3>
							<h2 className="text-center">Create Position?</h2>
							<p>You can create new position here.</p>
						</div>
						<form onSubmit={this.CreatePosition} >
							<div className="form-group">
								<label className="FormField_Label" htmlFor="inputState">Category</label>
								<select id="inputState" name="category" className="form-control" value={this.state.category} onChange={this.onChange}>
									{this.state.positionCategories.map(category => (
										<option key={category.category_id} value={category.category_id}>{category.name}</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label className="FormField_Label" htmlFor="position_title">Position name</label>
								<input id="position_title" name="titlePosittion" placeholder="Enter position name" className="form-control"  type="name" value={this.state.titlePosittion} onChange={this.onChange}/>
							</div>
							<div className="form-group">
								<label className="FormField_Label" htmlFor="inputFee">Fee category</label>
								<select id="inputFee" name="fee" className="form-control" value={this.state.fee} onChange={this.onChange}>
									<option value="Paid Work">Paid Work</option>
									<option value="Wageless">Wageless</option>
									<option value="Voluntering">Volunteering</option>
								</select>
							</div>
							<div className='form-group ' >  
								<label className="FormField_Label" htmlFor='description'>Description</label>
								<textarea  type="text" id='description' rows='5' className='form-control' name='descriptionPosittion' value={this.state.descriptionPosittion} onChange={this.onChange} />
							</div> 
							<div className="FormButtons">
								<button type="submit" className="FormField_Button " >Create</button> 
							</div>
						</form>        
                  	</Modal.Body>
                </Modal>

                <Modal show={this.state.showUpdate} onHide={this.handleCloseUpdate}> 
					<Modal.Header closeButton> 
					</Modal.Header>
                 	<Modal.Body>
						<div className="text-center">
							<h3><i className="fa fa-lock fa-4x"></i></h3>
							<h2 className="text-center">Change Project information?</h2>
							<p>You can change your project information here.</p>
						</div>
						<form onSubmit={this.onSubmit}>
							<div className='form-group ' >
								<label htmlFor='title'>Project name</label>
								<input id='title' type='text' className='form-control ' name='title' value={this.state.title} onChange={this.onChange} />
							</div>  
							<div className='form-group ' >  
								<label htmlFor='description'>Description</label>
								<textarea id='description' row='10' className='form-control' name='description' value={this.state.description} onChange={this.onChange} />
							</div>
							<div className="form-group">
								<label htmlFor="end"> End date</label>
								<DatePicker className="form-control" id="end" name="end" selected={this.state.end} onChange={this.ChangeDate}/>
							</div>
							<div className="FormButtons">
								<button type="submit" className="FormField_Button " >Change</button> 
							</div>
						</form>        
                  	</Modal.Body>
                </Modal>

                <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}> 
					<Modal.Header closeButton> 
					</Modal.Header>
					<Modal.Body>
						<div className="text-center">
							<h3><i className="fa fa-lock fa-4x"></i></h3>
							<h2 className="text-center">Delete the project?</h2>
							<p>You can delete your project  here.</p>
						</div>
						<div className="FormButtons">
							<button type="button" className="FormField_Button " onClick={this.DeleteProject}>Delete</button> 
						</div>     
                  	</Modal.Body>
                </Modal>
                
                <div className="myrow ">
                  	<div className="column col-12 .col-sm-12 col-lg-2 ">
                    	<button  className="BackButton mt-10 ml5" onClick={this.props.history.goBack}>Back</button>
                  	</div>

                  	<div className="column col-12 .col-sm-12 col-lg-8">
						{this.notice()}
						<div className="card ProjectProfileCard">
							<div className="PreviewHead">
								{this.props.project.title}
							</div>
							<div className="ProjectProfileBody">
								<div className="ProfileUpdate" onClick={this.handleShowUpdate} data-toggle="tooltip" data-placement="bottom" title="Update Project"></div>
								<div className="ProfileDelete" onClick={this.handleShowDelete} data-toggle="tooltip" data-placement="bottom" title="Delete Project"></div>
                        		<div className="myrow ">
                          			<div className="col-md-6">
                            			<div >
											{this.isPicture()}
										</div>
										<div className="ProjectProfileDescription">
										{this.props.project.description}
										</div>
                          			</div>
									<div className="col-md-6">
										<div className="DateActive">
											<div className="myrow">
												<div className="column ProjectProfileStatus">
													{this.ProjectIsActive()}		
                                				</div>
												<div className="column Date"> 
													{this.props.project.created} - {this.props.project.end}
												</div>
                               				</div>
                            			</div>
										<div className="ProjectProfileAuthor">
											Author: 
											<span className="Author"> 
												{this.props.author.firstname} {this.props.author.lastname} 
											</span>
										</div>
										<div className="ProjectProfilePositions">
											<div className="myrow ">
												<div className="leftcolumn90">
													Position:
												</div>
												<div className="rightcolumn10">
													<div className="PositionCreate" onClick={this.handleShowCreatePosition} data-toggle="tooltip" data-placement="bottom" title="Add Position"></div>
												</div>
											</div>
											{this.props.positions.map(position => (
												<MyProjectPositionElement key={position.id} position={position} positionCategories={this.state.positionCategories} getData={this.getData} project={this.props.project}/>
											))}
                            			</div>
                          			</div>      
                        		</div>
                      		</div>     
                    	</div>   
                  	</div>
                </div>  
              </div>
        )
    }
}

export default ProjectPage