
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import axios from 'axios';
import PositionButton from '../Home/PositionButton';
import PositionElement from './PositionElement';
import URL from '../URL.jsx'
import ProjectState from './ProjectState';

let link = URL;
const url = link.url;
const url2 = link.url2;


class DifferentProjectPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            project: {},
            author:{},
            positions:[],
        }

        this.ProjectIsActive = this.ProjectIsActive.bind(this);
        this.isPicture = this.isPicture.bind(this);
    }

    ProjectIsActive(e){
        if(this.props.project.state == 2)
        {
            return <div className="StatusRunning">Running</div>;
        }else if(this.props.project.state == 3){
            return <div className="StatusFinished">Finished</div>;
        }else if(this.props.project.state == 0){
            return <div className="StatusActive">Active</div>;
        }  
    }

    isPicture(){
        if(this.props.project.cover == ""){
            return  <div className="ProjectProfilePhoto" ></div>;
        }else{
            return <img src={this.props.project.cover} className="ProjectProfilePhoto"  height="200" width="300"/>;
        }
    }
  

    render(){
        return(
            <div>
                <div className=" myrow ">
                    <div className="column col-12 .col-sm-12 col-lg-2 ">
                        <button  className="BackButton mt-10 ml5" onClick={this.props.history.goBack}>Back</button>
                    </div>
                    <div className="column col-12 .col-sm-12 col-lg-8">
                        <div className="card ProjectProfileCard">
                            <div className="PreviewHead">
                                {this.props.project.title}
                            </div>
                            <div className="ProjectProfileBody">
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
                                                    <ProjectState state={this.props.project.state}/>
                                                </div>
                                                <div className="column Date"> 
                                                    {this.props.project.created} - {this.props.project.end}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ProjectProfileAuthor">
                                            Author:  <Link className="Author" to={url2 + "user/"+this.props.author.id}> {this.props.author.firstname} {this.props.author.lastname}</Link>
                                        </div>
                                        <div className="ProjectProfilePositions">
                                            Position:
                                            { this.props.positions.map(position => (
                                                <PositionElement key={position.id} position={position} user={this.props.user} project={this.props.project} getData={this.props.getData}/>
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

export default DifferentProjectPage