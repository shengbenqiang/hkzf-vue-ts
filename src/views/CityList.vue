<template>
  <div class="city-list common-container">
    <div class="common-nav-header">
      <CommonNavHeader title="城市选择" />
    </div>
    <div class="city-list-room">
      <CityLetter
        v-for="itemIndex in locateIndex"
        :key="itemIndex"
        :index="itemIndex"
        :cities="locates[itemIndex]"
        ref="cityList"
      />
      <CityIndex :index-arr="locateIndex" @setSelectIndex="setSelectIndex" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/CityList.css";
import api from "@/api/index";
import { formatCityData, getCurrentCity } from "@/untils/solve";
import { ListItem, LocateType } from "@/untils/CityType";
import CityIndex from "@/components/CityIndex/CityIndex.vue";
import CityLetter from "@/components/CityLetter/CityLetter.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";

export default defineComponent({
  name: "CityList",
  components: {
    CityIndex,
    CityLetter,
    CommonNavHeader,
  },
  setup() {
    const cityList = ref();
    const locates = ref<ListItem>({});
    const locateIndex = ref<string[]>([]);

    async function getCities() {
      await api.AreaApi.getCityDate(1).then(async (res) => {
        if (res.status === 200) {
          const { cityIndex, cityList } = formatCityData(res.body);
          await api.AreaApi.getHotCity().then((resHot) => {
            if (res.status === 200) {
              cityList["hot"] = resHot.body;
              cityIndex.unshift("hot");
              getCurrentCity().then((resCity) => {
                cityList["#"] = [resCity as LocateType];
                cityIndex.unshift("#");
                locates.value = cityList;
                locateIndex.value = cityIndex;
              });
            }
          });
        }
      });
    }

    function setSelectIndex(index: string) {
      let scrollHeight = 0;
      for (let i = 0; i < locateIndex.value.length; i++) {
        if (locateIndex.value[i] === index) {
          scrollHeight += 3 + locates.value[locateIndex.value[i]].length * 4;
          break;
        }
        scrollHeight += 3 + locates.value[locateIndex.value[i]].length * 4;
      }
      console.log(scrollHeight);
    }

    getCities();

    return {
      locates,
      cityList,
      locateIndex,
      setSelectIndex,
    };
  },
});
</script>
