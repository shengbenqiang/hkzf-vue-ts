<template>
  <div class="home-nav">
    <div class="home-item-nav" v-for="itemNav in navigate" :key="itemNav.path">
      <img :src="itemNav.img" :alt="itemNav.name" />
      {{ itemNav.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./HomeNav.css";
import { navigate } from "@/untils/staticDate";

export default defineComponent({
  name: "HomeNav",
  setup() {
    return {
      navigate,
    };
  },
});
</script>
