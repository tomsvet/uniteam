import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import AdminNavbar from './AdminNavbar';
import URL from '../URL.jsx'
import ProjectsPopup from './ProjectsPopup';

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This method render admin's page projects
 */
class AdminProjects extends Component{

    constructor(props){
        super(props);
        this.state = {
            user:'',
            projects:[],
            data:{},
            pagination:[],
            orderByTitle:0,
            orderByAuthor:0,
            orderByState:0,
            orderByStart:2,
            orderByExpiration:0,
        }

        
        this.getAdminProjects = this.getAdminProjects.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.getAdminProjectsStatistics = this.getAdminProjectsStatistics.bind(this);
        this.orderByTitle = this.orderByTitle.bind(this);
        this.orderByAuthor = this.orderByAuthor.bind(this);
        this.orderByStart = this.orderByStart.bind(this);
        this.orderByExpiration = this.orderByExpiration.bind(this);
        this.chooseTitleArrow = this.chooseTitleArrow.bind(this);
        this.chooseAuthorArrow = this.chooseAuthorArrow.bind(this);
        this.chooseExpirationArrow = this.chooseExpirationArrow.bind(this);
        this.chooseStartArrow = this.chooseStartArrow.bind(this);
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
    }

    componentWillMount(){
        const param = {
            orderByTitle:0,
            orderByAuthor:0,
            orderByState:0,
            orderByStart:2,
            orderByExpiration:0,
        };
        this.getAdminProjectsStatistics();
        this.getAdminProjects(param);
    }
  
    /**
     * This method get admin's statistics
     */
    getAdminProjectsStatistics(){
        axios.get(url + `api/getAdminProjectsStatistics`).then(response => {
          this.setState({
            data: response.data,
          })
        });
    }

    /**
     * This method send request to get list of all projects
     * @param {filtering data} param 
     */
    getAdminProjects(param ){
        axios.get(url + `api/getAdminProjects`,{params:param}).then(response => {

            this.setState({
                projects: response.data.data
                
            })
            this.makePagination(response.data)
        });
    }

    /**
     * 
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
     * Method which remove all marked projects
     */
    removeMarked(){
        const thisUrl = url + "api/getAdminProjects";

        let data = {
            projects: this.state.projects,
        }

        axios.post(url + 'api/adminRemoveProjects', data)
        .then(response=> {
            this.loadPage(thisUrl)
               
        })
        .catch(error=> {
        })
    }


    /**
     * Setting filter object
     */
    orderByTitle(){

        if(this.state.orderByTitle == 1){
            const param = {
                orderByTitle:2,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
            };

            this.setState({
                orderByTitle:2,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0, 
              })
            this.getAdminProjects(param);

        }else{
            const param = {
                orderByTitle:1,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
            };

            this.setState({
                orderByTitle:1,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
              })
            this.getAdminProjects(param);
        }
    }

    /**
     * Setting filter object
     */
    orderByAuthor(){

        if(this.state.orderByAuthor == 1){
            const param = {
                orderByTitle:0,
                orderByAuthor:2,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
            };

            this.setState({
                orderByTitle:0,
                orderByAuthor:2,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
              })
            this.getAdminProjects(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByAuthor:1,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
            };

            this.setState({
                orderByTitle:0,
                orderByAuthor:1,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:0,
                
              })
            this.getAdminProjects(param);
        }
    }

    /**
     * Setting filter object
     */
    orderByStart(){

        if(this.state.orderByStart == 1){
            const param = {
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:2,
                orderByExpiration:0,
            };

            this.setState({
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:2,
                orderByExpiration:0,
                
              })
            this.getAdminProjects(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:1,
                orderByExpiration:0,
            };

            this.setState({
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:1,
                orderByExpiration:0,
                
              })
            this.getAdminProjects(param);
        }
    }

    /**
     * Setting filter object
     */
    orderByExpiration(){

        if(this.state.orderByExpiration == 1){
            const param = {
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:2,
            };

            this.setState({
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:2,
                
              })
            this.getAdminProjects(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:1,
            };

            this.setState({
                orderByTitle:0,
                orderByAuthor:0,
                orderByState:0,
                orderByStart:0,
                orderByExpiration:1,
                
              })
            this.getAdminProjects(param);
        }
    }

    /**
     * Render arrows 
     */
    chooseTitleArrow(){
        if(this.state.orderByTitle == 1 ){
            return "sortArrow";
        }else if(this.state.orderByTitle == 2  ){
            return "sortDownArrow";
        }
        return "";

    }

    chooseAuthorArrow(){
        if(this.state.orderByAuthor == 1){

            return "sortArrow";
        }else if(this.state.orderByAuthor == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseStartArrow(){
        if(this.state.orderByStart == 1){

            return "sortArrow";
        }else if(this.state.orderByStart == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseExpirationArrow(){
        if(this.state.orderByExpiration == 1){

            return "sortArrow";
        }else if(this.state.orderByExpiration == 2){
            return "sortDownArrow";
        }
        return "";
    }

    loadPage(thisUrl){
        const param = {
            orderByTitle:this.state.orderByTitle,
            orderByAuthor:this.state.orderByAuthor,
            orderByState:this.state.orderByState,
            orderByStart:this.state.orderByStart,
            orderByExpiration:this.state.orderByExpiration,
        };

        axios.get(thisUrl,{params:param}).then(response => {

            this.setState({
              projects: response.data.data,
              
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

    isNextPage(e){
        
        if(this.state.pagination.next_page_url == null){
            return ;
        }else{
            let value = this.state.pagination.current_page +1;
            return <li className="page-item"><a className="page-link" href="#" onClick={this.loadNext}>{value}</a></li>;
        }
    }

    /**
     * Method to render pagination buttons
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
        let projects = this.state.projects;
        projects.forEach(project => {   
            if (project.id == event.target.value){
                project.isChecked =  event.target.checked;
            }
        })
        this.setState({
            projects: projects,
        });
    }

    handleAllCheck(event){
        let projects = this.state.projects;
        projects.forEach(project => {
            project.isChecked =  event.target.checked;
        })
        this.setState({
            projects: projects,
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
                                    <h1 className="h2">Projects</h1>    
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
                                                        <div className="  text-dashboard  mb-1">Running</div>
                                                        <div className="h5 mb-0  text-count">{this.state.data.running}</div>
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
                                                        <div className="  text-dashboard  mb-1">Active</div>
                                                        <div className="h5 mb-0  text-count">{this.state.data.active}</div>
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
                                                        <div className="  text-dashboard  mb-1">Finished</div>
                                                        <div className="h5 mb-0  text-count">{this.state.data.finished}</div>
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
                                                <th className="headerHover" onClick={this.orderByTitle} data-toggle="tooltip" data-placement="bottom" title="Order by title">Title <span className={this.chooseTitleArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByAuthor} data-toggle="tooltip" data-placement="bottom" title="Order by Authors lastname">Author <span className={this.chooseAuthorArrow() } /></th>
                                                <th>State</th>
                                                <th className="headerHover" onClick={this.orderByStart} data-toggle="tooltip" data-placement="bottom" title="Order by Start date">Start date <span className={this.chooseStartArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByExpiration} data-toggle="tooltip" data-placement="bottom" title="Order by Expiration">Expiration <span className={this.chooseExpirationArrow() } /></th>
                                                <th className="headerHover" >Action</th>
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
                                            {this.state.projects.map(project => (
                                                <tr key={project.id}>
                                                    <td><input onChange={this.handleCheck} type="checkbox" checked={project.isChecked} value={project.id} /></td>
                                                    <td>{project.title}</td>
                                                    <td>{project.lastname} {project.firstname}</td>
                                                    <td>{project.stateName}</td>
                                                    <td>{project.created}</td>
                                                    <td>{project.end}</td>
                                                    <td><ProjectsPopup project={project} getData={this.loadPage}/></td>
                                                </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn button-admin" onClick={this.removeMarked}>Remove</button>
                                    {this.isMorePages()}
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminProjects
