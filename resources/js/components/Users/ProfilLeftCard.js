import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import ProfilPhoto from '../images/profil.png'
import { Button, Modal} from 'react-bootstrap'
import URL from '../URL.jsx'

let link = URL;


const url = link.url;
const url2 = link.url2;

/**
 * This component show left information panel in user profil
 */
class ProfilLeftCard extends Component{
    constructor(props){
		super(props);
		this.state = {
			file:ProfilPhoto,
			showRecommend: false,
			RecommendProject: '',
			RecommendPosition: '',
			Positions:[],
			myPhoto: null,
		}

		this.handleShowRecommend = this.handleShowRecommend.bind(this);
		this.handleCloseRecommend = this.handleCloseRecommend.bind(this);
		this.onChange = this.onChange.bind(this);
		this.setPositions = this.setPositions.bind(this);
		this.CreateRecommend = this.CreateRecommend.bind(this);
		this.isMyProfil = this.isMyProfil.bind(this);
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
		});
    }
  
    onChange(e){
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
		this.setPositions(value);
    }
  
    setPositions(value)
    {
		this.props.authProjects.forEach(project => {
			if (project.id == value){
				this.setState({
					Positions: project.positions,
				});
				if (this.state.Positions != []){
					this.setState({
						RecommendPosition: project.positions[0].id,
					});
				}
			}  
		});
      
    }
  
	/**
	 * This method send request to recommendation
	 */
    CreateRecommend(){
		const recommend = {
			recipient_id:this.props.user.id,
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

    isMyProfil(){
		if (this.props.user.id == this.props.auth_user.id){
			return;
		}else{
			return(
			<button type="button" className="AddPositionButton" onClick={this.handleShowRecommend}>  Recommend</button>
			);
		}
    }

    render(){
        return(
			<div>
				<div className='card place'>
					<div className="Profile">
						<div className=" text-center ProfilePicture">
						<label>
							<img className="photoProfile" src={ this.props.user.image_path === null ? this.state.file : this.props.user.image_path}  height="200" width="200"/>
						</label>
						</div>
						<div className="ProfileName">
							<h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
						</div>
						<div  className="nav navbar-nav ContentProfile">
							<div className="ProfileInfo">
								Email: 
								<span className="Author">
									{this.props.user.email}
								</span>
							</div>
							<div className="ProfileInfo">
								Faculty: 
								<span className="Author">
									{this.props.user.faculty}
								</span>
							</div> 
							<div className="ProfileInfo">
								Position: 
								<span className="Author">
									{this.props.user.position_name}
								</span> 
							</div>                          
							<div className="text-center mt15">
								{this.props.user.about}
							</div>
						</div>
						<div className="mt25 ">
							{this.isMyProfil()}
						</div>
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
							<p> Recommend your project to  {this.props.user.firstname} {this.props.user.lastname}.</p>
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
							<label htmlFor="exampleFormControlSelect3">Choose one position</label>
							<select multiple className="form-control multiple" id="exampleFormControlSelect3" name="RecommendPosition" value={this.state.RecommendPosition} onChange={this.onChange}>
								{this.state.Positions.map(position => (
									<option key={position.id} value={position.id}>
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

export default ProfilLeftCard