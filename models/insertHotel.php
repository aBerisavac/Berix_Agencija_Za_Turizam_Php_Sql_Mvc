<?php

include("../config/connection.php");

$errors = [];

if(!isset($_POST["hotelName"])||empty($_POST["hotelName"])){
    array_push($errors, "Hotel name is empty.");
}

if(!isset($_POST["pricePerNight"])||empty($_POST["pricePerNight"])){
    array_push($errors, "Hotel price is empty.");
}

if(!isset($_POST["stars"])||empty($_POST["stars"])){
    array_push($errors, "The number of hotel stars is empty.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}

$rePricePerNight = "/^[1-9][0-9]*(\.[0-9]([1-9]?))?$/";
$reHotelName = "/^([a-zA-Z ]){2,50}$/";
$reStars = "/^[1-5]$/";

$hotelName = $_POST["hotelName"];
$pricePerNight = $_POST["pricePerNight"];
$stars = $_POST["stars"];
$destinationId = $_POST["destinationId"];

if(!preg_match($rePricePerNight, $pricePerNight)){
    array_push($errors, "Hotel price must be in XY[.Z[V]] format.");
}

if(!preg_match($reHotelName, $hotelName)){
    array_push($errors, "Hotel name must be between 2 and 50 characters long with only letters.");
}

if(!preg_match($reStars, $stars)){
    array_push($errors, "Number of stars must be between 1 and 5.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}


if(insertHotel($hotelName, $pricePerNight, $stars)){
    if($destinationId!="default"){
        if(connectHotelDestination($destinationId)){
            http_response_code(201);
            echo("Success");
            die();
        }else{
            http_response_code(500);
            echo("Error");
            die();
        };
    }
    
    http_response_code(201);
    echo("Success");
}else{
    http_response_code(500);
    echo("Error");
};
