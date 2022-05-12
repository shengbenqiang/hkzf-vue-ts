<template>
  <div class="filter">
    <FilterTitle />
    <FilterPicker
      v-show="
        openType === 'area' || openType === 'rentType' || openType === 'price'
      "
    />
    <FilterMore v-show="openType === 'more'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, watch } from "vue";
import "./Filter.css";
import api from "@/api";
import FilterMore from "@/components/SelfSelect/FilterMore/FilterMore.vue";
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
    FilterMore,
    FilterTitle,
    FilterPicker,
  },
  emits: ["provideFilters"],
  setup(props, { emit }) {
    const openType = ref<string>("");
    const showCondition = ref<boolean>(false);
    const showMore = ref<boolean>(false);
    const condition = ref<ConditionType>({});
    const conditionText = ref<string>("");
    const conditionData = ref<CascadePickerType | BasePicker[] | ConditionType>(
      []
    );
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
      } else if (type === "more") {
        handleMoreCondition(type);
      }
      if (type === "area" || type === "rentType" || type === "price") {
        showCondition.value = true;
      } else {
        showMore.value = true;
      }
    }

    function handleOneColumn(type: string) {
      conditionData.value = [];
      const data: BasePicker[] = condition.value[type] as BasePicker[];
      data.forEach((item) => {
        item.text = item.label;
      });
      conditionData.value = data;
    }

    function handleThreeColumn(type: string) {
      conditionData.value = [];
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

    function handleMoreCondition(type: string) {
      console.log(type);
      conditionData.value = {};
      const data: ConditionType = {};
      data.characteristic = condition.value["characteristic"];
      data.floor = condition.value["floor"];
      data.oriented = condition.value["oriented"];
      data.roomType = condition.value["roomType"];
      conditionData.value = data;
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

    function handleMoreSelected(type: string) {
      selectPicker.more.includes(type)
        ? selectPicker.more.splice(
            selectPicker.more.findIndex((item) => item === type),
            1
          )
        : selectPicker.more.push(type);
    }

    function closeMorePopup() {
      showMore.value = false;
    }

    function clearMorePopup() {
      selectPicker.more = [];
    }

    provide("FilterSolve", {
      openType,
      condition,
      showMore,
      selectPicker,
      conditionText,
      showCondition,
      conditionData,
      closePicker,
      handleOpenType,
      handleSelectPicker,
      titleSelectedStatus,
      handleMoreSelected,
      closeMorePopup,
      clearMorePopup,
    });

    watch(showCondition, (val) => {
      if (!val) {
        if (openType.value === "area") {
          if (selectPicker["area"].toString() === "area,null") {
            titleSelectedStatus.area = false;
          }
        } else if (openType.value === "rentType") {
          if (selectPicker["rentType"].toString() === "null") {
            titleSelectedStatus.rentType = false;
          }
        } else if (openType.value === "price") {
          if (selectPicker["price"].toString() === "null") {
            titleSelectedStatus.price = false;
          }
        }
        emit("provideFilters", selectPicker);
      }
    });

    watch(showMore, (val) => {
      if (!val) {
        if (selectPicker.more.length === 0) {
          titleSelectedStatus.more = false;
        }
        emit("provideFilters", selectPicker);
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
