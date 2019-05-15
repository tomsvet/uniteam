import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import AdminNavbar from './AdminNavbar';
import URL from '../URL.jsx'
import { Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import EditCategoryPopup from './EditCategoryPopup';
let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This method render admin's page categories of position
 */
class AdminCategory extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            categories:[],
            data:{},
            pagination:[],
            orderById:0,
            orderByName:0,
            orderByCreation:0,
            showNew:false,
            title:'',
            showEdit:false,
        }

        this.getAdminCategoriesStatistics = this.getAdminCategoriesStatistics.bind(this);
        
        this.getAdminCategory = this.getAdminCategory.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.orderByName = this.orderByName.bind(this);
        this.orderById = this.orderById.bind(this);
        this.orderByCreation = this.orderByCreation.bind(this);
        this.chooseIdArrow = this.chooseIdArrow.bind(this);
        this.chooseNameArrow = this.chooseNameArrow.bind(this);
        this.chooseCreationArrow = this.chooseCreationArrow.bind(this);
      
        this.loadPage = this.loadPage.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.loadLast = this.loadLast.bind(this);
        this.loadFirst = this.loadFirst.bind(this);
        this.loadPrev = this.loadPrev.bind(this);
        this.isMorePages = this.isMorePages.bind(this);
        this.isPrevPage = this.isPrevPage.bind(this);
        this.isNextPage = this.isNextPage.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleAllCheck = this.handleAllCheck.bind(this);
        this.removeMarked = this.removeMarked.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showNew = this.showNew.bind(this);
        this.addNew = this.addNew.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        const param = {
            orderById:0,
            orderByName:0,
            orderByCreation:0,
            
        };
        this.getAdminCategoriesStatistics();
        this.getAdminCategory(param);
        
    }

    /**
     * Show pop-up window to add new category
     */
    showNew(){
        this.setState({ 
            showNew: true,
        });
    }

    /**
     * Close pop-up window to add new category
     */
    handleClose(){
        this.setState({ 
            showNew: false, 
        });
        
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    /**
     * This method add new category
     * @param {input data} e 
     */
    addNew(e){
        e.preventDefault();
        const thisUrl = url + "api/getAdminCategory";
        const data = {
           title: this.state.title, 
        }

        axios.post(url +'api/adminAddCategory', data).then(response=> {
            this.handleClose();
            this.getAdminCategoriesStatistics();
            this.loadPage(thisUrl);
        })
        .catch(error=> {
        })
    }

    /**
     * This method get statistics about categories
     */
    getAdminCategoriesStatistics(){
  
        axios.get(url + `api/getAdminCategoriesStatistics`).then(response => {
            this.setState({
                data: response.data,
                
            })
        });
  
  
    }

    /**
     * This method get all categories
     */
    getAdminCategory(param ){
  
        axios.get(url + `api/getAdminCategory`,{params:param}).then(response => {
            this.setState({
                categories: response.data.data 
            })
            this.makePagination(response.data)
        });
  
  
    }

    /**
     * Pagination
     * @param {pagination data} data 
     */
    makePagination(data){
        let pagination = {
            current_page: data.current_page,
            last_page:data.last_page,
            first_page_url:data.first_page_url,
            last_page_url:data.last_page_url,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url,

        }
        this.setState({
            pagination: pagination
        })
    }

    /**
     * This method remove all marked categories
     */
    removeMarked(){
        const thisUrl = url + "api/getAdminCategory";

        let data = {
            categories: this.state.categories,
        }

        axios.post(url + 'api/adminRemoveCategories', data)
        .then(response=> {
            this.loadPage(thisUrl);
            this.getAdminCategoriesStatistics();
            this.setState({err: false});
               
        })
        .catch(error=> {
            
            this.setState({err:true});
        })
    }

    /**
     * Methods which set filtering object
     */
    orderById(){

        if(this.state.orderById == 1){
            const param = {
                orderById:2,
                orderByName:0,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderById:2,
                orderByName:0,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
                
              })
            this.getAdminCategory(param);

        }else{
            const param = {
                orderById:1,
                orderByName:0,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderById:1,
                orderByName:0,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
                
              })
            this.getAdminCategory(param);
        }
    }

    orderByName(){

        if(this.state.orderByName == 1){
            const param = {
                orderById:0,
                orderByName:2,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderById:0,
                orderByName:2,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
                
              })
              this.getAdminCategory(param);

        }else{
            const param = {
                orderById:0,
                orderByName:1,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderById:0,
                orderByName:1,
                orderByCreation:0,
                orderByFaculty:0,
                orderByRegistration:0,
                
              })
              this.getAdminCategory(param);
        }
    }

    orderByCreation(){

        if(this.state.orderByCreation == 1){
            const param = {
                orderById:0,
                orderByName:0,
                orderByCreation:2,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderById:0,
                orderByName:0,
                orderByCreation:2,
                orderByFaculty:0,
                orderByRegistration:0,
                
              })
            this.getAdminCategory(param);

        }else{
            const param = {
                orderById:0,
                orderByName:0,
                orderByCreation:1,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderById:0,
                orderByName:0,
                orderByCreation:1,
                orderByFaculty:0,
                orderByRegistration:0,
                
              })
            this.getAdminCategory(param);
        }
    }

    chooseIdArrow(){
        if(this.state.orderById == 1 ){
            return "sortArrow";
        }else if(this.state.orderById == 2  ){
            return "sortDownArrow";
        }
        return "sort";
    }

    chooseNameArrow(){
        if(this.state.orderByName == 1){
            return "sortArrow";
        }else if(this.state.orderByName == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseCreationArrow(){
        if(this.state.orderByCreation == 1){
            return "sortArrow";
        }else if(this.state.orderByCreation == 2){
            return "sortDownArrow";
        }
        return "";
    }

    loadPage(thisUrl){
        const param = {
            orderById:this.state.orderById,
            orderByName:this.state.orderByName,
            orderByCreation:this.state.orderByCreation, 
        };

        axios.get(thisUrl,{params:param}).then(response => {
            this.setState({
              categories: response.data.data,
            })
            this.makePagination(response.data)
        });
    }


    loadNext(){
        this.loadPage(this.state.pagination.next_page_url);
    }

    loadPrev(){
        this.loadPage(this.state.pagination.prev_page_url);
    }

    loadLast(){
        this.loadPage(this.state.pagination.last_page_url);
    }

    loadFirst(){
        this.loadPage(this.state.pagination.first_page_url);
    }


    isPrevPage(){
        if(this.state.pagination.prev_page_url == null){
            return ;
        }else{
            let value = this.state.pagination.current_page - 1;
            return <li className="page-item"><a className="page-link" href="#" onClick={this.loadPrev}>{value}</a></li>;
        }
    }

    isNextPage(e){
        
        if(this.state.pagination.next_page_url == null){
            return ;
        }else{
            let value = this.state.pagination.current_page +1;
            return <li className="page-item"><a className="page-link" href="#" onClick={this.loadNext}>{value}</a></li>;
        }
    }

    /**
     * This method render pagination buttons
     */
    isMorePages(e){
        if (this.state.pagination.next_page_url != null || this.state.pagination.prev_page_url != null){
            return(
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" onClick={this.loadFirst} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {this.isPrevPage()}
                        <li className="page-item"><a className="page-link ActualPage" href="#" >{this.state.pagination.current_page}</a></li>
                        {this.isNextPage()}
                        <li className="page-item">
                            <a className="page-link"  aria-label="Next" onClick={this.loadLast}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            );
        }
    }


    handleCheck( event){
    
        let categories = this.state.categories;
        categories.forEach(category => {
            if (category.category_id == event.target.value){
                category.isChecked =  event.target.checked;
            }
        })
        this.setState({
            categories: categories
        });


    }

    handleAllCheck(event){
        let categories = this.state.categories;
        categories.forEach(category => {
            category.isChecked =  event.target.checked;
        })
        this.setState({
            categories: categories
        });
    }

    render(){
        return(
            <div className="adminPage">
                <AdminNavbar history={this.props.history} DeleteUser={this.props.DeleteUser}/>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div  className="mt-30 col-md-10  col-lg-10 px-4 ">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Types of position</h1> 
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-dashboard shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="  text-dashboard  mb-1">All</div>
                                                        <div className="h5 mb-0  text-count">{this.state.data.all}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="table-responsive col-md-12   col-lg-12">
                                    <table className="table table-striped table-sm" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th className="headerHover" onClick={this.orderById} data-toggle="tooltip" data-placement="bottom" title="Order by id">ID <span className={this.chooseIdArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByName} data-toggle="tooltip" data-placement="bottom" title="Order by title">Title <span className={this.chooseNameArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByCreation} data-toggle="tooltip" data-placement="bottom" title="Order by creation date">Creation <span className={this.chooseCreationArrow() } /></th>
                                                <th className="headerHover"  >Action</th>  
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th><input onChange={this.handleAllCheck} type="checkbox"   /> </th>
                                                <th>All </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {this.state.categories.map(category => (
                                                <tr key={category.category_id}>
                                                    <td><input onChange={this.handleCheck} type="checkbox" checked={category.isChecked} value={category.category_id} /></td>
                                                    <td>{category.category_id}</td>
                                                    <td>{category.name} </td>
                                                    <td>{category.created}</td>
                                                    <td > <EditCategoryPopup getData={this.loadPage} category={category}  /></td>
                                                </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn button-admin ml-10" onClick={this.removeMarked}>Remove</button>
                                    <button type="button" className="btn button-admin ml-10" onClick={this.showNew}>+ New type</button>
                                    {this.isMorePages()}
                                </div>   
                            </div>
                        </div>
                    </div>

                <Modal show={this.state.showNew} onHide={this.handleClose}>
                    <Modal.Body>
                        <button type="button" class="close" onClick={this.handleClose}>
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <div className="text-center">
                            <h3><i className="fa fa-lock fa-4x"></i></h3>
                            <h2 className="text-center">Add new type?</h2>
                            <p>You can add your new type of position here.</p>
                            <div className="panel-body">
                                <form className="form" method="post" onSubmit={this.addNew}>
                                    <div className="FormField form-row justify-content-center">
                                        <div className="form-group col-md-10"> 
                                            <label className="FormField_Label" htmlFor="firstname">Positon type</label>
                                            <input type="text" id="title" className="form-control" placeholder="Enter position type" value={this.state.title} name="title" ref="title" onChange={this.onChange} required ></input> 
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Button className="FormField_Button" type="submit" >
                                            Add new position
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

export default AdminCategory