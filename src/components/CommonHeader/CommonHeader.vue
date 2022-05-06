<template>
  <div class="common-header">
    <div class="common-header-room">
      <div class="common-header-left-room">
        <div class="common-header-locate">
          <span>北京</span>
          <div><SIcon icon="icon-arrow" :size="1.5" /></div>
        </div>
        <div class="common-line"></div>
        <div class="common-header-input">
          <SIcon icon="icon-seach" :size="1.6" />
          <span>请输入小区或地址</span>
        </div>
      </div>
      <div class="common-header-right-room">
        <SIcon icon="icon-map" :size="3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./CommonHeader.css";
import SIcon from "@/components/SIcon/SIcon.vue";

export default defineComponent({
  name: "CommonHeader",
  components: {
    SIcon,
  },
});
</script>
