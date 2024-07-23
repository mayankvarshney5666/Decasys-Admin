import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddReview() {
    

    const ratingOptions = [
        { value: "", label: "Select Rating" }, 
        { value: 1, label: '⭐' },
        { value: 2, label: '⭐⭐' },
        { value: 3, label: '⭐⭐⭐' },
        { value: 4, label: '⭐⭐⭐⭐' },
        { value: 5, label: '⭐⭐⭐⭐⭐' }
    ];

    const approvalOptions = [
        { value: "0", label: "Pending" },
        { value: "1", label: "Approved" },
       
    ];

    const purchaseVerificationOptions = [
        { value: "", label: "Pending" },
        { value: "Verified", label: "Verified" },
        { value: "Rejected", label: "Rejected" }
    ];

    
    
   const {id}=useParams();

   const [reviews, setReviews] = useState({
    title: '',
    comment: '',
    name: '',
    rating: '',
    approved: '',
  });
  const [review, setReview] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReview({ image: file });
  };

  const insert = async (e) => {
    e.preventDefault();

    const reviews1 = { ...reviews, product_id: id };
    const formData = new FormData();
    formData.append('title', reviews1.title);
    formData.append('comment', reviews1.comment);
    formData.append('name', reviews1.name);
    formData.append('rating', reviews1.rating);
    formData.append('approved', reviews1.approved);
    formData.append('image0', review.image);
    formData.append('product_id', reviews1.product_id);

    try {
      const response = await fetch('https://www.backend.decasys.in/api/v1/AddRevied', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Error adding review');
    }
  };


    return (
        <div>
            <div className="content-wrapper">
                <section className="content py-2 pt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="panel panel-bd lobidrag lobipanel">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="bg-white">
                                                <div className="btn-group lead_information  pl-2">
                                                    <h5> Review </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-body" id="add-new-service">
                                        <div >
                                            <form encType="multipart/form-data" onSubmit={insert}>
                                                <div className="row">
                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label >Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="name"
                                                                value={reviews.name}
                                                                onChange={(e) => setReviews({...reviews,name:e.target.value})}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label >Review Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="title"
                                                            
                                                                value={reviews.title}
                                                                onChange={(e) =>  setReviews({...reviews,title:e.target.value})}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label >Rating</label>
                                                            <select
                                                                className="form-control"
                                                                name="rating"
                                                            
                                                                value={reviews.rating}
                                                                onChange={(e) =>  setReviews({...reviews,rating:e.target.value})}
                                                                required
                                                            >
                                                                {ratingOptions.map(option => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <div className="form-group">
                                                                <label >Status</label>
                                                                <select
                                                                    className="form-control"
                                                                    name="approved"
                                                                
                                                                    value={reviews.approved}
                                                                    // onChange={(e) => handleApprovalChange(e.target.value)}
                                                                    onChange={(e) =>  setReviews({...reviews,approved:e.target.value})}
                                                                    required
                                                                >
                                                                    {approvalOptions.map(option => (
                                                                        <option key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-lg-6">
                                                            <div className="form-group">
                                                                <label >Image</label>
                                                                <input type="file"
                                    name="file"
                                    onChange={handleFileChange} className="form-control" id="title" placeholder="Enter review title" />
                             
                                                               
                                                            </div>
                                                        </div>
                                                  
                                                    <div className="col-12 col-lg-12">
                                                        <div className="form-group">
                                                            <label >Comment</label>
                                                            <textarea
                                                                className="form-control"
                                                                name="comment"
                                                            
                                                                value={reviews.comment}
                                                                onChange={(e) =>  setReviews({...reviews,comment:e.target.value})}
                                                                required
                                                            />
                                                        </div>
                                                        </div>
                                                </div>
                                                <br></br> 
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <button type="submit" className="btn btn-primary" >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                            </form>
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

export default AddReview;
