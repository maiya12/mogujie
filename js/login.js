 // logo的链接
 $('.header h1').click(function() {
         location.href = './index.html'
     })
     // 扫码登录与账号注册的tab切换
 $('.login_top #p1 span').click(function() {
         $('.login_ma').css("display", "none");
         $('.login_screen').css("display", "block");
         $('.register_screen').css("display", "none");
         $('.login_top #p1 span').css("border-bottom", "3px solid #fe4360");
         $('.login_top #p1 i').css("border-bottom", "0px");
     })
     // 扫码登录
 $('.login_top #p1 i').click(function() {
         $('.login_ma').css("display", "block")
         $('.login_screen').css("display", "none");
         $('.register_screen').css("display", "none");
         $('.login_top #p1 i').css("border-bottom", "3px solid #fe4360");
         $('.login_top #p1 span').css("border-bottom", "0px");
     })
     // 注册按钮
 $('.login_screen .p5 i').click(function() {
     $('.login_ma').css("display", "none")
     $('.login_screen').css("display", "none");
     $('.register_screen').css("display", "block");
 })

 // 账号密码的界面验证
 // 给validate自定义验证规则
 jQuery.validator.addMethod('testTel', function(value) {
     let reg = /^1[3,5,6,7,8]\d{9}$/;
     if (reg.test(value)) {
         return true
     } else {
         return false
     }
 }, '验证失败的提示信息');
 jQuery.validator.addMethod('testPass', function(value) {
     //  * 密码至少包含 数字和英文，长度6-20
     let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
     if (reg.test(value)) {
         return true
     } else {
         return false
     }
 }, '验证失败的提示信息');
 // 登录的验证
 $('.login_screen').validate({
     // 输入内容的规则
     rules: {
         username: {
             required: true,
             testTel: true
         },
         password: {
             required: true,
             testPass: true
         }
     },
     // 提示信息
     messages: {
         username: {
             required: '账号必填项',
             testTel: '账号格式不正确'
         },
         password: {
             required: '密码必填项',
             testPass: '密码格式不正确'
         },
     },
     submitHandler: function() {
         // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
         // 一般用跟后端进行数据交互 
         // 登录发出的Ajax请求
         // console.log(1);
         $.ajax({
             url: '../api/login.php',
             method: 'post',
             data: {
                 username: $('#username').val(),
                 password: $('#password').val()
             },
             dataType: 'json',
             async: true,
             success: function(res) {
                 // console.log(res);
                 if (res.code == 1) {
                     // console.log(1);
                     // alert("登录成功")
                     $.cookie('login', $('#username').val());
                     let url = localStorage.getItem('url');
                     console.log(url);

                     if (url) {
                         location.href = url;
                         localStorage.removeItem('url');

                     } else {
                         location.href = './index.html'
                     }
                 }
             }
         })

     }
 })

 //注册的验证
 $('.register_screen').validate({
     // 输入内容的规则
     rules: {
         username: {
             required: true,
             testTel: true
         },
         password: {
             required: true,
             testPass: true
         }
     },
     // 提示信息
     messages: {
         username: {
             required: '账号必填项',
             testTel: '账号格式不正确'
         },
         password: {
             required: '密码必填项',
             testPass: '密码格式不正确'
         },
     },
     submitHandler: function() {
         // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
         // 一般用跟后端进行数据交互 

         // 注册发出的Ajax请求
         console.log(1);
         $.ajax({
             url: '../api/register.php',
             method: 'post',
             data: {
                 username: $('#user').val(),
                 password: $('#pass').val()
             },
             dataType: 'json',
             async: true,
             success: function(res) {
                 // console.log(res);
                 if (res.code == 1) {
                     // console.log(1);
                     alert("注册成功")
                     location.href = './login.html'
                 }
                 if (res.code == 0) {
                     $('#user').val("");
                     $('#pass').val("");
                     alert("用户名已存在")
                 }
             }
         })
     }
 })