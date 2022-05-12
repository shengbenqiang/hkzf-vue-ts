<template>
  <div class="filter-more">
    <van-popup
      v-model:show="showMore"
      position="right"
      class="filter-self-more"
    >
      <div class="filter-more-room">
        <div class="filter-condition-room">
          <div class="filter-item-condition-room">
            <div class="filter-item-condition-title">户型</div>
            <div class="filter-item-tube-room">
              <div
                :class="[
                  'filter-item-tube',
                  selectPicker.more.includes(item.value)
                    ? 'filter-select-item-tube'
                    : '',
                ]"
                v-for="item in conditionData['roomType']"
                :key="item.value"
                @click="handleTubeClick(item.value)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="filter-item-condition-room">
            <div class="filter-item-condition-title">朝向</div>
            <div class="filter-item-tube-room">
              <div
                :class="[
                  'filter-item-tube',
                  selectPicker.more.includes(item.value)
                    ? 'filter-select-item-tube'
                    : '',
                ]"
                v-for="item in conditionData['oriented']"
                :key="item.value"
                @click="handleTubeClick(item.value)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="filter-item-condition-room">
            <div class="filter-item-condition-title">楼层</div>
            <div class="filter-item-tube-room">
              <div
                :class="[
                  'filter-item-tube',
                  selectPicker.more.includes(item.value)
                    ? 'filter-select-item-tube'
                    : '',
                ]"
                v-for="item in conditionData['floor']"
                :key="item.value"
                @click="handleTubeClick(item.value)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="filter-item-condition-room">
            <div class="filter-item-condition-title">房屋亮点</div>
            <div class="filter-item-tube-room">
              <div
                :class="[
                  'filter-item-tube',
                  selectPicker.more.includes(item.value)
                    ? 'filter-select-item-tube'
                    : '',
                ]"
                v-for="item in conditionData['characteristic']"
                :key="item.value"
                @click="handleTubeClick(item.value)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <FilterFooter
          @handleClear="handleClear"
          @handleConfirm="handleConfirm"
        />
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import "./FilterMore.css";
import { FilterSolveType } from "@/untils/ListType";
import FilterFooter from "@/components/SelfSelect/FilterFooter/FilterFooter.vue";

export default defineComponent({
  name: "FilterMore",
  components: {
    FilterFooter,
  },
  setup() {
    const FilterSolve: FilterSolveType = inject(
      "FilterSolve",
      {} as FilterSolveType
    );

    const {
      showMore,
      conditionData,
      handleMoreSelected,
      selectPicker,
      closeMorePopup,
      clearMorePopup,
    } = FilterSolve;

    function handleTubeClick(type: string) {
      handleMoreSelected(type);
    }

    function handleClear() {
      clearMorePopup();
    }

    function handleConfirm() {
      closeMorePopup();
    }

    return {
      showMore,
      handleClear,
      selectPicker,
      conditionData,
      handleConfirm,
      handleTubeClick,
    };
  },
});
</script>
