import React, { Component } from 'react'

/**
 * This component show panel with Project state
 */
class ProjectState extends Component{
    constructor(props){
        super(props);
       
        this.projectState = this.projectState.bind(this);

    }

    projectState(e){

        if(this.props.state == 0){
            return <div className="StatusUnapproved">Unapproved</div>;

        }else if(this.props.state == 1){
            return <div className="StatusActive">Active</div>;

        }else if(this.props.state == 2){
            return <div className="StatusRunning">Running</div>;
        }else if(this.props.state == 3){
            return <div className="StatusFinished">Finished</div>;
        }else if(this.props.state == 4){
            return <div className="StatusExpired">Expired</div>;
        }     
        
    }

    render(){
        return(
            <>
                {this.projectState()}
            </>
        )
    }
}

export default ProjectState