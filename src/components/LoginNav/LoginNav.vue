<template>
  <div class="login-nav">
    <van-nav-bar title="账户登录" left-arrow class="login-self-nav" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./LoginNav.css";

export default defineComponent({
  name: "LoginNav",
});
</script>
