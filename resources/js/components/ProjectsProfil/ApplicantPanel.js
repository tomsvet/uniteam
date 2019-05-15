import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render name and button for each applicant in applicant list
 */
class ApplicantPanel extends Component{
    constructor(props){
        super(props);

        this.chooseApplicant = this.chooseApplicant.bind(this);
    }

    chooseApplicant(e){
        const choose = { 
            position_id: this.props.interest.position_id,
            user_id: this.props.interest.user_id,
            type:'choose',
        };

        axios.post(url + 'api/ChooseUser', choose).then(response=> {
            this.props.getData();
            
        })
        .catch(error=> {
            
            this.setState({err:true});
        })
    }

    render(){
        return(
            <div>
                <div className="myrow">
                    <div className="column">
                        {this.props.interest.user.firstname} {this.props.interest.user.lastname}
                    </div>
                    <div className="column">
                        <button  className=" InterestButton" onClick={this.chooseApplicant} style={{display:'block'}}>Choose</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApplicantPanel