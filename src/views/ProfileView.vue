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
          <div class="profile-login-common-word">{{ nickName }}</div>
          <van-button type="success" size="small" @click="handleLogout"
            >退出登录</van-button
          >
          <div class="profile-login-common-word">
            编辑个人资料~
            <span class="profile-header-user-is-login-operate-arrow">
              <SIcon icon="icon-arrow" />
            </span>
          </div>
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
import { isAuth, removeToken } from "@/untils/solve";
import api from "@/api";
import SIcon from "@/components/SIcon/SIcon.vue";
import ProfileNav from "@/components/ProfileNav/ProfileNav.vue";
import { useRouter } from "vue-router";
import { Dialog } from "vant";

export default defineComponent({
  name: "ProfileView",
  components: {
    SIcon,
    ProfileNav,
  },
  setup() {
    const router = useRouter();
    const avatar = ref<string>("");
    const isLogin = ref<boolean>(isAuth());
    const nickName = ref<string>("");
    const defaultUserAvatar = "http://localhost:8080/img/profile/avatar.png";

    function getUserInfo() {
      if (isLogin.value) {
        api.UserApi.getUser().then((res) => {
          if (res.status === 200) {
            avatar.value = res.body.avatar;
            nickName.value = res.body.nickname;
          } else {
            isLogin.value = false;
          }
        });
      }
    }

    function handleLogin() {
      router.push("/login");
    }

    function handleLogout() {
      Dialog.confirm({
        title: "退出登录",
        message: "确认退出登录",
      }).then(async () => {
        await api.UserApi.userLogout().then((res) => {
          if (res.status === 200) {
            removeToken();
            isLogin.value = false;
          }
        });
      });
    }

    getUserInfo();
    return {
      avatar,
      isLogin,
      nickName,
      handleLogin,
      handleLogout,
      defaultUserAvatar,
    };
  },
});
</script>
