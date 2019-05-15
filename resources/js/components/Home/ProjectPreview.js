import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PositionButton from './PositionButton';
import URL from '../URL.jsx'
import ProjectState from '../ProjectsProfil/ProjectState';

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component show projects preview
 */
class ProjectPreview extends Component{
    constructor(props){
        super(props);
        this.state={
            positionFree:[],
        }

        this.PositionIsFree = this.PositionIsFree.bind(this);
        this.setBookmark = this.setBookmark.bind(this);
        this.deleteBookmark = this.deleteBookmark.bind(this);
        this.clickBookmark = this.clickBookmark.bind(this);
        this.isUserAuthor = this.isUserAuthor.bind(this);
        this.ifBookmark = this.ifBookmark.bind(this);
        this.RejectProject = this.RejectProject.bind(this);
        this.ApproveProject = this.ApproveProject.bind(this);
    }


    /**
     * Render Position Button component if is position free
     * @param {position} position 
     */
    PositionIsFree(position){
        if (position.user_id == 0){
            return(<PositionButton key={position.id} interests={position.interests} position={position} user={this.props.user} project={this.props.project}/>);
        }
    }


    clickBookmark(e){
        if(this.props.bookmarkProject == 0){
            this.setBookmark();
        }else{
            this.deleteBookmark();
        }
    }

    /**
     * Send request to set a bookmark on a project
     */
    setBookmark(){
        const bookmark = { 
            project_id: this.props.project.id,
            user_id: this.props.user.id,
        };

        axios.post(url + 'api/setBookmark', bookmark)
        .then(response=> {
            this.props.getBookmarks();  
        })
        .catch(error=> {
        })
    }


    /**
     * Send request to cancel a bookmark on a project
     */
    deleteBookmark(e){
        const bookmarkID = this.props.bookmarkProject
       
        axios.delete(url + `api/deleteBookmark/${bookmarkID}`)
        .then(response=> {
            this.props.getBookmarks();     
        })
        .catch(error=> {
        })

    }

    /**
     * Send request to reject a project
     */
    RejectProject(e){
        const approve = { 
            project_id: this.props.project.id,
            recipient_id: this.props.project.user_id,
            sender_id: this.props.user.id,
        };

        axios.delete(url + 'api/RejectProject', {params:approve})
        .then(response=> {
            this.props.getData();
            this.setState({err: false});  
        })
        .catch(error=> {
            
            this.setState({err:true});
        })
    }
    
    /**
     * Send request to approve a project
     */
    ApproveProject(e){
        const approve = { 
            project_id: this.props.project.id,
            recipient_id: this.props.project.user_id,
            sender_id: this.props.user.id,
        };

        axios.post(url + 'api/ApproveProject', approve)
        .then(response=> {
            this.props.getData();
            this.setState({err: false});   
            
        })
        .catch(error=> {
            
            this.setState({err:true});
        })
    }


    /**
     * Render Positions part of a preview.
     */
    isUserAuthor(e){
        if(this.props.project.supervisor_id == this.props.user.id &&  this.props.project.state == 0){
                // unapproved projects
            return(
                <div className="ProjectConfirmation">
                    <div className="ProjectConfirmationPlace">
                        <span className="mr-20">
                            <button type="button" className="Confirm_Button" onClick={this.RejectProject}> Reject </button>
                        </span>
                        <button type="button" className="Confirm_Button" onClick={this.ApproveProject}> Confirm </button>
                    </div>
                </div>
            );
        }else{
            if(this.props.project.state == 1 || this.props.project.state == 2 || this.props.project.state == 3 || (this.props.project.state == 0 && this.props.project.user_id == this.props.user.id) ){
                const ratio = this.props.project.positionFull / this.props.project.positionCount * 100;
                const width =ratio + "%";
                const divStyle = {
                    width: width,
                };
                 return(
                    <div className="PreviewPosition">
                        <div className="PositionStyle">
                            Looking for:
                            <span className="float-right"> 
                                {this.props.project.positionFull} / {this.props.project.positionCount}
                            </span>
                        </div>
                        <div className="progress mb-2">
                            <div className="progress-bar bg-green" style={divStyle} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                        { this.props.project.positions.map(position => (
                            <div key={position.id}> {this.PositionIsFree(position)} </div>
                                            
                        ))}
                    </div>
                );
            }     
        }
    }

    ifBookmark(){
        if(this.props.bookmarkProject == -1 ){
            return  ; 
        }else{
            return  <div className={this.props.bookmarkProject === 0 ? 'ProjectBookmarkNonActive' : 'ProjectBookmarkActive'} onClick={this.clickBookmark} data-toggle="tooltip" data-placement="bottom" title="Bookmark"></div>;
        }
    }


    
    render(){

        return(
            <div className="card Preview">
                {this.ifBookmark()}
                <div className="PreviewHead">
                    <Link className="PreviewHead-color" to={url2 + "project/"+this.props.project.id}> {this.props.project.title} </Link>
                </div>

                <div className="myrow PreviewContent">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <div className="ml_10">
                            <div className="justify-content-md-left">
                                <div className="DateActive">
                                    <div className="myrow">
                                        <div className="column ProjectProfileStatus">
                                           <ProjectState state={this.props.project.state}/>        
                                        </div>
                                    </div>
                                </div>

                                <div className="myrow ">
                                    <div className="rightcolumn30">
                                        <div className="DesAuthor"> 
                                        Starting date:
                                        </div>
                                        
                                    </div>
                                    <div className="leftcolumn70 ProjectAuthor">
                                        {this.props.project.end}
                                    </div>

                                </div>    

                                <div className="myrow ">
                                    <div className="rightcolumn15">
                                        <div className="DesAuthor"> 
                                            Author:
                                        </div>
                                        
                                    </div>
                                    <div className="leftcolumn85 ProjectAuthor">
                                        <Link className="Author" to={url2 + "user/"+this.props.author.id}> {this.props.author.firstname} {this.props.author.lastname}</Link>
                                    </div>

                                </div>       
                            </div>   

                            <div className="DescriptionProject">
                                {this.props.project.description}
                            </div>
                              
                              
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                        {this.isUserAuthor()}      
                    </div>
                </div>         
            </div>
        )
    }
}

export default ProjectPreview
