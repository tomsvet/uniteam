import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import SearchIcon from './search_icon.png'
import { NavLink } from 'react-router-dom'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;


/**
 * This component render subnavbar in projects and people page
 */
class SubNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            clickedPage: 1,
            positionCategories:[],
            position:"0",
            sort: '0',
            state:'-1' ,
            filterMenu:true,
            hidden:true,
        }
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeOrder = this.onChangeOrder.bind(this);
        this.AllProjects = this.AllProjects.bind(this);
        this.InterestedProjects = this.InterestedProjects.bind(this);
        this.MyProjects = this.MyProjects.bind(this);
        this.SupervisorProjects = this.SupervisorProjects.bind(this);
        this.BookmarkProjects = this.BookmarkProjects.bind(this);
        this.showFilterMenu = this.showFilterMenu.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.SupervisorPeople = this.SupervisorPeople.bind(this);
        this.AllPeople = this.AllPeople.bind(this);
        this.SupervisorPeoplePage = this.SupervisorPeoplePage.bind(this);
        this.isProjectFilter = this.isProjectFilter.bind(this);
        this.NewProject = this.NewProject.bind(this);
        this.getPositionCategories = this.getPositionCategories.bind(this);
      
    }


    componentDidMount () {
       this.getPositionCategories();
    }

    /**
     * This method get positions categories
     */
    getPositionCategories(){
        axios.get(url + 'api/positionCategory').then(response => {
           
            this.setState({
              positionCategories: response.data,
            })
            this.setState({
                positionC :this.state.positionCategories[0].category_id,
            })
           
        })
    }


    onChangeCategory(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });

        this.props.CategoryChange(value);
    }

    onChangeOrder(e){
        const {name, value} = e.target;
        this.setState({[name]: value});

        this.props.OrderChange(value);

    }

    onChangeState(e){
        const {name, value} = e.target;
        this.setState({[name]: value});

        this.props.StateChange(value);
    }

    showObject(){
        var x = document.getElementById("ProjectSearch");
        if (x.type === "hidden") {
            x.type = "text";
        } else {
            x.type = "hidden";
        }
    }

    MyProjects(e){
        this.setState({
            hidden: false
        });

        this.props.setClickedPage(2);
        
    }

    InterestedProjects(e){
        this.setState({hidden: false});
        this.props.setClickedPage(5);
    }

    AllProjects(e){
        this.setState({
            hidden: true
        });
        this.props.setClickedPage(1);
        if (this.state.state == 4){
            this.setState({
                state: 0
            });

            this.props.StateChange(0);
        }
    }


    SupervisorProjects(e){
        this.setState({hidden: false});
        this.props.setClickedPage(4);
    }

    BookmarkProjects(e){
        this.setState({hidden: true});
        this.props.setClickedPage(3);
        if (this.state.state == 4){
            this.setState({state: 0});

        this.props.StateChange(0);
        }
    }

    /**
     * Render link to supervisors projects
     */
    SupervisorPage(){
        if(this.props.type == "supervisor" ){
            return(
                <li className="nav-item ">
                    <div className={this.props.clickedPage === 4 ? 'nav-link Active' : 'nav-link'} onClick={this.SupervisorProjects}> 
                        Supervisor
                    </div>
                </li>
            );
        }
        return ; 
    }

    /**
     * Render link to supervisors people
     */
    SupervisorPeoplePage(){
        if(this.props.type == "supervisor" ){
            return(
                <li className="nav-item ">
                    <div className={this.props.clickedPage === 2 ? 'nav-link Active' : 'nav-link'} onClick={this.SupervisorPeople}>
                        Supervisor
                    </div>
                </li>
            );
        }
        return ; 
    }

    AllPeople(e){
        this.setState({
            clickedPage:1
        });
        this.props.setClickedPage(1);
    }

    SupervisorPeople(e){
        this.setState({
            clickedPage:2
        });
        this.props.setClickedPage(2);
    }

    /**
     * Render subnavbar links
     */
    showTypes(){
        if(this.props.link === "Projects"){

            return(
                <>
                    <li className="nav-item ">  
                        <div className={this.props.clickedPage === 1 ? 'nav-link Active' : 'nav-link'} onClick={this.AllProjects}>
                            Actual
                        </div>
                    </li>
                
                    <li className="nav-item ">
                        <div className={this.props.clickedPage === 2 ? 'nav-link Active' : 'nav-link'} onClick={this.MyProjects}>
                            My
                        </div>
                    
                    </li>

                    <li className="nav-item ">
                        <div className={this.props.clickedPage === 5 ? 'nav-link Active' : 'nav-link'} onClick={this.InterestedProjects}>
                            Interested
                        </div>
                    </li>

                    <li className="nav-item ">
                        <div className={this.props.clickedPage === 3 ? 'nav-link Active' : 'nav-link'} onClick={this.BookmarkProjects}>
                            Bookmarks
                        </div>
                    </li>

                    {this.SupervisorPage()}
                </>
            )
        }else if(this.props.link === "People"){
            return(
                <>
                    <li className="nav-item ">
                        <div className={this.props.clickedPage === 1 ? 'nav-link Active' : 'nav-link'} onClick={this.AllPeople}>
                            All
                        </div>
                    </li>
                
                    {this.SupervisorPeoplePage()}
                </>
            )
        }
    }

    showFilterMenu(e){
        if(this.state.filterMenu == true){
            this.setState({
                filterMenu: false
            });
        }else{
            this.setState({
                filterMenu: true
            });
        }
    }

    /**
     * 
     * Render project state filter
     */
    isProjectFilter(){
        if(this.props.link === "Projects"){
            return(
                <select  className="ProjectFilter" name="state" value={this.state.state} onChange={this.onChangeState}>
                    <option value='-1'>All </option>
                    <option value='0' hidden={this.state.hidden}>Unapproved</option>
                    <option value='1'>Active</option>
                    <option value='2'>Running</option>
                    <option value='3'>Finished</option>
                    <option value='4' hidden={this.state.hidden}>Ended</option>
                </select>
            );
        }
    }

    /**
     * Render link to create a project
     */
    NewProject(){
        if(this.props.link === "Projects"){
            return(
                <div class="btn-toolbar pr-15 pl-15">
                    <NavLink to={url2+"create"} className="btn mt-10 link-new" >New Project</NavLink>    
                </div>
            );
        }
    } 

    render(){
        return(
            <div >
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center ml-m15 mr-m15  border-bottom">
                    <h1 class="HeaderTitle">{this.props.link}</h1>
                    {this.NewProject()}
                </div>

                <nav className="navbar subnavbar navbar-expand " >
                    <ul className="navbar-nav  mr-auto">                   
                        <li className="nav-item "> 
                            <div className="FilterMenuButton" onClick={this.showFilterMenu}></div>
                        </li>
                        {this.showTypes()} 
                    </ul> 
                </nav>

                <div className="card FilterMenu" hidden={this.state.filterMenu}>
                    <div className="myrow">
                        <div className="col-12 col-md-6">
                            <div className="Search">
                                <div className="input-group">   
                                    <input type="search" className="form-control ProjectSearch" id="ProjectSearch" placeholder={this.props.link === "Projects" ? "Search Project" : "Search Lastname"} value={this.props.search} onChange={this.props.changeSearch}  ></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 aho">
                            {this.isProjectFilter()}
                            <select  className="ProjectFilter" name="sort" value={this.state.sort} onChange={this.onChangeOrder}>
                                <option value='0'>Latest </option>
                                <option value='1'>Oldest</option>
                                <option value='2'>A to Z</option>
                                <option value='3'>Z to A</option>
                            </select>

                            <select  className="ProjectFilter" name="position" value={this.state.position} onChange={this.onChangeCategory}>
                                <option value={0}>All categories</option>
                                {this.state.positionCategories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>{category.name}</option>
                                ))}
                            </select>


                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default SubNavbar