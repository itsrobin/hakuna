<template>
  <div class="form-contents">
    <div class="audit">
      <div style="width: 60%">
        <!--<el-row type="flex" class="row-bg">-->
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
        <!--<el-col :span="10">-->
        <!--<el-input v-model="input" placeholder="请输入名称"></el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="20">-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
        <!--<el-button type="primary">搜索</el-button>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-form ref="newform" :model="newform" :rules="rules">
          <el-form-item prop="bookName" label="书籍名称">
            <el-input v-model="newform.bookName" placeholder="" style="width:60%">
            </el-input>
          </el-form-item>
          <el-form-item prop="bookAuthor" label="书籍作者">
            <el-tag
              :key="tag"
              v-for="tag in newform.bookAuthors"
              closable
              :disable-transitions="false"
              @close="handleAuthorClose(tag)">
              {{tag}}




            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="authorInputVisible"
              v-model="inputValue"
              ref="saveAuthorInput"
              size="small"
              @keyup.enter.native="handleAuthorInputConfirm"
              @blur="handleAuthorInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showAuthorInput">+ New Author</el-button>
          </el-form-item>
          <el-form-item label='书籍ISBN' prop="bookIsbn">
            <el-input v-model="newform.bookIsbn" placeholder="" style="width:60%"></el-input>
            <el-button type="primary" @click="getDoubanBook()" class="yes-btn">
              读取豆瓣书籍信息







            </el-button>
          </el-form-item>
          <el-form-item label='书籍描述' prop="bookDesc">
            <el-input v-model="newform.bookDesc" placeholder="" rows=6          type="textarea"
                      style="width:75%"></el-input>
          </el-form-item>
          <el-form-item label="书籍标签" prop="">
            <el-tag
              :key="tag"
              v-for="tag in newform.bookTags"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)">
              {{tag}}




            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="图书封面" prop="bookCover">
            <el-upload
              class="upload-demo"
              ref="uploadCover"
              :action="upload_url"
              :auto-upload="false"
              :file-list="newform.bookCovers"
              :before-upload="newCover"
              list-type="picture"
              accept=".jpg, .png">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
              <!--<div slot="tip" class="el-upload__tip">只能传(.jpg/.png)文件</div>-->
            </el-upload>
          </el-form-item>
          <el-row type="flex" class="row-bg">
            <div class="file-div">
              <el-form-item label="mobi" prop="mobi">
                <el-upload
                  class="upload-demo"
                  drag
                  ref="uploadMobi"
                  :action="upload_url"
                  :auto-upload="false"
                  :before-upload="newMobi"
                  accept=".mobi">
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div slot="tip" class="el-upload__tip">mobi格式图书上传，只能传(.mobi)文件</div>
                </el-upload>
              </el-form-item>
            </div>
            <div class="file-div">
              <el-form-item label="epub" prop="epub">
                <el-upload
                  class="upload-demo"
                  drag
                  ref="uploadEpub"
                  :action="upload_url"
                  :auto-upload="false"
                  :before-upload="newEpub"
                  accept=".epub">
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div slot="tip" class="el-upload__tip">epub格式图书上传，只能传(.epub)文件</div>
                </el-upload>
              </el-form-item>
            </div>
            <div class="file-div">
              <el-form-item label="txt" prop="txt">
                <el-upload
                  class="upload-demo"
                  drag
                  ref="uploadTxt"
                  :action="upload_url"
                  :auto-upload="false"
                  :before-upload="newTxt"
                  accept=".txt">
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div slot="tip" class="el-upload__tip">txt格式图书上传，只能传(.txt)文件</div>
                </el-upload>
              </el-form-item>
            </div>
          </el-row>
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="newSubmitForm()" class="yes-btn">
              确 定















            </el-button>
            <el-button @click="resetForm('newform')">
              重 置















            </el-button>
          </el-form-item>
        </el-form>
        <!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
      </div>

    </div>
  </div>
</template>


<script>
  import http from '@/components/utils/HttpUtil'
  export default {
    created () {
    },
    methods: {
      newSubmitForm () {
        this.$refs['newform'].validate((valid) => {
          if (valid) {
            this.uploadForm.append('bookName', this.newform.bookName)
            this.uploadForm.append('bookTag', this.newform.bookTag)
            this.uploadForm.append('bookAuthor', this.newform.bookAuthors)
            this.uploadForm.append('bookIsbn', this.newform.bookIsbn)
            this.uploadForm.append('bookDesc', this.newform.bookDesc)

//            let config = {
//              headers: {
//                'Content-Type': 'application/x-www-form-urlencoded'
//              }
//            }
            this.$refs.uploadTxt.submit()   // 提交时触发了before-upload函数
            this.$refs.uploadMobi.submit()
            this.$refs.uploadEpub.submit()

            http.post('/private/upload/book', this.uploadForm).then(res => {
              if (res.code === 400) {
                this.$message.error(res.error)
              } else if (res.code === 200) {
                this.$message.success('上传成功！')
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getDoubanBook () {
        const isbn = this.newform.bookIsbn
        if (isbn === null || isbn === '') {
          this.$message.error('isbn不能为空')
        } else {
          http.get('/public/search/douban/' + isbn).then(res => {
            console.log(res)
            if (res.status === 500) {
              this.$message.error(res.error)
            } else if (res.status === 200) {
              console.log(res)
              let variable = res.data
              if (variable.success) {
                const data = variable.data
                console.log(data)
                this.newform.bookName = data.title
                this.newform.bookAuthors = data.authors
                this.newform.bookName = data.title
                this.newform.bookTags = data.tags
                this.newform.bookDesc = data.bookDesc
                this.newform.bookCovers = []
                for (const index in data.bookCovers) {
                  this.newform.bookCovers.push({'name': data.bookCovers[index], 'url': data.bookCovers[index]})
                }
//                this.newform.bookCovers = data.bookCovers
              } else {
                this.$message.error('获取豆瓣书籍信息失败')
              }
            }
          })
        }
      },
      resetForm () {
        this.newform = {
          bookName: null,
          bookTags: [],
          bookAuthors: [],
          bookIsbn: null,
          bookDesc: null,
          bookCovers: []
        }
      },
      newTxt (file) {   // before-upload
        this.uploadForm.append('txt', file)
        return false
      },
      newCover (file) {
        this.uploadForm.append('cover', file)
      },
      newEpub (file) {
        this.uploadForm.append('epub', file)
        return false
      },
      newMobi (file) {
        this.uploadForm.append('mobi', file)
        return false
      },
      handleTagClose (tag) {
        this.newform.bookTags.splice(this.newform.bookTags.indexOf(tag), 1)
      },
      handleAuthorClose (tag) {
        this.newform.bookAuthors.splice(this.newform.bookAuthors.indexOf(tag), 1)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      showAuthorInput () {
        this.authorInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveAuthorInput.$refs.input.focus()
        })
      },

      handleAuthorInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.newform.bookAuthors.push(inputValue)
        }
        this.authorInputVisible = false
        this.inputValue = ''
      },
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.newform.bookTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    },
    data () {
      return {
        upload_url: 'aaa',       // 随便填一个，但一定要有
        uploadForm: new FormData(),   // 一个formdata
        rules: {},     // 用到的规则
        newform: {
          bookName: null,
          bookTags: [],
          bookAuthors: [],
          bookIsbn: null,
          bookDesc: null,
          bookCovers: []
        },
        inputVisible: false,
        authorInputVisible: false,
        inputValue: ''
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

  input[type=file] {
    display: none;
  }

  .file-div {
    margin-right: 20px;
  }

  /*书籍标签*/
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
