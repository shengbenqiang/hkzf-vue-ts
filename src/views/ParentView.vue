<template>
  <div class="parent">
    <div class="parent-page-room">
      <router-view />
    </div>
    <div class="parent-tab-bar-room">
      <van-tabbar
        v-model="active"
        active-color="#21b97a"
        @change="handleTabChange"
      >
        <van-tabbar-item
          v-for="itemTab in tabs"
          :key="itemTab.icon"
          :name="itemTab.key"
        >
          <template #icon>
            <SIcon :icon="itemTab.icon" :size="2" />
          </template>
          {{ itemTab.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/ParentView.css";
import { tabs } from "@/untils/staticDate";
import { useRouter } from "vue-router";
import SIcon from "@/components/SIcon/SIcon.vue";

export default defineComponent({
  name: "ParentView",
  components: {
    SIcon,
  },
  setup() {
    const router = useRouter();
    const active = ref<string>("/home");

    const handleTabChange = (active: string) => {
      router.push(active);
    };

    return {
      tabs,
      active,
      handleTabChange,
    };
  },
});
</script>
