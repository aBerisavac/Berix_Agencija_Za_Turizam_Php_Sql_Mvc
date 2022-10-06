<?php

include("../config/connection.php");

$errors = [];

if(!isset($_POST["travelPrice"])||empty($_POST["travelPrice"])){
    array_push($errors, "Travel price can't be empty.");
}

if(!isset($_POST["destinationId"])||empty($_POST["destinationId"])){
    array_push($errors, "Some destination must be selected.");
}

if(count($errors)>0){
    exitWithError(422, $errors);    
}

$travelPrice = $_POST["travelPrice"];
$destinationId = $_POST["destinationId"];

$reTravelPrice = "/^[1-9][0-9]*(\.[0-9]([1-9]?))?$/";

if(!preg_match($reTravelPrice, $travelPrice)){
    array_push($errors, "Price must be in XY[.Z[V]] format");
}

if($destinationId=="default"){
    array_push($errors, "Some destination must be selected.");
}

if(count($errors)>0){
    exitWithError(422, $errors);    
}

if(checkIfDestinationAlreadyHasAssociatedPrice($destinationId)!=false){
    array_push($errors, "That destination already has an associated travel price. Delete it first then try again.");
}

if(count($errors)>0){
    exitWithError(422, $errors);    
}

if(insertTravelPrice($travelPrice, $destinationId)){
    exitWithError(200, ["Successfully inserted travel price for your destination."]);
} else{
    exitWithError(500, ["There has been an internal server error. Contact administrator."]);
}