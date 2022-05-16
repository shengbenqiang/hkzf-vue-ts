import service from "@/api/service";
import { LoginData } from "@/untils/ProfileType";

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
};
