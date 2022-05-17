<template>
  <div class="house-detail-nav">
    <van-nav-bar
      :title="title"
      left-arrow
      class="house-detail-self-nav"
      :border="false"
      @click-left="onClickLeft"
    >
      <template #right>
        <SIcon icon="icon-share" :size="2" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./HouseDetailNav.css";
import SIcon from "@/components/SIcon/SIcon.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HouseDetailNav",
  components: {
    SIcon,
  },
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  setup() {
    const router = useRouter();
    function onClickLeft() {
      router.back();
    }

    return {
      onClickLeft,
    };
  },
});
</script>
