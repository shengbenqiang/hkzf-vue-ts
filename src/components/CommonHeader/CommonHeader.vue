<template>
  <div
    :class="[
      'common-header',
      absolute ? 'common-header-absolute' : 'common-header-un-absolute',
    ]"
  >
    <div class="common-header-room">
      <div class="common-header-left-room">
        <div class="common-header-locate" @click="pageChange('/cityList')">
          <span>{{ locateName }}</span>
          <div><SIcon icon="icon-arrow" :size="1.5" /></div>
        </div>
        <div class="common-line"></div>
        <div class="common-header-input" @click="pageChange('/search')">
          <SIcon icon="icon-seach" :size="1.6" />
          <span>请输入小区或地址</span>
        </div>
      </div>
      <div
        :class="[
          'common-header-right-room',
          absolute
            ? 'common-header-absolute-color'
            : 'common-header-un-absolute-color',
        ]"
        @click="pageChange('/map')"
      >
        <SIcon icon="icon-map" :size="absolute ? 3 : 2.5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "./CommonHeader.css";
import { useRouter } from "vue-router";
import { getCurrentCity } from "@/untils/solve";
import SIcon from "@/components/SIcon/SIcon.vue";

export default defineComponent({
  name: "CommonHeader",
  components: {
    SIcon,
  },
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    const locateName = ref<string>("");

    function pageChange(path: string) {
      router.push(path);
    }

    function getLocate() {
      getCurrentCity().then((res) => {
        locateName.value = res.label;
      });
    }

    getLocate();
    return {
      pageChange,
      locateName,
    };
  },
});
</script>
