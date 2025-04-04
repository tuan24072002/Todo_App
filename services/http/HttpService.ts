import axios from "axios";

class HttpService {
  static instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 180000,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
  });
  static initialize() {
    HttpService.instance.interceptors.request.use((request) => {
      return request;
    });
    HttpService.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }
  static async doPostRequest(url: string, data: any, withAccessToken = true) {
    if (!withAccessToken) {
      delete HttpService.instance.defaults.headers["Authorization"];
      return HttpService.instance.post(url, data);
    } else {
      const params = { ...Object(data) };
      const response = HttpService.instance.post(url, params);
      return response;
    }
  }

  static async doGetRequest(url: string, data: any) {
    const params = { ...Object(data) };
    return HttpService.instance.get(url, { params: params });
  }

  static async doPatchRequest(url: string, data: any) {
    const params = { ...Object(data) };
    return HttpService.instance.patch(`${url}`, params);
  }

  static async doPutRequest(url: string, data: any) {
    const params = { ...Object(data) };
    return HttpService.instance.put(url, params);
  }

  static async doDeleteRequest(url: string, data: any) {
    const params = { ...Object(data) };
    return HttpService.instance.delete(`${url}`, { data: params });
  }
}

export default HttpService;
