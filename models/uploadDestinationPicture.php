<?php
include("../config/connection.php");

$errors=[];
$uploadDir = "assets/images";

if(isset($_FILES["destination-image"]["name"])&&!empty($_FILES["destination-image"]["name"])){
    $uploadDir .= "/Destinations/";
    $tmpName = $_FILES['destination-image']['tmp_name'];
}

if($uploadDir == "assets/images"){
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    http_response_code(422);
    die();
} 

if(!isset($_POST["destination-image-src"])||empty($_POST["destination-image-src"])){
    array_push($errors, "Src field is not filled.");
}

if(!isset($_POST["destination-image-alt"])||empty($_POST["destination-image-alt"])){
    array_push($errors, "Alt field is not filled.");
}

if(!isset($_POST["destination-select"])||empty($_POST["destination-select"])){
    array_push($errors, ctype_upper("destination is not selected."));
}

if(count($errors)>0){
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    http_response_code(422);
    die();
}


$src=$_POST["destination-image-src"];
$alt=$_POST["destination-image-alt"];
$destinationId=$_POST["destination-select"];

$uploadDir.=$_POST["destination-image-alt"];
$uploadDir.="/".$_POST["destination-image-src"].".jpg";
move_uploaded_file($tmpName, ABSOLUTE_PATH."/".$uploadDir );
echo($uploadDir);
uploadDestinationImage($src, $alt, $destinationId);
header('Location: ' . $_SERVER['HTTP_REFERER']);