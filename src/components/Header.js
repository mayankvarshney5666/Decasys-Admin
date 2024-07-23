import React,{useEffect, useState} from "react";
import {  Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import Breadcrumb from "./Pages/Breadcrumb";


function Header() {  
  const navigate = useNavigate();
  
  const Logout = async() => {
  
     localStorage.removeItem('token');
     localStorage.removeItem('user_id');
     localStorage.removeItem('agent_name');
     localStorage.removeItem('agent_email');
     localStorage.removeItem('agent_mobile');
     localStorage.removeItem('role');

    
       await  navigate('/login')       
  setTimeout(()=>{   

     toast.warn('Logout Successfully'); 
     window.location.reload(false);
    
}, 500);   
            };
  
  return (    
    <div>
    
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/home" className="nav-link">
              <i class="fa fa-home" />
               {/* Home */}
            </Link>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            
            <div className="nav-link">Dashboard</div>
          </li> */}
        </ul>

        <Breadcrumb/> 
        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#">
              <i className="far fa-bell pe-7s-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <Link to="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </Link>
              <div className="dropdown-divider" />
              <Link to="#" className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </Link>
              <div className="dropdown-divider" />
              <Link to="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </Link>
              <div className="dropdown-divider" />
              <Link to="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </Link>
            </div>
          </li>
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" href="#">
              <img
                src="/dist/img/avatar5.png"
                className="img-circle elevation-2 img-circle"
                to={40}
                width={40}
                alt="User Image"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <Link to="/Setting" className="dropdown-item">
                {/* Message Start */}
                <i className="nav-icon far fa fa-cog" /> Settings
                {/* Message End */}
              </Link>
              <div className="dropdown-divider" />
              <Link to="/login" className="dropdown-item" onClick={Logout}>
                {/* Message Start */}
                <i className="nav-icon far fa fa-cog"  /> logout user
                {/* Message End */}
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="fullscreen"
              to="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </Link>
          </li>
          <li className="nav-item">
            {/* <Link
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              to="#"
              role="button"
            >
              <i className="fas fa-th-large" />
            </Link> */}
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  );


}

export default Header;
