<template>
  <div class="house-list common-container">
    <HouseListNavHeader />
    <Filter />
    <div class="house-list-room">
      <House
        v-for="itemHouse in searchValue"
        :key="itemHouse.houseCode"
        :house-info="itemHouse"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import "@/assets/css/HomeListView.css";
import { RoomType } from "@/untils/HomeType";
import { StrObj } from "@/untils/BaseType";
import Filter from "@/components/SelfSelect/Filter/Filter.vue";
import House from "@/components/House/House.vue";
import HouseListNavHeader from "@/components/HouseListNavHeader/HouseListNavHeader.vue";
import { Toast } from "vant";
import api from "@/api/index";

export default defineComponent({
  name: "HouseList",
  components: {
    House,
    Filter,
    HouseListNavHeader,
  },
  setup() {
    const searchValue = ref<RoomType[]>([]);
    const filters = reactive<StrObj>({});

    async function getSearchList() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const cityId = JSON.parse(localStorage.getItem("hkzf_city") as string);
      await api.HouseApi.getHouseList(cityId.value, filters, 1, 20).then(
        (res) => {
          Toast.clear();
          if (res.status === 200) {
            searchValue.value = res.body.list;
          }
        }
      );
    }

    getSearchList();
    return {
      searchValue,
    };
  },
});
</script>
