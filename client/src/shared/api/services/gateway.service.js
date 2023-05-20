import http from "../http";

class GatewayService {
  getList(search = "") {
    return http.get(`/gateway${search.length ? "?name=" + search : ""}`);
  }

  get(id) {
    return http.get(`/gateway/${id}`);
  }

  create(data) {
    return http.post("/gateway", data);
  }

  update(id, data) {
    return http.put(`/gateway/${id}`, data);
  }

  delete(id) {
    return http.delete(`/gateway/${id}`);
  }

  deleteAll() {
    return http.delete(`/gateway`);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new GatewayService();
