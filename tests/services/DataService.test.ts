import { fetchCardData } from '../../src/services/DataService';

describe('DataService', () => {
  it('should fetch card data', async () => {
    const response = await fetchCardData();
    expect(response.status).toBe(200);
    expect(response.response).toBe('ok');
    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  });

  it('should return a promise', () => {
    const result = fetchCardData();
    expect(result).toBeInstanceOf(Promise);
  });
});
