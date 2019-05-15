import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import AdminNavbar from './AdminNavbar';
import URL from '../URL.jsx'
import { Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import EditPositionPopup from './EditPositionPopup';

let link = URL;
const url = link.url;
const url2 = link.url2;

/**
 * This method render admin's page posittions
 */
class AdminPositions extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            positions:[],
            data:{},
            pagination:[],
            orderByTitle:1,
            orderByFee:0,
            orderByProject:0,
            orderByType:0,
            orderByWorker:0,
            positionCategories:[],
        }

        this.getPositionCategories = this.getPositionCategories.bind(this);
        this.getAdminPositionsStatistics = this.getAdminPositionsStatistics.bind(this);
        this.getAdminPositions = this.getAdminPositions.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.orderByTitle = this.orderByTitle.bind(this);
        this.orderByFee = this.orderByFee.bind(this);
        this.orderByProject = this.orderByProject.bind(this);
        this.orderByType = this.orderByType.bind(this);
        this.orderByWorker = this.orderByWorker.bind(this);
        this.chooseTitleArrow = this.chooseTitleArrow.bind(this);
        this.chooseFeeArrow = this.chooseFeeArrow.bind(this);
        this.chooseWorkerArrow = this.chooseWorkerArrow.bind(this);
        this.chooseTypeArrow = this.chooseTypeArrow.bind(this);
        this.chooseProjectArrow = this.chooseProjectArrow.bind(this);
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
            orderByTitle:1,
            orderByFee:0,
            orderByType:0,
            orderByProject:0,
            orderByWorker:0,
        };
        this.getAdminPositionsStatistics();
        this.getAdminPositions(param);
        this.getPositionCategories();
        
    }

    /**
     * This method get statistics about positions
     */
    getAdminPositionsStatistics(){
        axios.get(url + `api/getAdminPositionsStatistics`).then(response => {
            this.setState({
                data: response.data,  
            })
        });
    }

    /**
     * This method get position's categories
     */
    getPositionCategories(){
        axios.get(url + 'api/positionCategory').then(response => {
            this.setState({
                positionCategories: response.data,
            })  
        })
    }


    getAdminPositions(param ){
        axios.get(url + `api/getAdminPositions`,{params:param}).then(response => {
            this.setState({
                positions: response.data.data   
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
     * This method remove all marked positions
     * @param {} e 
     */
    removeMarked(){
        const thisUrl = url + "api/getAdminPositions";

        let data = {
            positions: this.state.positions,
        }

        axios.post(url + 'api/adminRemovePositions', data)
        .then(response=> {
            this.loadPage(thisUrl)  
        })
        .catch(error=> {
        })
    }

    /**
     * Methods to set filtering object
     */
    orderByTitle(){

        if(this.state.orderByTitle == 1){
            const param = {
                orderByTitle:2,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:2,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,
            })
            this.getAdminPositions(param);

        }else{
            const param = {
                orderByTitle:1,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:1,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,       
            })
            this.getAdminPositions(param);
        }
    }

    orderByFee(){

        if(this.state.orderByFee == 1){
            const param = {
                orderByTitle:0,
                orderByFee:2,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:2,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,
            })
            this.getAdminPositions(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByFee:1,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:1,
                orderByType:0,
                orderByProject:0,
                orderByWorker:0, 
            })
            this.getAdminPositions(param);
        }
    }

    orderByType(){

        if(this.state.orderByType == 1){
            const param = {
                orderByTitle:0,
                orderByFee:0,
                orderByType:2,
                orderByProject:0,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:0,
                orderByType:2,
                orderByProject:0,
                orderByWorker:0,
            })
            this.getAdminPositions(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByFee:0,
                orderByType:1,
                orderByProject:0,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:0,
                orderByType:1,
                orderByProject:0,
                orderByWorker:0,
            })
            this.getAdminPositions(param);
        }
    }

    orderByProject(){

        if(this.state.orderByProject == 1){
            const param = {
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:2,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:2,
                orderByWorker:0,
            })
            this.getAdminPositions(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:1,
                orderByWorker:0,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:1,
                orderByWorker:0,
            })
            this.getAdminPositions(param);
        }
    }

    orderByWorker(){

        if(this.state.orderByWorker == 1){
            const param = {
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:2,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:2,
            })
            this.getAdminPositions(param);

        }else{
            const param = {
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:1,
            };

            this.setState({
                orderByTitle:0,
                orderByFee:0,
                orderByType:0,
                orderByProject:0,
                orderByWorker:1,
            })
            this.getAdminPositions(param);
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
        return "sort";
    }

    chooseFeeArrow(){
        if(this.state.orderByFee == 1){

            return "sortArrow";
        }else if(this.state.orderByFee == 2){
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

    chooseProjectArrow(){
        if(this.state.orderByProject == 1){

            return "sortArrow";
        }else if(this.state.orderByProject == 2){
            return "sortDownArrow";
        }
        return "";
    }

    chooseWorkerArrow(){
        if(this.state.orderByWorker == 1){

            return "sortArrow";
        }else if(this.state.orderByWorker == 2){
            return "sortDownArrow";
        }
        return "";
    }

    loadPage(thisUrl){

        const param = {
            orderByTitle:this.state.orderByTitle,
            orderByFee:this.state.orderByFirstname,
            orderByType:this.state.orderByType,
            orderByProject:this.state.orderByFaculty,
            orderByWorker:this.state.orderByWorker,
        };

        axios.get(thisUrl,{params:param}).then(response => {
            this.setState({
                positions: response.data.data,
              
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
        let positions = this.state.positions;
        positions.forEach(position => {            
            if (position.id == event.target.value){ 
                position.isChecked =  event.target.checked;
            }
        })
        this.setState({
            positions: positions,
        });
    }

    handleAllCheck(event){
        let positions = this.state.positions;
        positions.forEach(position => { 
            position.isChecked =  event.target.checked;
        })
        this.setState({
            positions: positions,
        });
    }

    render(){
        return(
            <div className="adminPage">
                <div className="adminPage">
                    <AdminNavbar history={this.props.history} DeleteUser={this.props.DeleteUser}/>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div  className="mt-30 col-md-10  col-lg-10 px-4 ">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Positions</h1>                                   
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
                                                <th className="headerHover" onClick={this.orderByTitle} data-toggle="tooltip" data-placement="bottom" title="Order by title">Title <span className={this.chooseTitleArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByFee} data-toggle="tooltip" data-placement="bottom" title="Order by fee">Fee<span className={this.chooseFeeArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByType} data-toggle="tooltip" data-placement="bottom" title="Order by type">Type <span className={this.chooseTypeArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByProject} data-toggle="tooltip" data-placement="bottom" title="Order by project">Project <span className={this.chooseProjectArrow() } /></th>
                                                <th className="headerHover" onClick={this.orderByWorker} data-toggle="tooltip" data-placement="bottom" title="Order by worker">Worker<span className={this.chooseWorkerArrow() } /></th>
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
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {this.state.positions.map(position => (
                                                <tr key={position.id}>
                                                    <td><input onChange={this.handleCheck} type="checkbox" checked={position.isChecked} value={position.id} /></td>
                                                    <td className="MessageText" data-toggle="tooltip" data-placement="bottom" title={position.title}>{position.title}</td>
                                                    <td className="MessageText" data-toggle="tooltip" data-placement="bottom" title={position.fee}>{position.fee} </td>
                                                    <td data-toggle="tooltip" data-placement="bottom" title={position.type}>{position.type}</td>
                                                    <td className="MessageText" data-toggle="tooltip" data-placement="bottom" title={position.project_title}>{position.project_title}</td>
                                                    <td>{position.worker}</td>
                                                    <td ><EditPositionPopup getData={this.loadPage} position={position} positionCategories={this.state.positionCategories} />
                                                    </td>
                                                </tr>
                                            ))}   
                                        </tbody>
                                    </table>                
                                    <button type="button" className="btn button-admin ml-10" onClick={this.removeMarked}>Remove</button>              
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

export default AdminPositions