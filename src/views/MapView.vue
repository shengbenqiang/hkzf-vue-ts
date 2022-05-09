<template>
  <div class="map common-container">
    <div class="map-nav-header">
      <van-nav-bar
        class="map-nav"
        title="地图找房"
        left-arrow
        @click-left="handleNavLeftClick"
      />
    </div>
    <div class="map-room" id="mapContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import "@/assets/css/MapView.css";
import { useRouter } from "vue-router";
import { CityInfo } from "@/untils/CityType";
import { Toast } from "vant";
import api from "@/api/index";
import { LabelType } from "@/untils/MapType";

export default defineComponent({
  name: "MapView",
  setup() {
    const labelStyle = {
      cursor: "pointer",
      border: "2px solid rgb(255, 0, 0)",
      padding: "0",
      whiteSpace: "nowrap",
      fontSize: "1.2rem",
      color: "rgb(255, 255, 255)",
      textAlign: "center",
    };

    const router = useRouter();

    function handleNavLeftClick() {
      router.go(-1);
    }

    function initMap() {
      const locate: CityInfo = JSON.parse(
        localStorage.getItem("hkzf_city") as string
      );
      // eslint-disable-next-line
      const map = new BMapGL.Map("mapContainer");
      // eslint-disable-next-line
      const myGeo = new BMapGL.Geocoder();
      myGeo.getPoint(
        locate.label,
        (point) => {
          if (point) {
            map.centerAndZoom(point, 11);
            // 开启鼠标滚动地图缩放
            map.enableScrollWheelZoom();
            renderOverlays(locate.value, map);
          }
        },
        locate.label
      );
    }

    // eslint-disable-next-line
    function renderOverlays(cityValue: string, map: BMapGL.Map) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const { nextZoom, type } = getTypeAndZoom(map);
      api.AreaApi.getCityHouse(cityValue).then((res) => {
        if (res.status === 200) {
          Toast.clear();
          res.body.forEach((itemLocate: LabelType) => {
            createOverlays(itemLocate, map, type, nextZoom);
          });
        }
      });
    }

    // eslint-disable-next-line
    function createOverlays(itemLocate: LabelType, map: BMapGL.Map, type: string, nextZoom: number) {
      // eslint-disable-next-line
      const areaPoint: BMapGL.Point = new BMapGL.Point(itemLocate.coord.longitude, itemLocate.coord.latitude)
      if (type === "circle") {
        createCircle(
          areaPoint,
          itemLocate.label,
          itemLocate.count,
          itemLocate.value,
          nextZoom,
          map
        );
      } else {
        createRect(
          areaPoint,
          itemLocate.label,
          itemLocate.count,
          itemLocate.value,
          map
        );
      }
    }

    // eslint-disable-next-line
    function createCircle(point: BMapGL.Point, areaName: string, count: number, key: string, zoom: number, map: BMapGL.Map) {
      // eslint-disable-next-line
      const label = new BMapGL.Label('', {
        position: point,
        // eslint-disable-next-line
        offset: new BMapGL.Size(-35, -35)
      });
      label.setContent(`
            <div class="map-label-con">
                <p class="map-label-name">${areaName}</p>
                <p>${count} 套</p>
            </div>
        `);
      label.id = key;
      label.setStyle(labelStyle);
      label.addEventListener("click", () => {
        renderOverlays(label.id, map);
        map.centerAndZoom(point, zoom);
        map.clearOverlays();
      });
      map.addOverlay(label);
    }

    // eslint-disable-next-line
    function createRect(point: BMapGL.Point, areaName: string, count: number, key: string, map: BMapGL.Map) {
      // eslint-disable-next-line
      const label = new BMapGL.Label('', {
        position: point,
        // eslint-disable-next-line
        offset: new BMapGL.Size(-50, -28)
      });
      label.setContent(`
            <div class="map-label-rect-con">
                <span class="map-label-rect-name">${areaName}</span>
                <span class="map-label-rect-number">${count} 套</span>
                <i class="map-label-rect-arrow"></i>
            </div>
        `);
      label.id = key;
      label.setStyle(labelStyle);
      label.addEventListener("click", (e) => {
        const target = e.domEvent.changedTouches[0];
        map.panBy(
          window.innerWidth / 2 - target.clientX,
          (window.innerHeight - 400) / 2 - target.clientY
        );
        getHouseList(label.id);
      });
      map.addOverlay(label);
    }

    // eslint-disable-next-line
    function getTypeAndZoom(map: BMapGL.Map): { nextZoom: number, type: string }{
      const zoom = map.getZoom();
      let nextZoom = 0;
      let type = "";
      if (zoom >= 10 && zoom < 12) {
        nextZoom = 13;
        type = "circle";
      } else if (zoom >= 12 && zoom < 13) {
        nextZoom = 15;
        type = "circle";
      } else if (zoom >= 13 && zoom < 16) {
        type = "rect";
      }

      return {
        nextZoom,
        type,
      };
    }

    function getHouseList(id: string) {
      console.log(id);
    }

    onMounted(() => {
      initMap();
    });
    return {
      handleNavLeftClick,
    };
  },
});
</script>
