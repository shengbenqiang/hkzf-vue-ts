import service from "@/api/service";

export default {
  getCityDate(level: number) {
    return service
      .get("/area/city", {
        params: {
          level,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getHotCity() {
    return service.get("/area/hot").then((res) => {
      return res.data;
    });
  },
  getLocateInfo(cityName: string) {
    return service
      .get("/area/info", {
        params: {
          name: cityName,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getAreaList(name: string, id: string) {
    return service
      .get("/area/community", {
        params: {
          id,
          name,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getCityHouse(id: string) {
    return service
      .get("/area/map", {
        params: {
          id,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
};
