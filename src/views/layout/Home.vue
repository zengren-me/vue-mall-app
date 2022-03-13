<template>
  <div class="home">
      <router-view></router-view>
      <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/tabBar.vue';

export default {
  components: {
    TabBar,
  },
};
</script>

<style scoped>
</style>
