<template>
  <div>
    <div class="cards-panel flex flex-wrap">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="card-item inline-flex flex-1 items-center justify-center"
        :class="[item.turn ? 'turn' : '', move ? `move-${index.toString()}` : '']"
      >
        <!-- 正面样式 -->
        <div
          class="card front normal absolute bg-no-repeat bg-cover flex flex-col items-center justify-center"
        >
          <!-- 图片 -->
          <img v-if="item.img" class="card-img" :src="item.img" />

          <div class="name text-center">
            {{ item.name }}
          </div>
        </div>
        <!-- 背面样式 -->
        <div class="card">
          <div
            class="card back absolute bg-cover overflow-hidden"
            @click="lottery(Number(index))"
          >
            <!-- 背景 -->
            <div class="ignore-back-size"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="btn-panel m-auto flex items-center justify-center"
      :style="turning ? 'opacity: 0' : ''"
      @click="shuffling"
    >
      {{ isFirst ? "开始抽奖" : "再抽一次" }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { debounce, shuffle } from "lodash";

interface IList {
  name: string;
  img?: string;
}

interface IPrize extends IList {
  id: number;
  turn: number | boolean;
}

export default defineComponent({
  name: "FlowDraw",
  props: ["list", "drawNumber"],
  emits: ["update:list", "update:drawNumber", "close"],
  setup: (props, context) => {
    // 锁
    let lock = false;
    // 第一次抽奖
    let isFirst = ref(true);
    // 翻转
    const turning = ref(false);
    // 移动
    const move = ref(false);
    // 点击的index
    const click_index = ref(0);

    const shuffling = async () => {
      // 我知道啦，关闭蒙层
      if (!isFirst.value && !props.drawNumber) {
        context.emit("close");
        return;
      }

      if (lock || turning.value || !props.drawNumber) return;

      // 锁，不让重复点击
      lock = true;
      // 第一步，洗牌
      turning.value = !turning.value;
      turnAllPrizes(true);

      // 第二步，卡牌打乱
      await moving();

      // 二次洗牌
      context.emit("update:list", shuffle(props.list));

      // 第三步，卡牌回正
      await moving(false);
    };

    /**
     * 翻转所有卡牌
     */
    const turnAllPrizes = (turn: boolean) => {
      const list = props.list;
      const newList = list.map((item: IPrize) => {
        item.turn = turn;
        return item;
      });

      context.emit("update:list", newList);
    };

    /**
     * 抽奖
     */
    const lottery = debounce(
      (click: number) => {
        // 执行动画时，不许点击
        if (lock) return;

        click_index.value = click;
        dealPrizes();
      },
      500,
      {
        leading: true,
        trailing: false,
      }
    );

    /**
     * 处理奖品
     */
    const dealPrizes = () => {
      const list = props.list;

      // 点击的 index 先翻转
      list[click_index.value].turn = false;

      context.emit("update:list", list);

      // 其余的 0.5s 后翻转
      setTimeout(() => {
        turnAllPrizes(false);
        turning.value = !turning.value;
      }, 500);
      isFirst.value = false;

      context.emit("update:drawNumber", props.drawNumber - 1);
    };

    /**
     * 打乱牌组
     */
    const moving = (locked = true) => {
      if (!locked) {
        setTimeout(() => {
          // 锁，不让重复点击
          lock = locked;
        }, 1200);
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          move.value = !move.value;
          resolve("");
        }, 1000);
      });
    };

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
        };
      });

      context.emit("update:list", shuffle(newList));
    };

    onMounted(() => initList());

    return {
      isFirst,
      move,
      turning,
      lottery,
      shuffling,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";

$main-background-color: #e8f3ff;
$back-background-color: #ffe6a6;
$main-color: #1d7dfa;
$card-height: 220px;
$card-margin-tb: 20px;
$card-margin-lr: 10px;
$half-width: 50;

@function moveTranslateY($i) {
  @return if($i < 4, math.div($card-height, 2), -(math.div($card-height, 2)));
}

@function moveTranslateX($i) {
  @return if(
    $i < 4,
    (calc(#{$half-width - $i * 25}vw - 50%)),
    (calc(#{$half-width - ($i - 4) * 25}vw - 50%))
  );
}

@for $i from 0 through 7 {
  .move-#{$i} {
    transform: translate(moveTranslateX($i), moveTranslateY($i));
  }
}

.cards-panel {
  margin: 70px 0 80px;
  transform: translate3d(0, 0, 0);
  .card-item {
    flex-basis: 25%;
    height: $card-height;
    transition: 0.5s all ease-in-out;
    transform-style: preserve-3d;

    .card {
      width: 90%;
      height: 90%;
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
    .loser {
      background: rgba($color: #000000, $alpha: 0.5);
      width: 100%;
      height: 100%;
      border-radius: 10px;
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
    .empty {
      background-image: url("../assets/images/card_thanks_img.png");
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

.btn-panel {
  width: 570px;
  height: 88px;
  background: $main-background-color;
  border-radius: 44px;
  font-size: 34px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 700;
  letter-spacing: 4px;
  color: $main-color;
}

.check-prize {
  padding: 25px 0;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.65);
  line-height: 40px;
}
</style>
