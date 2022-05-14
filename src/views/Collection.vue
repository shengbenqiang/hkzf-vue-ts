<template>
  <div class="collection common-container">
    <div class="collect-nav-header">
      <CommonNavHeader title="收藏列表" />
    </div>
    <div class="collect-house-room">
      <div class="collect-empty-room" v-if="collectList.length === 0">
        <Empty
          empty-word="您还没有收藏过房源"
          link-word="快去看看吧~"
          link-path="/houseList"
        />
      </div>
      <div v-if="collectList.length > 0" class="collect-show-house-room">
        <House
          v-for="itemCollect in collectList"
          :key="itemCollect.houseCode"
          :house-info="itemCollect"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/Collection.css";
import api from "@/api";
import House from "@/components/House/House.vue";
import Empty from "@/components/Empty/Empty.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";
import { RoomType } from "@/untils/HomeType";
import { Toast } from "vant";

export default defineComponent({
  name: "CollectionView",
  components: {
    House,
    Empty,
    CommonNavHeader,
  },
  setup() {
    const collectList = ref<RoomType[]>([]);

    async function getCollect() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      await api.UserApi.getFavoritesList().then((res) => {
        Toast.clear();
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
