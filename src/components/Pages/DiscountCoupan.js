import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductService,
  getAllProductService,
  deleteProductService,
  UpdateProductService,
} from "../../features/product_serviceSlice";
// import getAllProductService from "../../features/product_serviceSlice"
import { toast } from "react-toastify";
function DiscountCoupan() {
  const apiUrl = process.env.REACT_APP_API_URL;
  

  const [data,setdata]=useState();
  const [alldata,setalldata]=useState();
  const SaveCoupan=async(e)=>{
        e.preventDefault();
      
        const responce = await fetch(
          `${apiUrl}/GenerateCoupon`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await responce.json(); 
    
        if (result.success === true) {
          // SetSubCategory(result.subCategory);
          toast.success(result.message);
          setTimeout(() => {
        window.location.reload(false);
      }, 500);
          }
  }

  const deleteCoupon=async(id)=>{
    const responce = await fetch(
      `${apiUrl}/DeleteCoupon/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
       }
    );
    const result = await responce.json();

    if (result.success === true) {
      toast.success(result.message);
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
      }
  }

  const getallCoupon=async(e)=>{
    const responce = await fetch(
      `${apiUrl}/getallGenerateCoupon`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
       }
    );
    const result = await responce.json();

    if (result.success === true) {
      setalldata(result.coupon);
      }
  }


  useEffect(()=>{
       getallCoupon()
  },[])

  return (
    <div>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content py-2 pt-3">
          <div className="container">
            <div className="row">
              <div className="col-12 pl-0">
                <div className="panel panel-bd lobidrag lobipanel">
                  <div className="panel-body">
                    <div className="col-12">
                      <div className="btn-group lead_information  pl-2">
                        <h5>Manage & Add Dicount Coupon</h5>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body" id="add-new-service">
                    <div className="col-sm-12 col-md-12 col-xs-12">
                      <div>
                        <form  
                        onSubmit={SaveCoupan}
                        >
                          <div className="cardses">
                            <div className="row">
                              <div className="col-md-6">
                                <lable>Coupon Name</lable>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setdata({
                                        ...data,
                                        coupon_name: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                    required
                                    placeholder="Enter Coupon Name"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <lable>Coupon Code</lable>
                                <div className="form-group">
                                  <input
                                  onChange={(e) =>
                                    setdata({
                                      ...data,
                                      coupon_code: e.target.value,
                                    })
                                  }
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Enter Coupon Code"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <lable>Coupon Offer Type (% Or Price Value)</lable>
                                <div className="form-group">
                                  <select  type="text"
                                    className="form-control"
                                    required onChange={(e) =>
                                      setdata({
                                        ...data,
                                        coupon_type: e.target.value,
                                      })
                                    }
                                    
                                   >
                                    <option value=''>Select Coupon Type</option>
<option value='Price'>Price</option>
<option value='Persentage'>Persentage</option>

                                   </select>
                                  {/* <input
                                  onChange={(e) =>
                                    setdata({
                                      ...data,
                                      coupon_type: e.target.value,
                                    })
                                  }
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Enter Coupon Code"
                                  /> */}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <lable>Coupon Value(Offer Price)</lable>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      setdata({
                                        ...data,
                                        coupon_value: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                    required
                                    placeholder="Enter Coupon Value"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <lable>Minimum Discount Amount </lable>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      setdata({
                                        ...data,
                                        coupon_minimun_apply_amount: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                    required
                                    placeholder="Enter Minimum Discount Amount"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <lable>Status</lable>
                                <div className="form-group">
                                  <select className="form-control" onChange={(e) =>
                                      setdata({
                                        ...data,
                                        coupon_status: e.target.value,
                                      })
                                    } name="" required>
                                    <option value="">Select Status</option>
                                    <option value="Enable">Enable</option>
                                    <option value="Disable">Disable</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-12 text-center">
                                <div className="resets-button">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Add Coupon
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="col-12">
                      <div className="bg-white">
                        <div className="cards">
                          <div className="card-headerse bg-white">
                            <div className="table-responsive mob-bord">
                              <table
                                className="table table-bordered table-hover"
                                id="example"
                              >
                                <thead className="heading_table">
                                  <tr>
                                    <th className="list-check">S.N.</th>
                                    <th>Coupon Name</th>
                                    <th>Cuopon Code</th>
                                    <th>Cuopon Value</th>
                                    <th>Cuopon type</th>
                                    <th>Minimum Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody className="datas_table">
                                  {
                                    alldata?.map((alldata1,index)=>{
                                      const handleDelete = () => {
                                        const confirmDelete = window.confirm(
                                          "Are you sure you want to delete this coupon?"
                                        );
  
                                        if (confirmDelete) {
                                          // Dispatch the deleteProductService action with the product/service ID
                                            deleteCoupon(
                                              alldata1?._id
                                            )
                                       
                                          // toast.success("Delete Successfully");
                                        } else {
                                          toast.success("Delete Canceled");
                                          console.log("Delete canceled");
                                        }
                                      };

                                      return( <tr>
                                        <td className="list-check">
                                          {index+1}
                                        </td>
                                        <td>
                                          {alldata1?.coupon_name}
                                        </td>
                                        <td>
                                        {alldata1?.coupon_code}
                                        </td>
                                        <td>
                                        {alldata1?.coupon_type}
                                        </td>
                                        <td>
                                        {alldata1?.coupon_value}
                                        </td>
                                        <td>
                                        {alldata1?.coupon_minimun_apply_amount}
                                        </td>
                                        <td>
                                        {alldata1?.coupon_status}
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="btn btn-danger btn-xs"
                                          >
                                            <i className="fa fa-trash" />
                                          </button>
    
                                        </td>
                                      </tr>)
                                    })
                                  }
                                 

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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default DiscountCoupan;
