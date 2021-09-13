<template>
  <div>
    <!-- 中奖背景图一 -->
    <div class="aperture absolute bg-no-repeat bg-cover"></div>
    <!-- 中奖背景图二 -->
    <div class="halo absolute bg-no-repeat bg-cover"></div>
    <!-- 星星一 -->
    <div
      v-for="(item, index) in stars"
      :key="index"
      class="star-bg absolute bg-no-repeat bg-cover"
      :class="`star-${index}`"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "WinnerStyle",
  setup() {
    let stars = ref([1, 2, 3, 4, 5]);

    return { stars };
  },
});
</script>

<style lang="scss" scoped>
.aperture {
  left: 50%;
  top: 50%;
  margin-left: -130px;
  margin-top: -130px;
  background-image: url("../assets/images/card_aperture_img.png");
  width: 261px;
  height: 261px;
  animation: rotate 20s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.halo {
  left: 50%;
  top: 50%;
  margin-left: -118px;
  margin-top: -138px;
  background-image: url("../assets/images/card_halo_img.png");
  width: 236px;
  height: 276px;
}
.star-bg {
  background-image: url("../assets/images/card_star_img.png");
  z-index: 10;
  animation: opacity 1.6s infinite;
  @keyframes opacity {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
}

.star-0 {
  top: 0;
  left: -22px;
  width: 44px;
  height: 44px;
}

.star-1 {
  bottom: 0;
  left: -20px;
  width: 32px;
  height: 32px;
  animation-delay: 0.6s;
}

.star-2 {
  top: -14px;
  left: 80px;
  width: 32px;
  height: 32px;
  animation-delay: 0.2s;
}

.star-3 {
  top: -14px;
  right: -28px;
  width: 44px;
  height: 44px;
  animation-delay: 0.4s;
}

.star-4 {
  bottom: -14px;
  right: -28px;
  width: 44px;
  height: 44px;
  animation-delay: 0.8s;
}
</style>
