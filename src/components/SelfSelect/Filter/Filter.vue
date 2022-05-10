<template>
  <div class="filter">
    <FilterTitle />
    <FilterPicker
      v-show="
        openType === 'area' || openType === 'rentType' || openType === 'price'
      "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import "./Filter.css";
import api from "@/api";
import FilterTitle from "@/components/SelfSelect/FilterTitle/FilterTitle.vue";
import FilterPicker from "@/components/SelfSelect/FilterPicker/FilterPicker.vue";
import { ConditionType } from "@/untils/ListType";

export default defineComponent({
  name: "FilterCom",
  components: {
    FilterTitle,
    FilterPicker,
  },
  setup() {
    const openType = ref<string>("");
    const condition = ref<ConditionType>({});

    function handleOpenType(type: string) {
      openType.value = type;
    }

    function getAllCondition() {
      const cityInfo = JSON.parse(localStorage.getItem("hkzf_city") as string);
      api.HouseApi.getCondition(cityInfo.value).then((res) => {
        console.log(res);
        if (res.status === 200) {
          condition.value = res.body;
        }
      });
    }

    provide("FilterSolve", {
      openType,
      condition,
      handleOpenType,
    });

    getAllCondition();
    return {
      openType,
    };
  },
});
</script>
