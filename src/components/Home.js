import { Tooltip } from "bootstrap";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import LineChart from "./LineChart";
import { getAllAgent } from "../features/agentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from 'react-apexcharts';
import { getAllLeadSource } from "../features/leadSource";
import axios from "axios";
import MyCalendar from "../components/Pages/MonthlyCalendar"


function Home() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [Sale, setSale] = useState([]);
  const [leadsource, setleadsource] = useState([]);
  const [leadsourcedata1, setleadsourcedata] = useState([]);
  var { agent } = useSelector((state) => state.agent);
  const { leadSourcedata } = useSelector((state) => state.leadSource);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orders1, setOrders1] = useState([]);
  const [cat, setCat] = useState([]);
  const [filterproducts, setfilterproducts] = useState([]);
  const [totalProductAmount, setTotalProductAmount] = useState(0);
  const dispatch = useDispatch();

  const [categoryCount, setCategoryCount] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);

  useEffect(() => {
    dispatch(getAllAgent());
    dispatch(getAllLeadSource())
    getAllProduct();
    fetchAgents();
    GetAllOrder();
    getAllcategory();
    getAllSubcategory();
    getAllBrands();
    GetAllOrder1();
  }, []);


  const getAllProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllproduct`);
      const productList = response?.data?.product;
      setProducts(productList);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllOrder = async () => {
    try {
      const response = await axios.get(`${apiUrl}/GetAllOrder`);
      const allOrder = response?.data?.allOrder;
      setOrders(allOrder);
  
    } catch (error) {
      console.log(error);
    }
  };
  console.log('orders',orders)
  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_all_agent`);
      const agentList = response?.data?.agent;
      const filteredUsers = agentList.filter(agent => agent.role === "user");
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllcategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/getAllcategory/`);
      const result = await response.json();
      if (result.success === true) {
        const categories = result.category;
        const count = categories.length;
        setCategoryCount(count);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSubcategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/getsubcategory/`);
      const result = await response.json();
      if (result.success === true) {
        const subcategories = result.subcategory;
        const count = subcategories.length;
        setSubcategoryCount(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBrands = async () => {
    try {
      const response = await fetch(`${apiUrl}/getAllbrand/`);
      const result = await response.json();
      if (result.success === true) {
        const brands = result.brand; 
        const count = brands.length;
        setBrandCount(count); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllOrder1 = async () => {
    try {
      const response = await axios.get(`${apiUrl}/GetAllOrder`);
      const allOrder = response?.data?.allOrder;
      
    
      allOrder.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
      const latestOrders = allOrder.slice(0, 5);
  
      setOrders1(latestOrders.reverse());
    
    } catch (error) {
      console.log(error);
    }
  };

  const getSale = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/YearlySaleApi`
      );
      setSale(responce?.data?.details);

    } catch (error) {
      console.log(error);
    }
  };

  const getAllLeadSourceOverview = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/lead_source_overview_api`
      );
      setleadsourcedata(responce?.data?.Lead_source_count);
      setleadsource(responce?.data?.Lead_source_name);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSale()

    getAllLeadSourceOverview()
  }, []);



  const options = {
    labels: leadsource,
  };






  return (
    <div>

      <div className="content-wrapper">

        <section className="content py-5">
          <div className="container ">
            <div className="row">


              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2 pl-0">
                <div className="panel panel-bd cardbox2">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box">
                      <div className="gap-2 align-items-center">
                        {/* <div className="badge rounded bg-label-primary p-1"><i className="fa fa-money"></i></div> */}
                        <h6 className="mb-0">Total Products</h6>
                      </div>
                      <h4 className="my-2">
                        {" "}
                        {Sale['0']?.TotalAmountWon} <span className="count-number">
                          {/* {Sale['0']?.Yearly_lead_count_for_won}  */}
                          {products.length}
                        </span>{" "}
                      </h4>
                      <div className="progresse w-100" style={{ height: 4 }}>
                        <div
                          className="progress-bars"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2">
                <div className="panel panel-bd cardbox2">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box">
                      <div className="gap-2 align-items-center">
                        {/* <div className="badge rounded bg-label-info p-1"><i className="fa fa-money"></i></div> */}
                        <h6 className="mb-0">Total Users</h6>
                      </div>
                      <h4 className="my-2">   
                        {Sale['0']?.TotalAmountwonmanthely} <span className="count-number">
                        {/* {Sale['0']?.wonleadforthirtyday_count_lead}  */} {users.length}
                      </span>{" "}
                      </h4>
                      <div className="progresse w-100" style={{ height: 4 }}>
                        <div
                          className="progress-bars bg-infos"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2">
                <div className="panel panel-bd cardbox2">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box">
                      <div className="gap-2 align-items-center">
                        {/* <div className="badge rounded bg-label-danger p-1"><i className="fa fa-frown-o"></i></div> */}
                        <h6 className="mb-0">Total Orders</h6>
                      </div>
                      <h4 className="my-2"> {" "}
                        {Sale['0']?.TotalAmountLost}  
                        <span className="count-number">
                          {/* {Sale['0']?.Yearly_lead_count_Lost}  */}
                          {orders.length}
                        </span>{" "}</h4>
                      <div className="progresse w-100" style={{ height: 4 }}>
                        <div
                          className="progress-bars bg-danger"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {/* <div
                className="col-xs-6 col-sm-6 col-md-6 col-lg-3"
                style={{ display: "none" }}
              >
                <div className="panel panel-bd cardbox3">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box text-center">
                      {" "}
                      <i className="fa fa-tasks fa-2x" />
                      <h4>ToDo</h4>
                      <h3>
                        {" "}
                        <span className="count-number" style={{ color: "red" }}>
                          1
                        </span>
                        / <span className="count-number">1 </span>{" "}
                      </h3>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div
                className="col-xs-6 col-sm-6 col-md-6 col-lg-3"
                style={{ display: "none" }}
              >
                <div className="panel panel-bd cardbox3">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box text-center">
                      {" "}
                      <i className="fa fa-comments fa-2x" />
                      <h4>SMS Status</h4>
                      <h3>
                        <span className="count-number"> 4249 </span>{" "}
                      </h3>
                    </div>
                  </div>
                </div>
              </div> */}
            
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2 pl-0">
                <div className="panel panel-bd cardbox2">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box">
                      <div className="gap-2 align-items-center">
                        {/* <div className="badge rounded bg-label-primary p-1"><i className="fa fa-money"></i></div> */}
                        <h6 className="mb-0">Categories</h6>
                      </div>
                      <h4 className="my-2">
                        {" "}
                        {Sale['0']?.TotalAmountWon} <span className="count-number">
                          {/* {Sale['0']?.Yearly_lead_count_for_won}  */}
                          {categoryCount}
                        </span>{" "}
                      </h4>
                      <div className="progresse w-100" style={{ height: 4 }}>
                        <div
                          className="progress-bars"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2">
                <div className="panel panel-bd cardbox2">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box">
                      <div className="gap-2 align-items-center">
                        {/* <div className="badge rounded bg-label-info p-1"><i className="fa fa-money"></i></div> */}
                        <h6 className="mb-0">Sub Categories</h6>
                      </div>
                      <h4 className="my-2">   {Sale['0']?.TotalAmountwonmanthely} <span className="count-number">
                        {/* {Sale['0']?.wonleadforthirtyday_count_lead}  */} {subcategoryCount}
                      </span>{" "}
                      </h4>
                      <div className="progresse w-100" style={{ height: 4 }}>
                        <div
                          className="progress-bars bg-infos"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2">
                <div className="panel panel-bd cardbox2">
                  <div className="panel-body bd-panel">
                    <div className="statistic-box">
                      <div className="gap-2 align-items-center">
                        {/* <div className="badge rounded bg-label-danger p-1"><i className="fa fa-frown-o"></i></div> */}
                        <h6 className="mb-0">Brands</h6>
                      </div>
                      <h4 className="my-2"> {" "}
                        {Sale['0']?.TotalAmountLost}  
                        <span className="count-number">   {brandCount}
                          {/* {Sale['0']?.Yearly_lead_count_Lost}  */}

                        </span>{" "}</h4>
                      <div className="progresse w-100" style={{ height: 4 }}>
                        <div
                          className="progress-bars bg-danger"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {/* <div
  className="col-xs-6 col-sm-6 col-md-6 col-lg-3"
  style={{ display: "none" }}
>
  <div className="panel panel-bd cardbox3">
    <div className="panel-body bd-panel">
      <div className="statistic-box text-center">
        {" "}
        <i className="fa fa-tasks fa-2x" />
        <h4>ToDo</h4>
        <h3>
          {" "}
          <span className="count-number" style={{ color: "red" }}>
            1
          </span>
          / <span className="count-number">1 </span>{" "}
        </h3>
      </div>
    </div>
  </div>
</div> */}
              {/* <div
  className="col-xs-6 col-sm-6 col-md-6 col-lg-3"
  style={{ display: "none" }}
>
  <div className="panel panel-bd cardbox3">
    <div className="panel-body bd-panel">
      <div className="statistic-box text-center">
        {" "}
        <i className="fa fa-comments fa-2x" />
        <h4>SMS Status</h4>
        <h3>
          <span className="count-number"> 4249 </span>{" "}
        </h3>
      </div>
    </div>
  </div>
</div> */}
            </div>
            {/* /.row */}
            {/* Main row */}

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pl-0">
                <div className="panel panel-bd lobidisable lobipanel lobipanel-sortable">
                  <div className="panel-heading ui-sortable-handle">
                    <div className="panel-title">
                      <h4>Letest Order</h4>
                      <div className="card card-primary">
                        <div className="card-body p-0">
                          <div id="calendar">
                          <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">S.No.</th>
                                  <th scope="col">User Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Mobile</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Payment Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders1.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.user_name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.mobile}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.payment_status}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                             
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
             
              
            </div>
            {/* <div className="row">
              <div
                className="col-xs-12 col-sm-12 col-md-8 col-lg-8 pl-0  lobipanel-parent-sortable ui-sortable"
                data-lobipanel-child-inner-id="JboVwpEyCD"
              >
                <div
                  className="panel panel-bd lobidrag bg-white lobipanel lobipanel-sortable"
                  data-inner-id="JboVwpEyCD"
                  data-index={0}
                >
                  <div className="panel-heading ui-sortable-handle">
                    <div
                      className="panel-title"
                      style={{ maxWidth: "calc(100% - 0px)" }}
                    >
                      <h4>Income Graph</h4>
                    </div>
                  </div>
                  <div className="panel-body personal">
                    <LineChart />
                  </div>
                </div>
              </div>
             
              <div className="col-xs-12 col-sm-12 col-md-4">
              <div className="panel panel-bd  bg-white">
                <div className="panel-heading">
                  <div className="panel-title   d-flex justify-content-between">
                       <div className="card-title mb-0">
                      <h5 className="mb-0"> Best Employee List</h5>
                    
                        </div>
                        <div className="value_serve">
                     <div className="dropdown">
                     <button className="btn p-0" type="button" id="sourceVisits">
                       <i className="fa fa-ellipsis-v fa-sm text-muted"></i>
                     </button>
                     <div className="dropdown-menu dropdown-menu-end">
                       <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                       <a className="dropdown-item" href="javascript:void(0);">Download</a>
                       <a className="dropdown-item" href="javascript:void(0);">View All</a>
                     </div>
                   </div>
                         </div>
                  </div>
                  

                </div> 
                
                <div className="panel-body personal">
                <div className="card-bodyes  ">
                 <ul className="p-0 m-0">
                 {agent?.agent?.map((agent1, key) => {
                   return (
                      <li className="mb-1 d-flex justify-content-between align-items-center">
                      <div className="bg-label-success rounded">
                      <img src="img/user_img.jpg" alt="User" className="rounded-circle me-3" width="28" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">   {agent1.agent_name}</h6>
                        <div className="d-flex">
                         
                        </div>
                      </div>
                      </li>
                       
                      
                      );
                    })}
                  </ul>
                 </div>
                  
                </div>
              </div>
            </div>

            </div> */}
            {/* <div className="row pt-3">
              <div className="col-xs-12 col-sm-12 col-md-4 pl-0">
                <div className="panel panel-bd bg-white">
                  <div className="panel-heading">
                    <div className="panel-title d-flex">
                      <h5>Best Value Services</h5>
                      <div className="value_serve">
                        <div className="dropdown">
                          <button className="btn p-0" type="button" id="sourceVisits">
                            <i className="fa fa-ellipsis-v fa-sm text-muted"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                            <a className="dropdown-item" href="javascript:void(0);">Download</a>
                            <a className="dropdown-item" href="javascript:void(0);">View All</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="p-0 m-0 pt-3">
                      <li className="d-flex align-items-center mb-4">
                        <div class="badge bg-label-primary me-3 rounded p-2">
                          <i class="fa fa-wallet fa-sm"></i>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0 me-1">E-Commerce</h6>
                            </div>

                          </div>
                          <div className="user-progress">
                            <p className="text-success fw-medium mb-0 d-flex justify-content-center gap-1">
                             

                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-4">
                        <div class="badge bg-label-primary me-3 rounded p-2">
                          <i class="fa fa-wallet fa-sm"></i>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0 me-1">Real-Estate</h6>
                            </div>

                          </div>
                          <div className="user-progress">
                            <p className="text-danger fw-medium mb-0 d-flex justify-content-center gap-1">
                             
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <div class="badge bg-label-primary me-3 rounded p-2">
                          <i class="fa fa-wallet fa-sm"></i>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0 me-1">WhatsApp</h6>
                            </div>

                          </div>
                          <div className="user-progress">
                            <p className="text-success fw-medium mb-0 d-flex justify-content-center gap-1">
                             
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-4">
                        <div class="badge bg-label-primary me-3 rounded p-2">
                          <i class="fa fa-wallet fa-sm"></i>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0 me-1">Web Maintenance Qtly</h6>
                            </div>

                          </div>
                          <div className="user-progress">
                            <p className="text-success fw-medium mb-0 d-flex justify-content-center gap-1">
                            
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-4">
                        <div class="badge bg-label-primary me-3 rounded p-2">
                          <i class="fa fa-wallet fa-sm"></i>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0 me-1">Website Maintenance</h6>
                            </div>

                          </div>
                          <div className="user-progress">
                            <p className="text-success fotns_sizee fw-medium mb-0 d-flex align-items-center gap-1">
                            
                            </p>
                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="panel-body personal Best Value d-none Services Best Value Services">
                    <ul className="emply bg-white" id="bvslist">
                      <li>1. E-Commerce (Rs. 15000.00)</li>
                      <li>2. (Rs. 0)</li>
                      <li>3. Real-Estate (Rs. 0)</li>
                      <li>4. WhatsApp (Rs. 0)</li>
                      <li>5. Website Maintenance Qtly (Rs. 0)</li>
                      <li>6. Website Maintenance (Rs. 0)</li>
                      <li>7. Web Hosting (Rs. 0)</li>
                      <li>8. Web Designing Development (Rs. 0)</li>
                      <li>9. Test Razor Pay (Rs. 0)</li>
                      <li>10. Staff Management Fee (Rs. 0)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="panel panel-bd bg-white">
                  <div className="panel-heading">
                    <div className="panel-title">
                      <h5>System Information</h5>
                    </div>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Current Version</td>
                          <th>18.2.0</th>
                        </tr>
                        <tr>
                          <td>Latest Version</td>
                          <th>18.4.0</th>
                        </tr>
                        <tr>
                          <td>React Version</td>
                          <th>18.2.0</th>
                        </tr>
                        <tr>
                          <td>Node Version</td>
                          <th>18.2.0</th>
                        </tr>
                        <tr>
                          <td>SignUp Date</td>
                          <th>01-01-2021 11:44:29 AM</th>
                        </tr>



                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                className="col-xs-12 col-sm-12 col-md-4 col-lg-4 lobipanel-parent-sortable ui-sortable"
                data-lobipanel-child-inner-id="gjY82eGUtA"
              >
                <div
                  className="panel panel-bd bg-white lobidrag lobipanel lobipanel-sortable"
                  data-inner-id="gjY82eGUtA"
                  data-index={0}
                >
                  <div className="panel-heading ui-sortable-handle">
                    <div
                      className="panel-title"
                      style={{ maxWidth: "calc(100% - 0px)" }}
                    >
                      <h5>Next Version Features</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-3 pb-1">
                        <div className="d-flex align-items-start">
                          <div className="badge bg-label-secondary p-2 me-3 rounded">
                            <i className="fa fa-globe fa-sm" />
                          </div>
                          <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Geo Tracking</h6>
                             
                            </div>
                            <div className="d-flex align-items-center">
                              
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3 pb-1">
                        <div className="d-flex align-items-start">
                          <div className="badge bg-label-secondary p-2 me-3 rounded">
                            <i className="fa fa-globe fa-sm" />
                          </div>
                          <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">SMS Integration</h6>

                            </div>
                            <div className="d-flex align-items-center">
                           
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3 pb-1">
                        <div className="d-flex align-items-start">
                          <div className="badge bg-label-secondary p-2 me-3 rounded">
                            <i className="fa fa-envelope fa-sm" />
                          </div>
                          <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">WhatsApp Integration</h6>

                            </div>
                            <div className="d-flex align-items-center">
                             
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3 pb-1">
                        <div className="d-flex align-items-start">
                          <div className="badge bg-label-secondary p-2 me-3 rounded">
                            <i className="fa fa-globe  fa-sm" />
                          </div>
                          <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Calling Through System</h6>

                            </div>
                            <div className="d-flex align-items-center">
                            
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="mb-3 pb-1">
                        <div className="d-flex align-items-start">
                          <div className="badge bg-label-secondary p-2 me-3 rounded">
                            <i className="fa fa-globe  fa-sm" />
                          </div>
                          <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">IOS App</h6>

                            </div>
                            <div className="d-flex align-items-center">
                            
                            </div>
                          </div>
                        </div>
                      </li>


                    </ul>
                  </div>
                </div>
              </div>
            </div> */}

            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}

export default Home;
