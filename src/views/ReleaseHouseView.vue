<template>
  <div class="release-house common-container">
    <div class="release-house-nav">
      <CommonNavHeader title="发布房源" />
    </div>
    <div class="release-house-info-room">
      <van-form @submit="onSubmit">
        <van-field
          v-model="houseInfo.price"
          name="price"
          label="租金"
          placeholder="请填写租金/月"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #extra>
            <div class="release-info-price-extra">￥/月</div>
          </template>
        </van-field>
        <van-field
          v-model="houseInfo.area"
          name="area"
          label="建筑面积"
          placeholder="请填写建筑面积"
          :rules="[{ required: true, message: '请填写建筑面积' }]"
        >
          <template #extra>
            <div class="release-info-price-extra">㎡</div>
          </template>
        </van-field>
        <van-field
          v-model="houseInfo.roomType.text"
          is-link
          readonly
          name="roomType"
          label="户型"
          placeholder="请选择"
          @click="handleShowPicker('roomType')"
        />
        <van-field
          v-model="houseInfo.oriented.text"
          is-link
          readonly
          name="oriented"
          label="朝向"
          placeholder="请选择"
          @click="handleShowPicker('oriented')"
        />
        <van-field
          v-model="houseInfo.floor.text"
          is-link
          readonly
          name="floor"
          label="所在楼层"
          placeholder="请选择"
          @click="handleShowPicker('floor')"
        />
        <van-field
          v-model="houseInfo.areaInfo.name"
          is-link
          readonly
          name="picker"
          label="选择器"
          placeholder="点击选择城市"
          @click="handleSelectCity"
        />
      </van-form>
    </div>
    <ReleasePicker
      :release-picker="showReleasePicker"
      :picker-data="columnData"
      @CancelPicker="CancelPicker"
      @SubmitPickerData="SubmitPickerData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import "@/assets/css/ReleaseHouseView.css";
import { useRouter } from "vue-router";
import ReleasePicker from "@/components/ReleasePicker/ReleasePicker.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";
import {
  HouseReleaseInfo,
  RoomStaticType,
  AreaInfoType,
} from "@/untils/RentRelease";
import { roomTypeData, orientedData, floorData } from "@/untils/staticDate";

export default defineComponent({
  name: "ReleaseHouseView",
  components: {
    ReleasePicker,
    CommonNavHeader,
  },
  setup() {
    const router = useRouter();
    const houseInfo = reactive<HouseReleaseInfo>({
      area: "",
      price: "",
      roomType: {} as RoomStaticType,
      oriented: {} as RoomStaticType,
      floor: {} as RoomStaticType,
      areaInfo: {} as AreaInfoType,
    });
    const showReleasePicker = ref<boolean>(false);
    const columnData = ref<RoomStaticType[]>([]);
    const pickerType = ref<string>("");

    function onSubmit() {
      console.log("执行了");
    }

    function handleShowPicker(type: string) {
      showReleasePicker.value = true;
      pickerType.value = type;
      if (type === "roomType") {
        columnData.value = roomTypeData;
      } else if (type === "oriented") {
        columnData.value = orientedData;
      } else if (type === "floor") {
        columnData.value = floorData;
      }
    }

    function SubmitPickerData(val: RoomStaticType) {
      houseInfo[pickerType.value] = val;
      showReleasePicker.value = false;
      pickerType.value = "";
    }

    function CancelPicker() {
      pickerType.value = "";
      showReleasePicker.value = false;
    }

    function handleSelectCity() {
      router.push("/search");
    }

    return {
      onSubmit,
      houseInfo,
      columnData,
      CancelPicker,
      handleShowPicker,
      SubmitPickerData,
      handleSelectCity,
      showReleasePicker,
    };
  },
});
</script>
