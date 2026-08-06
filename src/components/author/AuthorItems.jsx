import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { getAuthorDisplayName } from "../../utils/authorProfiles";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const [hotRes, newRes] = await Promise.all([
          fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"),
          fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
        ]);

        const [hotData, newData] = await Promise.all([hotRes.json(), newRes.json()]);
        const combined = [...(Array.isArray(hotData) ? hotData : []), ...(Array.isArray(newData) ? newData : [])];
        const filtered = combined.filter((item) => String(item.authorId ?? item.creatorId ?? item.ownerId) === String(authorId));
        setItems(filtered);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      loadItems();
    } else {
      setLoading(false);
    }
  }, [authorId]);

  if (loading) {
    return <div className="text-center py-4">Loading author items...</div>;
  }

  if (!items.length) {
    return <div className="text-center py-4">No NFTs found for this author.</div>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => {
            const itemId = item.nftId || item.id;
            const title = item.title || item.name || "Untitled";
            const price = item.price ?? item.cost ?? "0";
            const likes = item.likes ?? item.like ?? 0;
            const image = item.nftImage || item.image || "";

            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={itemId || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy" src={item.authorImage || AuthorImage} alt={getAuthorDisplayName(item)} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={itemId ? `/item-details/${itemId}` : "/item-details"} state={{ item }}>
                      <img src={image} className="lazy nft__item_preview" alt={title} />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={itemId ? `/item-details/${itemId}` : "/item-details"} state={{ item }}>
                      <h4>{title}</h4>
                    </Link>
                    <div className="nft__item_price">{price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
