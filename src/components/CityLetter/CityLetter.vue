<template>
  <div class="city-letter">
    <div class="city-letter-index">{{ formatCityIndex(index) }}</div>
    <div
      class="city-letter-item-city"
      v-for="itemCity in cities"
      :key="itemCity.value"
    >
      {{ itemCity.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import "./CityLetter.css";
import { LocateType } from "@/untils/CityType";
import { formatCityIndex } from "@/untils/solve";

export default defineComponent({
  name: "CityLetter",
  props: {
    index: {
      type: String,
      require: true,
    },
    cities: {
      type: Array as PropType<LocateType[]>,
      require: true,
    },
  },
  setup() {
    return {
      formatCityIndex,
    };
  },
});
</script>
