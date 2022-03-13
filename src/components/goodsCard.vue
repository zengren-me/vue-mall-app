<template>
        <div class="card van-hairline--bottom">
            <div class="img-wrapper">
                <img :src="images[0]" ref="img">
            </div>
            <div class="content-wrapper">
                <div class="title overflow-hidden">{{ title }}</div>
                <div class="desc overflow-hidden">{{ desc }}</div>
                <div class="tags overflow-hidden">
                    <div v-for="(tag, i) in tags" :key="i">{{ tag }}</div>
                </div>
                <div class="prices">
                    <div class="price-off">￥{{ price }}</div>
                </div>
                 <div class="counter">
                    <div @touchend="setStorage(-1)" v-if="counterMap[id]">
                        <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt="">
                    </div>
                    <div class="number" v-if="counterMap[id]">{{ counterMap[id] }}</div>
                    <div @touchend="setStorage(1)">
                        <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt="">
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import animate from '../tools/animate';

export default {
  props: ['title', 'desc', 'tags', 'price', 'id', 'images', 'fly'],
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
  },
  methods: {
    ...mapMutations(['changeStorage']),
    setStorage(value) {
      this.changeStorage({ id: this.id, value });
      if (value === -1 || !this.fly) {
        return;
      }
      // 图片的位置
      const { left: startX, top: startY } = this.$refs.img.getBoundingClientRect();
      // 图片宽高
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
      // 图片地址
      const imgSrc = this.images[0];
      // 购物车位置
      const shopCar = document.getElementById('shop-car');
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();
      // 购物车宽高
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;

      animate(imgWidth, imgHeight, startX, startY, endX, endY, imgSrc);
    },
  },
};
</script>

<style lang="less" scoped>
.card {
    width: 100%;
    height: 100px;
    display: flex;
    padding-bottom: 5px;
    box-sizing: border-box;

    .img-wrapper {
        width: 90px;
        height: 90px;
        margin-right: 20px;

        img {
            width: 90px;
            height: 90px;
        }
    }

    .content-wrapper {
        padding-top: 5px;
        position: relative;
        flex: 1;

        .title {
            width: 170px;
            font-size: 13px;
        }

        .desc {
            width: 170px;
            color: #aaa;
            font-size: 11px;
            margin:5px 0 4px;
        }

        .tags {
            width: 100%;

            > div{
                display: inline-block;
                box-sizing: border-box;
                padding: 2px;
                font-size: 10px;
                color: #aaa;
                border: 1px solid #aaa;
                border-radius: 5px;
                margin-right: 5px;
            }
        }

        .prices {
            display: flex;
            align-items: center;
            margin-bottom: 4px;

            .price-off {
                font-size: 14px;
                color: #ff1a90;
                font-weight: 600;
                margin-right: 5px;
            }
        }

        .counter {
            position: absolute;
            right: 15px;
            bottom: 12px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            > div:not(.number) {
                width: 16px;
                height: 16px;

                img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                }
            }

            .number {
                padding: 0 5px;
                height: 22px;
                line-height: 22px;
            }
        }
    }

    .overflow-hidden {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
