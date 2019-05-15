import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import ApplicantPanel from './ApplicantPanel';

/**
 * This component render list of position applicants 
 */

class ApplicantArea extends Component{

    constructor(props){
        super(props);

        this.isApplicant = this.isApplicant.bind(this);
    }

    isApplicant(e){
        if(this.props.position.interests.length != 0){
            return(
                <div className="Applicant">
                    Applicants:
                </div>
            )
        }
    }

    render(){
        return(
            <div className="mb-10">  
                {this.isApplicant()}
                <div>
                {this.props.position.interests.map(interest => (
                    <ApplicantPanel key={interest.id} interest={interest} getData={this.props.getData} />   
                ))}
                </div>
            </div>
        )
    }
}

export default ApplicantArea