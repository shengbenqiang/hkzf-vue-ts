import service from "@/api/service";
import { StrObj } from "@/untils/BaseType";

export default {
  getNeighbourhood(id: string) {
    return service
      .get("/houses", {
        params: {
          cityId: id,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getHouseList(cityId: string, filters: StrObj, start: number, end: number) {
    return service
      .get("/houses", {
        params: {
          cityId,
          ...filters,
          start,
          end,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
  getCondition(id: string) {
    return service
      .get("/houses/condition", {
        params: {
          id,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
};
