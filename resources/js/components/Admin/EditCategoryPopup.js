import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap';
import URL from '../URL.jsx'
let link = URL;
const url = link.url;
const url2 = link.url2;


/**
 * This component render buttons on deletion or edit categories data and pop-up windows
 */
class EditCategoryPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            showEdit:false,
            title: this.props.category.name,
        }
      
        this.editCategory = this.editCategory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    }

    /**
     * This method show pop-up window to edit
     */
    handleShowEdit(){
        this.setState({ 
            showEdit: true,
        });
    }

    /**
     * This method close pop-up window to edit
     */
    handleCloseEdit(){
        this.setState({ 
            showEdit: false,
        });  
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    }

    /**
     * This method edit category
     */
    editCategory(e){
        e.preventDefault();
    
        const position = {
            category_id: this.props.category.category_id,
            title: this.state.title,
        }
        const thisUrl = url + "api/getAdminCategory";
    
        axios.post(url + 'api/updateCategory', position).then(response=> {
            this.props.getData(thisUrl);
            this.handleCloseEdit();
            
        })
        .catch(error=> {
        })
    }

    /**
     * This method delete category
     */
    handleDeleteCategory(event){
        const thisUrl = url + "api/getAdminCategory";

        let data = {
            category_id: event.target.attributes.value.value,
        }

        axios.delete(url + 'api/deleteCategory', {params:data})
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
                    <div className="column PositionUpdate" onClick={this.handleShowEdit} data-toggle="tooltip" data-placement="bottom" title="Edit Category"></div>
                    <div className="column PositionDelete" onClick={this.handleDeleteCategory} value={this.props.category.category_id} data-toggle="tooltip" data-placement="bottom" title="Delete Category"></div>
                </div>

                <Modal show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleCloseEdit}>
                        	<span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button> 
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Edit category?</h2>
                            <p>You can edit your type of position here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.editCategory}>
                                    <div className="FormField form-row justify-content-center">
                                        <div className="form-group col-md-10"> 
                                            <label className="FormField_Label" htmlFor="firstname">Positon type</label>
                                            <input type="text" id="title" className="form-control" placeholder="Enter position type" value={this.state.title} name="title" ref="title" onChange={this.onChange} required ></input> 
                                        </div>   
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                            Edit category
                                        </Button>
                                    </div>      
                                </form>                                                
                            </div>
                        </div>              
                    </Modal.Body>  
                </Modal>
            </div>
        )
    }
}

export default EditCategoryPopup