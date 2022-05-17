<template>
  <div class="rent-info common-container">
    <div class="rent-info-swiper-room">
      <HouseDetailNav :title="houseInfo.community" />
      <SwiperComponent :get-swiper="houseInfo.houseImg" />
    </div>
    <HouseInfoCommonContainer>
      <div class="house-info-title">{{ houseInfo.title }}</div>
      <div class="house-info-tag-room">
        <span
          v-for="itemTag in houseInfo.tags"
          :key="itemTag"
          class="house-info-tag"
          >{{ itemTag }}</span
        >
      </div>
    </HouseInfoCommonContainer>
    <HouseInfoCommonContainer>
      <div class="house-info-home-common-room">
        <div class="house-info-home-common">
          <div>
            {{ houseInfo.price }}
            <span>/月</span>
          </div>
          <div>租金</div>
        </div>
        <div class="house-info-home-common">
          <div>{{ houseInfo.roomType }}</div>
          <div>房型</div>
        </div>
        <div class="house-info-home-common">
          <div>{{ houseInfo.size }}平米</div>
          <div>面积</div>
        </div>
      </div>
    </HouseInfoCommonContainer>
    <HouseInfoCommonContainer :show-border="false">
      <div class="house-info-other-info">
        <div class="house-info-other-info-item">
          <span>装修:</span>
          <span>精装</span>
        </div>
        <div class="house-info-other-info-item">
          <span>朝向:</span>
          <span>{{ houseInfo.oriented[0] }}</span>
        </div>
        <div class="house-info-other-info-item">
          <span>楼层:</span>
          <span>{{ houseInfo.floor }}</span>
        </div>
        <div class="house-info-other-info-item">
          <span>类型:</span>
          <span>普通住宅</span>
        </div>
      </div>
    </HouseInfoCommonContainer>
    <div class="house-info-split-room"></div>
    <HousePackageLocate :title="houseInfo.community">
      <div class="house-info-map" id="houseInfoMap"></div>
    </HousePackageLocate>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import "@/assets/css/RentInfoView.css";
import { useRoute } from "vue-router";
import api from "@/api";
import { HouseDetail, Locate } from "@/untils/HouseInfo";
import HouseDetailNav from "@/components/HouseDetailNav/HouseDetailNav.vue";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent.vue";
import HousePackageLocate from "@/components/HousePackgeLocate/HousePackageLocate.vue";
import HouseInfoCommonContainer from "@/components/HouseInfoCommonContainer/HouseInfoCommonContainer.vue";

export default defineComponent({
  name: "RentInfoView",
  components: {
    HouseDetailNav,
    SwiperComponent,
    HousePackageLocate,
    HouseInfoCommonContainer,
  },
  setup() {
    const route = useRoute();
    const houseInfo = reactive<HouseDetail>({
      community: "",
      description: "",
      floor: "",
      houseCode: "",
      houseImg: [],
      oriented: [],
      price: 0,
      roomType: "",
      size: 0,
      supporting: [],
      tags: [],
      title: "",
    });

    async function getHouseInfo() {
      const { params } = route;
      await api.HouseApi.getHouseInfo(params.houseCode as string).then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            res.body.houseImg = res.body.houseImg.map(
              (itemImg: string, index: number) => {
                return {
                  id: index,
                  imgSrc: itemImg,
                  alt: "房屋图片",
                };
              }
            );
            Object.assign(houseInfo, res.body);
            createHouseMap(res.body.coord, res.body.community);
          }
        }
      );
    }

    function createHouseMap(locate: Locate, community: string) {
      console.log("执行了");
    }

    getHouseInfo();
    return {
      houseInfo,
    };
  },
});
</script>
