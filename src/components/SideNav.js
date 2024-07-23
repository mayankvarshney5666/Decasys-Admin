import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

import companyLogo from "./brand.jpg";

function SideNav() {

  ////// Hide And Show/////
  const [line, setline] = useState("none");
  const [lead1, setlead] = useState("none");
  const [sale, setsale] = useState("none");
  const [callManageshow, setcallManageshow] = useState("none");
  const openclose = () => {
    if (line === 'none') {
      setline("block")
    } else {
      setline("none")
    }
  }
  const lead = () => {
    if (lead1 === 'none') {
      setlead("block")
    } else {
      setlead("none")
    }

  }

  const Sale = () => {
    if (sale === 'none') {
      setsale("block")
    } else {
      setsale("none")
    }

  }
  const callManage = () => {
    if (callManageshow === 'none') {
      setcallManageshow("block")
    } else {
      setcallManageshow("none")
    }

  }
  ////// Hide And Show///////

  const [activeItem, setActiveItem] = useState('home');
  const nevigate = useNavigate();
  // Function to handle menu item clicks
  const handleItemClick = (itemName) => {
    nevigate(`/${itemName}`);
    setActiveItem(itemName);
  };


  return (
    <div>
      <side className="main-sidebar sidebar-dark-primary bg-menu-theme elevationes-4">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel ">
            <div className="info text-center">
              <h2>Decasys</h2>
            </div>
            <div className="image">
              <div class="image pull-center">
                <img src={companyLogo} alt="Decasys" />
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <ul className="nav nav-treeview">
                  <li className="nav-item"  >
                    <Link to="/home" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link">
                      <i className="fa fa-circle nav-icon" />
                      Top Navigation + Sidebar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to=" " className="nav-link">
                      <i className="fa fa-circle nav-icon" />
                      Boxed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to=""
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      Fixed Sidebar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to=""
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      Fixed Sidebar <small>+ Custom Area</small>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to=""
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      Fixed Navbar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to=""
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      Fixed Footer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to=" "
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      Collapsed Sidebar
                    </Link>
                  </li>
                </ul>
              </li>
              <>

                <li className="nav-item">
                  <a href="javascript:void(0);" className={activeItem === 'home' ? 'nav-link active' : 'nav-link'}
                    onClick={() => handleItemClick('home')}
                  >
                    <i className="nav-icon fas fa fa-home"></i>
                    Dashboard
                  </a>
                </li>
                {/* manage Slider */}
                <li className="nav-item">
                  <a href="javascript:void(0);" className={activeItem === 'Slider' ? 'nav-link active' : 'nav-link'}
                    onClick={() => handleItemClick('Slider')}>
                    <i class="nav-icon fa fa-picture-o" aria-hidden="true"></i>
                    Manage Slider
                  </a>
                </li>
                {/* manage Slider */}

                {/* manage Product */}
                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={lead}>
                    <i class="nav-icon fa fa-database" aria-hidden="true"></i>
                    Manage Category
                    <i className="fas fa-angle-left right" />
                  </Link>
                  <ul className="nav nav-treeview" style={{ display: lead1 }}>
                    {/* manage category */}
                    <li className="nav-item">
                      <a href="javascript:void(0);" className={activeItem === 'ProductCategory' ? 'nav-link active' : 'nav-link'}
                        onClick={() => handleItemClick('ProductCategory')}>
                        <p>Manage Category</p>
                      </a>
                    </li>
                    {/* manage category */}
                    {/* manage SubCategory */}
                    <li className="nav-item">
                      <a href="javascript:void(0);" className={activeItem === 'ProductSubCategory' ? 'nav-link active' : 'nav-link'}
                        onClick={() => handleItemClick('ProductSubCategory')}>
                        <p>Manage SubCategory</p>
                      </a>
                    </li>
                    {/* manage SubCategory */}
                  </ul>
                </li>

                {/* manage Brand */}
                <li className="nav-item">
                  <a href="javascript:void(0);" className={activeItem === 'ProductBrand' ? 'nav-link active' : 'nav-link'}
                    onClick={() => handleItemClick('ProductBrand')}>
                    <i class="nav-icon fa fa-bookmark" aria-hidden="true"></i>
                    Manage Brand
                  </a>
                </li>
                {/* manage Brand */}

                {/* manage Product */}
                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={Sale}>
                    <i class="nav-icon fa fa-leaf" aria-hidden="true"></i>
                    Manage Products
                    <i className="fas fa-angle-left right" />
                  </Link>
                  <ul className="nav nav-treeview" style={{ display: sale }}>
                    <li className="nav-item">
                      <a href="javascript:void(0);" className={activeItem === 'Addproduct' ? 'nav-link active' : 'nav-link'}
                        onClick={() => handleItemClick('Addproduct')}>
                        <p>Add Product</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="javascript:void(0);" className={activeItem === 'leads' ? 'nav-link active' : 'nav-link'}
                        onClick={() => handleItemClick('leads')}>
                        <p>All Product</p>
                      </a>
                    </li>
                  </ul>
                </li>

                {/* manage Coupon */}
                <li className="nav-item">
                  <a href="javascript:void(0);" className={activeItem === 'DiscountCoupan' ? 'nav-link active' : 'nav-link'}
                    onClick={() => handleItemClick('DiscountCoupan')}>
                    <i class="nav-icon fa fa-gift" aria-hidden="true"></i>
                    Manage Coupon
                  </a>
                </li>
                {/* manage Coupon */}

                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={Sale}>
                    <i class="nav-icon fa fa-credit-card" aria-hidden="true"></i>
                    Manage Sales
                    <i className="fas fa-angle-left right" />
                  </Link>
                  <ul className="nav nav-treeview" style={{ display: sale }}>
                    <li className="nav-item">
                      <a href="javascript:void(0);" className={activeItem === 'Order' ? 'nav-link active' : 'nav-link'}
                        onClick={() => handleItemClick('Order')}>
                        <p>All Order</p>
                      </a>
                    </li>
                    {/* <li className="nav-item">
                  <a  href="javascript:void(0);" className={activeItem === 'DiscountCoupan' ? 'nav-link active' : 'nav-link'}
                  onClick={() => handleItemClick('DiscountCoupan')}>  
                      <p>Discount Coupan</p>
                    </a>
                  </li> */}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/Registeruser" className="nav-link" >
                    <i class="nav-icon fa fa-users" aria-hidden="true"></i>
                    Manage User
                  </Link>
                </li>
                {/* <li className="nav-item">
                <a  href="javascript:void(0);"
                className={activeItem === 'Setting' ? 'nav-link active' : 'nav-link'}
                onClick={() => handleItemClick('Setting')}
                >
                  <i className="nav-icon far fa fa-cog" />
                  Setting
                </a>
              </li>   */}

              </>


            </ul>
          </nav>
        </div>
      </side>

    </div>
  );
}

export default SideNav;
