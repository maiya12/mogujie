<?php
    # 用户名 商品id
    $username = $_GET['username'];
    $goods_id = $_GET['goods_id'];
    $newNum = $_GET['num'];
    $goods_color = $_GET['goods_color'];
    $goods_size = $_GET['goods_size'];
    // $username = '婧婧';
    // $goods_id = '8';
    $con = mysqli_connect('localhost','root','123456','mogujie');

// 添加
    $sql = "SELECT * FROM `car` WHERE `username`='$username' AND `goods_id`='$goods_id' ANd `good_color`='$goods_color' AND`good_size`='$goods_size' ";
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 1
    if($row){
        $goodsNum = $row['goods_num']+$newNum;
       $res2= mysqli_query($con,"UPDATE `car` SET `goods_num` = '$goodsNum'  WHERE `username`='$username' AND `goods_id`='$goods_id'ANd `good_color`='$goods_color' AND`good_size`='$goods_size'");
    }else{
        # 如果不存在，就往car表中 添加数据
        $res2= mysqli_query($con,"INSERT INTO `car` (`goods_id`, `username`, `goods_num`,`good_color`, `good_size` ) VALUES ($goods_id, '$username', '$newNum','$goods_color', '$goods_size')");
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    }

?>