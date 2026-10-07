import { MockClassDataSource } from '../MockClassDataSource';

describe('MockClassDataSource', () => {
  it('loads classes from mock json', async () => {
    const ds = new MockClassDataSource();
    const data = await ds.load();
    expect(data.clases.length).toBeGreaterThan(0);
    expect(data.socio.id).toBe('S-0001');
  });
});
