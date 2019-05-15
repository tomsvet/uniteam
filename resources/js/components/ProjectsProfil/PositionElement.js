import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProfilePositionButton from './ProfilePositionButton';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This element show position element( position information and remove, choose or interest button )
 */
class PositionElement extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,   
        }
        this.showClick = this.showClick.bind(this);
        this.FreePosition = this.FreePosition.bind(this);
        this.ApplicantIsChoosen = this.ApplicantIsChoosen.bind(this);
        this.RemoveMe = this.RemoveMe.bind(this);
    }

    showClick(){
        const PanelId = "pos-"+ this.props.position.id;
        if(this.state.show === false){
            document.getElementById(PanelId).style.display = "block";
            this.setState({
                show:true,
            })
        }else{
            document.getElementById(PanelId).style.display = "none";
            this.setState({
                show:false,
            })
        }
    }

    RemoveMe(e){
        const position = { 
            position_id: this.props.position.id,
            project_id: this.props.position.project_id,
            recipient_id: this.props.position.user.id,
            type:'removeMe',

        };
        axios.post(url + 'api/removeChooseUser', position)
        .then(response=> {
            this.props.getData();
        })
        .catch(error=> {
            this.setState({err:true});
        })
    }


    ApplicantIsChoosen(e){
        if(this.props.position.user_id == 0){
            return  <ProfilePositionButton position={this.props.position} interests={this.props.position.interests} user={this.props.user} project={this.props.project}/> ;              
        }else if(this.props.project.state == 3){
            return ;
        }else if(this.props.user.id == this.props.position.user_id){
            return <button  className=" InterestButton" onClick={this.RemoveMe} style={{display:'block'}}>Remove me </button>;
        }else{
            return ;
        }
    }

    /**
     * Function which return html code
     * @param { } e 
     */
    FreePosition(e){
        if(this.props.position.user_id == 0){
            return(
                <div className=" PositionStatus StatusActive">
                    Free
                </div>
            )            
        }else{
            const name =this.props.position.user.firstname +" "+ this.props.position.user.lastname;
            return name ;
        }
    }

    render(){
        const PanelId = "pos-"+ this.props.position.id;
        return(
            <div className="">
                <div className="ProfilePosition" >
                    <div  className="ProfilePositionLink " onClick={this.showClick} data-toggle="tooltip" data-placement="bottom" title="Show more">
                        <div  className="myrow">
                            <div className="PositionLink leftcolumn60">
                                {this.props.position.title} 
                            </div>
                           
                            <div className="rightcolumn40">
                                <div className="text-center textAuthor">
                                   { this.FreePosition()}
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>    

                <div id={PanelId} className="ProfilePositionInfo" style={{display:'none'}}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="ProfilePositionDescription">
                                {this.props.position.description}
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="ProfilePositionCategory">
                                {this.props.position.category_name}
                            </div>
                            <div className="ProfilePositionFee">
                                {this.props.position.fee}
                            </div>  
                        </div>
                    </div>
                    {this.ApplicantIsChoosen()}
                </div>
            </div>
        )
    }
}

export default PositionElement