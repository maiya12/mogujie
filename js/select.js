let key = urlObj(decodeURI(location.href));
console.log(key);
$('.seach .select').val(key.key);
// 渲染数据
function select(atr) {
    // 渲染页面数据
    let list = document.querySelector(".list");
    let page = document.querySelector(".page");
    let keyword = $('.seach .select').val();
    console.log(keyword);

    let defaultInfo = {
            len: 20,
            num: 1,
            keyword: keyword
        }
        //   console.log(defaultInfo.sort);
    $.ajax({
        url: atr,
        method: 'get',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len,
            keyword: keyword
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
                keyword: keyword
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
            <span>￥${item.goods_price}</span><a>￥${item.goods_money}</a>
            <i><img src="../img/star_03.jpg" alt="">574</i>

        </p>
    </div>
</div></a>`;
        })

        $('.content_product').html(str)
    }

}

// 页面存在key值得传递

if (key) {

    // 直接渲染页面
    select('../api/selectData.php');
}