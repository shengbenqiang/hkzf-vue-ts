<template>
  <div class="profile-nav">
    <div v-for="itemNav in menus" :key="itemNav.id" class="profile-item-nav">
      <SIcon :icon="itemNav.iconfont" :size="2.8" />
      <div>{{ itemNav.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./ProfileNav.css";
import { menus } from "@/untils/staticDate";
import SIcon from "@/components/SIcon/SIcon.vue";

export default defineComponent({
  name: "ProfileNav",
  components: {
    SIcon,
  },
  setup() {
    return {
      menus,
    };
  },
});
</script>
