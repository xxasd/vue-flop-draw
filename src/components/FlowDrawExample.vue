<template>
  <div class="cards-panel flex flex-wrap">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="card-item inline-flex items-center justify-center"
      :class="[item.turn ? 'turn' : '', move ? `move-${index}` : '']"
    >
      <!-- 正面样式 -->
      <div
        class="card normal front absolute bg-no-repeat bg-cover flex flex-col items-center justify-center"
      >
        <!-- 图片 -->
        <img v-if="item.img" class="card-img" :src="item.img" />

        <div class="name text-center">
          {{ item.name }}
        </div>
      </div>
      <!-- 背面样式 -->
      <div class="card">
        <div class="card back absolute bg-cover overflow-hidden" @click="lottery(index)">
          <!-- 背景 -->
          <div class="ignore-back-size"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { shuffle } from "lodash";

interface IList {
  name: string;
  img?: string;
}

export default defineComponent({
  name: "FlowDrawExample",
  props: ["list"],
  emits: ["update:list"],
  setup: (props, context) => {
    // 移动
    const move = ref(false);

    /**
     * 初始化列表
     */
    const initList = () => {
      const list = props.list;
      const newList = list.map((item: IList, index: number) => {
        return {
          ...item,
          id: index,
          turn: false,
          is_empty: 0,
        };
      });

      context.emit("update:list", shuffle(newList));
    };

    onMounted(() => initList());

    return { move };
  },
});
</script>

<style lang="scss" scoped>
$main-background-color: #e8f3ff;
$back-background-color: #ffe6a6;
$main-color: #1d7dfa;

.cards-panel {
  margin: 70px 10px 80px;
  transform: translate3d(0, 0, 0);
  .card-item {
    margin: 20px 11px;
    width: 160px;
    height: 200px;
    transition: 0.5s all ease-in-out;
    transform-style: preserve-3d;

    .card {
      width: 100%;
      height: 100%;
      backface-visibility: hidden;

      .card-img {
        width: 50px;
        height: 50px;
      }
    }
    .front {
      transition: 0.5s all ease-in-out;
      transform: rotateY(0);
      z-index: 2;
    }

    .back {
      background-color: $back-background-color;
      border-radius: 10px;
      transition: 0.5s all ease-in-out;
      transform: rotateY(180deg);
      z-index: 1;
    }
    .ignore-back-size {
      background-size: 20px 20px;
      background-image: linear-gradient(90deg, #fff 3%, transparent 0),
        linear-gradient(1turn, #fff 3%, transparent 0);
      transform: rotate(45deg) translateX(-60px);
      background-position: 50%;
      width: 200%;
      height: 200%;
    }
    .normal {
      background: $main-background-color;
      border-radius: 10px;
    }
    &.turn {
      .front {
        transform: rotateY(180deg);
        z-index: 1;
      }
      .back {
        transform: rotateY(0);
        z-index: 2;
      }
      .back-img-ani {
        animation: scale 1.2s 0.2s infinite;
        @keyframes scale {
          0%,
          100% {
            transform: scale(0.9);
          }
          50% {
            transform: scale(1);
          }
        }
      }
    }
    .name {
      margin: 10px 0 0;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #d25f00;
    }
  }
}
</style>
