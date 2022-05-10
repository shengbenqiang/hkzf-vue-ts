<template>
  <div class="house-list-nav-header">
    <van-nav-bar left-arrow class="house-list-header-nav-bar">
      <template #title>
        <div class="house-list-common-header-room">
          <CommonHeader />
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./HouseListNavHeader.css";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";

export default defineComponent({
  name: "HouseListNavHeader",
  components: {
    CommonHeader,
  },
});
</script>
