<template>
  <div>
  <nav class="navbar navbar-inverse navbar-fixed-top fixHeight"
       role="navigation">
    <div class="navbar-header offset">
      <a class="navbar-brand" href="../find/hot"><font size="2px">热门</font></a>
      <a class="navbar-brand" href="../find/all"><font size="2px">上新</font></a>
      <a class="navbar-brand" href="../find/random"><font size="2px">随机</font></a>
    </div>

    <div class="log_in">
      <div class="pre-login">
        <!--<img alt="" class="img-circle" src="/static/images/userico/anonymous.png">-->
        <span id="user_dropdown"><a data-toggle="modal" data-target="#login_modal"
                                    class="navbar-link">登录</a>
			</span>
      </div>
    </div>

  </nav>

  <!--
      <div class="header_top_wrap">
          <h1>4everyone</h1>
          <div class="container">
              <div class="slogan">
                  It's suitable for corporate, creative, personal,<br>noncommercial
                  needs!
              </div>
          </div>
      </div>
  -->
  <!--<header class="home_page scrolled " id="navs">-->
    <!--<div class="container">-->
      <!--<div class="head-row">-->
        <!--<a class="logo" href="../find/all">4everyone</a>-->
        <!--<div class="col-xs-4 col-xs-offset-2 search">-->
          <!--<form action="../find/search">-->
            <!--<div class="input-group">-->
              <!--<input type="text" name="param" class="form-control"> <span-->
              <!--class="input-group-btn">-->
							<!--<button class="btn btn-default" id="search" type="submit">search</button>-->
						<!--</span>-->
            <!--</div>-->
          <!--</form>-->
        <!--</div>-->
        <!--<div class="col-xs-3">-->
          <!--<div id="myCarousel" class="carousel slide">-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="head-row">-->
          <!--<ul class="nav menu">-->
            <!--<li class="${index}">-->
              <!--<a href="../find/all"><i class="fa fa-diamond"></i> <span class="nav-label">首页</span></a>-->
            <!--</li>-->

            <!--<li class="${findBook}">-->
              <!--<a href="../find/findBook"><i class="fa fa-flask"></i> <span class="nav-label">&nbsp;没有我们找不到的书</span> </a>-->
            <!--</li>-->
            <!--<li class="${readHelp}">-->
              <!--<a href="../find/readHelp"><i class="fa fa-flask"></i> <span class="nav-label">&nbsp;阅读帮助</span> </a>-->
            <!--</li>-->
            <!--<li class="${aboutUs}">-->
              <!--<a href="../find/aboutUs"><i class="fa fa-flask"></i> <span class="nav-label">&nbsp;关于我们</span> </a>-->
            <!--</li>-->

          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;/container&ndash;&gt;-->
    <!--</div>-->
  <!--</header>-->
  </div>
</template>

<!--<script src="http://cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>-->
<!--<script type="text/javascript" src="../js/customjs/head.js"></script>-->
<style>
  .scorllImg {
    width: 300px;
    height: 130px !important;
  }

  #myCarousel {
    margin-left: 73px;
    position: absolute;
    width: 300px;
    height: 130px;
  }

  .navbar-fixed-top, .navbar-static-top {
    background: #181919;
    border-color : #FFFFFF;
  }

  .navbar-inverse .navbar-brand {
    color:#9d9d9d
  }

  .offset {
    margin-left: 54px;
  }


  .log_in {
    width: 100px;
    position: absolute;
    margin-top: 15px;
    right:0;
    top:0;
  }

  .pre-login {
    position: relative;
    float:left;
  }

  a {
    cursor: pointer;
  }

  .head-row {
    margin-left: 11px;
    margin-right: -15px;
  }

</style>
