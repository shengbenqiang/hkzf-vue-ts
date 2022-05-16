<template>
  <div class="release-house common-container">
    <div class="release-house-nav">
      <CommonNavHeader title="发布房源" />
    </div>
    <div class="release-house-info-room">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="houseInfo.title"
            name="title"
            label="标题"
            autosize
            :rules="[{ required: true, message: '请填写出租标题' }]"
            placeholder="请输入标题（例如：整租 小区名 2室 5000）"
            @update:model-value="handleTitleUpdate"
          />
          <van-field
            v-model="houseInfo.price"
            name="price"
            label="租金"
            placeholder="请填写租金/月"
            :rules="[{ required: true, message: '请填写用户名' }]"
            @update:model-value="handlePriceUpdate"
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
            @update:model-value="handleAreaUpdate"
          >
            <template #extra>
              <div class="release-info-price-extra">㎡</div>
            </template>
          </van-field>
          <van-field
            v-model="houseInfo.desc"
            name="title"
            label="房屋描述"
            autosize
            :rules="[{ required: true, message: '请填写房屋描述信息' }]"
            placeholder="请填写房屋描述信息"
            @update:model-value="handleDescUpdate"
          />
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
            label="小区名称"
            placeholder="选择小区名称"
            @click="handleSelectCity"
          />
          <van-field name="uploader" label="文件上传">
            <template #input>
              <van-uploader
                v-model="uploadImgs"
                multiple
                :after-read="handleGetFile"
              />
            </template>
          </van-field>
          <van-cell title="房屋配置">
            <template #label>
              <div class="release-house-package">
                <HousePackage />
              </div>
            </template>
          </van-cell>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="success" native-type="submit">
            提交
          </van-button>
        </div>
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
import { defineComponent, reactive, ref, watch } from "vue";
import "@/assets/css/ReleaseHouseView.css";
import { useRoute, useRouter } from "vue-router";
import HousePackage from "@/components/HousePackage/HousePackage.vue";
import ReleasePicker from "@/components/ReleasePicker/ReleasePicker.vue";
import CommonNavHeader from "@/components/CommonNavHeader/CommonNavHeader.vue";
import {
  SelfFile,
  AreaInfoType,
  HouseReleaseInfo,
  RoomStaticType,
} from "@/untils/RentRelease";
import { floorData, orientedData, roomTypeData } from "@/untils/staticDate";
import { releaseMain } from "@/store";
import api from "@/api";

export default defineComponent({
  name: "ReleaseHouseView",
  components: {
    HousePackage,
    ReleasePicker,
    CommonNavHeader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const uploadImgs = ref([]);
    const releaseStore = releaseMain();
    const houseInfo = reactive<HouseReleaseInfo>({
      area: "",
      price: "",
      title: "",
      desc: "",
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

    function getHouseInfo() {
      Object.assign(houseInfo, releaseStore.houseInfo);
    }

    function handlePriceUpdate() {
      releaseStore.$patch({
        houseInfo: houseInfo,
      });
    }

    function handleAreaUpdate() {
      releaseStore.$patch({
        houseInfo: houseInfo,
      });
    }

    function handleTitleUpdate() {
      releaseStore.$patch({
        houseInfo: houseInfo,
      });
    }

    function handleDescUpdate() {
      releaseStore.$patch({
        houseInfo: houseInfo,
      });
    }

    function getRouteParams() {
      if (route.params.name) {
        houseInfo.areaInfo = {
          id: route.params.id as string,
          name: route.params.name as string,
        };
        releaseStore.$patch({
          houseInfo: houseInfo,
        });
      }
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
      releaseStore.$patch({
        houseInfo: houseInfo,
      });
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

    function handleGetFile(file: SelfFile[]) {
      file.forEach(async (itemFile) => {
        const formData = new FormData();
        formData.append("file", itemFile.file);
        await api.HouseApi.uploadImg(formData).then((res) => {
          if (res.status === 200) {
            itemFile.content = `http://localhost:8080${res.body[0]}`;
          }
        });
      });
    }

    watch(
      () => route.path,
      (val) => {
        if (val === "/home") {
          releaseStore.$reset();
        }
      }
    );

    getHouseInfo();
    getRouteParams();
    return {
      onSubmit,
      houseInfo,
      columnData,
      uploadImgs,
      CancelPicker,
      handleGetFile,
      handleDescUpdate,
      handleShowPicker,
      SubmitPickerData,
      handleSelectCity,
      showReleasePicker,
      handleAreaUpdate,
      handlePriceUpdate,
      handleTitleUpdate,
    };
  },
});
</script>
