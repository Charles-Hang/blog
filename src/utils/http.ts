import Axios, { CancelTokenStatic, AxiosResponse, AxiosRequestConfig } from 'axios';

export interface HttpProps {
  cancelToken: CancelTokenStatic;
  get<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  put<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse>;
  getErrorCode(err): number;
  getErrorText(err): string;
}

export default class Http implements HttpProps {

  cancelToken = Axios.CancelToken;
  initConfig: AxiosRequestConfig;
  constructor(initConfig?: AxiosRequestConfig) {
    this.initConfig = initConfig || {};
  }

  async get<T>(url, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return Axios.get<T>(url, {
      ...Axios.defaults,
      ...this.initConfig,
      ...options,
    });
  }

  async post<T>(url, data, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return Axios.post<T>(url, data, {
      ...Axios.defaults,
      ...this.initConfig,
      ...options,
    });
  }

  async put<T>(url, data, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return Axios.put<T>(url, data, {
      ...Axios.defaults,
      ...this.initConfig,
      ...options,
    });
  }

  async delete(url, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return Axios.delete(url, {
      ...Axios.defaults,
      ...this.initConfig,
      ...options,
    });
  }

  // 获取错误状态码
  getErrorCode = (err: any): number => {
    if (err.response) {
      return err.response.status;
    }
    return -1;
  }

  // 获取错误文本
  getErrorText = (err: any): string => {
    if (err.response) {
      return err.response.data.err;
    }
    return '';
  }
}
