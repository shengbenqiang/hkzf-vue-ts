<template>
  <div class="new">
    <div class="new-room">
      <div class="new-room-left">
        <img
          :src="`http://localhost:8080${newInfo.imgSrc}`"
          :alt="newInfo.title"
        />
      </div>
      <div class="new-room-right">
        <div class="new-room-info-title">{{ newInfo.title }}</div>
        <div class="new-room-info-desc">
          <span>{{ newInfo.from }}</span>
          <span>{{ newInfo.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import "./New.css";
import { NewType } from "@/untils/HomeType";

export default defineComponent({
  name: "NewComponent",
  props: {
    newInfo: {
      type: Object as PropType<NewType>,
      default: () => ({}),
    },
  },
});
</script>
