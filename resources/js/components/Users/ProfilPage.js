import React, { Component } from 'react'
import ProfilLeftCard from './ProfilLeftCard';
import Navbar from '../Home/Navbar'
import ProjectPreview from '../Home/ProjectPreview';
import URL from '../URL.jsx'

let link = URL;


const url = link.url;
const url2 = link.url2;

/**
 * This component show user profil page 
 */
class ProfilPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            projects:[],
            authProjects:[],
            bookmarks:[],
            
        }
        this.loadAuthUserProjects = this.loadAuthUserProjects.bind(this);
        this.getBookmarks= this.getBookmarks.bind(this);
        this.ProjectPreview = this.ProjectPreview.bind(this);
    }

    /**
     * Method which send request to get user's projects 
     */
    loadAuthUserProjects(){
        const projectId = this.props.user.id;

        axios.get(url +`api/showUserProject/${projectId}`).then(response => {
            this.setState({
                authProjects: response.data,
            })
        })
        
    }

    componentDidMount () {
        const projectId = this.props.match.params.id;

        axios.get(url + `api/user/${projectId}`).then(response => {
            this.setState({
                user: response.data,
            })
            axios.get(url +`api/showUserProject/${projectId}`).then(response => {
                this.setState({
                    projects: response.data,
              
                })
            })
            
        })

        this.loadAuthUserProjects();
        this.getBookmarks();
    }


    getBookmarks(e){
        const userId = this.props.user.id;

        axios.get(url + `api/bookmarks/${userId}`).then(response => {
            this.setState({
              bookmarks: response.data, 
            })  
        })
    }

    /**
     * This method return project preview component
     * @param {project data} project 
     */
    ProjectPreview(project){
        var value = 0;
        this.state.bookmarks.forEach(bookmark => {
            if(project.id == bookmark.project_id){
                value = bookmark.id;
                return;
            }
        });

        if(value == 0){ 
            return <ProjectPreview getData={this.getData} getBookmarks={this.getBookmarks} bookmarkProject={0} user={this.props.user} author={this.state.user} project={project} />;
        }else{
            return  <ProjectPreview getData={this.getData} getBookmarks={this.getBookmarks}  bookmarkProject={value} user={this.props.user} author={this.state.user} project={project} />;
        }
    }

    render(){
        return(
            <div className="Page">
            	<Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />
                <div className=' justify-content-center'>
                	<div className="PageContent">
                        <div className='row '>
                            <div className='column col-md-3 col-12 col-sm-12'>
                                <button  className="BackButton mb-10" onClick={this.props.history.goBack}>Back</button>
                                <ProfilLeftCard user={this.state.user} authProjects={this.state.authProjects} auth_user={this.props.user}/>
                            </div>
                            <div className='col-md-8'>
                            	<div className="ContentPlace">
									<div className="ContentHead">
										Projects
									</div>
									{this.state.projects.map(project => (
											<div key={project.id}>
												{this.ProjectPreview(project)}
											</div>  
									))}
                            	</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilPage