import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import ProfilPhoto from '../images/profil.png'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render profil navigation panel on the left side 
 */
class LeftCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            file:ProfilPhoto,
            myPhoto:this.props.user.image_path, 
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    /**
     * This method change user profil photo
     * @param {input data} e 
     */
    handleChange(e) {
        this.setState({
            file:e.target.files[0],
          })

        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('user_id', this.props.user.id);
        axios.post(url + 'api/saveImage',formData).then(response=> {
            this.props.getUser();
           
        })
    }
   
    render(){
        return(
            <div>
                <div className='card place'>
                    <div className="Profile ">
                        <form>
                            <div className="ImageUpload text-center ProfilePicture">
                                <label htmlFor="file-input"  >
                                    <img className="photoP" src={ this.props.user.image_path === "" ? this.state.file:  this.props.user.image_path}  height="200" width="200"/>
                                    <div  className="ProfilePictureHoverText">Click to upload</div>
                                </label>
                                <input id="file-input" name="file" type="file" onChange={this.handleChange}/>
                            </div>
                        </form>
                        <div className="ProfileName ">
                            <h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
                        </div>

                        <div className="test">
                            <ul  className="nav navbar-nav profile-navbar justify-content-center border-top">                
                                <li className="nav-item">
                                    <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'messages'}>
                                        <span className="messagesIcon"></span>
                                        <span className="menuItem">Messages </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'about'}>
                                        <span className="aboutIcon"></span>
                                        <span className="menuItem">About me </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeStyle={{opacity: '1'}} className="nav-link "  to={url2+'account'}>
                                        <span className="accountIcon"></span>
                                        <span className="menuItem">Account settings</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default LeftCard