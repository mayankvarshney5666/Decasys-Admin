import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductCategory,
  getAllProductCategory,
  deleteProductCategory,
  UpdateProductCategory,
} from "../../features/product_categorySlice";

import { toast } from "react-toastify";

function ProductCategory() {
  const { ProductCategory } = useSelector((state) => state.ProductCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductCategory());
  }, []);
  const [data, setData] = useState({});
  const newdata = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const productsubmit = async (e) => {
    e.preventDefault();
    if (data._id) {
      const aaaa = await dispatch(UpdateProductCategory(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }

    } else {
      const aaaa = await dispatch(addProductCategory(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
    }
  };

  const editstatus = async (_id) => {
    const selectedData = ProductCategory?.category.find(
      (item) => item._id === _id
    );
    setline("block");
    setData(selectedData);
    console.log(selectedData);
  };
  ///// Product And Service Add

  /// add form show
  const [line, setline] = useState("none");
  const showForm = (e) => {
    if (line === "none") {
      setline("block");
    } else {
      setline("none");
    }
  };
  /// add form show

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
                        <h5>Manage & Add Category</h5>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body" id="add-new-service">
                    <div className="col-sm-12 col-md-12 col-xs-12">
                      <div>
                        <form onSubmit={productsubmit}>
                          <div className="cardses">
                            <div className="">
                              <div className="row">
                                <div className="col-md-12">
                                  <lable>Category Name</lable>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="category_name"
                                      value={data?.category_name}
                                      required
                                      onChange={newdata}
                                      placeholder="Enter Category Name"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12 text-center">
                                  <div className="resets-button">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      {data._id ? "Edit" : "Submit"}
                                    </button>
                                  </div>
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
                                  <th>Category Name</th>

                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody className="datas_table">
                                {ProductCategory.category?.map(
                                  (category1, key) => {
                                    const handleDelete = () => {
                                      const confirmDelete = window.confirm(
                                        "Are you sure you want to delete this Product Category?"
                                      );

                                      if (confirmDelete) {
                                        // Dispatch the deleteProductService action with the product/service ID
                                        dispatch(
                                          deleteProductCategory(
                                            category1?._id
                                          )
                                        );
                                        toast.success("Delete Successfully");
                                      } else {
                                        toast.success("Delete Canceled");
                                        console.log("Delete canceled");
                                      }
                                    };
                                    return (
                                      <tr>
                                        <td className="list-check">
                                          {key + 1}
                                        </td>
                                        <td>
                                          {
                                            category1?.category_name
                                          }
                                        </td>

                                        <td>
                                          <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="btn btn-danger btn-xs"
                                          >
                                            <i className="fa fa-trash" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              editstatus(category1._id)
                                            }
                                            className="btn btn-info btn-xs"
                                          >
                                            <i
                                              className="fa fa-pencil-square-o"
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
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
        </section>
      </div>
    </div>
  );
}
export default ProductCategory;
