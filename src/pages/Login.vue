<template>
  <div class="page">
    <div class="loginwarrp">
      <div class="logo">管理员登陆</div>
      <div class="login_form">
        <form id="Login" name="Login" method="post" onsubmit="" action="">
          <li class="login-item">
            <span>用户名：</span>
            <input type="text" id="username" v-model="userName" class="login_input">
            <span id="count-msg" class="error"></span>
          </li>
          <li class="login-item">
            <span>密　码：</span>
            <input type="password" v-model="password" class="login_input">
            <span id="password-msg" class="error">{{errorMsg}}</span>
          </li>
          <li class="login-item verify">
            <span>验证码：</span>
            <input type="text" name="CheckCode" class="login_input verify_input">
          </li>
          <img src="http://mpic.tiankong.com/448/671/4486717c8a641824c46b1fb9fe1397b9/640.jpg" border="0"
               class="verifyimg"/>
          <div class="clearfix"></div>
          <li class="login-sub">
            <input type="submit" @click="submitForm($event)" value="提交"/>
            <input type="reset" name="Reset" value="重置"/>
          </li>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/components/utils/HttpUtil'
  import $ from 'jquery'
  export default {
    created () {
      let config = {
        vx: 4,
        vy: 4,
        height: 2,
        width: 2,
        count: 100,
        color: '121, 162, 185',
        stroke: '100, 200, 180',
        dist: 6000,
        e_dist: 20000,
        max_conn: 10
      }
      this.canvasInit(config)
    },
    data () {
      return {
        errorMsg: '',
        userName: null,
        password: null
      }
    },
    methods: {
      submitForm (event) {
        event.preventDefault()
        let formData = new FormData()
        formData.append('userName', this.userName)
        formData.append('password', this.password)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        http.post('/user/login', formData, config).then((res) => {
          if (res.status === 200) {
            let variable = res.data
            console.log(variable)
            if (variable.success) {
              $('canvas').remove()
              this.$router.push('/app')
            }
          }
        })
      },
      checkPassword () {
//        let password = $('#password').val()
        let password
        if (password === null || password === '') {
          // 提示错误
//          $('#password-msg').html("密码不能为空");
          return false
        }
        let reg = /^\w{3,10}$/
        if (!reg.test(password)) {
//          $('#password-msg').html("输入3-10个字母或数字或下划线");
          return false
        }
//        $('#password-msg').empty();
        return true
      },
      getElementByTag (name) {
        return document.getElementsByTagName(name)
      },
      getELementById (id) {
        return document.getElementById(id)
      },
      canvasInit (canvasConfig) {
        canvasConfig = canvasConfig || {}
//        let html = this.getElementByTag('html')[0]
        let body = this.getElementByTag('body')[0]
//        let canvasDiv = this.getELementById('canvas-particle')
        let canvasObj = document.createElement('canvas')

        let canvas = {
          element: canvasObj,
          points: [],
          // 默认配置
          config: {
            vx: canvasConfig.vx || 4,
            vy: canvasConfig.vy || 4,
            height: canvasConfig.height || 2,
            width: canvasConfig.width || 2,
            count: canvasConfig.count || 100,
            color: canvasConfig.color || '0, 0, 255',
            stroke: canvasConfig.stroke || '130,255,255',
            dist: canvasConfig.dist || 6000,
            e_dist: canvasConfig.e_dist || 20000,
            max_conn: 10
          }
        }

        // 获取context
        if (canvas.element.getContext('2d')) {
          canvas.context = canvas.element.getContext('2d')
        } else {
          return null
        }

        body.style.padding = '0'
        body.style.margin = '0'
        // body.replaceChild(canvas.element, canvasDiv);
        body.appendChild(canvas.element)

        canvas.element.style = 'position: absolute; top: 0; left: 0; z-index: -1;'
        this.canvasSize(canvas.element)
        window.onresize = () => {
          this.canvasSize(canvas.element)
        }
        body.onmousemove = function (e) {
          let event = e || window.event
          canvas.mouse = {
            x: event.clientX,
            y: event.clientY
          }
        }
        document.onmouseleave = function () {
          canvas.mouse = undefined
        }
        setInterval(() => {
          this.drawPoint(canvas)
        }, 40)
      },
      // 设置canvas大小
      canvasSize (canvas) {
        canvas.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth
        canvas.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight
      },
      // 画点
      drawPoint (canvas) {
        let context = canvas.context
        let point
//        let dist
        context.clearRect(0, 0, canvas.element.width, canvas.element.height)
        context.beginPath()
        context.fillStyle = 'rgb(" + canvas.config.color + ")'
        for (let i = 0, len = canvas.config.count; i < len; i++) {
          if (canvas.points.length !== canvas.config.count) {
            // 初始化所有点
            point = {
              x: Math.floor(Math.random() * canvas.element.width),
              y: Math.floor(Math.random() * canvas.element.height),
              vx: canvas.config.vx / 2 - Math.random() * canvas.config.vx,
              vy: canvas.config.vy / 2 - Math.random() * canvas.config.vy
            }
          } else {
            // 处理球的速度和位置，并且做边界处理
            point = this.borderPoint(canvas.points[i], canvas)
          }
          context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height)

          canvas.points[i] = point
        }
        this.drawLine(context, canvas, canvas.mouse)
        context.closePath()
      },

      // 边界处理
      borderPoint (point, canvas) {
        let p = point
        if (point.x <= 0 || point.x >= canvas.element.width) {
          p.vx = -p.vx
          p.x += p.vx
        } else if (point.y <= 0 || point.y >= canvas.element.height) {
          p.vy = -p.vy
          p.y += p.vy
        } else {
          p = {
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx,
            vy: p.vy
          }
        }
        return p
      },

      // 画线
      drawLine (context, canvas, mouse) {
        let dist
        context = context || canvas.context
        for (let i = 0, len = canvas.config.count; i < len; i++) {
          // 初始化最大连接数
          canvas.points[i].max_conn = 0
          // point to point
          for (let j = 0; j < len; j++) {
            if (i !== j) {
              dist = Math.round(canvas.points[i].x - canvas.points[j].x) * Math.round(canvas.points[i].x - canvas.points[j].x) +
                Math.round(canvas.points[i].y - canvas.points[j].y) * Math.round(canvas.points[i].y - canvas.points[j].y)
              // 两点距离小于吸附距离，而且小于最大连接数，则画线
              if (dist <= canvas.config.dist && canvas.points[i].max_conn < canvas.config.max_conn) {
                canvas.points[i].max_conn++
                // 距离越远，线条越细，而且越透明
                context.lineWidth = 0.5 - dist / canvas.config.dist
                context.strokeStyle = 'rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.dist) + ")'
                context.beginPath()
                context.moveTo(canvas.points[i].x, canvas.points[i].y)
                context.lineTo(canvas.points[j].x, canvas.points[j].y)
                context.stroke()
              }
            }
          }
          // 如果鼠标进入画布
          // point to mouse
          if (mouse) {
            dist = Math.round(canvas.points[i].x - mouse.x) * Math.round(canvas.points[i].x - mouse.x) +
              Math.round(canvas.points[i].y - mouse.y) * Math.round(canvas.points[i].y - mouse.y)
            // 遇到鼠标吸附距离时加速，直接改变point的x，y值达到加速效果
            if (dist > canvas.config.dist && dist <= canvas.config.e_dist) {
              canvas.points[i].x = canvas.points[i].x + (mouse.x - canvas.points[i].x) / 20
              canvas.points[i].y = canvas.points[i].y + (mouse.y - canvas.points[i].y) / 20
            }
            if (dist <= canvas.config.e_dist) {
              context.lineWidth = 1
              context.strokeStyle = 'rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.e_dist) + ")'
              context.beginPath()
              context.moveTo(canvas.points[i].x, canvas.points[i].y)
              context.lineTo(mouse.x, mouse.y)
              context.stroke()
            }
          }
        }
      }
    }
  }
</script>

<style>

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul, li {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: #333;
    display: block;
  }

  body {
    font-size: 14px;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    content: ".";
    display: block;
    visibility: hidden;
    height: 0;
    clear: both;
  }

  .fl, .l {
    float: left;
  }

  .fr, .r {
    float: right;
  }

  /*margin-top*/
  .mt10 {
    margin-top: 10px;
  }

  .mt15 {
    margin-top: 15px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .mt5 {
    margin-top: 5px;
  }

  .mt0 {
    margin-top: 0px;
  }

  /*padding-left*/
  .pl15 {
    padding-left: 15px;
  }

  body {
    background: #f9f9f9
  }

  .loginwarrp {
    margin: 250px auto;
    width: 400px;
    padding: 30px 50px;
    background: #FFFFFF;
    overflow: hidden;
    font-size: 14px;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif
  }

  .loginwarrp .logo {
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  .loginwarrp .login_form {
    margin-top: 15px;
  }

  .loginwarrp .login_form .login-item {
    padding: 2px 8px;
    border: 1px solid #dedede;
    border-radius: 8px;
    margin-top: 10px;
  }

  .loginwarrp .login_form .login_input {
    height: 35px;
    border: none;
    line-height: 35px;
    width: 200px;
    font-size: 14px;
    outline: none;
  }

  .loginwarrp .login_form .verify {
    float: left;
  }

  .loginwarrp .verify .verify_input {
    width: 160px;
  }

  .loginwarrp .verifyimg {
    height: 30px;
    margin: 20px 0 0 20px;
  }

  .loginwarrp .login-sub {
    text-align: center;
  }

  .loginwarrp .login-sub input {
    margin-top: 15px;
    background: #45B549;
    line-height: 35px;
    width: 150px;
    color: #FFFFFF;
    font-size: 16px;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    border: none;
    border-radius: 5px;
  }

  .loginwarrp .login_form .login-item .error {
    color: #F00;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  }
</style>
