<template>
  <div class="filter-picker">
    <van-popup v-model:show="showCondition" round position="bottom">
      <van-cascader
        :title="conditionText"
        :options="conditionData"
        @close="handleClose"
        @finish="handleFinish"
        @change="handleChange"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import "./FilterPicker.css";
import { FilterSolveType, OnSelectType } from "@/untils/ListType";

export default defineComponent({
  name: "FilterPicker",
  setup() {
    const FilterSolve: FilterSolveType = inject(
      "FilterSolve",
      {} as FilterSolveType
    );

    const {
      showCondition,
      conditionText,
      conditionData,
      closePicker,
      handleSelectPicker,
    } = FilterSolve;

    function handleClose() {
      closePicker();
    }

    function handleFinish(val: OnSelectType) {
      handleSelectPicker(val);
      closePicker();
    }

    function handleChange(val: OnSelectType) {
      handleSelectPicker(val);
    }

    return {
      handleClose,
      handleChange,
      handleFinish,
      showCondition,
      conditionText,
      conditionData,
    };
  },
});
</script>
