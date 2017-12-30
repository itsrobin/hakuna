<template>
  <div class="form-contents">
    <div class="audit">
      <div style="width: 100%">
        <el-row type="flex" class="row-bg">
          <!--<el-col :span="4">-->
          <!--<el-dropdown>-->
          <!--<span class="el-dropdown-link">-->
          <!--&lt;!&ndash;下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>&ndash;&gt;-->
          <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item>黄金糕</el-dropdown-item>-->
          <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
          <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
          <!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
          <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
          <!--</el-col>-->
          <el-col :span="10">
            <el-input v-model="input" placeholder="请输入名称"></el-input>
          </el-col>
          <el-col :span="20">
          </el-col>
          <el-col :span="2">
            <el-button type="primary">搜索</el-button>
          </el-col>
        </el-row>
        <!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        @sort-change=sortChange
        @filter-change="filterTag">
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="注册时间"
          sortable='custom'
          :formatter="DateFormatter">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          column-key="userStatusList"
          :filters="[{ text: '会员', value: 2 }, { text: '管理员', value: 5 },{ text: '普通用户', value: 1 }]"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="checkStatus(scope.row.userStatus,'type')" close-transition>
              {{checkStatus(scope.row.userStatus)}}
















            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[50, 100, 150]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>

    </div>
  </div>
</template>


<script>
  import {formatDate} from '@/components/utils/DateUtil'
  import http from '@/components/utils/HttpUtil'
  export default {
    created () {
      this.getBookList(this.currentPage, this.pageSize)
    },
    methods: {
      sortChange (column) {
        this.sortMap[column.prop] = column.order
        let sortsArray = []
        for (let key in this.sortMap) {
          let val = this.sortMap[key]
          if (val === null) continue
          let s = key + ' ' + this.directory[val]
          sortsArray.push(s)
        }
        let sorts = sortsArray.join(',')
        this.getBookList(this.currentPage, this.pageSize, null, sorts)
      },
      checkStatus (value, type) {
        if (!type) {
          if (value === 0) {
            return '未激活'
          }
          if (value === 1) {
            return '普通会员'
          }
          if (value === 2) {
            return '会员'
          }
          if (value === 5) {
            return '管理员'
          }
        } else {
          if (value === 0) {
            return 'info'
          }
          if (value === 1) {
            return 'primary'
          }
          if (value === 2) {
            return 'success'
          }
          if (value === 5) {
            return 'danger'
          }
        }
      },
      filterTag (value) {
        let filters = {}
        for (let key in value) {
          filters[key] = value[key].join(',')
        }
        console.log(filters)
        this.getBookList(this.currentPage, this.pageSize, null, null, filters)
//        return row.userStatus === value
      },
      DateFormatter (row, column) {
        let date = new Date(row.gmtCreate)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
//      handleDelete (index, row) {
//        console.log(index, row)
//      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getBookList(this.currentPage, val)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getBookList(val, this.pageSize)
      },
      getBookList (pageNo, pageSize, userStatus, sorts, filters) {
        this.loading = true
        let params = new URLSearchParams()
        params.append('pageNo', pageNo)
//        params.append('sorts', pageNo)
        params.append('pageSize', pageSize)
        if (userStatus !== null && userStatus !== undefined) {
          params.append('userStatus', userStatus)
        }
        if (sorts !== null && sorts !== undefined) {
          params.append('sorts', sorts)
        }
        if (filters !== null && filters !== undefined) {
          for (let key in filters) {
            params.append(key, filters[key])
          }
        }
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        http.post('/private/user/list', params, config).then((res) => {
          if (res.status === 200) {
            let variable = res.data
            if (variable.success) {
              this.total = variable.data.size
              this.tableData = variable.data.users
              this.loading = false
            }
          }
        })
      }
    },
    data () {
      return {
        directory: {ascending: 'asc', descending: 'desc'},
        sortMap: {},
        order: ['1', '2', '3'],
        input: '',
        loading: true,
        currentPage: 1,
        pageSize: 50,
        total: 0,
        tableData: []
      }
    }
  }
</script>
<style>
  .audit {
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    font-size: 13px;
    margin-bottom: 20px;
    overflow: hidden;
    padding: 28px 5% 28px 30px;
    position: relative;
  }

  .form-contents {
    margin-top: 5px;
    width: calc(100% - 50px);
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
