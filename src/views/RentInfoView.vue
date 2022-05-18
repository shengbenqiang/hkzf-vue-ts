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
    <HousePackageLocate :title="'房屋配套'" :border="true">
      <HousePackage :default-package="houseInfo.supporting" />
    </HousePackageLocate>
    <div class="house-info-split-room"></div>
    <HousePackageLocate :title="'房源概况'" :border="true">
      <div class="rent-info-house-owner">
        <div class="rent-info-house-owner-info">
          <div class="rent-info-house-owner-left">
            <img
              alt="房主头像"
              src="http://localhost:8080/img/avatar.png"
              class="header-detail-origin-own-avatar"
            />
            <div class="rent-info-house-owner-auth-info">
              <div>王女士</div>
              <div class="rent-info-house-owner-auth">
                <SIcon icon="icon-auth" />
                已认证房主
              </div>
            </div>
          </div>
          <div class="rent-info-house-owner-right">
            <van-button size="small" plain type="success">发 消 息</van-button>
          </div>
        </div>
        <div class="rent-info-house-desc-room">
          {{ houseInfo.description || "暂无描述" }}
        </div>
      </div>
    </HousePackageLocate>
    <div class="rent-info-operate-room">
      <div @click="handleCollect">
        <img
          class="house-info-item-collect-star"
          alt="收藏"
          :src="`http://localhost:8080/${
            favorites ? 'img/star.png' : 'img/unstar.png'
          }`"
        />
        {{ favorites ? "已收藏" : "收藏" }}
      </div>
      <div>在线咨询</div>
      <div>电话预约</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import "@/assets/css/RentInfoView.css";
import { useRouter } from "vue-router";
import { isAuth } from "@/untils/solve";
import { visitHouse } from "@/store";
import { HouseDetail, Locate } from "@/untils/HouseInfo";
import api from "@/api";
import SIcon from "@/components/SIcon/SIcon.vue";
import HousePackage from "@/components/HousePackage/HousePackage.vue";
import HouseDetailNav from "@/components/HouseDetailNav/HouseDetailNav.vue";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent.vue";
import HousePackageLocate from "@/components/HousePackgeLocate/HousePackageLocate.vue";
import HouseInfoCommonContainer from "@/components/HouseInfoCommonContainer/HouseInfoCommonContainer.vue";
import { Dialog, Notify } from "vant";

export default defineComponent({
  name: "RentInfoView",
  components: {
    SIcon,
    HousePackage,
    HouseDetailNav,
    SwiperComponent,
    HousePackageLocate,
    HouseInfoCommonContainer,
  },
  setup() {
    const router = useRouter();
    const houseCollect = visitHouse();
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
    const favorites = ref<boolean>(false);

    async function getHouseInfo() {
      await api.HouseApi.getHouseInfo(houseCollect.houseCode).then((res) => {
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
      });
    }

    function createHouseMap(locate: Locate, community: string) {
      // eslint-disable-next-line
      const map = new BMapGL.Map("houseInfoMap");
      // eslint-disable-next-line
      const point = new BMapGL.Point(
        Number(locate.longitude),
        Number(locate.latitude)
      );
      map.centerAndZoom(point, 17);
      // eslint-disable-next-line
      const label = new BMapGL.Label(
        `
                <span>${community}</span>
                <div class="house-map-arrow"></div>
            `,
        {
          position: point,
          // eslint-disable-next-line
          offset: new BMapGL.Size(0, -36),
        }
      );
      label.setStyle({
        position: "absolute",
        zIndex: -7982820,
        backgroundColor: "rgb(238, 93, 91)",
        color: "rgb(255, 255, 255)",
        height: 25,
        padding: "5px 10px",
        lineHeight: "14px",
        borderRadius: 3,
        boxShadow: "rgb(204, 204, 204) 2px 2px 2px",
        whiteSpace: "nowrap",
        fontSize: 12,
        userSelect: "none",
      });
      map.addOverlay(label);
    }

    async function checkFavorites() {
      const isLogin = isAuth();
      if (isLogin) {
        await api.UserApi.getFavoritesInfo(houseCollect.houseCode).then(
          (res) => {
            if (res.status === 200) {
              favorites.value = res.body.isFavorite;
            }
          }
        );
      }
    }

    async function handleCollect() {
      const isLogin = isAuth();
      if (!isLogin) {
        Dialog.confirm({
          title: "是否登录？",
          message: "登录后才能收藏房源，是否去登录？",
        }).then(() => {
          router.push("/login");
        });
        return;
      }
      if (favorites.value) {
        await api.UserApi.cancelFavorites(houseCollect.houseCode).then(
          (res) => {
            if (res.status === 200) {
              favorites.value = false;
              Notify({ type: "success", message: "已取消收藏" });
            } else {
              favorites.value = false;
              Notify({ type: "danger", message: "登录超时，请重新登录" });
            }
          }
        );
      } else {
        await api.UserApi.addFavorites(houseCollect.houseCode).then((res) => {
          if (res.status === 200) {
            favorites.value = true;
            Notify({ type: "success", message: "收藏成功" });
          } else {
            favorites.value = false;
            Notify({ type: "danger", message: "登录超时，请重新登录" });
          }
        });
      }
    }

    getHouseInfo();
    checkFavorites();
    return {
      favorites,
      houseInfo,
      handleCollect,
    };
  },
});
</script>
