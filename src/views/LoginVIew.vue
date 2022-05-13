<template>
  <div class="login common-container">
    <LoginNav @backView="backView" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          autocomplete="username"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          autocomplete="current-password"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="login-un-account">还没有账户，去注册~</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import "@/assets/css/LoginView.css";
import { useRouter } from "vue-router";
import api from "@/api";
import { isAuth, setToken } from "@/untils/solve";
import LoginNav from "@/components/LoginNav/LoginNav.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginNav,
  },
  setup() {
    const router = useRouter();
    const username = ref<string>("");
    const password = ref<string>("");
    const backRoute = ref<string>("");

    function onSubmit() {
      api.UserApi.userLogin({
        account: username.value,
        password: password.value,
      }).then((res) => {
        if (res.status === 200) {
          setToken(res.body.token);
          backView();
        }
      });
    }

    function backView() {
      if (isAuth()) {
        if (backRoute.value) {
          router.replace(backRoute.value);
        } else {
          router.go(-1);
        }
      } else {
        router.go(-1);
      }
    }

    watch(
      () => router,
      (newValue) => {
        if (newValue.currentRoute.value.redirectedFrom) {
          backRoute.value = newValue.currentRoute.value.redirectedFrom.fullPath;
        }
      },
      { immediate: true }
    );

    return {
      onSubmit,
      username,
      password,
      backView,
    };
  },
});
</script>
