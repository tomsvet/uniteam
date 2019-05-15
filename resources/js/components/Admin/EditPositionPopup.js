import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'
let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render buttons on deletion or edit position's data and pop-up windows
 */
class EditPositionPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            category:this.props.position.category_id,
            title: this.props.position.title,
            description: this.props.position.description,
            fee:this.props.position.fee,
            categoryName:this.props.position.category_name,
            showEdit:false,
        }
       
        this.editPosition = this.editPosition.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDeletePosition = this.handleDeletePosition.bind(this);
        this.handleShowEditPosition =this.handleShowEditPosition.bind(this);
        this.handleCloseEditPosition = this.handleCloseEditPosition.bind(this);
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    }

    /**
     * This method edit position
     */
    editPosition(e){
        e.preventDefault();
    
        const position = {
            position_id: this.props.position.id,
            title: this.state.title,
            description: this.state.description, 
            category_id:this.state.category,
            fee:this.state.fee,
        }
        const thisUrl = url + "api/getAdminPositions";
    
        axios.post(url + 'api/updatePosition', position).then(response=> {
          this.props.getData(thisUrl);
          this.handleCloseEditPosition();
        })
        .catch(error=> {
        })
    }

    /**
     * This method show pop-up window to edit
     */
    handleShowEditPosition(){
        this.setState({
           showEdit: true, 
          })
    }
    
    /**
     * This method close pop-up window to edit
     */
    handleCloseEditPosition(){
        this.setState({
           showEdit: false,
          })
    }

    /**
     * This method delete position
     */
    handleDeletePosition(event){
        const thisUrl = url + "api/getAdminPositions";

        let data = {
            position_id: event.target.attributes.value.value,
        }

       

        axios.delete(url + 'api/deletePosition', {params:data})
        .then(response=> {
            this.props.getData(thisUrl);  
        })
        .catch(error=> {  
        })
    }

    render(){
        return(
            <div>
                <div  className="myrow PositionIcon ">
                    <div className="column PositionUpdate" onClick={this.handleShowEditPosition} data-toggle="tooltip" data-placement="bottom" title="Edit Position"></div>
                    <div className="column PositionDelete" onClick={this.handleDeletePosition} value={this.props.position.id} data-toggle="tooltip" data-placement="bottom" title="Delete Position"></div>
                </div>

                <Modal show={this.state.showEdit} onHide={this.handleCloseEditPosition}> 
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleCloseEditPosition}>
                        	<span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button> 
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Change Position information?</h2>
                            <p>You can change position information here.</p>
                        </div>
                        <form onSubmit={this.editPosition} >
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
                            <div className='form-group ' >  
                                <label className="FormField_Label" htmlFor='description'>Description</label>
                                <textarea id='description' row='10' className='form-control' name='description' value={this.state.description} onChange={this.onChange} />
                            </div> 
                            <div className="FormButtons">
                                <button type="submit" className="FormField_Button " >Change</button> 
                            </div>
                        </form>        
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default EditPositionPopup