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
import { defineComponent, provide, reactive, ref, watch } from "vue";
import "./Filter.css";
import api from "@/api";
import FilterTitle from "@/components/SelfSelect/FilterTitle/FilterTitle.vue";
import FilterPicker from "@/components/SelfSelect/FilterPicker/FilterPicker.vue";
import {
  BasePicker,
  CascadePickerType,
  ConditionType,
  OnSelectType,
  SelectPicker,
  TitleStats,
} from "@/untils/ListType";

export default defineComponent({
  name: "FilterCom",
  components: {
    FilterTitle,
    FilterPicker,
  },
  setup() {
    const openType = ref<string>("");
    const showCondition = ref<boolean>(false);
    const condition = ref<ConditionType>({});
    const conditionText = ref<string>("");
    const conditionData = ref<CascadePickerType | BasePicker[]>([]);
    const selectPicker = reactive<SelectPicker>({
      area: ["area", "null"],
      rentType: ["null"],
      price: ["null"],
      more: [],
    });
    const titleSelectedStatus = reactive<TitleStats>({
      more: false,
      rentType: false,
      price: false,
      area: false,
    });

    function handleOpenType(type: string) {
      openType.value = type;
      titleSelectedStatus[type] = true;
      if (type === "area") {
        conditionText.value = "请选择区域";
        handleThreeColumn(type);
      } else if (type === "rentType") {
        conditionText.value = "请选择方式";
        handleOneColumn(type);
      } else if (type === "price") {
        conditionText.value = "请选择租金";
        handleOneColumn(type);
      }
      showCondition.value = true;
    }

    function handleOneColumn(type: string) {
      const data: BasePicker[] = condition.value[type] as BasePicker[];
      data.forEach((item) => {
        item.text = item.label;
      });
      conditionData.value = data;
    }

    function handleThreeColumn(type: string) {
      const data = condition.value[type] as CascadePickerType;
      data.text = data.label;
      data.children?.forEach((item) => {
        item.text = item.label;
        if (item.children) {
          item.children.forEach((itemChild) => {
            itemChild.text = itemChild.label;
            if (itemChild.children) {
              itemChild.children.forEach((itemParent) => {
                itemParent.text = itemParent.label;
              });
            }
          });
        }
      });
      conditionData.value = [data];
    }

    function getAllCondition() {
      const cityInfo = JSON.parse(localStorage.getItem("hkzf_city") as string);
      api.HouseApi.getCondition(cityInfo.value).then((res) => {
        if (res.status === 200) {
          condition.value = res.body;
        }
      });
    }

    function closePicker() {
      showCondition.value = false;
    }

    function handleSelectPicker(val: OnSelectType) {
      if (openType.value === "area") {
        console.log(val.selectedOptions);
        if (val.selectedOptions.length === 1) {
          selectPicker.area = ["area", "null"];
        } else {
          selectPicker.area = [
            val.selectedOptions[val.selectedOptions.length - 1].value,
          ];
        }
      } else if (openType.value === "rentType") {
        selectPicker.rentType = [val.selectedOptions[0].value];
      } else if (openType.value === "price") {
        selectPicker.price = [val.selectedOptions[0].value];
      }
    }

    provide("FilterSolve", {
      openType,
      condition,
      conditionText,
      showCondition,
      conditionData,
      closePicker,
      handleOpenType,
      handleSelectPicker,
      titleSelectedStatus,
    });

    watch(showCondition, (val) => {
      console.log(val);
      if (!val) {
        if (openType.value === "area") {
          if (selectPicker["area"].toString() === "area,null") {
            titleSelectedStatus.area = false;
          }
        } else if (openType.value === "rentType") {
          console.log("执行了");
        } else if (openType.value === "price") {
          console.log("执行了");
        }
      }
    });

    getAllCondition();
    return {
      openType,
      selectPicker,
    };
  },
});
</script>
