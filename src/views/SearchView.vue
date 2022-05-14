<template>
  <div class="search common-container">
    <SearchNavBar />
    <div class="search-area-data-room">
      <div class="search-area-item-room">
        <div
          class="search-area-title"
          v-for="itemArea in areaList"
          :key="itemArea.community"
          @click="handleAreaClick(itemArea)"
        >
          {{ itemArea.communityName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import "@/assets/css/SearchView.css";
import { getCurrentCity } from "@/untils/solve";
import { useRouter } from "vue-router";
import { AreaType } from "@/untils/SearchView";
import api from "@/api";
import SearchNavBar from "@/components/SearchNavBar/SearchNavBar.vue";

export default defineComponent({
  name: "SearchView",
  components: {
    SearchNavBar,
  },
  setup() {
    const router = useRouter();
    const areaList = ref<AreaType[]>([]);

    function getAreaName(areaName: string) {
      getCurrentCity().then(async (res) => {
        await api.AreaApi.getAreaList(areaName, res.value).then((resList) => {
          if (resList.status === 200) {
            areaList.value = resList.body;
          }
        });
      });
    }

    function handleAreaClick(areaInfo: AreaType) {
      console.log(areaInfo);
      router.back();
    }

    provide("SearchBar", {
      getAreaName,
    });

    return {
      areaList,
      handleAreaClick,
    };
  },
});
</script>
