<template>
  <div class="home common-container">
    <div class="home-swipe-con">
      <CommonHeader />
      <SwiperComponent :get-swiper="swiperImg" />
    </div>
    <div class="home-nav-room">
      <HomeNav />
    </div>
    <div class="home-rent-group">
      <HomeRentGroup />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "@/assets/css/HomeView.css";
import api from "@/api";
import { SwiperItem } from "@/untils/HomeType";
import HomeNav from "@/components/HomeNav/HomeNav.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import HomeRentGroup from "@/components/HomeRentGroup/HomeRentGroup.vue";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HomeNav,
    CommonHeader,
    HomeRentGroup,
    SwiperComponent,
  },
  setup() {
    const swiperImg = ref<SwiperItem[]>([]);

    async function getSwiperData() {
      await api.HomeApi.getSwiper().then((res) => {
        if (res.status === 200) {
          swiperImg.value = res.body;
        }
      });
    }

    onMounted(() => {
      getSwiperData();
    });

    return {
      swiperImg,
    };
  },
});
</script>
