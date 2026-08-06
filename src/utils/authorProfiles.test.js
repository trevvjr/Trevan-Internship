import { getAuthorProfile } from './authorProfiles';

describe('getAuthorProfile', () => {
  it('returns a distinct profile for live API author ids', () => {
    expect(getAuthorProfile({ authorId: 83937449 }).name).toBe('Monica Lucas');
    expect(getAuthorProfile({ authorId: 5575769 }).name).toBe('Lori Hart');
  });
});
