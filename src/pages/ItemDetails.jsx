import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";
import { getAuthorDisplayName } from "../utils/authorProfiles";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const minSkeletonMs = 700;
    let timeoutId;

    if (location.state?.item) {
      setItem(location.state.item);
      setError(null);
      const start = Date.now();
      timeoutId = setTimeout(() => setLoading(false), minSkeletonMs);
      return () => clearTimeout(timeoutId);
    }

    if (!id) return;

    setItem(null);
    setLoading(true);
    setError(null);

    const start = Date.now();
    Promise.all([
      fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"),
      fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
    ])
      .then(async ([hotRes, newRes]) => {
        if (!hotRes.ok || !newRes.ok) {
          throw new Error("One or more item endpoints failed to load");
        }

        const [hotData, newData] = await Promise.all([hotRes.json(), newRes.json()]);
        const combined = [...(Array.isArray(hotData) ? hotData : []), ...(Array.isArray(newData) ? newData : [])];
        const found = combined.find(
          (entry) =>
            String(entry.id) === String(id) ||
            String(entry.nftId) === String(id)
        );

        if (found) {
          setItem(found);
        } else {
          throw new Error("Item not found");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        const elapsed = Date.now() - start;
        const remaining = minSkeletonMs - elapsed;
        if (remaining > 0) {
          timeoutId = setTimeout(() => setLoading(false), remaining);
        } else {
          setLoading(false);
        }
      });

    return () => clearTimeout(timeoutId);
  }, [id, location.state?.item]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="360px" borderRadius="18px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="70%" height="32px" borderRadius="10px" />
                    <div className="item_id mb-2" style={{ marginTop: "16px" }}>
                      <Skeleton width="40%" height="20px" borderRadius="10px" />
                    </div>
                    <div className="item_info_counts d-flex gap-3" style={{ marginBottom: "20px" }}>
                      <Skeleton width="25%" height="24px" borderRadius="10px" />
                      <Skeleton width="25%" height="24px" borderRadius="10px" />
                    </div>
                    <Skeleton width="100%" height="100px" borderRadius="12px" />
                    <div className="d-flex flex-row" style={{ gap: "24px", marginTop: "20px" }}>
                      <div style={{ flex: 1 }}>
                        <Skeleton width="60%" height="20px" borderRadius="10px" />
                        <div className="item_author" style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                          <Skeleton width="60px" height="60px" borderRadius="50%" />
                          <Skeleton width="40%" height="18px" borderRadius="10px" />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Skeleton width="60%" height="20px" borderRadius="10px" />
                        <div className="item_author" style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                          <Skeleton width="60px" height="60px" borderRadius="50%" />
                          <Skeleton width="40%" height="18px" borderRadius="10px" />
                        </div>
                        <div className="nft-item-price" style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <Skeleton width="32px" height="32px" borderRadius="12px" />
                          <Skeleton width="40%" height="24px" borderRadius="12px" />
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

  if (error || !item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container text-center">
              <p>Error loading item details: {error || "Item not found."}</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const displayId = item.nftId || item.id;
  const authorRouteId = item.authorId || item.creatorId || item.ownerId;
  const ownerName = getAuthorDisplayName(item) || "Unknown Owner";
  const creatorName = item.creator || item.author || item.owner || ownerName || "Unknown Creator";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title || "NFT"}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title || "NFT Item"}</h2>
                  <div className="item_id mb-2">NFT ID: {displayId}</div>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views || 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 74}
                    </div>
                  </div>
                  <p>{item.description || "This item is loaded dynamically from the selected card."}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${authorRouteId}`}>
                            <img className="lazy" src={item.authorImage || AuthorImage} alt={item.title || "Author"} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${authorRouteId}`}>{ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${authorRouteId}`}>
                            <img className="lazy" src={item.authorImage || AuthorImage} alt={item.title || "Creator"} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${authorRouteId}`}>{creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price || 1.85}</span>
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
};

export default ItemDetails;
