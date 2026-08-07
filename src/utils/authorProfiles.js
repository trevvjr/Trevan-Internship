const normalizeText = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

export const getCreatorDisplayName = (item = {}) => {
  return (
    normalizeText(item.creatorName) ||
    normalizeText(item.authorName) ||
    normalizeText(item.author) ||
    normalizeText(item.name) ||
    "Unknown Creator"
  );
};

export const getOwnerDisplayName = (item = {}) => {
  return (
    normalizeText(item.ownerName) ||
    normalizeText(item.owner) ||
    normalizeText(item.authorName) ||
    normalizeText(item.author) ||
    normalizeText(item.name) ||
    "Unknown Owner"
  );
};

export const getCreatorRouteId = (item = {}) => {
  return item.creatorId || item.authorId || item.ownerId || item.id || null;
};

export const getOwnerRouteId = (item = {}) => {
  return item.ownerId || item.creatorId || item.authorId || item.id || null;
};

export const getAuthorDisplayName = (item = {}) => {
  return (
    normalizeText(item.authorName) ||
    normalizeText(item.creatorName) ||
    normalizeText(item.name) ||
    "Unknown Seller"
  );
};
