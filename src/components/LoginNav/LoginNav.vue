<template>
  <div class="login-nav">
    <van-nav-bar
      title="账户登录"
      left-arrow
      class="login-self-nav"
      @click-left="handleLeft"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./LoginNav.css";

export default defineComponent({
  name: "LoginNav",
  emits: ["backView"],
  setup(props, { emit }) {
    function handleLeft() {
      emit("backView");
    }

    return {
      handleLeft,
    };
  },
});
</script>
