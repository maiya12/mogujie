// 点击小图变大图
// 渲染数据
// 正则表达式来获取id
let reg = /id=(\d+)/;
let res = reg.test(location.search);
if (!res) {
    location.href = '../html/goods_list.html'
}
let id = reg.exec(location.search)[1];
console.log(id);
let login = $.cookie('login');
let container = document.querySelector('.container');
// 根据id获取数据
$.ajax({
    url: '../api/getDetail.php',
    method: 'get',
    data: {
        id: id,
    },
    dataType: 'json',
    async: true,
    success: function(res) {
        // console.log(res);
        if (res.code == 1) {
            console.log(res.detail);
            readData(res.detail);
            innerCar();
            buy();
            Simg()
        }
    }
})

function readData(res) {


    let str = "";
    let atr = "";
    str += `
    <!-- 图片部分 -->
                <div class="content_text_pic">
                    <div class="content_text_picMain">
                        <img src="${res.goods_img}" alt="" class="bigImg">
                    </div>
                    <div class="content_text_picMore">
                        <p>
                            <i>
                                <img src="${res.goods_img}" alt="" class="selectImg">
                            </i>
                            <i>
                                    <img src="${res.goods_img1}" alt="" class="selectImg">
                                </i>
                            <i>
                                        <img src="${res.goods_img2}" alt="" class="selectImg">
                             </i>
                            <i>
                                    <img src="${res.goods_img3}" alt="" class="selectImg">
                         </i>
                        </p>
                    </div>
                </div>
                <!-- 产品介绍 -->
                <div class="content_text_con">
                    <h3>
                    ${res.goods_name}

                    </h3>
                    <!--价格打折 -->
                    <div class="content_text_con_price">
                        <div class="content_text1">
                            <i>价格：</i> <span>￥${res.goods_money}</span>
                        </div>
                        <!-- 价格第二排 -->
                        <div class="content_text2 clearFix">
                            <p class="content_textp"> <i>促销价：</i> <span>￥${res.goods_price}</span> </p>
                            <p class="content_text2p">
                                <i>评价：524</i> <span>累计销量：${res.goods_sales}</span>
                            </p>
                        </div>
                        <!-- 店铺优惠价 -->
                        <p class="content_text3">
                            <i>店铺优惠:</i>
                            <span>
                                <img src="../img/youhui1_03.jpg" alt="">
                            </span>
                            <span>
                                <img src="../img/youhui2_03.jpg" alt="">
                            </span>

                        </p>
                    </div>
                    <!-- 产品尺寸 -->
                    <div class="content_prodect_detail">
                        <p>
                            <i>客服：</i>
                            <button><img src="../img/chat_03.jpg" alt=""> 联系客服</button>
                        </p>
                        <p>
                            <i>颜色：</i>
                            <span class="proColor selectColor">${res.goods_color}</span> <span class="proColor">${res.goods_color1}</span><span class="proColor">${res.goods_color2}</span>
                        </p>
                        <p>
                            <i>尺寸：</i>
                            <span class="proSize selectSize">${res.goods_size}</span> <span class="proSize">${res.goods_size1}</span><span class="proSize">${res.goods_size2}</span> <span class="proSize">${res.goods_size3}</span>
                        </p>
                        <div>
                            <i>数量：</i>
                            <span class="minus">-</span>
                            <input type="text" value="1" class="num">
                            <span class="add">+</span>
                            <i>
                                库存：1176件
                            </i>
                        </div>
                        <div class="buy">
                            <button class="buyNow">立即购买</button>
                            <button class="addCar">加入购物车</button>
                        </div>
                        <div class="operation">
                            <span><img src="../img/star_03.jpg" alt="">3779</span>
                            <span>
                                <i>+</i> 分享
                            </span>
                            <a href="">
                                    举报
                            </a>
                        </div>
                        <div class="server">
                            <i>服务说明：</i>
                            <span><img src="../img/yes_03.jpg" alt="">72小时发货</span>
                            <span><img src="../img/yes_03.jpg" alt="">7天无理由退货</span>
                            <span><img src="../img/yes_03.jpg" alt="">延误必赔</span>
                            <span><img src="../img/yes_03.jpg" alt="">退货补运费</span>
                            <span><img src="../img/yes_03.jpg" alt="">全国包邮</span>
                        </div>
                        <div class="pay">
                            <i>支付方式：</i>
                            <span><img src="../img/zhifubao_03.jpg" alt=""></span>
                            <span><img src="../img/weixin_03.jpg" alt=""></span>
                        </div>
                    </div>
                </div>
    `;

    atr += `${res.introduce}`;
    $('.content_text').html(str);
    $('.content_Text').html(atr);
    // console.log(1);
}

// 页面处理
function Simg() {
    // 图片点击切换
    $('.content_text_picMore').click(function() {
            let e = window.event;
            if (e.target.className == "selectImg") {
                // console.log(1);
                let url = e.target.src;
                // console.log(url);
                $(".bigImg").attr('src', url);
            }
        })
        // 页面尺寸和颜色的挑选
    $('.content_prodect_detail').click(function() {
        let e = window.event;
        if (e.target.classList.contains('proColor')) {
            console.log(1);
            $('.proColor').removeClass('selectColor');
            $(e.target).addClass('selectColor');
        }
        if (e.target.classList.contains('proSize')) {
            console.log(1);
            $('.proSize').removeClass('selectSize');
            $(e.target).addClass('selectSize');
        }
    })
}

// 立即购买
function buy() {
    $('.buyNow').click(function() {
        location.href = '../html/car.html'
    })
}

// 添加数据到购物车
function innerCar() {
    // 对数量的处理
    $('.minus').click(function() {
        let num = $('.num').val();
        if (num == 1) {
            num = 1;
        } else {
            num--;
            $('.num').val(num);
        }


    })
    $('.add').click(function() {
        let num = $('.num').val();
        num++;
        $('.num').val(num);


    })
    $('.addCar').click(function() {
        let num = $('.num').val();
        let goods_color = $('.selectColor').text();
        let goods_size = $('.selectSize').text();
        // console.log(num);
        if (!login) {
            location.href = '../html/login.html';
            localStorage.setItem('url', './detail.html');
            return;
        }
        $.ajax({
            url: '../api/addCarData.php',
            method: 'get',
            data: {
                username: login,
                goods_id: id,
                num: num,
                goods_color: goods_color,
                goods_size: goods_size
            },
            dataType: 'json',
            async: true,
            success: function(res) {
                if (res.code) {
                    alert("加入购物车成功")

                }
            }
        })
    })
}