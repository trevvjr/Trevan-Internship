const AUTHOR_PROFILES = {
  83937449: {
    id: 83937449,
    name: 'Monica Lucas',
    username: '@monicaaaa',
    wallet: 'UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7',
    followers: '573 followers',
  },
  5575769: {
    id: 5575769,
    name: 'Lori Hart',
    username: '@lorihart',
    wallet: '0x8f4c1d2a3b4e5f67890abcdef1234567890',
    followers: '420 followers',
  },
  31906377: {
    id: 31906377,
    name: 'Gayle Hicks',
    username: '@gaylehicks',
    wallet: '0x1a2b3c4d5e6f7890abcdef1234567890',
    followers: '312 followers',
  },
  72378156: {
    id: 72378156,
    name: 'Stacy Long',
    username: '@stacylong',
    wallet: '0x1234abcd5678ef90fedcba0987654321',
    followers: '284 followers',
  },
  18556210: {
    id: 18556210,
    name: 'Mamie Barnett',
    username: '@mamiebarnett',
    wallet: '0x9abcdef0123456789abcdef0123456789',
    followers: '351 followers',
  },
  73855012: {
    id: 73855012,
    name: 'Jesse Watson',
    username: '@jessewatson',
    wallet: '0xabcdeffedcba9876543210fedcba9876543210',
    followers: '256 followers',
  },
};

export const getAuthorProfile = (item = {}) => {
  const authorId = item.authorId ?? item.creatorId ?? item.ownerId ?? item.id;
  return AUTHOR_PROFILES[authorId] || null;
};
