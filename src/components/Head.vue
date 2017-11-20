<template>
  <div id="header">
    <div class="headerLayout">
      <div class="headerCon">
        <div class="header-extra">

          <div class="header-banner">
            <div></div>
          </div>
          <div id="mallSearch" class="mall-search">
            <form name="searchTop" action="//list.tmall.com/search_product.htm" class="mallSearch-form clearfix"
                  target="_top" acceptcharset="gbk" accept-charset="gbk">
              <fieldset>
                <div class="mallSearch-input clearfix">
                  <label for="mq" style="visibility: visible; display: none;">搜索 天猫 商品/品牌/店铺</label>
                  <div class="s-combobox" id="s-combobox-158" aria-pressed="false">
                    <div class="s-combobox-input-wrap">
                      <input type="text" name="q" accesskey="s" autocomplete="off" x-webkit-speech=""
                             x-webkit-grammar="builtin:translate" value="" id="mq" class="s-combobox-input"
                             role="combobox" aria-haspopup="true" title="请输入搜索文字" aria-label="请输入搜索文字" placeholder="多能酷睿新品  开启游戏办公新时代">
                    </div>
                    <!--<label for="mq" class="s-combobox-placeholder"-->
                           <!--style="color: rgb(102, 102, 102); visibility: visible;">多能酷睿新品  开启游戏办公新时代</label>-->
                  </div>
                  <button type="submit">搜索<s></s></button>
                  <input id="J_Type" type="hidden" name="type" value="p">
                  <input id="J_MallSearchStyle" type="hidden" name="style" value="">
                  <input id="J_Cat" type="hidden" name="cat" value="all">
                  <input type="hidden" name="vmarket" value="">
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
  #header {
    height: 130px;
    margin-top: 0 !important;
  }

  .headerLayout {
    width: 1230px;
    margin: 0 auto;
  }

  #mallSearch {
    float: right;
    padding-top: 25px;
    width: 390px;
    overflow: hidden;
  }

  #header #mallSearch {
    width: 625px;
    padding-top: 5px;
  }

  .mallSearch-form {
    border: solid #FF0036;
    border-width: 3px 0 3px 3px;
  }

  #header #mallSearch .mallSearch-form {
    border-width: 2px 0 2px 2px;
  }

  .mallSearch-input {
    background: #fff;
    height: 30px;
  }

  .header-banner {
    float: right;
    height: 70px;
    padding: 2px 0 0 102.5px;
    width: 200px;
  }

  #header #mallSearch button {
    width: 132px;
    height: 36px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 5px;
  }

  #mallSearch button, #tmallSearch button {
    position: absolute;
    z-index: 1;
  }

  #mallSearch #mq, #mallSearch fieldset, .mallSearch-input {
    position: relative;
  }

  #mallSearch button {
    position: absolute;
    right: 0;
    top: 0;
    width: 90px;
    border: 0;
    font-size: 16px;
    letter-spacing: 4px;
    cursor: pointer;
    color: #fff;
    background-color: #FF0036;
    height: 30px;
    overflow: hidden;
    font-family: '\5FAE\8F6F\96C5\9ED1', arial, "\5b8b\4f53";
  }

  #mallSearch #mq {
    color: #000;
    margin: 0;
    z-index: 2;
    width: 289px;
    height: 20px;
    line-height: 20px;
    padding: 5px 3px 5px 5px;
    outline: 0;
    border: none;
    font-weight: 900;
    background: url(data:image/gif;base64,R0lGODlhAQADAJEAAObm5t3d3ff39wAAACH5BAAAAAAALAAAAAABAAMAAAICDFQAOw==) repeat-x;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .s-combobox {
    float: left;
    height: 34px;
    font-size: 12px;
  }

  .s-combobox .s-combobox-input-wrap {
    position: relative;
    height: 30px;
    vertical-align: middle;
  }

  #header #mallSearch #mq {
    height: 36px;
    width: 491px;
    font: 16px/22px arial;
    box-sizing: border-box;
    background: 0 0;
  }

  #header #mallSearch label {
    font-size: 14px;
    line-height: 36px;
    height: 36px;
  }

  #mallSearch label, #tmallSearch label {
    max-width: 90%;
    overflow: hidden;
    white-space: nowrap;
  }

  #mallSearch label {
    color: #666;
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    position: absolute;
    left: 8px;
    top: 0;
    z-index: 1;
  }
</style>
