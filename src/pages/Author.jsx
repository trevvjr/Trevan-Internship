import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { id } = useParams();
  const [authorProfile, setAuthorProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) {
      setAuthorProfile(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const fetchAuthor = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers", { signal: controller.signal });
        const data = await response.json();
        const seller = Array.isArray(data)
          ? data.find((entry) => String(entry.authorId ?? entry.creatorId ?? entry.ownerId ?? entry.id) === String(id))
          : null;

        setAuthorProfile(
          seller
            ? {
                id,
                name: seller.authorName || seller.author || seller.name || "Unknown Author",
                username: `@${id}`,
                wallet: seller.wallet || seller.address || "No wallet linked",
                followers: seller.followers ? `${seller.followers} followers` : `${seller.price ?? 0} ETH volume`,
              }
            : {
                id,
                name: "Unknown Author",
                username: `@${id}`,
                wallet: "No wallet linked",
                followers: "0 followers",
              }
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          setAuthorProfile(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAuthor();

    return () => controller.abort();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? "Loading author..." : authorProfile?.name || "Unknown Author"}
                          <span className="profile_username">{authorProfile?.username || "@unknown"}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorProfile?.wallet || "No wallet linked"}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{authorProfile?.followers || "0 followers"}</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
