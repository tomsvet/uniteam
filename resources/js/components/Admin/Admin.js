import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, PieChart, Pie, Sector, Cell,BarChart, Bar,ComposedChart,Area,
  } from 'recharts';
import URL from '../URL.jsx'
import AdminNavbar from './AdminNavbar';

let link = URL;
const url = link.url;
const url2 = link.url2;


/**
 * This component show dashboard page for admin.
 */
class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
			data:{},
			data2:[],
        }
		
        this.getAdminData = this.getAdminData.bind(this);
    }

    componentDidMount(){
	  	this.getAdminData();
	  
    }

    /**
     * Method which gets information about system
     */
    getAdminData(){

      	axios.get(url + `api/getAdminData`).then(response => {
			this.setState({
				data: response.data,
				data2:response.data.userPie
			})
        });


    }

    render(){
 
        const COLORS = ['#ed004b', '#00C49F', '#FFBB28', '#FF8042','#d80321','#21b73c','#1640fc','#c946f4','#0088FE'];

        return(
			<div className="adminPage">
				<AdminNavbar history={this.props.history} DeleteUser={this.props.DeleteUser}/>
				<div className="container-fluid">
					<div className="row">
						<div  className="mt-30 col-md-9 ml-sm-auto col-lg-10 px-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1> 
						</div>
						<div className="row">
							<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-dashboard shadow h-100 py-2">
								<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
									<div className="  text-dashboard  mb-1">
										Users
									</div>
									<div className="h5 mb-0  text-count">
										{this.state.data.userCount}
									</div>
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
									<div className=" text-dashboard  mb-1">
										Projects (All)
									</div>
									<div className="h5 mb-0  text-count">
										{this.state.data.allCount}
									</div>
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
									<div className="  text-dashboard  mb-1">
										Projects (Ended)
									</div>
									<div className="h5 mb-0  text-count">
										{this.state.data.endedCount}
									</div>
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
									<div className=" text-dashboard  mb-1">
										Positions
									</div>
									<div className="h5 mb-0  text-count">
										{this.state.data.positionCount}
									</div>
									</div>
								</div>
								</div>
							</div>
							</div>


							<div className="col-xl-6 col-lg-6">
							<div className="card shadow mb-4">
								<div className="card-body">
								<div className="chart-area">
								<h6 className="m-0 font-weight-bold text-overview mb-10">Users count Overview</h6>
									<ResponsiveContainer width='100%' aspect={3.0/2.0}>
									<LineChart data={this.state.data.userGraph} margin={{  top: 30, right: 30, left: -20, bottom: 5,}}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="count" stroke="#8884d8"  />
									</LineChart>
									</ResponsiveContainer>
								</div>
								</div>
							</div>
							</div>


							<div class="col-xl-6 col-lg-6">
							<div class="card shadow mb-4">
								<div className="card-body">
								<div className="chart-area">
									<h6 className="m-0 font-weight-bold text-overview mb-10">Projects count Overview</h6>
									<ResponsiveContainer width='100%' aspect={3.0/2.0}>
									<LineChart data={this.state.data.userGraph2} margin={{ top: 30, right: 30, left: -20, bottom: 5,}}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="count" stroke="#8884d8"  />
									</LineChart>
									</ResponsiveContainer>
								</div>
								</div>
							</div>
							</div>

							<div class="col-xl-3 col-lg-3">
							<div class="card shadow mb-4">
								<div className="card-body">
								<div className="chart-area">
									<h6 className="m-0 font-weight-bold text-overview mb-10">Number of users from faculties</h6>
									<ResponsiveContainer width='100%'  maxHeight={300}  aspect={3.0/4.5} align="center">
									<PieChart  onMouseEnter={this.onPieEnter} margin={{ top: -80, right: 5, left: 5, bottom: 5,}}>
										<Pie data={this.state.data.userPie} cy={200} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="count" >
										{
											this.state.data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
										}
										</Pie>
										<Tooltip />
										<Legend  />  
									</PieChart>
									</ResponsiveContainer>
								</div>
								</div>
							</div>
							</div>




							<div class="col-xl-6 col-lg-6">
							<div class="card shadow mb-4">
								<div className="card-body">
								<div className="chart-area">
									<h6 className="m-0 font-weight-bold text-overview mb-10">The most often positions type</h6>
									<ResponsiveContainer width='100%' aspect={3.5/2.0}>
									<BarChart layout="vertical" data={this.state.data.graphCategory} margin={{ top: 20, right: 20, bottom: 20, left: 30,  }} >
										<CartesianGrid  />
										<XAxis type="number" />
										<YAxis dataKey="name" type="category" />
										<Tooltip />
										<Legend />
										<Bar dataKey="count" barSize={20} fill="#413ea0" />  
									</BarChart>
									</ResponsiveContainer>
								</div>
								</div>
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

export default Admin