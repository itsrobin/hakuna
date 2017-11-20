<template>
  <div class="leftBar">
    <el-row class="tac">
      <el-col>
        <el-menu
          :defaultActive=defaultActive
          class="el-menu-vertical-demo"
          @open="handleOpen"
          :router=useRouter
          :defaultOpeneds=defaultOpen
          @close="handleClose">
          <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span>初审</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<template slot="title">分组一</template>-->
          <!--<el-menu-item index=app>选项1</el-menu-item>-->
          <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item-group title="分组2">-->
          <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-submenu index="1-4">-->
          <!--<template slot="title">选项4</template>-->
          <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
          <!--</el-submenu>-->
          <!--</el-submenu>-->
          <!--<el-menu-item index="2">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">导航二</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">导航三</span>-->
          <!--</el-menu-item>-->

          <div v-for="(submenu,index) in barMenus" :key="index">
            <el-submenu v-if="submenu.groups !== null" :index="submenu.index">
              <template slot="title">
                <i :class="submenu.icoClass"></i>
                <span>{{submenu.name}}</span>
              </template>
              <el-menu-item-group v-for="(group,index) in submenu.groups" :key="index">
                <template slot="title">{{group.groupName}}</template>
                <el-menu-item v-for="(item,index) in group.items" :key="index" :index=" rootRouter + '/'+ item.index">
                  {{rootRouter + '/' + item.index}}

                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="submenu.index">
              <i :class="submenu.icoClass"></i>
              <span slot="title">{{submenu.name}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import fixMenus from '@/constant/menus'
  export default {
    created () {
      let root = this.$route.path.split('/')
      if (root.length === 3) {
        this.rootRouter = root[2]
      } else {
        this.rootRouter = root[root.length - 2]
      }
//      this.$router.push(this.rootRouter)
//      this.firstIndex = 'audit'
      console.log(this.rootRouter)
    },
    data () {
      return {
        useRouter: true,
        firstIndex: null,
        rootRouter: null,
        barMenus: fixMenus.menu,
        defaultOpen: ['menu1'],
        defaultActive: 'p/audit'
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    background: #f9f9f9
  }

  .leftBar {
    position: fixed;
    width: 280px;
    height: calc(95vh - 51px);
    border: 1px solid #e6e6e6;
    margin-left: 10px;
    margin-top: 10px;
    /*margin-bottom: 10px;*/
    box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, .075);
    background: #ffffff
  }
</style>
