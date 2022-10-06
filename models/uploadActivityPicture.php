<?php
include("../config/connection.php");

$errors=[];
$uploadDir = "assets/images";
$imageRoot = "";

if(isset($_FILES["activity-image"]["name"])&&!empty($_FILES["activity-image"]["name"])){
    $uploadDir .= "/Activities/";
    $tmpName = $_FILES['activity-image']['tmp_name'];
}

if($uploadDir == "assets/images"){
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    http_response_code(422);
    die();
} 

if(!isset($_POST["activity-image-src"])||empty($_POST["activity-image-src"])){
    array_push($errors, "Src field is not filled.");
}

if(!isset($_POST["activity-image-alt"])||empty($_POST["activity-image-alt"])){
    array_push($errors, "Alt field is not filled.");
}

if(!isset($_POST["activity-select"])||empty($_POST["activity-select"])){
    array_push($errors, ctype_upper("activity is not selected."));
}

if(count($errors)>0){
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    http_response_code(422);
    die();
}

$src=$_POST["activity-image-src"];
$alt=$_POST["activity-image-alt"];
$activityId=$_POST["activity-select"];
$src=$_POST["activity-image-src"];

$uploadDir.=$_POST["activity-image-alt"];
$uploadDir.="/".$_POST["activity-image-src"].".jpg";
move_uploaded_file($tmpName, ABSOLUTE_PATH."/".$uploadDir );
uploadActivityImage($src, $alt, $activityId);
header('Location: ' . $_SERVER['HTTP_REFERER']);