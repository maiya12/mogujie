let car_content = $('.car_content');

if ($.cookie('login')) {
    $('.header_login a').text("欢迎" + $.cookie('login'))
    console.log(1);
}
// 购物车未登入与登入之间切换处理
let username = $.cookie('login');
// console.log(username);
if (!username) {

    $('.car').css('height', '450');
    $('.sure').click(function() {
        location.href = '../html/login.html'
        localStorage.setItem('url', './car.html');
    })
    $('.close').click(function() {
        location.href = '../html/login.html'
        localStorage.setItem('url', './car.html');
    })
} else {
    $('body').css('background', '0');
    $('.header').css('opacity', "1");
    $('.header_nav').css('opacity', "1");
    $('.footer').css('opacity', "1");
    $('.sessionk').css('opacity', "0");
    $('.car_content').css('display', "block");
    getData();

}


// 获取数据库信息
function getData() {
    $.ajax({
        url: '../api/getCarData.php',
        method: 'get',
        data: {
            username: username,
        },
        dataType: 'json',
        async: true,
        success: function(res) {
            console.log(res);
            // 先把数据存放到本地
            localStorage.setItem('goodsList', JSON.stringify(res));

            readData(res);
            caozuo()
        }
    })
}
// 购物车渲染数据
function readData(res) {
    let total = shopNum(res);
    let str = ` 
    
    <h3>
    <span class="active">全部商品</span>
    <span>优惠</span>
    <span>库存紧张</span>
    </h3>
    <div class="select">
        <input type="checkbox" > 选项 <span>商品信息</span>
    </div>
        <div class="car_product ">
    `;
    res.forEach(function(item) {
        str += `
       <div class="car_product_item clearFix">
       <div class="car_product_title">
           <input type="checkbox" class="shopCheck" ${item.is_select==1 ?'checked':''} goods_id="${item.goods_id}">
           <span>梦范蝶衣 
                           <img src="../img/chat_03.jpg" alt="">
                       </span>
           <i>
                           <img src="../img/dian_03.jpg" alt="">满80元见减3
                       </i>
           <a href=""> <img src="../img/youhuijuan_03.jpg" alt=""></a>
       </div>
       <div class="car_product_Text clearFix ">
           <div class="checkbox">
               <input type="checkbox" class="productCheck" ${item.is_select==1 ?'checked':''} goods_id="${item.goods_id}" >
           </div>
           <div class="productMess ">
               <img src="${item.goods_img}" alt="">
               <div class="productMessT">
                   <h4>${item.goods_name}</h4>
               </div>

           </div>
           <div class="productColor">
               <p>
                   <i>颜色</i>
                   <span>${item.good_color}</span>
               </p>
               <p>
                   <i>尺码</i>
                   <span>${item.good_size}</span>
               </p>
           </div>
           <div class="productPrice">
               <p class="productPM">
                   ￥${item.goods_money}
               </p>
               <p class="productPP">
                   ${item.goods_price}
               </p>
               <p class="productN">
                   优惠价
               </p>
           </div>
           <div class="productNum" goods_id="${item.goods_id}">
               <span class="minus">-</span>
               <input type="text" value="${item.cart_number}">
               <span class="add">+</span>
           </div>
           <div class="productNp">
           ${(item.goods_price*item.cart_number).toFixed(2)}
           
           </div>
           <div class="del" goods_id="${item.goods_id}">
               删除
           </div>
       </div>
   </div>
       `;
    });
    let allChecked = res.every(item => {
        return item.is_select == 1;
    });

    str += `
    </div>
    <div class="car_footer clearFix">
    <div class="car_footer_caozuo">
        <input type="checkbox" id="All" ${allChecked?'checked' :''}>
        <span >全选 </span>
        <i class="SecondDel">删除</i>
        <i class="allDel">清空购物车</i>
        <a> 移入收藏夹</a>
    </div>
    <div class="car_pt">
        <span>共有<i class="totalNum">${total.totalNum}</i>件商品，总计：<i class="totalPrice">￥${(total.totalPrice).toFixed(2)}</i></span>
        <button class="pay">去付款  ></button>
    </div>
</div>
    `;

    car_content.html(str);
}

// 点击事件的操作
function caozuo() {
    car_content.click(function() {
        let e = window.event;

        // 单选按钮
        if (e.target.className == "productCheck") {

            let id = e.target.getAttribute("goods_id");
            let data = JSON.parse(localStorage.getItem("goodsList"));
            data.forEach(item => {
                    if (item.goods_id == id) {
                        item.is_select = e.target.checked ? 1 : 0;
                    }
                })
                //把修改额数据存储到本地存储中去
            localStorage.setItem("goodsList", JSON.stringify(data));
            // 重新加载页面
            readData(data);
        }
        // 全选按钮
        if (e.target.id == "All") {
            let data = JSON.parse(localStorage.getItem('goodsList'));
            data.forEach(item => {
                e.target.checked ? item.is_select = 1 : item.is_select = 0

            });
            localStorage.setItem('goodsList', JSON.stringify(data));
            readData(data);
            if (e.target.checked) {
                $('.pay').css("background", "#ff5783");
            } else {
                $('.pay').css("background", "#d8d8d8");
            }

        }

        //删除按钮
        if (e.target.className == "del") {
            let id = e.target.getAttribute("goods_id");
            console.log(id);

            let data = JSON.parse(localStorage.getItem('goodsList'));
            let res2 = data.filter(item => {
                    return item.goods_id != id;
                })
                // console.log(id);
            $.ajax({
                url: '../api/removeCarData.php',
                method: "get",
                data: {
                    username: username,
                    goods_id: id,
                },
                dataType: 'json',
                async: true,
                success: function(res) {
                    if (res.code) {
                        alert("删除成功");
                        localStorage.setItem('goodsList', JSON.stringify(res2));
                        readData(res2);
                    }
                }

            })
        }

        // 清空购物车
        if (e.target.className == "allDel") {
            $.ajax({
                url: '../api/clearCarData.php',
                method: "get",
                data: {
                    username: username
                },
                dataType: 'json',
                async: true,
                success: function(res) {
                    if (res.code) {
                        alert("成功清除购物车");
                        localStorage.removeItem("goodsList");
                        location.href = '../html/car.html'
                    }
                }

            })
        }
        //更新购物车
        if (e.target.className == "minus") {
            updataCar(e.target.className);
        }
        if (e.target.className == "add") {
            updataCar(e.target.className);
        }
        //  分装的更新代码
        function updataCar(reduce) {
            // 进行数量减法
            let data = JSON.parse(localStorage.getItem('goodsList'));
            let id = e.target.parentNode.getAttribute('goods_id');
            let obj = data.filter(item => {
                return item.goods_id == id
            })[0];
            let num = obj.cart_number * 1;
            if (reduce == "minus") {
                num <= 1 ? 1 : num--;
            } else {
                num++
            }
            $.ajax({
                url: '../api/updCarData.php',
                method: "get",
                data: {
                    username: username,
                    goods_id: id,
                    goods_num: num
                },
                dataType: 'json',
                async: true,
                success: function(res) {
                    if (res.code == 1) {
                        obj.cart_number = num;
                        localStorage.setItem('goodsList', JSON.stringify(data));
                        readData(data);
                    }
                }

            })
        }

    })
}

// 计算总价
function shopNum(goods) {
    let res = goods.filter(item => {
        return item.is_select == 1
    })

    // 计算选中商品的数量
    let totalNum = res.reduce((pre, item) => {
        return pre + item.cart_number * 1
    }, 0);

    // 计算选中商品的总价格
    let totalPrice = res.reduce((pre, item) => {
        return pre + item.goods_price * item.cart_number
    }, 0);

    return {
        totalNum,
        totalPrice
    }
}