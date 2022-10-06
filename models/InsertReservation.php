<?php

session_start();

include("../config/connection.php");

if(!isset($_SESSION["user"])||empty($_SESSION["user"])){
    exitWithError(403, ["You must be logged in in order to make a reservation."]);
}

$errors = [];

if(!isset($_POST["destinationId"]) || empty($_POST["destinationId"])){
    array_push($errors, "Destination must be selected.");
}

if(!isset($_POST["hotelId"]) || empty($_POST["hotelId"])){
    array_push($errors, "Hotel  must be selected.");
}

if(!isset($_POST["travelPrice"]) || empty($_POST["travelPrice"])){
    array_push($errors, "There has been a problem in sending trip price. Contact support.");
}

if(!isset($_POST["travelDateId"]) || empty($_POST["travelDateId"])){
    array_push($errors, "Travel date must be selected.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}

$destinationId =$_POST["destinationId"];
$hotelId =$_POST["hotelId"];
$travelPrice =$_POST["travelPrice"];
$travelDateId =$_POST["travelDateId"];
$userId = $_SESSION["user"]->id;

if(insertReservation($destinationId, $hotelId, $userId, $travelDateId, $travelPrice )){
    exitWithError(200, ["You have successfully made a reservation."]);
} else{
    exitWithError(422, ["There has been an internal server error with processing of your request. Please contact support."]);
}