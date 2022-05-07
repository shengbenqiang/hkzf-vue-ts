<template>
  <div class="city-index">
    <div
      v-for="itemIndex in indexArr"
      :key="itemIndex"
      class="city-item-index"
      @click="handleIndexClick(itemIndex)"
    >
      {{ itemIndex === "hot" ? "热" : itemIndex.toLocaleUpperCase() }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import "./CityIndex.css";

export default defineComponent({
  name: "CityIndex",
  props: {
    indexArr: {
      type: Array as PropType<string[]>,
      require: true,
    },
  },
  emits: ["setSelectIndex"],
  setup(props, { emit }) {
    function handleIndexClick(index: string) {
      emit("setSelectIndex", index);
    }

    return {
      handleIndexClick,
    };
  },
});
</script>
