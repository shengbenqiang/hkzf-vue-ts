<template>
  <div class="swiper-con">
    <van-swipe class="swiper-room" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        class="swiper-item"
        v-for="itemSwipe in getSwiper"
        :key="itemSwipe.id"
      >
        <img
          :src="`http://localhost:8080${itemSwipe.imgSrc}`"
          :alt="itemSwipe.alt"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SwiperItem } from "@/untils/HomeType";
import "./SwiperComponent.css";

export default defineComponent({
  name: "SwiperComponent",
  props: {
    getSwiper: {
      type: Array as PropType<SwiperItem[]>,
      default: () => [],
    },
  },
});
</script>
