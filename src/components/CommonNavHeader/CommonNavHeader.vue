<template>
  <van-nav-bar
    left-arrow
    :title="title"
    @click-left="onClickLeft"
  ></van-nav-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./CommonNavHeader.css";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CommonNavHeader",
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  setup() {
    const router = useRouter();

    function onClickLeft() {
      router.go(-1);
    }

    return {
      onClickLeft,
    };
  },
});
</script>
