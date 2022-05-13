<template>
  <div class="rent common-container">
    <div class="rent-view-nav">
      <CommonNavHeader title="房源列表" />
    </div>
    <div class="rent-view-house-room">
      <div class="rent-view-house-empty" v-if="release.length === 0">
        <Empty />
      </div>
      <div v-if="release.length > 0"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/Rent.css";
import api from "@/api";
import Empty from "@/components/Empty/Empty.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";
import { RoomType } from "@/untils/HomeType";

export default defineComponent({
  name: "RentView",
  components: {
    Empty,
    CommonNavHeader,
  },
  setup() {
    const release = ref<RoomType[]>([]);

    async function getReleaseRent() {
      await api.UserApi.getReleaseRent().then((res) => {
        console.log(res);
      });
    }

    getReleaseRent();
    return {
      release,
    };
  },
});
</script>
