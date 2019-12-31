import axios from 'axios';
import CookieService from './cookie.service';
import { BASE } from '../config/routes';

class APIService {
  /**
   * @param {string} method - 'get', 'post', 'put' or 'delete'
   * @param {string} url - original url without specific parameter
   * @param {object} params - an object contains all url parameter, object key must be the same as parameter key
   * @param {object} data - the data which you want to send
   * @param {boolean} auth
   * 
   * @description create an api
   * 
   * @example
   * const request =  new APIService(
   *  'get',
   *  '/problems?pattern=:pattern&tag=:tag',
   *  {
   *    pattern: 'farmer',
   *    tag: 'sorting'
   *  },
   *  undefined,
   *  undefined
   * )
   */
  constructor (method, url = '', params = {}, data = {}, auth, headers = {}) {
    this.url = BASE + url;
    this.params = params;
    this.data = data;
    this.method = method;
    this.headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
    if(auth) {
      this.headers.Authorization = CookieService.getInfo('token');
    }
  }

  createPackage () {
    for(const p in this.params) {
      this.url = this.url.replace(`:${p}`, this.params[p]);
    }
    return ({
      url: this.url,
      method: this.method,
      headers: this.headers,
      data: this.data
    });
  }

  async createRequest () {
    const response = await axios(this.createPackage());
    return response.data;
  }

  /**
   * @description create request to server and get data, need a try-catch wrapped around it
   */
  async request () {
    const data = await this.createRequest();
    return data;
  }

  static handleError (error) {
    if(error.response) {
      error = error.response;
    }
    if(error.status === 409) {
      return 'Conflict!';
    }
    try {
      return error.data.message;
    }
    catch (e) {
      return error.message;
    }
  }
}

export default APIService;