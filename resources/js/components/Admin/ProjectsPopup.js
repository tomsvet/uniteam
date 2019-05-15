import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'
import DatePicker from "react-datepicker";
let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component show buttons on deletion or edit projects data and pop-up windows
 */
class ProjectsPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.project.title,
            description: this.props.project.description,
            end:new Date(),
            showEdit:false,
        }
       
        this.editProject = this.editProject.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.handleShowEditProject =this.handleShowEditProject.bind(this);
        this.handleCloseEditProject = this.handleCloseEditProject.bind(this);
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    /**
     * This method send request to edit project's data
     * @param {input data} e 
     */
    editProject(e){
        e.preventDefault();
    
        const project = {
            project_id: this.props.project.id,
            title: this.state.title,
            description: this.state.description, 
           
        }
        const thisUrl = url + "api/getAdminProjects";
    
        axios.post(url + 'api/update', project).then(response=> {
			this.props.getData(thisUrl);
			this.handleCloseEditProject();
		})
		.catch(error=> {
		})
	}

	/**
     * This method show pop-up window to edit
     */
    handleShowEditProject(){
        this.setState({
           showEdit: true,
          })
    }
	
	/**
     * This method close pop-up window to edit
     */
    handleCloseEditProject(){
        this.setState({
           showEdit: false, 
          })
    }

	/**
     * This method delete projects
     */
    handleDeleteProject(event){
        const thisUrl = url + "api/getAdminProjects";

        let data = {
            project_id: event.target.attributes.value.value,
		}
		
        axios.delete(url + 'api/deleteProject', {params:data})
        .then(response=> {
            this.props.getData(thisUrl);    
        })
        .catch(error=> {  
        })
    }

    render(){
        return(
            <div>
                <div  className="myrow PositionIcon ">
                    <div className="column PositionUpdate" onClick={this.handleShowEditProject} data-toggle="tooltip" data-placement="bottom" title="Edit Project"></div>
                    <div className="column PositionDelete" onClick={this.handleDeleteProject} value={this.props.project.id} data-toggle="tooltip" data-placement="bottom" title="Delete Project"></div>
                </div>

                <Modal show={this.state.showEdit} onHide={this.handleCloseEditProject}> 
                  	<Modal.Body>
					  	<button type="button" class="close" onClick={this.handleCloseEditProject}>
                        	<span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>  
						<div className="text-center">
							<h3><i className="fa fa-lock fa-4x"></i></h3>
							<h2 className="text-center">Change Project information?</h2>
							<p>You can change your project information here.</p>
						</div>
						<form onSubmit={this.editProject}>
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
            </div>
        )
    }
}

export default ProjectsPopup