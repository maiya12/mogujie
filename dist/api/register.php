<?php
    # 用户名 商品id
    $username = $_POST['username'];
    $password =  $_POST['password'];
    // $username = '婧婧';
    // $goods_id = '8';
    $con = mysqli_connect('localhost','root','123456','mogujie');

// 添加
    $sql = "SELECT * FROM `people` WHERE `username`='$username'";
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 1
    if($row){
        echo json_encode(array("code"=>0,"msg"=>"注册用户失败"));
    }else{
        # 如果不存在，就往car表中 添加数据
        $res2= mysqli_query($con,"INSERT INTO `people` (`id`, `username`, `password`) VALUES (Null, '$username', '$password')");
    }
    if($res2){
        echo json_encode(array("code"=>1,"msg"=>"注册用户成功"));
    }

?>