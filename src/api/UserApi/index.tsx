import service from "@/api/service";

export default {
  getUser() {
    return service.get("/user").then((res) => {
      return res.data;
    });
  },
};
