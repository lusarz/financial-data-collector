import axios from 'axios';
import * as UrlUtils from './url-utils';

export async function get(url: string, params: Record<string, string> = {}) {
  const finalUrl = UrlUtils.buildUrl(url, params);
  const response = await axios.get(finalUrl);
  return response.data;
}
