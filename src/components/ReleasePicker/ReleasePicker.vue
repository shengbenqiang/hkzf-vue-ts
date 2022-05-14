<template>
  <van-popup :show="releasePicker" position="bottom">
    <van-picker :columns="pickerData" @confirm="onConfirm" @cancel="onCancel" />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./ReleasePicker.css";
import { RoomStaticType } from "@/untils/RentRelease";

export default defineComponent({
  name: "ReleasePicker",
  props: {
    releasePicker: {
      type: Boolean,
      default: false,
    },
    pickerData: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["SubmitPickerData", "CancelPicker"],
  setup(props, { emit }) {
    function onConfirm(currentValue: RoomStaticType) {
      emit("SubmitPickerData", currentValue);
    }

    function onCancel() {
      emit("CancelPicker");
    }

    return {
      onCancel,
      onConfirm,
    };
  },
});
</script>
