<template>
  <div class="filter-footer">
    <div class="filter-footer-left filter-common-footer" @click="clearClick">
      清 除
    </div>
    <div class="filter-footer-right filter-common-footer" @click="confirmClick">
      确 定
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./FilterFooter.css";

export default defineComponent({
  name: "FilterFooter",
  emits: ["handleConfirm", "handleClear"],
  setup(props, { emit }) {
    function confirmClick() {
      emit("handleConfirm");
    }

    function clearClick() {
      emit("handleClear");
    }

    return {
      clearClick,
      confirmClick,
    };
  },
});
</script>
