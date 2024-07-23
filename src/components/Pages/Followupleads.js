import React from "react";
import { Link } from "react-router-dom";
import AllFollowupstable from "./AllFollowupstable";
function Followupleads() {
  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container">
            <div className="pt-3">
              <div className="row export-data">
                <div className="col-md-5 col-xs-12 ">
                  <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-6">
                      <div className="btn-group">
                        <Link className="btn btnes exports" to="/Addlead">
                           <i className="fa fa-plus" />
                          &nbsp; Add Lead
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 mobil-nns col-xs-4"></div>
                    <div className="col-md-4 col-sm-4 col-xs-6"></div>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <div className="container pl-0">
                  <AllFollowupstable />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Followupleads;
