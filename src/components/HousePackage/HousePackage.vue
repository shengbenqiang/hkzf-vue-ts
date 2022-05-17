<template>
  <div class="house-package">
    <van-grid :column-num="5" class="house-package-self-grid" :border="false">
      <van-grid-item
        class="house-package-self-grid-item-cell"
        v-for="itemPackage in packageData"
        :key="itemPackage.id"
      >
        <template #default>
          <div
            :class="[
              'house-package-room-item',
              selectPackage.filter(
                (packageInfo) => packageInfo.id === itemPackage.id
              ).length > 0
                ? 'house-select-package'
                : 'house-un-select-package',
            ]"
            @click="handlePackageClick(itemPackage)"
          >
            <div><SIcon :icon="itemPackage.icon" :size="2.8" /></div>
            <div>{{ itemPackage.name }}</div>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import "./HousePackage.css";
import { packageData } from "@/untils/staticDate";
import SIcon from "@/components/SIcon/SIcon.vue";
import { PackageType } from "@/untils/RentRelease";

export default defineComponent({
  name: "HousePackage",
  components: {
    SIcon,
  },
  props: {
    selectPackage: {
      type: Array as PropType<PackageType[]>,
      default: () => [],
    },
  },
  emits: ["handleSelectPackage"],
  setup(props, { emit }) {
    function handlePackageClick(packageInfo: PackageType) {
      emit("handleSelectPackage", packageInfo);
    }

    return {
      packageData,
      handlePackageClick,
    };
  },
});
</script>
