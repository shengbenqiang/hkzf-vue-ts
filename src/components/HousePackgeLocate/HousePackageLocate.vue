<template>
  <div class="house-package-locate">
    <div class="house-package-locate-title">{{ title }}</div>
    <div class="house-package-locate-main">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./HousePackageLocate.css";

export default defineComponent({
  name: "HousePackageLocate",
  props: {
    title: {
      type: String,
      require: true,
    },
  },
});
</script>
