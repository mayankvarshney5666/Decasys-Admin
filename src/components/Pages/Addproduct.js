import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/productSlice";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/dark.min.css';
import './style.css'; // Import your CSS file
import { toast } from "react-toastify";
import Loader from "../Loader";
import { getAllProductCategory } from "../../features/product_categorySlice";
import {
  getBrand
} from "../../features/brandSlice";
import axios from "axios";

function Addlead() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [leaddata, setleaddata] = useState();
  const { ProductCategory } = useSelector((state) => state.ProductCategory);
  const Brand = useSelector((state) => state.brandSlice?.ProductCategory);
  const { loading } = useSelector((state) => state.lead);
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [content, setContent] = useState('');

  // for add more 
  const [inputs, setInputs] = useState([]);
  // const handleInputChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const newInputs = [...inputs];

  //   // Convert the name property to "weight" and value property to "price"
  //   if (name.startsWith('name')) {
  //     newInputs[index] = { ...newInputs[index], weight: value };
  //     delete newInputs[index].name; // Remove the name property
  //   }

  //   if (name.startsWith('value')) {
  //     newInputs[index] = { ...newInputs[index], price: value };
  //     delete newInputs[index].value; // Remove the value property
  //   }

  //   setInputs(newInputs);
  // };


  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];

    if (name.startsWith('weight')) {
      newInputs[index] = { ...newInputs[index], weight: value };
    } else if (name.startsWith('price')) {
      newInputs[index] = { ...newInputs[index], price: value };
    } else if (name.startsWith('discountPrice')) {
      newInputs[index] = { ...newInputs[index], discountPrice: value };
    }else if (name.startsWith('ShippingWeight')) {
      newInputs[index] = { ...newInputs[index], ShippingWeight: value };
    }

    setInputs(newInputs);
  };

  const RemoveItem = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);

  }

  // Function to handle "Add More" button click
  const handleAddMore = () => {
    // setInputs([...inputs, { name: '', value: '' }]);
    setInputs([...inputs, { weight: '', price: '', discountPrice: '', ShippingWeight:'' }]);
  };

  // for add more 
  console.log('inputs', inputs)


  const handleFileChange = (e, index) => {
    const files = e.target.files;
    setSelectedFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles[index] = files[0];
      return newFiles;
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    // alert(selectedFiles.length)
    const myForm = new FormData();
    myForm.set("name", leaddata.name);
    // myForm.set("price", leaddata.price);
    myForm.set("category", leaddata.category);
    myForm.set("brand", leaddata.brand);
    myForm.set("Stock", leaddata.Stock);
    myForm.set("subcategory", leaddata.subcategory);
    myForm.set("description", leaddata.description);
    myForm.set("ProductOverviewDiscription", leaddata.ProductOverviewDiscription);
    myForm.set("SupplimentFacts", leaddata.SupplimentFacts);
    myForm.set("sku", leaddata.sku);
    myForm.set("metaDes", leaddata.metaDes);
    myForm.set("metaKey", leaddata.metaKey);
    myForm.set("metaTitle", leaddata.metaTitle);
    myForm.set("UPCCode", leaddata.UPCCode);
    myForm.set("ProductCode", leaddata.ProductCode);
    myForm.set("bestbefore", leaddata.bestbefore);
    // Convert the inputs array to a suitable format for form submission
    const weightPrices = inputs.map(input => ({ weight: input.weight, price: input.price, discountPrice: input.discountPrice,ShippingWeight:input.ShippingWeight }));
    myForm.set("weightwishprice", JSON.stringify(weightPrices));


    for (let i = 0; i < selectedFiles.length; i++) {
      myForm.append(`image${i}`, selectedFiles[i]);
    }

    try {
      const response = await axios.post(`https://www.backend.decasys.in/api/v1/addproduct`, myForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Product Added Successfully..');
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 500);
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error
    }
  };

  useEffect(() => {
    dispatch(getAllProductCategory());
    dispatch(getBrand());
  }, []);
  const [SubCategory, SetSubCategory] = useState();
  const getsubcategory = async (e) => {

    setleaddata({ ...leaddata, category: e.target.value })
    /////////set subcategory
    const aaaaaa = await { category: e.target.value };
    const responce = await fetch(
      `${apiUrl}/getSubcategoryByCategoryId`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aaaaaa),
      }
    );
    const result = await responce.json();

    if (result.success === true) {
      SetSubCategory(result.subCategory);
      console.log(SubCategory)
    }
  }

  if (loading) {
    return <Loader />;
  }


  return (
    <div>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content py-2 pt-3">
          <div className="container">
            <div className="panel-bd lobidrag lobipanel">

              <div className="add-Product-wrapper">
                <form onSubmit={handleUpload} encType="multipart/form-data">
                  <div className="row">
                    {/* Left Panel Start */}
                    <div className="col-12 col-lg-9" style={{ paddingLeft: 0 }}>
                      <div className="panel">
                        <div className="add-Product-header">
                          <h4>Add Product</h4>
                        </div>
                        <div className="row">
                          <input type="hidden" name="client_id" value={user_id} />
                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="full_name">
                                  Product Name <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="name"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder="Product Name"
                                    className="form-control"
                                    required="required"
                                  />
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="full_name">
                                  Meta Title <span className="text-danger"></span>{" "}
                                </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="metaTitle"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        metaTitle: e.target.value,
                                      })
                                    }
                                    placeholder="Enter Meta Title"
                                    className="form-control"
                                   
                                  />
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="full_name">
                                  Meta Keywords <span className="text-danger"></span>{" "}
                                </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="metaKey"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        metaKey: e.target.value,
                                      })
                                    }
                                    placeholder="Enter Meta Keywords"
                                    className="form-control"
                                  
                                  />
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="full_name">
                                  Meta Description <span className="text-danger"></span>{" "}
                                </label>
                                <div className="form-group">
                                  
                                  <textarea placeholder="Enter Meta Description"
                                    className="form-control"
                                     rows={4}  name="metaDes"
                                     onChange={(e) =>
                                       setleaddata({
                                         ...leaddata,
                                         metaDes: e.target.value,
                                       })
                                     } ></textarea>
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12  mob-left-right col-lg-6">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="email_id">Stock </label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    name="Stock"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        Stock: e.target.value,
                                      })
                                    }
                                    placeholder="Stock"
                                    className="form-control"
                                  />
                                  <span className="text-danger ferror"> </span>
                                </div>
                              </div>
                            </div>
                          </div>
                      
                         

                          <div className="col-12 mob-left-right col-lg-6">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="contact_no">
                                  Sku No. <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    name="sku"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        sku: e.target.value,
                                      })
                                    }
                                    placeholder="sku"
                                    className="form-control"
                                    required="required"
                                  />

                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12  mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-4 mob-left-right col-lg-4">
                                <label htmlFor="email_id">Best Before </label>
                                <div className="form-group">
                                  <input
                                    type="date"
                                    name="bestbefore"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        bestbefore: e.target.value,
                                      })
                                    }
                                    placeholder="Best Before Date"
                                    className="form-control"
                                  />
                                  <span className="text-danger ferror"> </span>
                                </div>
                              </div>
                              <div className="col-4 mob-left-right col-lg-4">
                                <label htmlFor="email_id">Product Code </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="ProductCode"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        ProductCode: e.target.value,
                                      })
                                    }
                                    placeholder="Product Code"
                                    className="form-control"
                                  />
                                  <span className="text-danger ferror"> </span>
                                </div>
                              </div>
                              <div className="col-4 mob-left-right col-lg-4">
                                <label htmlFor="email_id">UPC Code </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="UPCCode"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        UPCCode: e.target.value,
                                      })
                                    }
                                    placeholder="UPC Code"
                                    className="form-control"
                                  />
                                  <span className="text-danger ferror"> </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-lg-12 text-center mt-3">
                            <button type="button" className="btn btn-primary button-57" onClick={handleAddMore}>Click For Add Price With Weight And Discount</button>
                          </div>
                          {inputs.map((input, index) => (
                            <div className="col-12 row mob-left-right col-lg-12 mt-3">
                              <div className="row">
                                <div className="col-12 mob-left-right col-lg-12" key={index}>
                                  <label htmlFor="contact_no">
                                    Add Price With Size  <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="row">
                                    <div className="col-sm-3 row mob-left-right col-xs-12">
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Weight"
                                        name={`weight${index}`}
                                  value={input.weight || ''}
                                  onChange={e => handleInputChange(index, e)}
                                      />
                                    </div>
                                    <div className="col-sm-2 row mob-left-right col-xs-12">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Price"
                                        name={`price${index}`}
                                        value={input.price || ''}
                                        onChange={e => handleInputChange(index, e)}
                                      />
                                    </div>
                                    <div className="col-sm-3 row mob-left-right col-xs-12">
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Discount Price"
                                        name={`discountPrice${index}`}
                                        value={input.discountPrice || ''}
                                        onChange={e => handleInputChange(index, e)}
                                      />
                                    </div>
                                    <div className="col-sm-3 row mob-left-right col-xs-12">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Shipping Weight"
                                        name={`ShippingWeight${index}`}
                                  value={input.ShippingWeight || ''}
                                  onChange={e => handleInputChange(index, e)}
                                      />
                                    </div>

                                    <div className="col-md-1 pd-top mobile-hids">
                                <span onClick={() => RemoveItem(index)}
                                  className="text-danger"
                                  style={{ cursor: 'pointer' }} ><i class="fa fa-window-close" aria-hidden="true"></i></span>
                              </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="col-12  mob-left-right col-lg-12 mt-4">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="contact_no">
                                  Description <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="form-group">
                                  <FroalaEditorComponent
                                    tag='textarea'
                                    config={{
                                      toolbarInline: true,
                                      placeholderText: 'Enter text here',
                                      charCounterCount: false
                                    }}
                                    model={leaddata?.description}
                                    onModelChange={(model) => {
                                      setleaddata({
                                        ...leaddata,
                                        description: model,
                                      });
                                    }}
                                  />
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12  mob-left-right col-xs-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="contact_no">
                                  Product Overview Discription <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="form-group">
                                  <FroalaEditorComponent
                                    tag='textarea'
                                    config={{
                                      toolbarInline: true,
                                      placeholderText: 'Enter text here',
                                      charCounterCount: false
                                    }}
                                    model={leaddata?.ProductOverviewDiscription}
                                    onModelChange={(model) => {
                                      setleaddata({
                                        ...leaddata,
                                        ProductOverviewDiscription: model,
                                      });
                                    }}

                                  />
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12  mob-left-right col-xs-12 mb-4">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="contact_no">
                                  Suppliment Facts <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="form-group">
                                  <FroalaEditorComponent
                                    tag='textarea'
                                    config={{
                                      toolbarInline: true,
                                      placeholderText: 'Enter text here',
                                      charCounterCount: false
                                    }}
                                    model={leaddata?.SupplimentFacts}
                                    onModelChange={(model) => {
                                      setleaddata({
                                        ...leaddata,
                                        SupplimentFacts: model,
                                      });
                                    }}

                                  />

                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    {/* Left Panel End */}
                    {/* Right Panel Start */}
                    <div className="col-12 col-lg-3">
                      <div className="panel">
                        <div className="add-Product-header">
                          <h4>Publish</h4>
                        </div>
                        <div className="row">
                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="lead_source">Category </label>
                                <div className="form-group">
                                  <select
                                    name="category"
                                    onChange={getsubcategory}
                                    className="form-control"
                                    required
                                  >
                                    <option value="">Select</option>

                                    {ProductCategory?.category?.map(
                                      (leadsource, key) => {
                                        return (
                                          <option value={leadsource._id}>
                                            {leadsource?.category_name}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="lead_source">SubCategory</label>
                                <div className="form-group">
                                  <select
                                    name="subcategory"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        subcategory: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                    required
                                  >
                                    <option value="">Select</option>

                                    {SubCategory?.map(
                                      (leadsource, key) => {
                                        return (
                                          <option value={leadsource._id}>
                                            {leadsource?.subcategory}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mob-left-right col-lg-12">
                            <div className="row">
                              <div className="col-12 mob-left-right col-lg-12">
                                <label htmlFor="lead_source">Brand </label>
                                <div className="form-group">
                                  <select
                                    name="brand"
                                    onChange={(e) =>
                                      setleaddata({
                                        ...leaddata,
                                        brand: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                    required
                                  >
                                    <option value="">Select</option>

                                    {Brand?.map(
                                      (leadsource, key) => {
                                        return (
                                          <option value={leadsource?._id}>
                                            {leadsource?.brand}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  <span className="text-danger ferror"> </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          {[...Array(6)].map((_, index) => (
                            <div className="col-12 mob-left-right col-lg-12">
                              <div className="prd-img-container">
                                <div className="row">
                                  <div className="col-12 mob-left-right col-lg-12">
                                    <label htmlFor="contact_no">
                                      Image {index + 1} <span className="text-danger">*</span>{" "}
                                    </label>
                                    <div className="form-group">
                                      {/* {[...Array(6)].map((_, index) => ( */}
                                      <div key={index}>
                                        <input type="file" accept=".png" onChange={(e) => handleFileChange(e, index)} />
                                      </div>
                                      {/* ))} */}
                                    </div>
                                  </div>
                                </div>
                                </div>
                            </div>
                          ))}

                          <div className="col-sm-12 col-lg-12 mb-4 mt-3">
                            <div className="col-md-12 col-xs-12 py-10 pt-10 ">
                              <input
                                type="submit"
                                value="Publish"
                                name="Save"
                                className="button-57"
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    {/* Right Panel End */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Addlead;
