import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import AdminNavbar from './AdminNavbar';
import { Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import URL from '../URL.jsx'
import UsersPopup from './UsersPopup';
let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This method render admin's page Users
 */
class AdminUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            users:[],
            data:{},
            pagination:[],
            orderByLastname:0,
            orderByFirstname:0,
            orderByType:0,
            orderByFaculty:0,
            orderByRegistration:2,
            type:'normal',
            showChange:false,
        }

        this.getAdminUsersStatistics = this.getAdminUsersStatistics.bind(this);
        this.getAdminUsers = this.getAdminUsers.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.orderByLastname = this.orderByLastname.bind(this);
        this.orderByFirstname = this.orderByFirstname.bind(this);
        this.orderByFaculty = this.orderByFaculty.bind(this);
        this.orderByType = this.orderByType.bind(this);
        this.orderByRegistration = this.orderByRegistration.bind(this);
        this.chooseLastnameArrow = this.chooseLastnameArrow.bind(this);
        this.chooseFirstnameArrow = this.chooseFirstnameArrow.bind(this);
        this.chooseRegistrationArrow = this.chooseRegistrationArrow.bind(this);
        this.chooseTypeArrow = this.chooseTypeArrow.bind(this);
        this.chooseFacultyArrow = this.chooseFacultyArrow.bind(this);
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
        this.showChange = this.showChange.bind(this);
        this.changeType = this.changeType.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        const param = {
            orderByLastname:0,
            orderByFirstname:0,
            orderByType:0,
            orderByFaculty:0,
            orderByRegistration:2,
        };
        this.getAdminUsersStatistics();
        this.getAdminUsers(param);
        
    }

    /**
     * This method show Change type pop-up
     */
    showChange(){
        this.setState({ 
            showChange: true, 
        });
    }

    /**
     * This method close Change type pop-up
     */
    handleClose(){
        this.setState({ 
            showChange: false,
        });
        
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    /**
     * This method change user's type
     */
    changeType(e){
        e.preventDefault();
        const thisUrl = url + "api/getAdminUsers";
        const data = {
           type: this.state.type,
           users: this.state.users, 
        }

        axios.post(url +'api/adminChangeUserType', data).then(response=> {
            this.handleClose();
            this.loadPage(thisUrl);
        })
        .catch(error=> {
        })
    }

    /**
     * This method get statistics about users
     */
    getAdminUsersStatistics(){
        axios.get(url + `api/getAdminUsersStatistics`).then(response => {
          this.setState({
            data: response.data,
          })
        });
    }

    /**
     * This method get users
     */
    getAdminUsers(param ){
        axios.get(url + `api/getAdminUsers`,{params:param}).then(response => {
          this.setState({
            users: response.data.data 
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
     * This method remove all marked users 
     */
    removeMarked(){
        const thisUrl = url + "api/getAdminUsers";

        let data = {
            users: this.state.users,
        }

        axios.post(url + 'api/adminRemoveUsers', data)
        .then(response=> {
            this.loadPage(thisUrl)      
        })
        .catch(error=> {
        })
    }

    /**
     * Methods to set filtering object
     */
    orderByLastname(){

        if(this.state.orderByLastname == 1){
            const param = {
                orderByLastname:2,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:2,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            })
            this.getAdminUsers(param);

        }else{
            const param = {
                orderByLastname:1,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:1,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0, 
            })
            this.getAdminUsers(param);
        }
    }

    orderByFirstname(){

        if(this.state.orderByFirstname == 1){
            const param = {
                orderByLastname:0,
                orderByFirstname:2,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:2,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            })
            this.getAdminUsers(param);

        }else{
            const param = {
                orderByLastname:0,
                orderByFirstname:1,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:1,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:0,
            })
            this.getAdminUsers(param);
        }
    }

    orderByType(){

        if(this.state.orderByType == 1){
            const param = {
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:2,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:2,
                orderByFaculty:0,
                orderByRegistration:0,
            })
            this.getAdminUsers(param);

        }else{
            const param = {
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:1,
                orderByFaculty:0,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:1,
                orderByFaculty:0,
                orderByRegistration:0,  
            })
            this.getAdminUsers(param);
        }
    }

    orderByFaculty(){

        if(this.state.orderByFaculty == 1){
            const param = {
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:2,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:2,
                orderByRegistration:0,
            })
            this.getAdminUsers(param);

        }else{
            const param = {
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:1,
                orderByRegistration:0,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:1,
                orderByRegistration:0, 
            })
            this.getAdminUsers(param);
        }
    }

    orderByRegistration(){

        if(this.state.orderByRegistration == 1){
            const param = {
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:2,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:2, 
            })
            this.getAdminUsers(param);

        }else{
            const param = {
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:1,
            };

            this.setState({
                orderByLastname:0,
                orderByFirstname:0,
                orderByType:0,
                orderByFaculty:0,
                orderByRegistration:1,
            })
            this.getAdminUsers(param);
        }
    }

    /**
     * Render arrows 
     */
    chooseLastnameArrow(){
        if(this.state.orderByLastname == 1 ){
            return "sortArrow";
        }else if(this.state.orderByLastname == 2  ){
            return "sortDownArrow";
        }
        return "sort";

    }

    chooseFirstnameArrow(){
        if(this.state.orderByFirstname == 1){
            return "sortArrow";
        }else if(this.state.orderByFirstname == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseTypeArrow(){
        if(this.state.orderByType == 1){
            return "sortArrow";
        }else if(this.state.orderByType == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseFacultyArrow(){
        if(this.state.orderByFaculty == 1){
            return "sortArrow";
        }else if(this.state.orderByFaculty == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseRegistrationArrow(){
        if(this.state.orderByRegistration == 1){

            return "sortArrow";
        }else if(this.state.orderByRegistration == 2){
            return "sortDownArrow";
        }
        return "";
    }

    loadPage(thisUrl){
        const param = {
            orderByLastname:this.state.orderByLastname,
            orderByFirstname:this.state.orderByFirstname,
            orderByType:this.state.orderByType,
            orderByFaculty:this.state.orderByFaculty,
            orderByRegistration:this.state.orderByRegistration,
        };

        axios.get(thisUrl,{params:param}).then(response => {
            this.setState({
                users: response.data.data,
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

    isPrevPage(e){
        
        if(this.state.pagination.prev_page_url == null){
            return ;
        }else{
            let value = this.state.pagination.current_page - 1;
            return <li className="page-item"><a className="page-link" href="#" onClick={this.loadPrev}>{value}</a></li>;
        }
    }

    isNextPage(){
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
    isMorePages(){
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
        let users = this.state.users;
        users.forEach(user => {   
            if (user.id == event.target.value){   
                user.isChecked =  event.target.checked;
            }
        })
        this.setState({
            users: users
        });
    }

    handleAllCheck(event){
        let users = this.state.users;
        users.forEach(user => {
            user.isChecked =  event.target.checked;
        })
        this.setState({
            users: users
        });
    }

    render(){
        return(
            <div className="adminPage">
                <div>
                <AdminNavbar history={this.props.history} DeleteUser={this.props.DeleteUser}/>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                        </div>
                        <div  className="mt-30 col-md-10  col-lg-10 px-4 ">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Users</h1>                       
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
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-dashboard shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="  text-dashboard  mb-1">From university</div>
                                                    <div className="h5 mb-0  text-count">{this.state.data.university}</div>
                                                </div>                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-dashboard shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="  text-dashboard  mb-1">Supervisors</div>
                                                    <div className="h5 mb-0  text-count">{this.state.data.supervisor}</div>
                                                </div>                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-dashboard shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="  text-dashboard  mb-1">Somebody else</div>
                                                    <div className="h5 mb-0  text-count">{this.state.data.normal}</div>
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
                                            <th className="headerHover" onClick={this.orderByLastname} data-toggle="tooltip" data-placement="bottom" title="Order by lastname">Lastname <span className={this.chooseLastnameArrow() } /></th>
                                            <th className="headerHover" onClick={this.orderByFirstname} data-toggle="tooltip" data-placement="bottom" title="Order by firstname">Firstname <span className={this.chooseFirstnameArrow() } /></th>
                                            <th className="headerHover" onClick={this.orderByType} data-toggle="tooltip" data-placement="bottom" title="Order by type">Type <span className={this.chooseTypeArrow() } /></th>
                                            <th className="headerHover" onClick={this.orderByFaculty} data-toggle="tooltip" data-placement="bottom" title="Order by faculty">Faculty <span className={this.chooseFacultyArrow() } /></th>
                                            <th className="headerHover" onClick={this.orderByRegistration} data-toggle="tooltip" data-placement="bottom" title="Order by registration date">Registration<span className={this.chooseRegistrationArrow() } /></th>
                                            <th  className="headerHover">Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th><input onChange={this.handleAllCheck} type="checkbox"   /> </th>
                                            <th>All </th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {this.state.users.map(user => (
                                            <tr key={user.id}>
                                                <td><input onChange={this.handleCheck} type="checkbox" checked={user.isChecked} value={user.id} /></td>
                                                <td>{user.lastname}</td>
                                                <td>{user.firstname} </td>
                                                <td>{user.type}</td>
                                                <td>{user.faculty}</td>
                                                <td>{user.created}</td>
                                                <td><UsersPopup user={user} getData={this.loadPage}/></td>
                                            </tr>
                                        ))}   
                                    </tbody>
                                </table> 
                                <button type="button" className="btn button-admin ml-10" onClick={this.removeMarked}>Remove</button>
                                <button type="button" className="btn button-admin ml-10" onClick={this.showChange}>Change type</button>
                                {this.isMorePages()}
                            </div>   
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={this.state.showChange} onHide={this.handleClose}>
                <Modal.Body>
                    <button type="button" class="close" onClick={this.handleClose}>
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close</span>
                    </button> 
                    <div className="text-center">
                        <h3><i className="fa fa-lock fa-4x"></i></h3>
                        <h2 className="text-center">Change users type?</h2>
                        <p>You can change type of marked users type here.</p>
                        <div className="panel-body">
                            <form className="form" method="post" onSubmit={this.changeType}>
                                <div className="form-group">
                                    <label className="FormField_Label" htmlFor="inputState">Type</label>
                                    <select id="inputState" className="form-control" placeholder="Choose some type" name="type" ref="type" value={this.state.type} onChange={this.onChange} >
                                        <option  value='normal'>normal</option>
                                        <option  value='university'>university</option>
                                        <option  value='supervisor'>supervisor</option>
                                        <option  value='admin'>admin</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <Button className="FormField_Button" type="submit" >
                                            Change Type
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

export default AdminUsers