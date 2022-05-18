<template>
  <div class="house" @click="handleHouseInfo">
    <div class="house-room">
      <div class="house-room-left">
        <img
          :src="`http://localhost:8080${houseInfo.houseImg}`"
          :alt="houseInfo.desc"
        />
      </div>
      <div class="house-room-right">
        <div class="house-desc">{{ houseInfo.title }}</div>
        <div class="house-info">{{ houseInfo.desc }}</div>
        <div class="house-tag-room">
          <span v-for="itemTag in houseInfo.tags" :key="itemTag">
            {{ itemTag }}
          </span>
        </div>
        <div class="house-price">{{ houseInfo.price }} <span>元/月</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import "./House.css";
import { RoomType } from "@/untils/HomeType";
import { useRouter } from "vue-router";
import { visitHouse } from "@/store";

export default defineComponent({
  name: "HouseCom",
  props: {
    houseInfo: {
      type: Object as PropType<RoomType>,
      require: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const houseCollect = visitHouse();

    function handleHouseInfo() {
      router.push({
        name: "RentInfoView",
        params: {
          houseCode: props.houseInfo?.houseCode,
        },
      });
      houseCollect.$patch({
        houseCode: props.houseInfo?.houseCode,
      });
    }

    return {
      handleHouseInfo,
    };
  },
});
</script>
