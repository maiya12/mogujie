"use strict";function ajax(t){if(!t.url)throw new Error("url是必填参数");var e={type:"get",data:"",async:!0,success:function(){}};for(var r in t)e[r]=t[r];if(!/^(get|post)$/i.test(e.type))throw new Error("暂时只支持get 和post请求");if(!("string"==typeof e.data&&/^(\w+=\w+&?)*$/.test(e.data)||"[object Object]"==Object.prototype.toString.call(e.data)))throw new Error("data参数只支持key=vlue 或者对象");var a="";if("[object Object]"==Object.prototype.toString.call(e.data))for(var o in e.data)a+=o+"="+e.data[o]+"&";if(e.data=a.slice(0,-1),"[object Function]"!==Object.prototype.toString.call(e.success))throw new Error("success 必须是一个函数");if("[object Boolean]"!==Object.prototype.toString.call(e.async))throw new Error("saync 只能是布尔值");try{xhr=new XMLHttpRequest}catch(t){xhr=new ActiveXObject("Microsoft.XMLHTTP")}/^(get)$/i.test(e.type)?(xhr.open(e.type,e.url+"?"+e.data,e.async),xhr.send()):(xhr.open(e.type,e.url,e.async),xhr.setRequestHeader("content-type","application/x-www-form-urlencoded"),xhr.send(e.data)),xhr.onreadystatechange=function(){/^2\d{2}$/.test(xhr.status)&&4===xhr.readyState&&e.success(xhr.responseText)}}function pAjax(r){return new Promise(function(e,t){ajax({url:r.url,data:r.data||"",type:r.type||"get",async:r.async||!0,success:function(t){e(JSON.parse(t))}})})}