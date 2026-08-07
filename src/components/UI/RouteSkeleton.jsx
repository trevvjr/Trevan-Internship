import React from "react";
import Skeleton from "./Skeleton";

const RouteSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row mb-4">
              <div className="col-12">
                <Skeleton width="240px" height="42px" borderRadius="12px" />
              </div>
            </div>
            <div className="row g-3">
              {new Array(8).fill(null).map((_, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="60px" height="60px" borderRadius="50%" />
                    </div>
                    <div className="de_countdown">
                      <Skeleton width="100px" height="20px" borderRadius="10px" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="260px" borderRadius="18px" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width="80%" height="24px" borderRadius="10px" />
                      <div className="nft__item_price mt-2">
                        <Skeleton width="60%" height="20px" borderRadius="10px" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RouteSkeleton;
