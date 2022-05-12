import service from "@/api/service";

export default {
  getSwiper() {
    return service.get("/home/swiper").then((res) => {
      return res.data;
    });
  },
  getGroups() {
    return service
      .get("/home/groups", {
        params: {
          area: "AREA%7C88cff55c-aaa4-e2e0",
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getNews(area?: string) {
    return service
      .get("/home/news", {
        params: {
          area: area ? area : "AREA%7C88cff55c-aaa4-e2e0",
        },
      })
      .then((res) => {
        return res.data;
      });
  },
};
