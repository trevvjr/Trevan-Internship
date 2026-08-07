import React from "react";
import Skeleton from "./Skeleton";

const RouteSkeleton = () => {
  return (
    <div style={{ padding: "3rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Skeleton width="220px" height="56px" borderRadius="12px" />
      <div style={{ marginTop: "1.5rem" }}>
        <Skeleton width="100%" height="24px" borderRadius="10px" />
        <Skeleton width="90%" height="24px" borderRadius="10px" style={{ marginTop: "0.75rem" }} />
        <Skeleton width="80%" height="24px" borderRadius="10px" style={{ marginTop: "0.75rem" }} />
      </div>
    </div>
  );
};

export default RouteSkeleton;
