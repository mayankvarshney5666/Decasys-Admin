import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Review() {
    const { id } = useParams();

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

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://www.backend.decasys.in/api/v1/getPerticulerReviews/${id}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data.reviews);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, [id]);

    const insert = async (e, index) => {
        e.preventDefault();

        const formData = new FormData();

        // Append JSON data from reviews[index] to FormData
        formData.append('name', reviews[index].name);
        formData.append('rating', reviews[index].rating);
        formData.append('approved', reviews[index].approved);
        formData.append('title', reviews[index].title);
        formData.append('comment', reviews[index].comment);
        formData.append('product_id', reviews[index].product_id);
        formData.append('_id',id);

        // Append image file to FormData if it exists
        if (reviews[index].image_name instanceof File) {
            formData.append('image0', reviews[index].image_name);
        }

        // Make POST request to update review
        fetch(`https://www.backend.decasys.in/api/v1/updateproductreview`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                toast.success(data.message);
            })
            .catch(error => {
                console.error('Error updating review:', error);
            });
    };

    const handleRatingChange = (index, e) => {
        const newReviews = [...reviews];
        newReviews[index].rating = e.target.value;
        setReviews(newReviews);
    };

    const handleApprovalChange = (index, e) => {
        const newReviews = [...reviews];
        newReviews[index].approved = e.target.value;
        setReviews(newReviews);
    };

    const handleChange = (index, e) => {
        const newReviews = [...reviews];
        newReviews[index][e.target.name] = e.target.value;
        setReviews(newReviews);
    };

    const handleImageChange = (index, e) => {
        const newReviews = [...reviews];
        const file = e.target.files[0];
        newReviews[index].image_name = file; // Update the image_name field with the selected file
        setReviews(newReviews);
    };

    const addReview = () => {
        setReviews([...reviews, {
            name: '',
            reviewTitle: '',
            rating: '',
            comment: '',
            approved: '',
            product_id: id,
            Verified_Purchase: '',
            image_name: null,
        }]);
    };

    return (
        <div>
            <div className="content-wrapper">
                <section className="content py-2 pt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 pl-0">
                                <div className="panel panel-bd lobidrag lobipanel">
                                    <div className="panel-body" id="add-new-service">
                                        {reviews.map((review, index) => (
                                            <div key={index}>
                                                <form onSubmit={(e) => insert(e, index)} encType="multipart/form-data">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`name-${index}`}>Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="name"
                                                                    id={`name-${index}`}
                                                                    value={review.name}
                                                                    onChange={(e) => handleChange(index, e)}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`rating-${index}`}>Rating</label>
                                                                <select
                                                                    className="form-control"
                                                                    name="rating"
                                                                    id={`rating-${index}`}
                                                                    value={review.rating}
                                                                    onChange={(e) => handleRatingChange(index, e)}
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
                                                        <div className="col-12 col-lg-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`approval-${index}`}>Status</label>
                                                                <select
                                                                    className="form-control"
                                                                    name="approved"
                                                                    id={`approval-${index}`}
                                                                    value={review.approved}
                                                                    onChange={(e) => handleApprovalChange(index, e)}
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
                                                        <div className="col-12 col-lg-12">
                                                            <div className="form-group">
                                                                <label htmlFor={`reviewTitle-${index}`}>Review Title</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="title"
                                                                   
                                                                    value={review.title}
                                                                    onChange={(e) => handleChange(index, e)}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-12">
                                                            <div className="form-group">
                                                                <label htmlFor={`comment-${index}`}>Comment</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    name="comment"
                                                                    id={`comment-${index}`}
                                                                    value={review.comment}
                                                                    onChange={(e) => handleChange(index, e)}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <div className="form-group">
                                                                <label htmlFor={`image-${index}`}>Edit Image</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control-file"
                                                                    name="image_name"
                                                                    id={`image-${index}`}
                                                                    accept="image/*"
                                                                    onChange={(e) => handleImageChange(index, e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <div className="form-group">
                                                                {/* <label htmlFor={`image-${index}`}>Edit Image</label> */}
                                                                <img  style={{height:"100px",width:"100px"}} src={`https://www.backend.decasys.in/${review?.images[0]?.image_name}`}/>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 text-center">
                                                            <button type="submit" className="btn btn-primary">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        ))}
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

export default Review;
