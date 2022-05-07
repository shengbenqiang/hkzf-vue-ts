<template>
  <div class="home-rent-group-com">
    <div class="home-rent-group-title">
      <span>租房小组</span>
      <span>更多</span>
    </div>
    <div class="home-rent-group-room">
      <van-grid :column-num="2" gutter="10">
        <van-grid-item
          v-for="itemGroup in groupValue"
          :key="itemGroup.id"
          class="home-item-rent-group"
        >
          <div class="home-item-rent-group-left">
            <span>{{ itemGroup.title }}</span>
            <span>{{ itemGroup.desc }}</span>
          </div>
          <div class="home-item-rent-group-right">
            <img
              :alt="itemGroup.desc"
              :src="`http://localhost:8080${itemGroup.imgSrc}`"
            />
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "./HomeRentGroup.css";
import api from "@/api";
import { GroupType } from "@/untils/HomeType";

export default defineComponent({
  name: "HomeRentGroup",
  setup() {
    const groupValue = ref<GroupType[]>([]);

    async function groupsData() {
      await api.HomeApi.getGroups().then((res) => {
        if (res.status === 200) {
          groupValue.value = res.body;
        }
      });
    }

    onMounted(() => {
      groupsData();
    });

    return {
      groupValue,
    };
  },
});
</script>
