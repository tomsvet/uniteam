import React, { Component } from 'react'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This element show Remove button
 */
class RemoveApplicantArea extends Component{
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    /**
     * Function which send remove request after click on the button
     * @param {button information} e 
     */
    onClick(e){
        const position = { 
            position_id: this.props.position.id,
            project_id: this.props.position.project_id,
            recipient_id: this.props.position.user.id,
            type:'remove',
        };

        axios.post(url + 'api/removeChooseUser', position).then(response=> {
            this.props.getData();
            
        })
        .catch(error=> {
            this.setState({err:true});
        })
    }
    
    render(){
        return(
            <div className="mb-10 mt5">
                <div className="remove">
                    <button  className=" InterestButton" onClick={this.onClick} style={{display:'block'}}>Remove {this.props.position.user.firstname} {this.props.position.user.lastname}</button>
               </div>   
            </div>
        )
    }
}

export default RemoveApplicantArea