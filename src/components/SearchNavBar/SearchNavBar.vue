<template>
  <div class="search-nav-bar">
    <van-nav-bar
      right-text="取消"
      @click-right="handleRightClick"
      class="search-nav"
    >
      <template #left>
        <van-field
          v-model="areaLocate"
          class="search-nav-input"
          placeholder="请输入小区名或地址"
          left-icon="search"
          @update:model-value="handleInputChange"
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import "./SearchNavBar.css";
import { SearchProvide } from "@/untils/SearchView";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SearchNavBar",
  setup() {
    const router = useRouter();
    const areaLocate = ref<string>("");
    const SearchView: SearchProvide = inject("SearchBar", {} as SearchProvide);

    function handleRightClick() {
      router.go(-1);
    }

    function handleInputChange(areaName: string) {
      SearchView.getAreaName(areaName);
    }

    return {
      areaLocate,
      handleRightClick,
      handleInputChange,
    };
  },
});
</script>
