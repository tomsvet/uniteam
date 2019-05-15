import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import ApplicantPanel from './ApplicantPanel';
import ApplicantArea from './ApplicantArea';
import RemoveApplicantArea from './RemoveApplicantArea';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

class PositionElement extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showPositionUpdate: false,
            showPositionDelete:false,
            category:this.props.position.category_id,
            title: this.props.position.title,
            description: this.props.position.description,
            fee:this.props.position.fee,
            categoryName:this.props.position.category_name,
        }
        this.showClick = this.showClick.bind(this);
        this.handleClosePositionUpdate = this.handleClosePositionUpdate.bind(this);
        this.handleShowPositionUpdate = this.handleShowPositionUpdate.bind(this);
        this.handleClosePositionDelete = this.handleClosePositionDelete.bind(this);
        this.handleShowPositionDelete = this.handleShowPositionDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.DeletePosition = this.DeletePosition.bind(this);
        this.UpdatePosition = this.UpdatePosition.bind(this);
        this.ApplicantIsChoosen = this.ApplicantIsChoosen.bind(this);
        this.FreePosition = this.FreePosition.bind(this);
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

    handleShowPositionUpdate(){
        this.setState({  
            showPositionUpdate: true 
        });
    }
  
    handleClosePositionUpdate(){
        this.setState({  
            showPositionUpdate: false 
        });
    }
  
    handleShowPositionDelete(){
        this.setState({  
            showPositionDelete: true 
        });
    }
  
    handleClosePositionDelete(){
        this.setState({  
            showPositionDelete: false 
        });
    }
  
    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    DeletePosition(e){
        e.preventDefault();
        const position = {
            position_id: this.props.position.id,
        }
        
        axios.delete(url + 'api/deletePosition', {params:position}).then(response=> {
            this.props.getData();
            this.handleClosePositionDelete()
        })
        .catch(error=> {
            
            this.setState({err:true});
        })
        
    }

    UpdatePosition(e){
        e.preventDefault();

        const position = {
            position_id: this.props.position.id,
            title: this.state.title,
            description: this.state.description, 
            category_id:this.state.category,
            fee:this.state.fee,
        }

        axios.post(url + 'api/updatePosition', position).then(response=> {
            this.props.getData();
            this.handleClosePositionUpdate()
        })
        .catch(error=> {  
            this.setState({err:true});
        })
    }

    ApplicantIsChoosen(e){
        if(this.props.project.state != 3){
            if(this.props.position.user_id == 0){
                return  <ApplicantArea position={this.props.position} getData={this.props.getData}/>;               
            }else{
                return <RemoveApplicantArea position={this.props.position} getData={this.props.getData}/>;
            }
        }else{
            return ;
        }
    }

    FreePosition(e){
        if(this.props.position.user_id == 0){
            return(
                <span>
                    <span className=" PositionStatus StatusActive2">
                        Free 
                    </span> 
                    <span className="InterestCount">
                        {this.props.position.interestsCount}
                    </span>
                </span> 
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
                <Modal show={this.state.showPositionUpdate} onHide={this.handleClosePositionUpdate}> 
                    <Modal.Header closeButton> 
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change Position information?</h2>
                            <p>You can change position information here.</p>
                        </div>
                        <form onSubmit={this.UpdatePosition} >
                            <div className="form-group">
                                <label className="FormField_Label" htmlFor="inputState">Category</label>
                                <select id="inputState" name="category" className="form-control" value={this.state.category} onChange={this.onChange}>
                                    {this.props.positionCategories.map(category => (
                                        <option key={category.category_id} value={category.category_id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="FormField_Label" htmlFor="position_title">Position name</label>
                                <input id="position_title" name="title" placeholder="Position name" className="form-control"  type="name" value={this.state.title} onChange={this.onChange}/>
                            </div>

                            <div className="form-group">
                                <label className="FormField_Label" htmlFor="inputFee">Fee category</label>
                                <select id="inputFee" name="fee" className="form-control" value={this.state.fee} onChange={this.onChange}>
                                    <option value="Paid Work">Paid Work</option>
                                    <option value="Wageless">Wageless</option>
                                    <option value="Voluntering">Volunteering</option>
                                </select>
                            </div>

                            <div className="form-group" >  
                                <label className="FormField_Label" htmlFor='description'>Description</label>
                                <textarea id="description" row="10" className="form-control" name="description" value={this.state.description} onChange={this.onChange} />
                            </div> 
                            <div className="FormButtons">
                                <button type="submit" className="FormField_Button " >
                                    Change
                                </button> 
                            </div>
               
                        </form>        
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showPositionDelete} onHide={this.handleClosePositionDelete}> 
                    <Modal.Header closeButton> 
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Delete the project?</h2>
                            <p>You can delete position " {this.props.position.title} "  from this project  here.</p>
                        </div>
                        <div className="FormButtons">
                            <button type="button" className="FormField_Button " onClick={this.DeletePosition}>Delete</button> 
                        </div>      
                    </Modal.Body>
                </Modal>

                <div className="ProfilePosition" >
                    <div  className="myrow">
                        <div  className="ProfilePositionLink leftcolumn70" onClick={this.showClick} data-toggle="tooltip" data-placement="bottom" title="Show more">
                            <div  className="myrow">
                                <div className="PositionLink leftcolumn60">
                                    <div className="textAuthor">
                                        {this.props.position.title} 
                                    </div>
                                </div>
                                <div className="rightcolumn40">
                                    <div className="text-center textAuthor">
                                        { this.FreePosition()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightcolumn30 ">
                            <div  className="myrow PositionIcon">
                                <div className="column PositionUpdate" onClick={this.handleShowPositionUpdate} data-toggle="tooltip" data-placement="bottom" title="Update Position"></div>
                                <div className="column PositionDelete" onClick={this.handleShowPositionDelete} data-toggle="tooltip" data-placement="bottom" title="Delete Position"></div>
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
                                { this.props.position.category_name}
                            </div>
                            <div className="ProfilePositionFee">
                                {this.props.position.fee}
                            </div>
                        </div>
                    </div>
                    <div className="">    
                            {this.ApplicantIsChoosen()}
                    </div>
                    
                
                </div>
            </div>
        )
    }
}

export default PositionElement