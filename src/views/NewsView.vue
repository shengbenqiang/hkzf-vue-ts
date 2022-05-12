<template>
  <div class="newView common-container">
    <New v-for="itemNew in newsData" :key="itemNew.id" :new-info="itemNew" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/NewsView.css";
import { getCurrentCity } from "@/untils/solve";
import api from "@/api";
import { NewType } from "@/untils/HomeType";
import New from "@/components/New/New.vue";

export default defineComponent({
  name: "NewsView",
  components: {
    New,
  },
  setup() {
    const newsData = ref<NewType[]>([]);

    function getNews() {
      getCurrentCity().then(async (res) => {
        await api.HomeApi.getNews(res.value).then((res) => {
          if (res.status === 200) {
            newsData.value = res.body;
          }
        });
      });
    }

    getNews();
    return {
      newsData,
    };
  },
});
</script>
