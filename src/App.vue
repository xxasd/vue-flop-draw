<template>
  <flow-draw :list="list" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import FlowDraw from "./components/FlowDraw.vue";

export default defineComponent({
  name: "App",
  components: {
    FlowDraw,
  },
  setup: () => {
    const list = reactive([
      {
        name: "奖品1",
        is_empty: 0,
      },
      {
        name: "奖品2",
        is_empty: 0,
      },
    ]);

    return { list };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
