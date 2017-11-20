<template>
  <div>
    <LeftBar></LeftBar>
    <div class="second-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LeftBar from '@/components/LeftBar.vue'
  export default {
    name: 'projectinner',
    data () {
      return {
        toggleStatus: false
      }
    },
    created () {
      // default router
//      if (this.$route.path.split('/').length === 4) {
//        // this.$router.push(`${this.$route.path}/datasource`)
//        this.$router.push(`${this.$route.path}/info`)
//      }
//      this.$root.$on('toggleStatus', toggleStatus => {
//        this.toggleStatus = toggleStatus
//      })
    },
    watch: {
      '$route.path' () {
        // if (this.$route.path.split('/').length < 4) {
        //   this.$router.push(`${this.$route.path}/datasource`)
        // }
      }
    },
    components: {
      LeftBar
    }
  }
</script>

<style>
  .second-main {
    margin-left: 300px;
    padding-top: 5px;
  }
</style>

