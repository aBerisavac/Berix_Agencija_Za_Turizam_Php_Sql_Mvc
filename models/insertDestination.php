<?php

include("../config/connection.php");

$errors = [];

if(!isset($_POST["destinationName"])||empty($_POST["destinationName"])){
    array_push($errors, "Destination name is empty.");
}

if(!isset($_POST["destinationDescription"])||empty($_POST["destinationDescription"])){
    array_push($errors, "Destination description is empty.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}

$reDestinationName = "/^([a-zA-Z ]){2,50}$/";
$reDestinationDescription = "/^(.){10,}$/";

$destinationName = $_POST["destinationName"];
$destinationDescription = $_POST["destinationDescription"];

if(!preg_match($reDestinationName, $destinationName)){
    array_push($errors, "Destination name must be between 2 and 50 characters long with only letters.");
}

if(!preg_match($reDestinationDescription, $destinationDescription)){
    array_push($errors, "Description can't be empty, or shorter then 10 characters.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}

if(insertDestination($destinationName, $destinationDescription)){
    http_response_code(201);
    echo("Success");
}else{
    http_response_code(500);
    echo("Error");
};