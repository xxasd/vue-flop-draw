<template>
  <flow-draw v-model:list="list" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FlowDraw from "./packages/flow-draw/src/flow-draw.vue";

export default defineComponent({
  name: "App",
  components: { FlowDraw },
  setup: () => {
    const list = ref([
      {
        name: "66矿石",
        img:
          "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "随机限量徽章",
        img:
          "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c68de6368548bd9bd6c8888542f911~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "掘金新款T恤",
        img:
          "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf91038a6384fc3927dee294a38006b~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "Bug",
        img:
          "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "乐高海洋巨轮",
        img:
          "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "掘金马克杯",
        img:
          "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab31c183950541d4a0731c0b8765b173~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "Yoyo抱枕",
        img:
          "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f4d465a6a9462f9b1b19b3104c8f91~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
      {
        name: "Switch",
        img:
          "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp",
      },
    ]);
    const drawNumber = ref(10);

    return { list, drawNumber };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
