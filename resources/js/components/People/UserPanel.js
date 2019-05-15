import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render user preview
 */
class UserPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      showRecommend: false,
      RecommendProject: "",
      RecommendPosition: "",
      Positions:[],
      user:this.props.user,
    }

    this.handleShowRecommend = this.handleShowRecommend.bind(this);
    this.handleCloseRecommend = this.handleCloseRecommend.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setPositions = this.setPositions.bind(this);
    this.CreateRecommend = this.CreateRecommend.bind(this);
    this.AddPerson = this.AddPerson.bind(this);
    this.rejectPerson = this.rejectPerson.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }

  	/**
	* Show recommendation's pop-up
	*/
	handleShowRecommend(){
		this.setState({
			showRecommend:true,
		});
	}

	/**
	* Close recommendation's pop-up
	*/
	handleCloseRecommend(e){
		this.setState({
			showRecommend:false,
			RecommendProject: "",
			RecommendPosition: "",
			Positions:[],
		});
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

		this.setPositions(value);
	}

	/**
	 * 
	 * @param {id of project which is chosen} value 
	 */
	setPositions(value){
		this.props.authProjects.forEach(project => {
		if (project.id == value){
			this.setState({
			Positions: project.positions,
			});
		}
			
		});
		
	}

	/**
	 * This method send request to create recommendation
	 * @param { input data} e 
	 */
	CreateRecommend(e){
		const recommend = {
			recipient_id:this.state.user.id,
			position_id:this.state.RecommendPosition,
			project_id:this.state.RecommendProject,
			type:'recommend',
			sender_id:this.props.auth_user.id,
			message:'',
		}


		axios.post(url + 'api/recommend', recommend).then(response=> {
			this.handleCloseRecommend();
		}).catch(error=> {
			this.setState({err:true});
		})
	}

	/**
	 * Method to upload user data
	 */
	getNewData(){
		const id = this.state.user.id;

		axios.get(url + `api/user/${id}`).then(response=> {
			this.setState({
				user: response.data,
			});   
		})
		.catch(error=> {
			this.setState({err:true});
		})
		
	}

	/**
	 * This method send request to reject a person 
	 */
	rejectPerson(){
		const person = { 
			user_id: this.state.user.id,
		};

		axios.delete(url + 'api/deletePerson', {params:person})
		.then(response=> {
			this.props.getData();
		})
		.catch(error=> {	
			
		})
	}

	/**
	 * This method send request to approve a person 
	 */
	AddPerson(e){
		const person = { 
			user_id: this.state.user.id,
		};

		axios.post(url +'api/AddPerson', person).then(response=> {
			this.getNewData();
		})
		.catch(error=> {
			this.setState({err:true});
		})
	}

	/**
	 * Render confirmation buttons or recommendation button 
	 */
	isActivate(e){
		if(this.state.user.activate == 0){
		return(
			<div>
				<span className="mr-20">
					<button type="button" className="Confirm_Button" onClick={this.rejectPerson}> Reject </button>
				</span>
				<button type="button" className="Confirm_Button" onClick={this.AddPerson}> Confirm </button>
			</div> 
		);
		}else{
			if (this.state.user.id == this.props.auth_user.id){
			return;
			}
		return <button type="button" className="AddPositionButton" onClick={this.handleShowRecommend}>  Recommend</button>  ;
		}
	}

    render(){
        return(
            <div className="card Preview">
                <div className="PreviewHead">
                    <Link className="PreviewHead-color" to={url2 + "user/"+this.state.user.id}> {this.state.user.firstname} {this.state.user.lastname}</Link>
                </div>
                <div className="myrow PreviewContent">
					<div className="col-md-12 col-12 .col-sm-12 col-lg-5">
						<div className="ml_10">
                            <div className="myrow">
                                <div className="leftcolumn30 DesAuthor">
									Faculty:
								</div>
								<div className="rightcolumn70 Author"> 
									{this.state.user.faculty} 
								</div>
                            </div>

                            <div className="myrow">
                                <div className="leftcolumn30 DesAuthor">
									Position:
								</div>
                                <div className="rightcolumn70 Author">
									{this.state.user.position_name}
								</div>
                            </div>

                            <div className="myrow">
                                <div className="leftcolumn30 DesAuthor">
									Email:
								</div>
								<div className="rightcolumn70 Author"> 
									{this.state.user.email} 
								</div>
                            </div>

                            <div className="myrow">
                                <div className="leftcolumn60 DesAuthor">
									Author's projects:
								</div>
								<div className=" rightcolumn40 Author">
									{this.state.user.own}
								</div>      
                            </div> 

                            <div className="myrow">
                                <div className="leftcolumn60 DesAuthor">
									Positions in projects:
								</div>
								<div className="rightcolumn40 Author"> 
									{this.state.user.member} 
								</div>
                            </div>
                      	</div>
                    </div>
                    <div className="col-md-12 col-12 .col-sm-12 col-lg-7 ">
                    	<div className="UserDescription">
                        	{this.state.user.about}
                        </div>
                    </div>
                    <div className="UserFooter">
                        <span className="UserButtonPlace">
                           	{this.isActivate()}
                        </span>
                    </div>
                </div>

                <Modal show={this.state.showRecommend} dialogClassName="" onHide={this.handleCloseRecommend}> 
					<Modal.Body>
						<button type="button" class="close" onClick={this.handleCloseRecommend}>
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
						<div className="text-center">
							<h3><i className="fa fa-lock fa-4x"></i></h3>
							<h2 className="text-center">Recommend your project?</h2>
							<p> Recommend your project to  {this.state.user.firstname} {this.state.user.lastname}.</p>
						</div>
                        <div className='form-group ' >  
                        	<label htmlFor="exampleFormControlSelect2">
								Choose one of your project
							</label>
                        	<select multiple className="form-control multiple" id="exampleFormControlSelect2" name="RecommendProject" value={this.state.RecommendProject} onChange={this.onChange}>
								{this.props.authProjects.map(project => (
								<option key={project.id} value={project.id} className="selectOption" >
									{project.title}
								</option>
								))}
                        	</select> 
                        </div>

                        <div className='form-group ' >  
							<label htmlFor="exampleFormControlSelect3">
								Choose one position
							</label>
							<select multiple className="form-control multiple" id="exampleFormControlSelect3" name="RecommendPosition" value={this.state.RecommendPosition} onChange={this.onChange}>
								{this.state.Positions.map(position => (
									<option key={position.id} value={position.id} className="selectOption">
										{position.title}
									</option>
								))} 
							</select> 
                        </div>

                        <div className="FormButtons">
                            <button type="button" className="FormField_Button " onClick={this.CreateRecommend}>Recommend</button> 
                        </div> 
                	</Modal.Body>
                </Modal>       
            </div>
        )
    }
}

export default UserPanel