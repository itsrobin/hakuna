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
        style="width: 100%" v-loading="loading"
        max-height="500">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="书籍描述">
                <span>{{ props.row.bookDes }}</span>
              </el-form-item>
              <!--<el-form-item label="商品 ID">-->
                <!--<span>{{ props.row.id }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="店铺 ID">-->
                <!--<span>{{ props.row.shopId }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="商品分类">-->
                <!--<span>{{ props.row.category }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="店铺地址">-->
                <!--<span>{{ props.row.address }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="商品描述">-->
                <!--<span>{{ props.row.desc }}</span>-->
              <!--</el-form-item>-->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="书籍 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="书籍作者"
          prop="bookAuthor">
        </el-table-column>
        <el-table-column
          label="书籍名称"
          prop="bookName">
        </el-table-column>

        <el-table-column
          label="标签"
          prop="bookTag">
        </el-table-column>
        <el-table-column
          label="下载量"
          prop="downloadTime">
        </el-table-column>
        <el-table-column
          label="收藏量"
          prop="collectTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑










            </el-button>
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
  import http from '@/components/utils/HttpUtil'
  export default {
    created () {
      this.getBookList(this.currentPage, this.pageSize)
    },
    methods: {
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
      getBookList (pageNo, pageSize) {
        this.loading = true
        let params = new URLSearchParams()
        params.append('pageNo', pageNo)
        params.append('pageSize', pageSize)

        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        http.post('/private/book/list', params, config).then((res) => {
          if (res.status === 200) {
            let variable = res.data
            console.log(variable)
            if (variable.success) {
              this.total = variable.data.size
              this.tableData = variable.data.books
              this.loading = false
            }
          }
        })
      }
    },
    data () {
      return {
        input: '',
        loading: true,
        currentPage: 1,
        pageSize: 50,
        total: 0,
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
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
