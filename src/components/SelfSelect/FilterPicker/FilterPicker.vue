<template>
  <div class="filter-picker">
    <van-area :area-list="FilterSolve.condition[FilterSolve.openType]">
      <template #toolbar>
        <div></div>
      </template>
    </van-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import "./FilterPicker.css";
import { FilterSolveType } from "@/untils/ListType";

export default defineComponent({
  name: "FilterPicker",
  setup() {
    const FilterSolve: FilterSolveType = inject(
      "FilterSolve",
      {} as FilterSolveType
    );

    return {
      FilterSolve,
    };
  },
});
</script>
