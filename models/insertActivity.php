<?php

include("../config/connection.php");

$errors = [];

if(!isset($_POST["activityName"])||empty($_POST["activityName"])){
    array_push($errors, "Activity name is empty.");
}

if(!isset($_POST["activityDescription"])||empty($_POST["activityDescription"])){
    array_push($errors, "Activity description is empty.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}

$reActivityName = "/^([a-zA-Z ]){2,50}$/";
$reActivityDescription = "/^(.){10,}$/";

$activityName = $_POST["activityName"];
$activityDescription = $_POST["activityDescription"];
$destinationId = $_POST["destinationId"];

if(!preg_match($reActivityName, $activityName)){
    array_push($errors, "Activity name must be between 2 and 50 characters long with only letters.");
}

if(!preg_match($reActivityDescription, $activityDescription)){
    array_push($errors, "Description can't be empty, or shorter then 10 characters.");
}

if(count($errors)>0){
    exitWithError(422, $errors);
}

if(insertActivity($activityName, $activityDescription)){
    if($destinationId!="default"){
        if(connectActivityDestination($destinationId)){
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
