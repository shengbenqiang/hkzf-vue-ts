<template>
  <div class="house-list common-container">
    <HouseListNavHeader />
    <van-sticky>
      <Filter @provideFilters="provideFilters" />
    </van-sticky>
    <div class="house-list-room">
      <van-list @load="getSearchList" v-model:loading="loading">
        <House
          v-for="itemHouse in searchValue"
          :key="itemHouse.houseCode"
          :house-info="itemHouse"
        />
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import "@/assets/css/HomeListView.css";
import { RoomType } from "@/untils/HomeType";
import Filter from "@/components/SelfSelect/Filter/Filter.vue";
import House from "@/components/House/House.vue";
import HouseListNavHeader from "@/components/HouseListNavHeader/HouseListNavHeader.vue";
import { Toast } from "vant";
import api from "@/api/index";
import { SelectPicker, FilterStr } from "@/untils/ListType";

export default defineComponent({
  name: "HouseList",
  components: {
    House,
    Filter,
    HouseListNavHeader,
  },
  setup() {
    const loading = ref<boolean>(false);
    const finished = ref<boolean>(false);
    const pageInfo = reactive({
      page: 1,
      end: 20,
    });
    const searchValue = ref<RoomType[]>([]);
    const filters = reactive<FilterStr>({
      more: "",
      rentType: "",
      price: "",
      area: "",
    });

    async function getSearchList(filterParams: FilterStr) {
      loading.value = true;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const data = { ...pageInfo };
      pageInfo.page = data.end + 1;
      pageInfo.end = data.end + 20;
      const cityId = JSON.parse(localStorage.getItem("hkzf_city") as string);
      await api.HouseApi.getHouseList(
        cityId.value,
        filterParams,
        pageInfo.page,
        pageInfo.end
      ).then((res) => {
        Toast.clear();
        if (res.status === 200) {
          searchValue.value = searchValue.value.concat(res.body.list);
          loading.value = false;
        }
      });
    }

    function provideFilters(filter: SelectPicker) {
      if (filter.area.toString() === "area,null") {
        filters.area = "null";
      } else {
        filters.area = filter.area.toString();
      }
      filters.more = filter.more.toString();
      filters.rentType = filter.rentType.toString();
      filters.price = filter.price.toString();
      pageInfo.page = 1;
      pageInfo.end = 20;
      getSearchList(filters);
    }

    getSearchList(filters);
    return {
      loading,
      finished,
      searchValue,
      getSearchList,
      provideFilters,
    };
  },
});
</script>
