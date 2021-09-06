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
