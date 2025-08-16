import * as UrlUtils from './url-utils';

describe('UrlUtils.buildUrl', () => {
  it('adds query parameters to a URL with no existing parameters', () => {
    const result = UrlUtils.buildUrl('/products', { color: 'red', size: 'M' });
    expect(result).toBe('/products?color=red&size=M');
  });

  it('overrides existing parameters in the URL', () => {
    const result = UrlUtils.buildUrl('/products?color=blue', { color: 'red', size: 'M' });
    expect(result).toBe('/products?color=red&size=M');
  });

  it('retains existing parameters if not overridden', () => {
    const result = UrlUtils.buildUrl('/products?brand=nike', { color: 'red' });
    expect(result).toBe('/products?brand=nike&color=red');
  });

  it('handles absolute URLs correctly', () => {
    const result = UrlUtils.buildUrl('https://shop.com/products', { sort: 'asc' });
    expect(result).toBe('https://shop.com/products?sort=asc');
  });

  it('returns just pathname if no query parameters are added', () => {
    const result = UrlUtils.buildUrl('/about', {});
    expect(result).toBe('/about');
  });

  it('properly encodes special characters in parameters', () => {
    const result = UrlUtils.buildUrl('/search', { q: 'white shoes & socks' });
    expect(result).toBe('/search?q=white+shoes+%26+socks');
  });

  it('clears duplicate keys by overriding them', () => {
    const result = UrlUtils.buildUrl('/items?item=1&item=2', { item: '3' });
    expect(result).toBe('/items?item=3');
  });

  it('ignores parameters with null values', () => {
    const result = UrlUtils.buildUrl('/products', { color: 'red', size: null });
    expect(result).toBe('/products?color=red');
  });

  it('ignores parameters with empty values', () => {
    const result = UrlUtils.buildUrl('/products', { color: 'red', title: '' });
    expect(result).toBe('/products?color=red');
  });

  it('supports number values as parameters', () => {
    const result = UrlUtils.buildUrl('/products', { page: 2, limit: 50 });
    expect(result).toBe('/products?page=2&limit=50');
  });

  it('handles mixed parameter types correctly', () => {
    const result = UrlUtils.buildUrl('/items', {
      page: 3,
      search: 'hat',
      filter: null,
      sort: undefined,
    });
    expect(result).toBe('/items?page=3&search=hat');
  });

  it('ignores empty arrays', () => {
    const result = UrlUtils.buildUrl('/products', { tags: [] });
    expect(result).toBe('/products');
  });

  it('ignores empty sets', () => {
    const result = UrlUtils.buildUrl('/products', { tags: new Set() });
    expect(result).toBe('/products');
  });

  it('adds comma-separated array values', () => {
    const result = UrlUtils.buildUrl('/products', { tags: ['new', 'sale'] });
    expect(result).toBe('/products?tags=new%2Csale');
  });

  it('adds comma-separated set values', () => {
    const result = UrlUtils.buildUrl('/products', { tags: new Set(['red', 'blue']) });
    expect(result).toBe('/products?tags=red%2Cblue');
  });

  it('adds single-element array correctly', () => {
    const result = UrlUtils.buildUrl('/products', { tags: ['popular'] });
    expect(result).toBe('/products?tags=popular');
  });

  it('adds single-element set correctly', () => {
    const result = UrlUtils.buildUrl('/products', { tags: new Set(['featured']) });
    expect(result).toBe('/products?tags=featured');
  });

  it('handles combination of array, set, string, and number', () => {
    const result = UrlUtils.buildUrl('/products', {
      tags: ['a', 'b'],
      filters: new Set(['x', 'y']),
      category: 'clothing',
      page: 1,
    });
    expect(result).toBe('/products?tags=a%2Cb&filters=x%2Cy&category=clothing&page=1');
  });
});
