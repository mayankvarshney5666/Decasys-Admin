import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Addlead from "./components/Pages/Addproduct";
import Leads from "./components/Pages/Leads";
import Followupleads from "./components/Pages/Followupleads";
import Forwardleads from "./components/Pages/Forwardleads";
import Clients from "./components/Pages/Clients";
import Setting from "./components/Pages/Setting";
import Sms from "./components/Pages/Sms";
import Report from "./components/Pages/Report";
import Createinvoice from "./components/Pages/Createinvoice";
import Listinvoice from "./components/Pages/Listinvoice";
import Productservices from "./components/Pages/Productservices";
import ManageEmployee from "./components/Pages/ManageEmployee";
import Manageexcludenos from "./components/Pages/Manageexcludenos";
import ManageUser from "./components/Pages/ManageUser";
import Slider from './components/Pages/Slider';
import ProductCategory from './components/Pages/ProductCategory';
import Order from './components/Pages/Order';
import DiscountCoupan from './components/Pages/DiscountCoupan';
import ProductSubCategory from "./components/Pages/ProductSubCategory";
import ProductBrand from "./components/Pages/ProductBrand";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Followupage from "./components/Pages/Followupage";
import Home1 from "./components/Home1";
import EmployeeReport from "./components/Pages/EmployeeReport";
import CallLogDetails from "./components/Pages/CallLogDetails";
import MultipleForm from "./components/Licence/MultipleForm";
import NotFound from "./components/Pages/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import MonthlyCalendar from "./components/Pages/MonthlyCalendar";
import Incomereport from "./components/Pages/Incomereport";
import ImportLead from "./components/Pages/ImportLead";
import Breadcrumb from "./components/Pages/Breadcrumb";
import Employeereporttt from "./components/Pages/Employeereporttt";
import Productservicereport from "./components/Pages/Productservicereport";
import LeadSouceReport from "./components/Pages/LeadSouceReport";
import Callreport from "./components/Pages/Callreport";
import UpdateProduct from "./components/Pages/UpdateProduct";
import Review from "./components/Pages/Review";
import Register from "./components/Pages/Register";
import { AllReview } from "./components/Pages/AllReview";
import Reviews from "./components/Pages/Reviews";
import AddReview from "./components/Pages/AddReview";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const [user_id, setuser_id] = useState();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await localStorage.getItem("token");
        const user_id = await localStorage.getItem("user_id");
        setuser_id(user_id);
        setIsLogined(Boolean(token));
      } catch (error) {
        console.error("Error reading token from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (!isLogined) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login lo={isLogined} />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Login lo={isLogined} />}></Route>
          <Route path="/" element={<Login lo={isLogined} />}></Route>
          <Route
            path="/employeesreport"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPassword lo={isLogined} />}
          ></Route>

          <Route
            path="/call_log_details/:id"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route path="/Addproduct" element={<Login lo={isLogined} />}></Route>
          <Route path="/Leads" element={<Login lo={isLogined} />}></Route>
          <Route
            path="/Followupleads"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route
            path="/Forwardleads"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route path="/Clients" element={<Login lo={isLogined} />}></Route>
          <Route
            path="/Productservices"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route
            path="/ManageEmployee"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route
            path="/Manageexcludenos"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route path="/ManageUser" element={<Login lo={isLogined} />}></Route>
          <Route path="/Setting" element={<Login lo={isLogined} />}></Route>
          <Route path="/Sms" element={<Login lo={isLogined} />}></Route>
          <Route path="/Report" element={<Login lo={isLogined} />}></Route>
          <Route path="/Listinvoice" element={<Login lo={isLogined} />}></Route>
          <Route
            path="/Createinvoice"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route path="/Addclient" element={<Login lo={isLogined} />}></Route>
          <Route
            path="/MultipleForm"
            element={<Login lo={isLogined} />}
          ></Route>
          <Route
            path="/Incomereport"
            element={<Login lo={isLogined} />}
          ></Route>

          <Route path="/import-lead" element={<Login lo={isLogined} />}></Route>
          <Route
            path="/followupleads/:id"
            element={<Login lo={isLogined} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        {isLogined && <Header />}

        <Routes>
          {isLogined ? (
            <>
              <Route path="/login" element={<Home1 />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/employeesreport"
                element={<EmployeeReport />}
              ></Route>
              <Route path="*" element={<NotFound />} />
              <Route
                path="/call_log_details/:id"
                element={<CallLogDetails />}
              ></Route>
              <Route path="/Order" element={<Order />}></Route>
              <Route path="/DiscountCoupan" element={<DiscountCoupan />}></Route>
              <Route path="/Addproduct" element={<Addlead />}></Route>
              <Route path="/Slider" element={<Slider />}></Route>
              <Route path="/ProductCategory" element={<ProductCategory />}></Route>
              <Route path="/ProductSubCategory" element={<ProductSubCategory />}></Route>
              <Route path="/ProductBrand" element={<ProductBrand />}></Route>
              <Route path="/Leads" element={<Leads />}></Route>
              <Route path="/review_details/:id" element={<Review />}></Route>
              <Route path="/allreview/:id" element={<Reviews />}></Route>
              <Route path="/AddReview/:id" element={<AddReview />}></Route>
              <Route path="/import-lead" element={<ImportLead />}></Route>
              <Route path="/UpdateProduct/:id" element={<UpdateProduct />}></Route>/

              <Route
                path="/Followupleads"
                element={<Followupleads />}
              ></Route>
              UpdateProduct
              <Route path="/Forwardleads" element={<Forwardleads />}></Route>
              <Route path="/Clients/:id" element={<Clients />}></Route>
              <Route path="/Registeruser" element={<Register />}></Route>
              <Route
                path="/Productservices"
                element={<Productservices />}
              ></Route>
              <Route
                path="/ManageEmployee"
                element={<ManageEmployee />}
              ></Route>
              <Route
                path="/Manageexcludenos"
                element={<Manageexcludenos />}
              ></Route>
              <Route path="/ManageUser" element={<ManageUser />}></Route>
              <Route path="/Setting" element={<Setting />}></Route>
              <Route path="/Sms" element={<Sms />}></Route>
              <Route path="/Report" element={<Report />}></Route>

              <Route path="/Incomereport" element={<Incomereport />}></Route>
              <Route
                path="/Employeereport"
                element={<Employeereporttt />}
              ></Route>
              <Route
                path="/Productservicereport"
                element={<Productservicereport />}
              ></Route>
              <Route path="/Callreport" element={<Callreport />}></Route>
              <Route
                path="/leadsourcereport"
                element={<LeadSouceReport />}
              ></Route>

              <Route path="/Listinvoice" element={<Listinvoice />}></Route>
              <Route
                path="/Createinvoice"
                element={<Createinvoice />}
              ></Route>
              <Route path="/MultipleForm" element={<MultipleForm />}></Route>
              <Route
                path="/followupleads/:id"
                element={<Followupage />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login lo={isLogined} />}></Route>
            </>
          )}
        </Routes>

        {isLogined && <SideNav />}
        {isLogined && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
