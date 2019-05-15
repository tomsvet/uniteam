import React, { Component } from 'react';
import Navbar from './Navbar';
import ProjectLists from './ProjectLists';


/**
 * This component show all /projects page
 */
class Projects extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Page">
                <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />  
                <div className= "Main ">
                    <div className='container '>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-sm-12 col-md-10 col-lg-9 '>
                                <ProjectLists user={this.props.user}/>
                            </div>    
                        </div>
                    </div>       
                </div>    
            </div>
        )
    }
}

export default Projects