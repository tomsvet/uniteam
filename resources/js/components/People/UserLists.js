import axios from 'axios'
import React, { Component } from 'react'
import UserPanel from './UserPanel';
import SubNavbar from '../Home/SubNavbar';
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component show list of user's previews
 */
class UserLists extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            authProjects:[],
            pagination:[],
            clickedPage:1,
            search:'',
            filter:1,
            order:'0',
            positionCategory:'0',
        }

        this.loadUsers = this.loadUsers.bind(this);
        this.loadAuthUserProjects = this.loadAuthUserProjects.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.loadLast = this.loadLast.bind(this);
        this.loadFirst = this.loadFirst.bind(this);
        this.isMorePages = this.isMorePages.bind(this);
        this.makePgination = this.makePagination.bind.bind(this);
        this.loadPrev = this.loadPrev.bind(this);
        this.UserPanel = this.UserPanel.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.CategoryChange = this.CategoryChange.bind(this);
        this.OrderChange = this.OrderChange.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.isPrevPage = this.isPrevPage.bind(this);
        this.isNextPage = this.isNextPage.bind(this);
        this.setClickedPage = this.setClickedPage.bind(this);
    }

    componentDidMount () {
		const param = {
			filter: this.state.clickedPage,
			search: this.state.search,
			order:this.state.order,
			positionCategory: this.state.positionCategory,
		};
        this.getUsers(param);
        this.loadAuthUserProjects();
    }

    /**
     * Method which set subpage
     * @param {*clicked value} value 
     */
    setClickedPage(value){
        this.setState({
          	clickedPage:value,
      	})

		const param = {
			filter: value,
			search: this.state.search,
			order:this.state.order,
			positionCategory: this.state.positionCategory,
			user_id:this.props.auth_user.id,
		};
    	this.getUsers(param);
    }

    /**
     * Show list of users with new filter on category
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
            user_id:this.props.auth_user.id,
        };

        this.getUsers(param);
    }

    /**
     * Show list of users with new filter on category
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
			positionCategory: this.state.positionCategory,
			user_id:this.props.auth_user.id,
        };

        this.getUsers(param);
    }

    /**
     * Searching a person by name
     * @param {input value} e 
     */
    changeSearch(e){
        this.setState({
           search: e.target.value, 
        })

        const param = {
			filter: this.state.clickedPage,
			search: e.target.value,
			order: this.state.order,
			positionCategory: this.state.positionCategory,
			user_id:this.props.auth_user.id,
      	};

      	this.getUsers(param);
    }

    /**
     * Method which send request to get people data
     * @param {filter object} param 
     */
    getUsers(param){
        axios.get(url + 'api/users',{params:param}).then(response => {
          	this.setState({
        		users: response.data.data,
          	})
          	this.makePagination(response.data);
      	})
    }


    loadUsers(url){
        const param = {
			filter:this.state.clickedPage,
			search: this.state.search,
			order: this.state.order,
			positionCategory: this.state.positionCategory,
			user_id:this.props.auth_user.id,
		};

		if(url == undefined){
			url = this.state.pagination.first_page_url;
		}
          
        axios.get(url,{params:param}).then(response => {
            this.setState({
              users: response.data.data,
              
            })
  
            this.makePagination(response.data) 
          })

        
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


    loadAuthUserProjects(){
        const projectId = this.props.auth_user.id;
        axios.get(url + `api/showUserProject/${projectId}`).then(response => {
			this.setState({
			authProjects: response.data,
			})
      	})
        
    }

    /**
     * Render User preview
     * @param {*} user 
     */
    UserPanel(user){
    	return <UserPanel key={user.id} user={user} authProjects={this.state.authProjects} auth_user={this.props.auth_user} getData={this.loadUsers}/>;
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
        }else{
            return;
        }
      }
      

    render(){
        return(
            <div>
              	<SubNavbar link="People" clickedPage={this.state.clickedPage} type={this.props.auth_user.type} setClickedPage={this.setClickedPage} search={this.state.search} changeSearch={this.changeSearch} CategoryChange={this.CategoryChange} OrderChange={this.OrderChange}/>
                {this.state.users.map(user => (
					<div key={user.id}>
						{this.UserPanel(user)}
					</div>      
                ))}

                {this.isMorePages()}     
            </div>
        )   
    }
}

export default UserLists