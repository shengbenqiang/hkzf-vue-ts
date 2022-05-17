<template>
  <div class="house-info-common-con">
    <div
      :class="[
        'house-info-common-main',
        showBorder ? 'house-info-common-show-border' : '',
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./HouseInfoCommonContainer.css";

export default defineComponent({
  name: "HouseInfoCommonContainer",
  props: {
    showBorder: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
