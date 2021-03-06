import service from "@/api/service";
import { LoginData } from "@/untils/ProfileType";
import { RentInfo } from "@/untils/RentRelease";

export default {
  getUser() {
    return service.get("/user").then((res) => {
      return res;
    });
  },
  userLogin(user: LoginData) {
    return service
      .post("/user/login", {
        username: user.account,
        password: user.password,
      })
      .then((res) => {
        return res.data;
      });
  },
  userLogout() {
    return service.post("/user/logout").then((res) => {
      return res.data;
    });
  },
  getFavoritesList() {
    return service.get("/user/favorites").then((res) => {
      return res.data;
    });
  },
  getReleaseRent() {
    return service.get("/user/houses").then((res) => {
      return res.data;
    });
  },
  rentAdd(rentInfo: RentInfo) {
    return service.post("/user/houses", rentInfo).then((res) => {
      return res.data;
    });
  },
  getFavoritesInfo(id: string) {
    return service.get(`/user/favorites/${id}`).then((res) => {
      return res.data;
    });
  },
  cancelFavorites(id: string) {
    return service.delete(`/user/favorites/${id}`).then((res) => {
      return res.data;
    });
  },
  addFavorites(id: string) {
    return service.post(`/user/favorites/${id}`).then((res) => {
      return res.data;
    });
  },
};
