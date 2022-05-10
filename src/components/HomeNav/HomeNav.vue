<template>
  <div class="home-nav">
    <div
      class="home-item-nav"
      v-for="itemNav in navigate"
      :key="itemNav.path"
      @click="handleIndexNav(itemNav.path)"
    >
      <img :src="itemNav.img" :alt="itemNav.name" />
      {{ itemNav.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./HomeNav.css";
import { navigate } from "@/untils/staticDate";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeNav",
  setup() {
    const router = useRouter();

    function handleIndexNav(path: string) {
      router.push(path);
    }

    return {
      navigate,
      handleIndexNav,
    };
  },
});
</script>
