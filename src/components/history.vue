<template>
    <div class="history-container">
        <h4>历史记录:</h4>
        <div
        class="history-item"
        v-for="item in historyList"
        :key="item.value"
        @click="onSearch(item.value)"
        >
        {{ item.value }}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    historyList: {
      require: true,
      default: [],
    },
  },
  methods: {
    onSearch(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="less" scoped>
    .history-container {
        width: 350px;
        position: absolute;
        top: 60px;
        left: 20px;

        .history-item {
            padding: 15px;
            background-color: #eee;
            border-radius: 10px;
            display: inline-block;
            margin: 0 0 10px 10px;
        }
    }
</style>
