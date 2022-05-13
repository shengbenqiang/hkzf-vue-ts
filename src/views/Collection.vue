<template>
  <div class="collection common-container">
    <div class="collect-nav-header">
      <CommonNavHeader title="收藏列表" />
    </div>
    <div class="collect-house-room">
      <House
        v-for="itemCollect in collectList"
        :key="itemCollect.houseCode"
        :house-info="itemCollect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/Collection.css";
import api from "@/api";
import House from "@/components/House/House.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";
import { RoomType } from "@/untils/HomeType";

export default defineComponent({
  name: "CollectionView",
  components: {
    House,
    CommonNavHeader,
  },
  setup() {
    const collectList = ref<RoomType[]>([]);

    async function getCollect() {
      await api.UserApi.getFavoritesList().then((res) => {
        if (res.status === 200) {
          collectList.value = res.body;
        }
      });
    }

    getCollect();
    return {
      collectList,
    };
  },
});
</script>
