import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProjectPreview from './ProjectPreview';
import SubNavbar from './SubNavbar';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component show list of projects
 */
class ProjectLists extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : this.props.user,
            projects: [],
            pagination:[],
            url1:'/api/projects',
            url2:null,
            test:[],
            clickedPage:1,
            bookmarks:[],
            state:'-1',
            search:'',
            filter:1,
            order:'0',
            positionCategory:'0',
        }

        this.loadNext = this.loadNext.bind(this);
        this.loadLast = this.loadLast.bind(this);
        this.loadFirst = this.loadFirst.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.loadPrev = this.loadPrev.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.setClickedPage = this.setClickedPage.bind(this);
        this.getBookmarks = this.getBookmarks.bind(this);
        this.ProjectPreview = this.ProjectPreview.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.CategoryChange = this.CategoryChange.bind(this);
        this.OrderChange = this.OrderChange.bind(this);
        this.isMorePages = this.isMorePages.bind(this);
        this.isPrevPage = this.isPrevPage.bind(this);
        this.isNextPage = this.isNextPage.bind(this);
        this.StateChange = this.StateChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount () {
        this.getData();
        this.getBookmarks();
    }

    /**
     * Method which set object and call function to get projects data
     * 
     */
    getData(){
       const param = {
            filter: this.state.clickedPage,
            search: this.state.search,
            order:this.state.order,
            state:this.state.state,
            positionCategory: this.state.positionCategory,
            user_id:this.props.user.id,
        };
        this.getProjects(param);  
    }

    /**
     * Reaction to change type of category (get projects data with new filter)
     * @param {*} value 
     */
    CategoryChange(value){
        this.setState({
            positionCategory: value, 
        }) 

        const param = {
            filter: this.state.clickedPage,
            search: this.state.search,
            order:this.state.order,
            positionCategory: value,
            state:this.state.state,
            user_id:this.props.user.id,
        };

        this.getProjects(param);
    }

    /**
     * Reaction to change type of ordering (get projects data with new filter)
     * @param {*} value 
     */
    OrderChange(value){
        this.setState({
            order: value, 
        })

        const param = {
            filter: this.state.clickedPage,
            search: this.state.search,
            order:value,
            state:this.state.state,
            positionCategory: this.state.positionCategory,
            user_id:this.props.user.id,
        };

        this.getProjects(param);
    }


    /**
     * Reaction to change type of project state (get projects data with new filter)
     * @param {*} value 
     */
    StateChange(value){
        this.setState({
            state: value, 
        }) 

        const param = {
            filter: this.state.clickedPage,
            search: this.state.search,
            order:this.state.order,
            state:value,
            positionCategory: this.state.positionCategory,
            user_id:this.props.user.id,
        };

        this.getProjects(param);
    }

    /**
     * Method which send request to get projects data 
     */
    getProjects(param){
        axios.get(url + 'api/projects',{params:param}).then(response => {
            this.setState({
                projects: response.data.data,
                url1: response.data.next_page_url,
                url2: response.data.prev_page_url,
            })
            this.makePagination(response.data);
        })
        
    }

    /**
     * Searching method
     * @param {*} e 
     */
    changeSearch(e){
        this.setState({
            search: e.target.value, 
        })

        const param = {
            filter: this.state.clickedPage,
            search: e.target.value,
            order: this.state.order,
            state:this.state.state,
            positionCategory: this.state.positionCategory,
            user_id:this.props.user.id,
        };

        this.getProjects(param);
    }

    setClickedPage(value){
        this.setState({
            clickedPage:value,
        })

        const param = {
            filter: value,
            search: this.state.search,
            order:this.state.order,
            state:this.state.state,
            positionCategory: this.state.positionCategory,
            user_id:this.props.user.id,
        };

        this.getProjects(param);
    }



    loadUsers(url){
        const param = {
            filter: this.state.clickedPage,
            search: this.state.search,
            order:this.state.order,
            state:this.state.state,
            positionCategory: this.state.positionCategory,
            user_id:this.props.user.id,
        };

          
          
        axios.get(url,{params:param}).then(response => {
            this.setState({
              projects: response.data.data,
              url1: response.data.next_page_url,
              url2: response.data.prev_page_url,
              
            })

            this.makePagination(response.data)   
        })
    }

    /**
     * Pagination
     * @param {Pagination data} data 
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
     * Method which send request to get user bookmarks
     */
    getBookmarks(e){
        const userId = this.props.user.id;

        axios.get(url + `api/bookmarks/${userId}`).then(response => {
            this.setState({
              bookmarks: response.data,
              
            })

            
        })
    }

    ProjectPreview(project){
        var value = 0;
        this.state.bookmarks.forEach(bookmark => {
            if(project.id == bookmark.project_id){
               
                value = bookmark.id;

                return;
            }
        });

        if(value == 0){
            return <ProjectPreview getData={this.getData} getBookmarks={this.getBookmarks} bookmarkProject={0} user={this.props.user} author={project.author} project={project} />;
        }else{
            return  <ProjectPreview getData={this.getData} getBookmarks={this.getBookmarks}  bookmarkProject={value} user={this.props.user} author={project.author} project={project} />;
        }
    }

    loadNext(){
        this.loadUsers(this.state.pagination.next_page_url);
    }

    loadPrev(){
        this.loadUsers(this.state.pagination.prev_page_url);
    }

    loadLast(){
        this.loadUsers(this.state.pagination.last_page_url);
    }

    loadFirst(){
        this.loadUsers(this.state.pagination.first_page_url);
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
     * This method render paginations button
     * 
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
                        <li className="page-item">
                            <a className="page-link ActualPage" href="#" >
                                {this.state.pagination.current_page}
                            </a>
                        </li>
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

    render(){
        return(
            <div className="ProjectsList">
                <SubNavbar link="Projects" type={this.props.user.type} search={this.state.search} changeSearch={this.changeSearch} clickedPage={this.state.clickedPage}  setClickedPage={this.setClickedPage} loadData={this.getProjects} CategoryChange={this.CategoryChange} OrderChange={this.OrderChange} StateChange={this.StateChange}/>
                {this.state.projects.map(project => (
                    <div key={project.id}>{this.ProjectPreview(project)}</div>
                ))}
                    
               {this.isMorePages()}      
            </div>
        )
    }
}

export default ProjectLists