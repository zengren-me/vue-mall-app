<template>
    <div class="one-tab-container" ref="tabContainer">
        <div class="tab-item"
        ref="tabItem"
        v-for="(item, i) in tabList"
        :key="item.title"
        :class="{ active: index === i }"
        @touchend="scrollTo(i, $event)"
        @touchstart="move = false"
        @touchmove="move = true"
        >
            <div class="img-wrapper">
                <img :src="item.imgURL" alt="">
            </div>
            <div class="item-title">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import moveTo from '../utils/moveTo';

export default {
  data() {
    return {
      move: false,
      index: 0,
      tabList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  async created() {
    await this.getSideList(this.tabList[0].title);
  },
  methods: {
    ...mapActions(['getSideList']),
    ...mapActions(['getGoodsList']),
    scrollTo(index) {
      if (this.move) {
        return;
      }
      this.index = index;
      const item = this.$refs.tabItem[index];
      const oneTab = this.$refs.tabContainer;
      const itemWidth = item.offsetWidth;
      const itemLeft = item.getBoundingClientRect().left;
      const tabWidth = oneTab.offsetWidth;
      // 让点击的类目缓慢移向中间
      moveTo(oneTab.scrollLeft, itemLeft + itemWidth / 2 - tabWidth / 2, oneTab, 'scrollLeft');
      this.getSideList(this.tabList[index].title);
    },
  },
};
</script>

<style lang="less" scoped>
.one-tab-container {
    width: 375px;
    height: 94px;
    overflow: auto;
    display: flex;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    .tab-item {
        width: 50px;
        height: 70px;
        padding: 10px 5px;
        .img-wrapper {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid transparent;
            border-radius: 23px;
            background-color: #fff;
            img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }
        .item-title {
            font-size:12px;
            text-align: center;
            margin-top: 5px;
        }
        &.active {
            .img-wrapper {
                border-color: #d13193;
            }
            .item-title {
                background-color: #d13193;
                color: #fff;
                font-weight:bold;
                border-radius: 30px;
            }
        }
    }

}
</style>
