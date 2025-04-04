import TodoModel from "@/models/frontend/todo";
import HttpService from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";

export const TodoService = {
  listFromJson(data: any) {
    const list: TodoModel[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      list.push({
        id: element._id,
        title: element.title,
        description: element.description,
      });
    }
    return list;
  },
  async getAll(data: any) {
    const res = await HttpService.doGetRequest(`/todo`, data);
    return parseCommonHttpResult(res);
  },
  async addItem(data: any) {
    const res = await HttpService.doPostRequest(
      `/todo/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async deleteItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/todo/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async editItem(data: any) {
    const response = await HttpService.doPatchRequest(
      `/todo/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(response);
  },
};
