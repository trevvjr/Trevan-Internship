const normalizeValue = (value) => String(value ?? "").trim();

const AUTHOR_DIRECTORY = {
	"83937449": "Monica Lucas",
	"73855012": "Lori Hart",
	"49986179": "Gayle Hicks",
	"90432259": "Stacy Long",
	"40460691": "Mamie Barnett",
	"87818782": "Jimmy Wright",
	"52045866": "Claude Banks",
	"39623982": "Ida Chapman",
	"18556210": "Fred Ryan",
	"55757699": "Nicholas Daniels",
	"31906377": "Karla Sharp",
	"72378156": "Franklin Greer",
};

export const getAuthorDisplayName = (item = {}) => {
	const authorId = normalizeValue(item.authorId ?? item.creatorId ?? item.ownerId);
	const name =
		AUTHOR_DIRECTORY[authorId] ||
		item.author ||
		item.creator ||
		item.owner ||
		item.authorName ||
		item.creatorName ||
		item.ownerName;
	return normalizeValue(name) || "Unknown Author";
};

export const buildAuthorProfile = (authorId = "", item = {}) => {
	const normalizedAuthorId = normalizeValue(authorId);
	const name = item.authorName || item.name || item.author || item.creator || item.owner || AUTHOR_DIRECTORY[normalizedAuthorId] || "Unknown Author";

	return {
		id: normalizedAuthorId,
		name,
		username: normalizedAuthorId ? `@${normalizedAuthorId}` : "@unknown",
		wallet: item.wallet || item.address || "No wallet linked",
		followers: item.followers ? `${item.followers} followers` : `${item.likes ?? 0} followers`,
	};
};
