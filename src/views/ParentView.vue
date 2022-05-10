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
import { defineComponent, ref, watch, onMounted } from "vue";
import "@/assets/css/ParentView.css";
import { tabs } from "@/untils/staticDate";
import { useRouter, useRoute } from "vue-router";
import SIcon from "@/components/SIcon/SIcon.vue";

export default defineComponent({
  name: "ParentView",
  components: {
    SIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tabRoutes = ref<string[]>([
      "/home",
      "/houseList",
      "/news",
      "/profile",
    ]);
    const active = ref<string>("");

    const handleTabChange = (active: string) => {
      router.push(active);
    };

    watch(
      () => route.fullPath,
      async (val) => {
        if (tabRoutes.value.includes(val)) {
          active.value = val;
        }
      }
    );

    onMounted(() => {
      active.value = route.fullPath;
    });

    return {
      tabs,
      active,
      handleTabChange,
    };
  },
});
</script>
