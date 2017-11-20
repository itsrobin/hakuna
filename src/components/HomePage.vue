<template>
  <div>
    <TopBar></TopBar>
    <Screen></Screen>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import TopBar from '@/components/TopBar.vue'
  import Screen from '@/components/Screen.vue'
  export default {
    name: 'homepage',
    components: {
      TopBar, Screen
    }
  }
</script>
<style>

</style>

