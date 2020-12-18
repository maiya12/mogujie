// JS工具库

// 计算任意参数之和
function sum() {
    var s = 0;
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}

// 求任意数的最大值
function maxNum() {
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i]
        }
    }
    return max
}

// 求任意数的最小值
function minNum() {
    var min = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i]
        }
    }
    return min
}

//求n-m之间的随机整数
function randomNum(n, m) {
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1) + m)
    } else {
        return parseInt(Math.random() * (m - n + 1) + n)
    }
}

//冒泡排序
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - (i + 1); j++) {
            if (arr[j] > arr[j + 1]) {
                var t = arr[j]
                arr[j] = arr[j + 1]
                arr[i + 1] = t
            }
        }
    }
}

//选择排序
function selectionSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        var index = i;
        var min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[index]) {
                index = i
            }
        }
        if (min !== index) {
            var temp = arr[min]
            arr[min] = arr[index]
            arr[index] = temp
        }
    }
}

//数组去重
function arrayHeavy(arr) {
    var arr1 = []
    arr.forEach(function(item) {
        if (arr1.indexOf(item) == -1) {
            arr1.push(item);
        }
    })
    return arr1
}

//把url的参数转化为对象
function urlObj(url) {
    var index = url.indexOf("?")
    var res = url.substr(index + 1)
        // console.log(res);
        // 把字符串分割成数组
    var arr = res.split("&");
    console.log(arr);
    // 循环数组，拿到数组中的每一个数据，以“=”分割
    var obj = {} //定义一个空对象
    arr.forEach(function(item) {
        var arr2 = item.split("=")
        obj[arr2[0]] = arr2[1]
            // console.log(obj);

    })
    return obj
}

//随机颜色
function randomColor() {
    return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + ",+randomNum(0, 255)+)"
}

//验证码（6位数字）
function numberCode(n) {
    var arr = []
    for (var i = 0; i < n; i++) {
        var num = parseInt(Math.random() * 10)
        arr.push(num)
    }
    return arr.join("")
}

//验证码（数字+字母）
function textCode(n) {
    var arr = []
    for (var i = 0; i < n; i++) {
        var num = parseInt(Math.random() * 123)
        if (num >= 0 && num <= 9) {
            arr.push(num)
        } else if (num >= 97 && num <= 122 || num >= 65 && num <= 98) {
            arr.push(String.fromCharCode(num))
        } else {
            i--
        }
    }
    return arr.join("")
}

//时间转化为2020-01-01 15:30:22 星期六 格式化
function formatTime(time, fuhao) {
    var arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    var str = ""
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    var hours = time.getHours()
    var min = time.getMinutes()
    var sec = time.getSeconds()
    var week = arr[time.getDay()]
        //如果日期是10之后的直接输出，如果日期小于10需要在前面加0
    month >= 10 ? month : "0" + month
    day >= 10 ? day : "0" + day
    hours >= 10 ? hours : "0" + hours
    min >= 10 ? min : "0" + min
    sec >= 10 ? sec : "0" + sec
        //如果没有符号这个参数，需要做一个处理
    fuhao = fuhao ? fuhao : "/"
    str = `${year}${fuhao}${month}${fuhao}${day} ${hours}:${min}:${sec} ${week} `
    return str
}

//两个时间的时间差
function timeDifference(time1, time2) {
    var t1 = Math.abs(time1.getTime() - time2.getTime())
    var day = parseInt(t1 / 1000 / 3600 / 24) //求出相差的天数
    var hours = parseInt((t1 / 1000 / 3600) % 24) //求出相差的小时数
    var min = parseInt((t1 / 1000 / 60) % 60) //求出相差的分钟数
    var sec = parseInt((t1 / 1000) % 60) //求出相差的秒数
    var obj = {
        day: day,
        hours: hours,
        min: min,
        sec: sec
    }
    return obj
}

//兼容获取元素的样式
function getCompatibilityStyle(ele, attr) { //ele：元素，attr：属性
    var res;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr]
    } else {
        res = ele.currentStyle[attr]
    }
    return res
}

//兼容监听事件
function monitorEvent(ele, event, fun) {
    //判断ele.addEventListener是否存在 
    if (ele.addEventListener) {
        ele.addEventListener(event, fun)
    } else {
        ele.attachEvent("on" + event, fun)
    }
}

//封装一个单属性动画函数，参数：给那个元素做动画、做什么样的动画（css属性）、目标值
function animation(ele, attr, target) {
    clearInterval(ele.move)
        //获取元素的当前值
    let style
    style = parseInt(style)
    let speed
        //定义一个定时器执行动画
    ele.move = setInterval(() => {
        style = getCompatibilityStyle(ele, attr)
        speed = (target - style) / 10
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        style += speed
        if (target == style) {
            clearInterval(ele.move)
        }
        ele.style[attr] = style + "px"
    }, 100);
}

//封装一个多属性动画
function animationAll(ele, obj, callback) {
    let length = 0
    for (var key in obj) {
        length++
        let attr = key
        let target = obj[key]
        clearInterval(ele[attr])
            //获取元素的当前值
        let style
        style = parseInt(style)
        let speed
            //定义一个定时器执行动画
        ele[attr] = setInterval(() => {
            if (attr == "opcity") {
                style = getCompatibilityStyle(ele, attr) * 100
            } else {
                style = getCompatibilityStyle(ele, attr)
            }

            speed = (target - style) / 10
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            style += speed
            if (target == style) {
                clearInterval(ele[attr])
                length--
            }


            if (attr == "opacity") {
                ele.style[attr] = style / 100
            } else {
                ele.style[attr] = style + "px"
            }
            //当length=0时所有动画都结束
            if (length == 0) {
                callback && callback()
            }
        }, 100);
    }

}



// 拖拽头部元素移动整个元素,ele:大盒子里的头部，bigEle：大盒子
function drags(ele, bigEle) {
    ele.onmousedown = (event) => {
        let e1 = event || window.event;
        let x = e1.offsetX;
        let y = e1.offsetY;
        document.onmousemove = (e) => {
            let left = e.clientX - x;
            let top = e.clientY - y;
            if (left <= 0) {
                left = 0;
            }
            if (top <= 0) {
                top = 0;
            }
            if (left >= innerWidth - bigEle.offsetWidth) {
                left = innerWidth - bigEle.offsetWidth
            }
            if (top >= innerHeight - bigEle.offsetHeight) {
                top = innerHeight - bigEle.offsetHeight;
            }
            bigEle.style.left = left + 'px';
            bigEle.style.top = top + 'px';
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null;
    }

}

//封装拖拽元素的函数

//面向对象
//1.创建对象
//2.描述对象
//3.使用对象
//创建对象
let Drag = function(ele) {
        //描述静态属性
        // this.ele  谁被拖拽
        this.ele = ele
        this.init()
    }
    //描述动态方法
    //init()  初始化，一般用来创建元素，添加事件
    //down()  鼠标按下时执行的功能 
    //move()  鼠标移动时执行的功能 
    //up()  鼠标抬起时执行的功能 
Drag.prototype.init = function() {
    this.ele.onmousedown = () => {
        this.down();
    };
    document.onmouseup = () => this.up()
}
Drag.prototype.down = function() {
    let e = window.event
    this.x = e.offsetX
    this.y = e.offsetY
    document.onmousemove = () => {
        this.move()
    }
}
Drag.prototype.move = function() {
    let event = window.event
    let left = event.clientX - this.x
    let top = event.clientY - this.y

    //判断边界值
    if (left <= 0) {
        left = 0
    }
    if (top <= 0) {
        top = 0
    }
    if (left >= innerWidth - this.ele.clientWidth) {
        left = innerWidth - this.ele.clientWidth
    }
    if (top >= innerHeight - this.ele.clientHeight) {
        top = innerHeight - this.ele.clientHeight
    }
    this.ele.style.left = left + "px"
    this.ele.style.top = top + "px"
}
Drag.prototype.up = function() {
    document.onmousemove = null

}

//封装tab切换
class Tab {
    // 1. 创建对象 class Tab {}
    // 2. 描述对象
    // this.ele = document.querySelect(ele) 需要做tab切换的盒子
    // this.btn = this.ele.querySelectAll("ul li")
    // this.content = this.ele.querySelectAll(".tab-conent")
    // 3. 动态方法
    // init()创建元素和绑定事件
    // changeActive()
    // changeContent()
    // 4. new Tab(ele)
    constructor(ele, obj) {
        this.ele = document.querySelector(ele)
        this.btn = this.ele.querySelectorAll("ul li")
        this.content = this.ele.querySelectorAll(".tab-content")
            //如果obj存在，obj.index
        this.index = obj ? obj.index || 0 : 0
        this.init()

    }
    init() {
        this.btn[this.index].classList.add("active")
        this.content[this.index].classList.add('current')
        this.btn.forEach((item, index) => {
            item.onclick = () => {
                this.changeAcitve(item, index)
            }
        });
    }
    changeAcitve(curBtn, idx) {
        this.btn.forEach(item => item.classList.remove("active"))
        curBtn.classList.add("active")
        this.changeContent(idx)
    }
    changeContent(idx) {
        this.content.forEach(item => item.classList.remove("current"))
        this.content[idx].classList.add("current")
    }

}

//放大镜
//放大镜+切换图片
class Enlarge {
    //结构：参考day19-面向对象3的放大镜.html
    // 放大镜盒子的大小需要动态设置，根据show盒子和mask遮罩层和放大镜的背景图决定
    //show/mask===放大镜的背景图/放大镜盒子的宽高
    //放大镜的宽高===mask*放大镜背景图/show
    //1.创建对象 class Enlarge{}
    //2.描述对象
    // 静态属性
    //     页面中存在的元素
    // 动态方法
    //     init()初始化
    //     setStyle()设置放大镜的宽高
    //     showEnlarge()显示放大镜
    //     move()移动
    //     changeImg()改变图片
    constructor(ele) {
        this.ele = document.querySelector(ele)
        this.show = this.ele.querySelector(".show")
        this.showImg = this.show.querySelector("img")
        this.mask = this.show.querySelector(".mask")
        this.btn = this.ele.querySelectorAll(".list p")
        this.enlarge = this.ele.querySelector(".enlarge")
        this.init()
    }
    init() {
        this.show.onmouseover = () => {
            this.mask.style.display = this.enlarge.style.display = "block"
            this.setStyle()
        }
        this.show.onmouseout = () => {
            this.mask.style.display = this.enlarge.style.display = 'none';
        }
        this.show.onmousemove = () => {
            this.maskmove()
        }
        this.btn.forEach((item) => {
            item.onclick = () => {
                let e = window.event
                this.changeImg(item, e.target)
            }
        })

    }
    setStyle() {
        this.showW = this.show.offsetWidth
        this.showH = this.show.offsetHeight
        this.maskW = this.mask.offsetWidth
        this.maskH = this.mask.offsetHeight
        let style = getCompatibilityStyle(this.enlarge, "backgroundSize")
        this.styleX = parseInt(style.split(" ")[0])
        this.styleY = parseInt(style.split(" ")[1])
        this.enlargeW = (this.maskW * this.styleX) / this.showW
        this.enlargeH = (this.maskH * this.styleH) / this.showH
        this.enlarge.style.width = this.enlargeW + "px"
        this.enlarge.style.height = this.enlargeH + "px"
    }

    maskmove() {
        let e = window.event
            //求光标在show元素中的left和top
            //求光标在页面中x和y  pageX pageY
            //求大盒子的左边上边的距离（偏移量） offsetLeft  offsetTop
        let x = e.pageX - this.ele.offsetLeft / 2
        let y = e.pageY - this.ele.offsetTop / 2
        let left = x - this.maskW / 2
        let top = y - this.maskH / 2
            //边界值判断
        if (left <= 0) {
            left = 0
        }
        if (top <= 0) {
            top = 0;
        }
        if (left >= this.showW - this.maskW) {
            left = this.showW - this.maskW
        }
        if (top >= this.showH - this.maskH) {
            top = this.showH - this.maskH
        }

        this.mask.style.left = left + 'px';
        this.mask.style.top = top + 'px';
        this.enlargemove(left, top)
    }
    enlargemove(x, y) {
        // 比例：mask在show盒子移动的距离/show盒子的宽度=背景图移动的距离/背景的宽度
        // 背景图移动的距离=mask在show盒子移动的距离*背景的宽度/show盒子的宽度
        //背景图定位：background-position：x，y
        let bigX = x * this.styleX / this.showW
        let bigY = y * this.styleY / this.showH
        this.enlarge.style.backgroundPosition = `${-bigX}px ${-bigY}px`
    }

    //target是当前点击的这个元素
    changeImg(curItem, target) {
        this.btn.forEach(item => {
            item.classList.remove("active")
        })
        curItem.classList.add("active")
        let midelImg = target.getAttribute("midelimg")
        let bigImg = target.getAttribute("bigimg")
        this.showImg.src = midelImg
        this.enlarge.style.backgroundImage = `url(${bigImg})`
    }

}

//cookie设置，可以添加、删除、修改，expires是分钟数
function setCookie(key, value, expires) {
    //当没有过期时间时，默认为会话时间，不设置expires时间
    if (expires) {
        let date = new Date()
        let time = date.getTime() - 8 * 60 * 60 * 1000 + expires * 60 * 1000
        date.setTime(time)
        document.cookie = `${key}=${value};expires=${date}`
        return
    }
    document.cookie = `${key}=${value};`

}

//获取cookie的值
function getCookie(key) {
    let cookie = document.cookie
        //先把字符串分割成数组，再把数组转化为对象
    let arr = cookie.split("; ")
    let obj = {}
    arr.forEach(item => {
            let newArr = item.split("=")
            obj[newArr[0]] = newArr[1]
        })
        // console.log(obj);
    return obj[key]
}

//封装ajax，请求类型type，请求地址url，请求携带的参数，回调函数
/*obj={
    type:"get", 可选，默认为get
    url:url地址, 必填
    data:{name:"aaa",password:"123" }|| name="aaa"&password="123"  可选
    async:true||false  可选，默认为true
    success:fun  必填，获取数据成功时执行的函数
    
}*/
function ajaxFun(option) {
    // 【1】判断url是否传递参数
    if (!option.url) {
        // 手动抛出一个错误，
        throw new Error('url的参数时必填的');
    }


    // 设置默认值
    let defOption = {
        type: 'get',
        async: true
    }

    // 把传递过去来的参数写入默认值当中
    for (let key in option) {
        defOption[key] = option[key]
    }

    //【1】如果传递的type不是 get 或者post的时候，抛出错误提示使用者，type的值只能为get 或者 post
    if (!(defOption.type == 'get' || defOption.type == 'post')) {
        throw new Error('type参数只能为get 或者 post');
    }

    // 【3】判断async 是否布尔值
    // console.log(Object.prototype.toString.call(defOption.async));
    if (Object.prototype.toString.call(defOption.async) != '[object Boolean]') {
        throw new Error('async 的值只能为布尔值');
    }

    if (defOption.data) {
        // 【4】判断参数 data 是否是对象 和字符串的数据类型
        let dataType = Object.prototype.toString.call(defOption.data);
        if (!(dataType == '[object String]' || dataType == '[object Object]')) {
            throw new Error('data的格式只能为key=value&key=value 或者 {key:value}');
        }

        // 判断data参数是否 是对象，如果是对象需要把参数处理为 key=value&key=value
        if (dataType == '[object Object]') {
            let str = '';
            for (let key in defOption.data) {
                str += key + '=' + defOption.data[key] + '&';
            }
            defOption.data = str.substr(0, str.length - 1);
        }
        // 当参数为字符串的时候，判断是否有=号
        if (dataType == '[object String]' && !defOption.data.includes('=')) {
            throw new Error('data格式只能为key=value')
        }
    }


    // 【5】判断success回调函数 
    if (!defOption.success) {
        throw new Error('success是必须存在的参数')
    }

    // 判断success 是否是函数
    if (Object.prototype.toString.call(defOption.success) != '[object Function]') {
        throw new Error('success必须是函数')
    }

    try {
        let xhr = new XMLHttpRequest();
        // 判断请求的是类型 来写请求携带参数
        if (defOption.type == 'get') {
            xhr.open(defOption.type, defOption.url + (defOption.data ? '?' + defOption.data : ''), defOption.async);
            xhr.send()
        } else if (defOption.type == 'post') {
            xhr.open(defOption.type, defOption.url, defOption.async);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(defOption.data);
        }

        // 判断请求异步还是同步
        if (defOption.async) {
            xhr.onload = function() {
                defOption.success(xhr.responseText)
            }
        } else {
            defOption.success(xhr.responseText)
        }
    } catch (err) {
        defOption.error(err)
    }


}

//封装promise的ajax
function pAjax(params) {
    return new Promise(function(resolve, reject) {
        // 执行异步程序
        ajaxFun({
            type: params.type || 'get',
            url: params.url,
            data: params.data,
            async: params.async || true,
            success: function(res) {
                // res是ajax的请求结果
                resolve(res)
            },

            //error当执行请求数据出错时执行的方法
            error: function(res) {
                reject(res)
            }
        })
    })
}