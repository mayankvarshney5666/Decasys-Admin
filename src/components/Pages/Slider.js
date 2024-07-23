import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlider,
  getAllSlider,
  deleteSlider,
  UpdateProductService,
} from "../../features/sliderSlice";
// import getAllProductService from "../../features/product_serviceSlice"
import { toast } from "react-toastify";

function Slider() {
  const imgurl = process.env.REACT_APP_IMAGE_URL;

  const { Slider } = useSelector((state) => state.Slider);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSlider());
  }, []);


  const [data, setData] = useState({ slider_name: '', image: null });
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    const file = e.target.files[0];
    setFile(selectedFile);
    // setData({ ...data, image: file });
  };

  const handleChange = (e) => {
    setData({ ...data, slider_name: e.target.value }); // Update 'data' state for other form inputs
  };

  const handleChange1 = (e) => {
    setData({ ...data, imagefor: e.target.value }); // Update 'data' state for other form inputs
  };
  const productsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('slider_name', data?.slider_name);
    formData.append('imagefor', data?.imagefor);
    formData.append('image', file);
    ;
    const aaaa = dispatch(addSlider(formData));
    if (aaaa?.payload?.success === true) {
      toast.success(aaaa.payload.message);
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    } else {
      toast.warn(aaaa?.payload?.message);
    }

  };

  const editstatus = async (_id) => {
    const selectedData = Slider?.slider.find(
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
                      <div className="btn-group lead_information">
                        <h5>Manage & Add Slider</h5>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body" id="add-new-service">
                    <div className="col-sm-12 col-md-12 col-xs-12">
                      <div>
                        <form onSubmit={productsubmit} encType="multipart/form-data">
                          <div className="cardses">
                            <div className="row">
                              <div className="col-md-6">
                                <lable>Slider Title</lable>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="slider_name"
                                    value={data?.slider_name}
                                    required
                                    onChange={handleChange}
                                    placeholder="Enter Slider Title"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <lable>Slider For (Mobile Or Desktop)</lable>
                                <div className="form-group">
                                  <select onChange={handleChange1} className="form-control" name="imagefor" required>
                                    <option value="">Select One</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Desktop">Desktop</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <lable> Slider Image</lable>
                                <div className="form-group">
                                  <input
                                    name="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                    placeholder="Slider Image"
                                    defaultValue=""
                                    required
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
                              <table className="table table-bordered table-hover" id="example">
                                <thead className="heading_table">
                                  <tr>
                                    <th className="list-check">S.No.</th>
                                    <th>Slider Name</th>
                                    <th>Slider For</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody className="datas_table">
                                  {Slider?.slider?.map(
                                    (slider1, key) => {
                                      const handleDelete = () => {
                                        const confirmDelete = window.confirm(
                                          "Are you sure you want to delete this Slider?"
                                        );

                                        if (confirmDelete) {
                                          dispatch(
                                            deleteSlider(
                                              slider1?._id
                                            )
                                          );
                                          toast.success("Delete Successfully");
                                          setTimeout(() => {
                                            window.location.reload(false);
                                          }, 500);
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
                                              slider1?.slider_name
                                            }
                                          </td>
                                          <td>
                                            {
                                              slider1?.imagefor
                                            }
                                          </td>
                                          <td>
                                            <img src={`${imgurl}/${slider1?.image_name}`}
                                              style={{ width: '50px', height: '50px' }} />
                                          </td>
                                          <td>
                                            <button
                                              type="button"
                                              onClick={handleDelete}
                                              className="btn btn-danger btn-xs"
                                            >
                                              <i className="fa fa-trash" />
                                            </button>
                                            {/* <button
                                            type="button"
                                            onClick={(e) =>
                                              editstatus(slider1._id)
                                            }
                                            className="btn btn-info btn-xs"
                                          >
                                            <i
                                              className="fa fa-pencil-square-o"
                                              aria-hidden="true"
                                            ></i>
                                          </button> */}
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
          </div>
        </section>
      </div>
    </div>
  );
}
export default Slider;
