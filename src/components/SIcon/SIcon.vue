<template>
  <i :class="['iconfont', icon]" :style="{ fontSize: size + 'rem' }"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@/assets/fonts/iconfont.css";

export default defineComponent({
  name: "SIcon",
  props: {
    icon: {
      type: String,
      require: true,
    },
    size: {
      type: Number,
      default: 1.2,
    },
  },
});
</script>
