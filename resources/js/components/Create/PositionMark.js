import React, { Component } from 'react';
import Navbar from '../Home/Navbar';
import axios from 'axios'
import SubNavbar from '../Home/SubNavbar';


/**
 * This component render element of position in Create new Project form
 */
class PositionMark extends Component{
    constructor(props){
        super(props);
        this.state = {
            hover:false,
        }
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    hoverOn(){
        this.setState({
             hover: true, 
           })
           document.getElementById(this.props.position.id).style.display = "block";
     }
 
     hoverOff(){
          this.setState({
             hover:false,
           })
           document.getElementById(this.props.position.id).style.display = "none";
     }

    render(){
        return(
            <div className="PositionMark"> 
                <div className=" PositionName" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}  >
                    <div id={this.props.position.id} className="hoverCard" style={{display:'none'}}>
                        <div className="PositionTitleHoverPanel"> 
                            {this.props.position.name}
                        </div>
                        <div className="PositionHoverPanelContent">
                            <div className="PositionHoverPanelType"> 
                                <div className="">
                                    Category: {this.props.position.category_name} 
                                </div> 
                                <div className="">
                                    Fee: {this.props.position.fee}
                                </div> 
                            </div>
                            <div className="PositionHoverPanelDescription"> 
                                {this.props.position.description} 
                            </div>
                        </div>
                    </div>
                    {this.props.position.name}
                </div>
                <div className="Edit" onClick={() => this.props.ChangePosition(this.props.position.id)}>
                </div>
                <div className="Minus" onClick={() => this.props.DeletePosition(this.props.position.id)}>
                </div>
            </div>
        )
    }
}

export default PositionMark