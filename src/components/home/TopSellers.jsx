import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { getAuthorProfile } from "../../utils/authorProfiles";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => setSellers(data));
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => {
                const authorProfile = getAuthorProfile(seller);
                const authorName = authorProfile?.name || seller.authorName || seller.name || "Unknown Seller";
                const authorRouteId = seller.authorId || seller.id || index + 1;

                return (
                <li key={seller.id || seller.authorId || index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${authorRouteId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage || AuthorImage}
                        alt={authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${authorRouteId}`}>{authorName}</Link>
                    <span>{seller.price ? `${seller.price} ETH` : "N/A"}</span>
                  </div>
                </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
