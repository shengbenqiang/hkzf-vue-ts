<template>
  <div class="rent common-container">
    <div class="rent-view-nav">
      <CommonNavHeader title="房源列表" />
    </div>
    <div class="rent-view-house-room">
      <div class="rent-view-house-empty" v-if="release.length === 0">
        <Empty
          empty-word="您还没有发布过房源"
          link-word="快去发布房源~"
          link-path="/releaseHouse"
        />
      </div>
      <div v-if="release.length > 0" class="rent-show-house">
        <House
          v-for="itemHouse in release"
          :key="itemHouse.houseCode"
          :house-info="itemHouse"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/Rent.css";
import api from "@/api";
import Empty from "@/components/Empty/Empty.vue";
import House from "@/components/House/House.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";
import { RoomType } from "@/untils/HomeType";
import { Toast } from "vant";

export default defineComponent({
  name: "RentView",
  components: {
    Empty,
    House,
    CommonNavHeader,
  },
  setup() {
    const release = ref<RoomType[]>([]);

    async function getReleaseRent() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      await api.UserApi.getReleaseRent().then((res) => {
        if (res.status === 200) {
          Toast.clear();
          release.value = res.body;
        }
      });
    }

    getReleaseRent();
    return {
      release,
    };
  },
});
</script>
