import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgent } from "../../features/agentSlice";
import { getAllStatus } from "../../features/statusSlice";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
function Clients() {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const { agent } = useSelector((state) => state.agent);



  useEffect(() => {
    dispatch(getAllAgent());
    dispatch(getAllStatus());
  }, [dispatch]); 

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${apiUrl}/GetAllOrder?id=${id}`);
        const orderData = response.data?.allOrder?.find(order => order._id === id);
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
        setOrder(null);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id, apiUrl]);
  const handlePrintInvoice = () => {
    window.print(); 
  };



  

  return (
    <div>
      <div className="content-wrapper">
        <section className="content py-5">
          <div className="container">
            {order ? (
              <div className="panel panel-bd lobidrag lobipanel">
                <div className="panel-heading ">
                  <h3 className="panel-title btn btnes exports shadow">Order Detail</h3>
                </div>
                <div className="panel-body">
                  <div className="checkout-address-sec bg-white p-5 shadow">
                    <p><strong>Order ID:</strong>&emsp; {order._id}</p>
                    <p><strong>Name:</strong>&emsp; {order.user_name}</p>
                    <p><strong>Email Id:</strong>&emsp; {order.email}</p>
                    <p><strong>Telephone:</strong>&emsp; {order.mobile}</p>
                    <p><strong>Alternate Mobile:</strong>&emsp; {order.altmobile}</p>
                    <p><strong>Address:</strong>&emsp; {order.address}</p>
                    <p><strong>City:</strong>&emsp; {order.city}</p>
                    <p><strong>State:</strong>&emsp; {order.state}</p>
                    <p><strong>Country:</strong>&emsp; {order.country}</p>
                    <p><strong>Pincode:</strong>&emsp; {order.pincode}</p>
                    <p><strong>Payment Status:</strong>&emsp; {order.payment_status}</p>
                    <p><strong>Order ID:</strong>&emsp; {order.razorpay_order_id}</p>
                    {/* <p><strong>Amount:</strong>&emsp; ₹{order.amount}</p> */}
              
                    
                    <button className="btn btnes exports shadow" onClick={handlePrintInvoice}>Print Invoice</button>

           
                  </div>
                  <div className="table-responsive bg-white mt-4 shadow">
                    <table className="table table-striped  table-bordered table-sm ">
                      <thead>
                        <tr className="font-weight-bold text-primary">
                          <th>S.No.</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.product_details.map((product, index) => (
                          <tr key={index} className="">
                            <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_quantity}</td>
                            <td>₹{product.product_price || 0}</td>
                            <td>₹{product.product_quantity * (product.product_price || 0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <form>
                      <button className=" m-2 ml-4 btn btnes exports shadow">Send</button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <p>No order found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Clients;
