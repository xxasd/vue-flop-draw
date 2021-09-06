<template>
  <flow-draw v-model:list="list" v-model:drawNumber="drawNumber" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
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
      },
      {
        name: "奖品2",
      },
      {
        name: "奖品3",
      },
      {
        name: "奖品4",
      },
      {
        name: "奖品5",
      },
      {
        name: "奖品6",
      },
      {
        name: "奖品7",
      },
      {
        name: "奖品8",
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
