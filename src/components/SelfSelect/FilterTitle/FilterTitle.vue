<template>
  <div class="filter-title">
    <div
      :class="[
        'filter-title-item-room',
        titleSelectedStatus[itemTitle.type]
          ? 'filter-title-select-item-room'
          : '',
      ]"
      v-for="itemTitle in titleList"
      :key="itemTitle.type"
      @click="handleFilterTitleClick(itemTitle.type)"
    >
      <span>{{ itemTitle.title }}</span>
      <SIcon icon="icon-arrow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import "./FilterTitle.css";
import { titleList } from "@/untils/staticDate";
import SIcon from "@/components/SIcon/SIcon.vue";
import { FilterSolveType } from "@/untils/ListType";

export default defineComponent({
  name: "FilterTitle",
  components: { SIcon },
  setup() {
    const filterSolve: FilterSolveType = inject(
      "FilterSolve",
      {} as FilterSolveType
    );

    const { titleSelectedStatus } = filterSolve;

    function handleFilterTitleClick(type: string) {
      filterSolve.handleOpenType(type);
    }

    return {
      titleList,
      titleSelectedStatus,
      handleFilterTitleClick,
    };
  },
});
</script>
