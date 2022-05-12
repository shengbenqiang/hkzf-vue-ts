<template>
  <div class="login common-container">
    <LoginNav />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/LoginView.css";
import LoginNav from "@/components/LoginNav/LoginNav.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginNav,
  },
  setup() {
    const username = ref<string>("");
    const password = ref<string>("");

    function onSubmit() {
      console.log("执行了");
    }

    return {
      onSubmit,
      username,
      password,
    };
  },
});
</script>
