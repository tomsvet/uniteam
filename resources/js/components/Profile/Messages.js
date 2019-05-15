import React, { Component } from 'react'
import { Button, Modal} from 'react-bootstrap'
import LeftCard from './LeftCard';
import { Link } from 'react-router-dom'
import Navbar from '../Home/Navbar'
import axios from 'axios'
import URL from '../URL.jsx'

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * Component which show list of messages
 */
class Messages extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            pagination:{},
        }
        this.getMessages = this.getMessages.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.loadLast = this.loadLast.bind(this);
        this.loadFirst = this.loadFirst.bind(this);
        this.isMorePages = this.isMorePages.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.loadPrev = this.loadPrev.bind(this);
        this.isNextPage = this.isNextPage.bind(this);
        this.isPrevPage = this.isPrevPage.bind(this);
    }

    componentDidMount(e){
        this.getMessages();
    }

    /**
     * This method get data of messages
     */
    getMessages(e){
        const userId = this.props.user.id;

        axios.get(url + `api/messages/${userId}`).then(response => {
            this.setState({
                messages: response.data.data,
            })
            this.makePagination(response.data);
        })
    }


    loadMessage(url1){
        const userId = this.props.user.id;

        axios.get(url1 ).then(response => {
            this.setState({
                messages: response.data.data,
            })

            this.makePagination(response.data);  
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



    loadNext(){
        this.loadMessage(this.state.pagination.next_page_url);
    }

    loadPrev(){
        this.loadMessage(this.state.pagination.prev_page_url);
    }

    loadLast(){
        this.loadMessage(this.state.pagination.last_page_url);
    }

    loadFirst(){
        this.loadMessage(this.state.pagination.first_page_url);
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
     * Render paginations buttons
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
            <div className="Page">
                <Navbar user={this.props.user} DeleteUser={this.props.DeleteUser} />
                <div className=' justify-content-center'>
                    <div className="PageContent">
                        <div className='row '>
                            <div className='col-md-3 col-sm-12 col-12'>
                                <LeftCard user={this.props.user}  getUser={this.props.getUser} />
                            </div> 
                            <div className='col-md-8 col-sm-12 col-12'>
                                <div className="ContentPlace">
                                    <div className="ContentHead">
                                    Messages
                                    </div>
                                    <div className="MessageHead">
                                        <div className="row ">
                                            <div className='col-md-2 col-sm-2 col-2'>
                                                Author:
                                            </div>
                                            <div className='col-md-2 col-sm-2 col-2'>
                                                Project:
                                            </div>
                                            <div className='col-md-8 col-sm-8 col-8'>
                                                Message:
                                            </div>
                                        </div>
                                    </div>

                                    {this.state.messages.map(message => (
                                        <div className={ message.read_at === null ? "MessagePanelNew": "MessagePanel"}>
                                            <div className="row ">
                                                <div className='col-md-2 col-sm-2 col-2'>
                                                    <Link className="LinkText" to={url2 + "user/"+message.sender_id} >{message.sender.firstname} {message.sender.lastname} </Link>
                                                </div>
                                                <div className='col-md-2 col-sm-2 col-2'>
                                                    <div className="MessageText">
                                                        <Link className="LinkText" to={url2 + "project/"+message.project_id} data-toggle="tooltip" data-placement="bottom" title={message.project.title}>{message.project.title}</Link>
                                                    </div>
                                                </div>
                                                <div className='col-md-8 col-sm-8 col-8'>
                                                    <div className="MessageText">
                                                        <Link className="LinkText" to={url2 + "message/"+message.id}> {message.message} </Link>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>                                      
                                    ))}
                                    <div className="mt-20">
                                        {this.isMorePages()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}

export default Messages