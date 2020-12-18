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


// logo的链接
$('.header_nav h1').click(function() {
        location.href = './index.html'
    })
    // 裙子跳转
$('.list h5').click(function() {
    location.href = './goods_list.html'
})


// 渲染出你喜欢的产品
$.ajax({
    url: '../api/getData.php',
    method: 'get',
    data: {
        start: 1,
        len: 20,
        sort: "裙子"
    },
    dataType: 'json',
    async: true,
    success: function(res) {
        // console.log(res);
        getData();

    }
})



function getData() {
    $.ajax({
        url: '../api/getData.php',
        method: 'get',
        data: {
            start: 1,
            len: 20,
            sort: "裙子"
        },
        dataType: 'json',
        async: true,
        success: function(res) {
            // console.log(res);
            renderHtml(res.list);
        }
    })
}



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

    $('.content_love').html(str)
}