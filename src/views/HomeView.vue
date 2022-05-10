<template>
  <div class="home common-container">
    <div class="home-swipe-con">
      <CommonHeader absolute />
      <SwiperComponent :get-swiper="swiperImg" />
    </div>
    <div class="home-nav-room">
      <HomeNav />
    </div>
    <div class="home-rent-group">
      <HomeRentGroup />
    </div>
    <div class="home-news-list-room">
      <div class="home-news-title">最新资讯</div>
      <New v-for="itemNew in newsData" :key="itemNew.id" :new-info="itemNew" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "@/assets/css/HomeView.css";
import api from "@/api";
import { SwiperItem, NewType } from "@/untils/HomeType";
import New from "@/components/New/New.vue";
import HomeNav from "@/components/HomeNav/HomeNav.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import HomeRentGroup from "@/components/HomeRentGroup/HomeRentGroup.vue";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    New,
    HomeNav,
    CommonHeader,
    HomeRentGroup,
    SwiperComponent,
  },
  setup() {
    const newsData = ref<NewType[]>([]);
    const swiperImg = ref<SwiperItem[]>([]);

    async function getSwiperData() {
      await api.HomeApi.getSwiper().then((res) => {
        if (res.status === 200) {
          swiperImg.value = res.body;
        }
      });
    }

    async function getNewsData() {
      await api.HomeApi.getNews().then((res) => {
        if (res.status === 200) {
          newsData.value = res.body;
        }
      });
    }

    onMounted(() => {
      getNewsData();
      getSwiperData();
    });

    return {
      newsData,
      swiperImg,
    };
  },
});
</script>
