import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Modal} from 'react-bootstrap';
import ProjectNotification from '../Notifications/ProjectNotification';
import Interest from '../Notifications/Interest';
import Message from '../Notifications/Message';
import PeopleNotification from '../Notifications/PeopleNotification';
import ConfirmPerson from '../Notifications/ConfirmPerson';
import ConfirmProject from '../Notifications/ConfirmProject';
import ApproveProject from '../Notifications/ApproveProject';
import Choose from '../Notifications/Choose';
import Recommend from '../Notifications/Recommend';
import RejectProject from '../Notifications/RejectProject';
import RemoveMe from '../Notifications/RemoveMe';
import RemoveChooser from '../Notifications/RemoveChooser';
import URL from '../URL.jsx'
import RejectInterest from '../Notifications/RejectInterest';
import CancelInterest from '../Notifications/CancelInterest';
import ExpiredProject from '../Notifications/ExpiredProject';

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This component render navbar
 */
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showNotifications: false,
            showSupervisorNotifications: false,
            user: this.props.user,
            notifications: [],
            navbar:false,
            scroll:0,
            showId: [],
            showPerson: [],
            clickedProject:'',
            clickedPerson:'',
            supervisoryNotifications:[],
            countSupervisorNotifications:0,
            countProjectNotifications:0,
        }
        
        this.logout = this.logout.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowNotifications = this.handleShowNotifications.bind(this);
        this.getNotificationsData = this.getNotificationsData.bind(this);
        this.handleShowId = this.handleShowId.bind(this);
        this.showProjectNotifications = this.showProjectNotifications.bind(this);
        this.handleShowSupervisorNotifications = this.handleShowSupervisorNotifications.bind(this);
        this.handleShowPerson = this.handleShowPerson.bind(this);
        this.isNewProjectNotification = this.isNewProjectNotification.bind(this);
        this.isNewSupervisorNotification = this.isNewSupervisorNotification.bind(this);
        this.setCount = this.setCount.bind(this);
        this.setNewPersonNotCount = this.setNewPersonNotCount.bind(this);
        this.setNotificationsRead = this.setNotificationsRead.bind(this);
        this.setPersonNotificationsRead = this.setPersonNotificationsRead.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.supervisorButton = this.supervisorButton.bind(this);
        this.supervisorLink = this.supervisorLink.bind(this);
        
    }

    componentDidMount(e) {
        this.getNotificationsData();
        this.interval = setInterval(this.getNotificationsData, 5000);
    }

    /**
     * Logout user 
     * 
     */
    logout(){
        axios.post(url2 + 'api/logout')
        .then(response=> {
            this.props.DeleteUser();
            this.props.history.push(url2);
        })
        .catch(error=> {
        });
    }

    /**
     * Show notifications panel
     */
    handleShowNotifications(){
        this.setState({ 
            showNotifications: true 
        });
    }

    /**
     * Close all notifications panels
     */
    handleClose(){
        this.setState({ 
            showNotifications: false,
            showSupervisorNotifications: false, 
            clickedPerson:'',
            clickedProject:'',
            showId:[],
            showPerson:[],
        });
    }

    /**
     * Show Supervisor notifications panels
     */
    handleShowSupervisorNotifications(){
        this.setState({ 
            showSupervisorNotifications: true 
        });
    }

    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        clearInterval(this.interval);
    }

    /**
     * Show navbar when scroll up
     *  
     */
    handleScroll(e) {
        if (window.scrollY < this.state.scroll || window.scrollY < 80 ){
            this.setState({ 
                navbar: false 
            });
            
        }else{
            this.setState({ 
                navbar: true 
            });
        }

        this.setState({ 
            scroll: window.scrollY 
        });
    }

    /**
     * Set notifications as read
     */
    setNotificationsRead(value){

        const userId = {
            userId:this.props.user.id,
            type:'n',
            id:value,
        }

        axios.post(url +`api/setNotificationsRead`,userId).then(response => {   
        })
    }

    /**
     * Set Supervisors notifications as read
     */
    setPersonNotificationsRead(value){

        const userId = {
            userId:this.props.user.id,
            type:'s',
            id:value,
        }

        axios.post(url + `api/setNotificationsRead`,userId).then(response => {    
        })
    } 

    /**
     * Methods which send request to get notifications
     * 
     */
    getNotificationsData(){

        const userId = this.props.user.id;

        if(this.props.user.type === "supervisor"  )
        {
            
            axios.get(url + `api/notificationsAll/${userId}`).then(response => {
                this.setState({
                    notifications: response.data[1],
                    supervisoryNotifications: response.data[0],
                    countSupervisorNotifications: response.data[2],
                    countProjectNotifications: response.data[3],
                })
                
                if(this.state.clickedProject != ''){
                    var ret = 0;
                    response.data[1].forEach(project =>{
                        if(this.state.clickedProject == project.id){
                            ret = 1;
                            this.setState({
                                showId :project.notifications,
                                clickedProject: project.id,
                            })
                        }
                    })

                    if (ret == 0){
                        this.setState({
                            showId :[],
                            clickedProject: '' ,
                        })
                    }
                }

                if(this.state.clickedPerson != ''){
                    var ret = 0;
                    response.data[0].forEach(person =>{
                       
                        
                        if(this.state.clickedPerson.id == person.id){
                            ret = 1;
                            this.setState({
                                showPerson :person.notifications,
                                clickedPerson: person ,
                            }) 
                        }
                    })

                    if (ret == 0){
                        this.setState({
                            showPerson :[],
                            clickedPerson: '' ,
                        })
                    }
                }

                
            })
        }else{
            axios.get(url + `api/notifications/${userId}`).then(response => {
                this.setState({
                    notifications: response.data[0],
                    countProjectNotifications: response.data[1],
               
                })

                if(this.state.clickedProject != ''){
                    response.data[0].forEach(project =>{
                        if(this.state.clickedProject == project.id){
                            this.setState({
                                showId :project.notifications,
                            })
                        }
                    })
                } 
            })
        }
    }


    setCount(clickedId){

        this.setNotificationsRead(clickedId);
        
        this.state.notifications.forEach(project => {
           
            if(project.id == clickedId){
                const value = this.state.countProjectNotifications - project.countNew;
                this.setState({
                    countProjectNotifications:  value,
                 })
                 project.countNew = 0;
            }   
        });
        
    }

    setNewPersonNotCount(clickedId){
        this. setPersonNotificationsRead(clickedId);
        
        this.state. supervisoryNotifications.forEach(person => {
            if(person.id == clickedId){
                const value = this.state.countSupervisorNotifications - person.countNew;
                this.setState({
                    countSupervisorNotifications:  value,
                 })
                 
                 person.countNew = 0;
            }
        });
    }

  
    /**
     * Show right panel with notifications
     * 
     */
    handleShowId(not){
        this.setState({
            showId: not.notifications, 
            clickedProject: not.project_id , 
        })
        this.setCount(not.project_id);
    }

    /**
     * Show right panel with supervisor notifications
     * 
     */
    handleShowPerson(p){
        this.setState({
            showPerson: p.notifications ,
            clickedPerson: p ,
        })
        this.setNewPersonNotCount(p.id);
    }

    /**
     * Show one notification
     * @param {notification} notification 
     */
    showProjectNotifications(notification){
        if( notification.type == "App\\Notifications\\NewInterest")
        {
            return <Interest notification={notification} getData={ this.getNotificationsData}/>;
        }else if(notification.type == "App\\Notifications\\NewMessage") {
            return <Message notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData} />;
        }else if(notification.type == "App\\Notifications\\ApproveProject"){
            return  <ApproveProject notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }else if(notification.type == "App\\Notifications\\RejectProject"){
            return <RejectProject notification={notification} getData={ this.getNotificationsData}/>;
        }else if(notification.type == "App\\Notifications\\NewChoose"){
            return <Choose close={this.handleClose} getProjectData={this.props.getData} notification={notification} getData={ this.getNotificationsData}/>;
        }else if( notification.type == "App\\Notifications\\NewRecommend"){
            return <Recommend notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }else if( notification.type == "App\\Notifications\\RemoveMe"){
            return <RemoveMe notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }else if ( notification.type == "App\\Notifications\\RemoveChooser"){
            return <RemoveChooser notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }else if ( notification.type == "App\\Notifications\\RejectInterest"){
            return <RejectInterest notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }else if ( notification.type == "App\\Notifications\\CancelInterest"){
            return <CancelInterest notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }else if ( notification.type == "App\\Notifications\\ExpiredProject"){
            return <ExpiredProject notification={notification} getData={ this.getNotificationsData} close={this.handleClose} getProjectData={this.props.getData}/>;
        }
    }

    /**
     * Show one supervisor notification
     * @param {notification} notification 
     */
    showPersonNotifications(notification){
        if( notification.type == "App\\Notifications\\ConfirmPerson")
        {
            return <ConfirmPerson notification={notification} handleShowPerson={this.handleShowPerson} clickedPerson={this.state.clickedPerson} getData={ this.getNotificationsData}/>;
        }else if ( notification.type == "App\\Notifications\\ConfirmProject"){
            return <ConfirmProject notification={notification} clickedPerson={this.state.clickedPerson}  getData={ this.getNotificationsData} user={this.props.user} close={this.handleClose} getProjectData={this.props.getData}/>; 
        }
        return ;  
    }

    /**
     * Render new notifications alert
     */
    isNewProjectNotification(){
        if(this.state.countProjectNotifications != 0){
            return <div className="newNotification">{this.state.countProjectNotifications}</div>; 
        }
    }

    /**
     * Render new supervisor notifications alert
     */
    isNewSupervisorNotification(){
        if(this.state.countSupervisorNotifications != 0){
           return <div className="newNotification">{this.state.countSupervisorNotifications}</div>; 
        }
    }

    /**
     * Render supervisor notifications icon in mobile version
     */
    supervisorButton(){
        if ( this.props.user.type == "supervisor" ){
            return(
                <> 
                    <button  className="navbar-toggler  relative" onClick={this.handleShowSupervisorNotifications} data-toggle="tooltip" data-placement="bottom" title="Show Supervisors Notifications">
                            <div id="supervisor" className="supervisorNotification" ></div>
                            {this.isNewSupervisorNotification()}
                    </button>
                </>
            )
        }else{
            return;
        }
    }

    /**
     * Render supervisor notifications icon
     */
    supervisorLink(){
        if ( this.props.user.type == "supervisor" ){
            return(<> 
                        <li  className="ml-1 relative visibility" onClick={this.handleShowSupervisorNotifications} data-toggle="tooltip" data-placement="bottom" title="Show Supervisors Notifications">
                            <div id="supervisor2" className="supervisorNotification" ></div>
                            {this.isNewSupervisorNotification()}
                        </li>
                    </>
            )
        }else{
            return;
        }
    }



    render(){
        return(
            <> 
                <nav className="navbar navbar-expand-md navbar-dark fixed-top navbar-bg" hidden={this.state.navbar}>
                    <a className="navbar-brand" href={url2 + "projects"}>UNI.TEAM</a>
                    <div>
                        {this.supervisorButton()}
                        <button  className="navbar-toggler relative" onClick={this.handleShowNotifications} data-toggle="tooltip" data-placement="bottom" title="Show Notifications">
                            <div className="notification" ></div>
                            {this.isNewProjectNotification()}
                        </button>
                        <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse showNavbar" id="navbarCollapse">
                        <ul className="navbar-nav ml-5 mr-auto">
                        </ul>

                        <ul className="navbar-nav ml-5 mr5">
                            {this.supervisorLink()}
                            <li  className="ml-3 relative visibility" onClick={this.handleShowNotifications} data-toggle="tooltip" data-placement="bottom" title="Show Notifications">
                                    <div className="notification" >
                                    </div>
                                    {this.isNewProjectNotification()}
                            </li>
                            <li className="nav-item ">
                                <NavLink activeStyle={{color:'#F2F2F2'}} className="nav-link "  to={url2 + "projects"}>Projects</NavLink>
                                
                            </li>
                            <li className="nav-item">
                                <NavLink  activeStyle={{color:'#F2F2F2'}} className="nav-link "  to={url2 +"users"}>People</NavLink>
                            </li>
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.user.firstname} {this.props.user.lastname}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to={url2 +"messages"}>Messages</NavLink>
                                    <NavLink className="dropdown-item" to={url2 +"About"}>About me</NavLink>
                                    <NavLink className="dropdown-item" to={url2 +"Account"}>Account Settings </NavLink>                                                             
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item Logout" onClick={this.logout}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Modal className="NotificationsModal" show={this.state.showNotifications} onHide={this.handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" >
                    <div className="row">
                        <div className="col-md-6 .col-sm-12">
                            <div className="ModalPanel">
                                <div className="row">
                                    <div className="col-md-5 col-sm-5 col-5 MyCol">
                                        <div className="NotificationsProjectPanel">
                                            <div className="NotificationsProjects">
                                                Projects
                                            </div>
                                            <div className="NotificationsList">
                                                { this.state.notifications.map(notification => (
                                                    <ProjectNotification key={notification.id} clickedProject={this.state.clickedProject} new={notification.countNew} notifications={notification} handleShowId={this.handleShowId} />
                                                        
                                                ))}
                                            </div>
                                        </div>             
                                    </div>
                                    <div className="col-md-7 col-sm-7 col-7 MyCol">
                                        <div className="Notifications">
                                            <div className="NotificationsHeader">
                                                My notifications
                                            </div>
                                            <div className="NotificationsList">
                                                { this.state.showId.map(notification => (
                                                    <div>{this.showProjectNotifications(notification)}</div>      
                                                ))}
                                            </div>
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12 MyCol" onClick={this.handleClose}>
                            <div className="ModalPanelRight">
                            </div>
                        </div>
                    </div>
                    <button type="button" className="close ClosePlace" onClick={this.handleClose}>
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button>
                </Modal>

                <Modal className="NotificationsModal" show={this.state.showSupervisorNotifications} onHide={this.handleClose} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" >
                    <div className="row">
                        <div className="col-md-6 .col-sm-12">
                            <div className="ModalPanel">
                                <div className="row">
                                    <div className="col-md-5 col-sm-4 col-5 MyCol">
                                        <div className="NotificationsProjectPanel">
                                            <div className="NotificationsProjects">
                                                People
                                            </div>
                                            { this.state.supervisoryNotifications.map(notification => (
                                                <PeopleNotification key={notification.id} clickedPerson={this.state.clickedPerson} new={notification.countNew} notifications={notification} handleShowPerson={this.handleShowPerson} />
                                       
                                            ))}
                                        </div> 
                                    </div>
                                    <div className="col-md-7 col-sm-8 col-7 MyCol">
                                        <div className="Notifications">
                                            <div className="NotificationsHeader">
                                                My supervisory notifications
                                            </div>
                                            <div className="NotificationsList">
                                                { this.state.showPerson.map(notification => (
                                                    <div>{this.showPersonNotifications(notification)}</div>
                                                ))}
                                            </div>
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12 MyCol" onClick={this.handleClose}>
                            <div className="ModalPanelRight">
                            </div>
                        </div>
                    </div>
                    <button type="button" className="close ClosePlace" onClick={this.handleClose}><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                </Modal>  
            </>
        )
    }
}

export default withRouter(Navbar)
