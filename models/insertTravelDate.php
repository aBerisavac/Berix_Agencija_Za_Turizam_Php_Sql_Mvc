<?php

include("../config/connection.php");

$errors = [];

if(!isset($_POST["travelDateBeginning"])||empty($_POST["travelDateBeginning"])){
    array_push($errors, "Beginning travel date can't be empty.");
}

if(!isset($_POST["travelDateEnding"])||empty($_POST["travelDateEnding"])){
    array_push($errors, "Ending travel date can't be empty.");
}

if(!isset($_POST["destinationId"])||empty($_POST["destinationId"])){
    array_push($errors, "Some destination must be selected.");
}

if(count($errors)>0){
    exitWithError(422, $errors);    
}

$travelDateBeginning = $_POST["travelDateBeginning"];
$travelDateEnding = $_POST["travelDateEnding"];
$destinationId = $_POST["destinationId"];

$reTravelDate = "/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/";

if(!preg_match($reTravelDate, $travelDateBeginning)){
    array_push($errors, "Choose correct beginning date.");
}

if(!preg_match($reTravelDate, $travelDateEnding)){
    array_push($errors, "Choose correct ending date.");
}

if(count($errors)>0){
    exitWithError(422, $errors);    
}

if(insertTravelDate($travelDateBeginning, $travelDateEnding, $destinationId)){
    exitWithError(200, ["Successfully inserted travel date."]);
} else{
    exitWithError(502, ["There has been an internal server error. Contact administrator."]);
}