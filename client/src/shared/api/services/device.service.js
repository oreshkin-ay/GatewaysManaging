import http from "../http";

class DeviceService {
  getList(search = "") {
    return http.get(`/device${search.length ? "?name=" + search : ""}`);
  }

  get(id) {
    return http.get(`/device/${id}`);
  }

  create({ id, ...data }) {
    return http.post(`/device/${id}`, data);
  }

  update(id, data) {
    return http.put(`/device/${id}`, data);
  }

  delete(id) {
    return http.delete(`/device/${id}`);
  }

  deleteAll() {
    return http.delete(`/device`);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new DeviceService();
