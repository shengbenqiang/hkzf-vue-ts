<template>
  <div class="empty">
    <img :src="emptyData.emptyImg" alt="空图片" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "./Empty.css";
import { emptyData } from "@/untils/staticDate";

export default defineComponent({
  name: "EmptyCom",
  setup() {
    return {
      emptyData,
    };
  },
});
</script>
