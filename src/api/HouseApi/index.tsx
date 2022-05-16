import service from "@/api/service";
import { FilterStr } from "@/untils/ListType";

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
  getHouseList(cityId: string, filters: FilterStr, start: number, end: number) {
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
  uploadImg(formData: FormData) {
    return service
      .post("/houses/image", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  },
};
