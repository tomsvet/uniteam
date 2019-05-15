import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import axios from 'axios';
import PositionButton from '../Home/PositionButton';
import PositionElement from './PositionElement';
import DifferentProjectPage from './DifferentProjectPage';
import MyProjectPage from './MyProjectPage';
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
            positions:[],
        }
        this.ownProject = this.ownProject.bind(this);
        this.getData = this.getData.bind(this);
        this.getProjectData = this.getProjectData.bind(this);
    }

    componentDidMount(){
        const projectId = this.props.match.params.id;
        axios.get(url + `api/project/${projectId}`).then(response => {
            this.setState({
              	project: response.data,
				author:response.data.author,
				positions:response.data.positions,
            })
        })
    }

    getData(){
      	const projectId = this.props.match.params.id;
      	axios.get(url + `api/project/${projectId}`).then(response => {
          	this.setState({
				project: response.data,
				author:response.data.author,
				positions:response.data.positions,
			})  
      	})
    }

    getProjectData(projectId){
      	axios.get(url + `api/project/${projectId}`).then(response => {
          	this.setState({
				project: response.data,
				author:response.data.author,
				positions:response.data.positions,
			}) 
      	})
    }

    ownProject(e){
      	if(this.props.user.id == this.state.author.id){
            return <MyProjectPage history={this.props.history} project={this.state.project} positions={this.state.positions} author={this.state.author} getData={this.getData}/>;
        }else{
            return <DifferentProjectPage history={this.props.history} project={this.state.project} positions={this.state.positions} author={this.state.author}  getData={this.getData} user={this.props.user}/>;
        }
    }
    

    render(){
        return(
            <div className="Page">
                <Navbar getData={this.getProjectData} history={this.props.history} user={this.props.user} DeleteUser={this.props.DeleteUser}/>
                {this.ownProject()}
            </div>
        )
    }
}

export default ProjectPage