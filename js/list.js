  // logo的链接
  $('.header_nav h1').click(function() {
      location.href = './index.html'
  })

  //  吸顶效果 
  if ($.cookie('login')) {
      $('.header_login a').text("欢迎" + $.cookie('login'))
      console.log(1);
  }
  $(document).scroll(function() {
      var scroH = $(document).scrollTop(); //滚动高度

      if (scroH > 500) { //距离顶部大于100px时
          $(".top_search").css("display", "block");
      } else {
          $(".top_search").css("display", "none");
      }
  });



  function fun(atr) {
      // 渲染页面数据
      let list = document.querySelector(".list");
      let page = document.querySelector(".page");
      let sort = $('.cloth_sort').text() ? $('.cloth_sort').text() : "裙子";
      let defaultInfo = {
              len: 20,
              num: 1,
              sort: sort
          }
          //   console.log(defaultInfo.sort);

      $.ajax({
          url: atr,
          method: 'get',
          data: {
              start: defaultInfo.num,
              len: defaultInfo.len,
              sort: defaultInfo.sort
          },
          dataType: 'json',
          async: true,
          success: function(res) {
              // console.log(res);
              getData();
              $('.m-style').pagination({
                  totalData: res.total,
                  showData: 20,
                  coping: true,
                  prevContent: '上一页',
                  nextContent: '下一页',
                  homePage: '首页',
                  endPage: '末页',
                  current: 1,
                  jump: true,
                  callback: function(api) {
                      // api 得到是 pagination 的对象
                      console.log(api.getCurrent());
                      defaultInfo.num = api.getCurrent();
                      getData();
                      scrollTo(0, 0)
                  }
              });
          }
      })


      function getData() {
          $.ajax({
              url: atr,
              method: 'get',
              data: {
                  start: defaultInfo.num,
                  len: defaultInfo.len,
                  sort: defaultInfo.sort
              },
              dataType: 'json',
              async: true,
              success: function(res) {
                  // console.log(res);
                  renderHtml(res.list);
              }
          })
      }


      // 渲染数据
      function renderHtml(data) {
          let str = '';

          data.forEach((item, index) => {
              str += `<a href="../html/detail.html?id=${item.goods_id}"> <div class="product">
      <img src="${item.goods_img}" alt="" class="product_img">
      <div class="product_detail">
          <h4>
              ${item.goods_name}
          </h4>
          <p>
              <span>￥${item.goods_price}</span><a class="through_line">￥${item.goods_money}</a>
              <i><img src="../img/star_03.jpg" alt="">574</i>

          </p>
      </div>
  </div></a>`;
          })

          $('.content_product').html(str)
      }

  }

  // 直接渲染页面
  fun('../api/getData.php');
  //   综合排序
  $('.synthesis').click(function() {
          fun('../api/getData.php');
      })
      //   销量排序
  $('.sales').click(function() {
          fun('../api/salesSorted.php');
      })
      //   价格排序

  $('.priceSorted').click(function() {
      fun('../api/priceSorted.php');
  })

  //   排他思想实现分类转换
  $('.content_nav_top ul li').click(function() {
      $('.content_nav_top ul li').removeClass("cloth_sort");
      $(this).addClass("cloth_sort");
      fun('../api/getData.php');
  })