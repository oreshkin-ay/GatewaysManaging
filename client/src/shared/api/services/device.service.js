import http from "../http";

class DeviceService {
  get(id) {
    return http.get(`/device/${id}`);
  }

  create({ id, ...data }) {
    return http.post(`/device/${id}`, data);
  }

  delete(id) {
    return http.delete(`/device/${id}`);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new DeviceService();
