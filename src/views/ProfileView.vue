<template>
  <div class="profile common-container">
    <div class="profile-header-room">
      <img alt="背景图片" src="http://localhost:8080/img/profile/bg.png" />
      <div class="profile-use-room">
        <div class="profile-header-user-avatar-room">
          <img
            alt="用户头像"
            :src="
              isLogin ? `http://localhost:8080${avatar}` : defaultUserAvatar
            "
          />
        </div>
        <div
          v-if="!isLogin"
          class="profile-un-isLogin-user-room profile-Login-common-user-room"
        >
          <div class="profile-login-common-word">游客</div>
          <van-button type="success" size="small" @click="handleLogin"
            >登 录</van-button
          >
        </div>
        <div
          v-if="isLogin"
          class="profile-isLogin-user-room profile-Login-common-user-room"
        >
          登录
        </div>
      </div>
    </div>
    <ProfileNav />
    <div class="profile-add-us-room">
      <img src="http://localhost:8080/img/profile/join.png" alt="加入我们" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "@/assets/css/ProfileView.css";
import { isAuth } from "@/untils/solve";
import api from "@/api";
import ProfileNav from "@/components/ProfileNav/ProfileNav.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProfileView",
  components: {
    ProfileNav,
  },
  setup() {
    const router = useRouter();
    const avatar = ref<string>("");
    const isLogin = ref<boolean>(isAuth());
    const defaultUserAvatar = "http://localhost:8080/img/profile/avatar.png";

    function getUserInfo() {
      if (isLogin.value) {
        api.UserApi.getUser().then((res) => {
          if (res.status === 200) {
            console.log(res);
          } else {
            isLogin.value = false;
          }
        });
      }
    }

    function handleLogin() {
      router.push("/login");
    }

    getUserInfo();
    return {
      avatar,
      isLogin,
      handleLogin,
      defaultUserAvatar,
    };
  },
});
</script>
