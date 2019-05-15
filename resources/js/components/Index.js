import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {withRouter , BrowserRouter , Route, Switch,HashRouter } from 'react-router-dom'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Users from './People/Users'
import Create from './Create/Create'
import About from './Profile/About'
import Account from './Profile/Account'
import ProjectPage from './ProjectsProfil/ProjectPage'
import ProfilPage from './Users/ProfilPage'
import Messages from './Profile/Messages'
import Message from './Profile/Message'
import Projects from './Home/Projects'
import Admin from './Admin/Admin'
import AdminProjects from './Admin/AdminProjects'
import AdminPositions from './Admin/AdminPositions'
import AdminUsers from './Admin/AdminUsers'
import AdminCategory from './Admin/AdminCategory'


import URL from './URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;


class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            registered:0,
            user :[],
            isLoading:0,
            
        }
        this.setUser = this.setUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.DeleteUser = this.DeleteUser.bind(this);

        
    }

      

    componentWillMount(){
        axios.get(url + 'api/getUser').then(response => {
			if(response.data == ""){
				this.setState({
					isLoading:1,
				
				})
			}else{
				this.setState({
					user: response.data,
					isLoading:1,
				})
			}
        })
    }

	/**
	 * This method get users data
	 */
    getUser(){
        axios.get(url + 'api/getUser').then(response => {
			if(response.data == ""){

			}else{
				this.setState({
					user: response.data
					
				}) 
			}
        })
    }

    setUser(way,type2) {
        var type;
        axios.get(url + 'api/getUser').then(response => {
			this.setState({
				user: response.data
			}, () => {
				type = response.data.type;
				way(type);
        	})
        })

        if(type2 == "normal"){
			this.setState({
				registered: 1,
			})
        }else if(type2 == "university"){
        	this.setState({
              	registered: 2,
            })
      	}
    }

    DeleteUser(){
        this.setState({
          user: [],
          registered: 0,
        });
    }

    
    render () {
		const { user } = this.state;

        if(this.state.isLoading == 0){
           return(
             <></>
            );
         }
        
         
        return (
          <>
          <BrowserRouter >
              <Switch>
                <Route exact path={url2}  render={ props=><SignIn{...props} user={this.state.user} setUser={this.setUser} registered={this.state.registered}/> }/>
                <Route  path={url2 + 'signup'}  render={ props=><SignUp{...props} user={this.state.user} setUser={this.setUser} setRegistered={this.setRegistered}/> }/>
                <Route  path={url2 + 'projects'} render={props=><Projects{...props} user={user} DeleteUser={this.DeleteUser} setUser={this.setUser}/> }/>
                <Route  path={url2 + 'users'} render={props=><Users{...props} user={user} DeleteUser={this.DeleteUser}/> } />
                <Route  path={url2 + 'create'} render={props=><Create{...props} user={user} DeleteUser={this.DeleteUser}/> } />
                <Route  path={url2 + 'project/:id'} exact render={props=><ProjectPage{...props} user={user} DeleteUser={this.DeleteUser}/> }/>
                <Route  path={url2 + 'user/:id'} exact render={props=><ProfilPage{...props} user={user} DeleteUser={this.DeleteUser}/> }/>
                <Route  path={url2 + 'about'} render={props=><About{...props} user={user} DeleteUser={this.DeleteUser} getUser={this.getUser}/> } />
                <Route  path={url2 + 'account'} render={props=><Account{...props} user={user} DeleteUser={this.DeleteUser} getUser={this.getUser}/> } />
            	<Route  path={url2 + 'messages'} render={props=><Messages{...props} user={user} DeleteUser={this.DeleteUser} getUser={this.getUser}/> }/>
                <Route  path={url2 + 'message/:id'} render={props=><Message{...props} user={user} DeleteUser={this.DeleteUser} getUser={this.getUser}/> }/>
                
                
                <Route  path={url2 + 'admin/dashboard'} render={props=><Admin{...props} user={user} DeleteUser={this.DeleteUser} setUser={this.setUser}/> }/>
                <Route  path={url2 + 'admin/projects'} render={props=><AdminProjects{...props} user={user} DeleteUser={this.DeleteUser} setUser={this.setUser}/> }/>
                <Route  path={url2 + 'admin/positions'} render={props=><AdminPositions{...props} user={user} DeleteUser={this.DeleteUser} setUser={this.setUser}/> }/>
                <Route  path={url2 + 'admin/users'} render={props=><AdminUsers{...props} user={user} DeleteUser={this.DeleteUser} setUser={this.setUser}/> }/>
                <Route  path={url2 + 'admin/categories'} render={props=><AdminCategory{...props} user={user} DeleteUser={this.DeleteUser} setUser={this.setUser}/> }/>

              
                <Route render={() => <h1>Page not found</h1>} />
              </Switch>

          </BrowserRouter>
        
          </>
        )
      }
    }

    if (document.getElementById("root")) {
        ReactDOM.render(<Index />, document.getElementById("root"));
    }