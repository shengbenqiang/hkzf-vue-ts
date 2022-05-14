<template>
  <div class="empty">
    <img :src="emptyData.emptyImg" alt="空图片" />
    <p class="empty-word">
      {{ emptyWord }}
      <span @click="handleLinkPath" v-if="linkWord">{{ linkWord }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./Empty.css";
import { useRouter } from "vue-router";
import { emptyData } from "@/untils/staticDate";

export default defineComponent({
  name: "EmptyCom",
  props: {
    emptyWord: {
      type: String,
      require: true,
    },
    linkWord: {
      type: String,
      default: "",
    },
    linkPath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();

    function handleLinkPath() {
      router.push(props.linkPath);
    }

    return {
      emptyData,
      handleLinkPath,
    };
  },
});
</script>
