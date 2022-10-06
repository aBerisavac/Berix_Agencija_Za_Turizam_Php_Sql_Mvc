<?php
session_start();
include("../config/connection.php");

$errors = [];

if(!isset($_GET["message"])||empty($_GET["message"])){
    array_push($errors, "Message can't be empty.");
    exitWithError(422, $errors);
}

$message= $_GET["message"];
$isLoggedIn = false;

if(isset(($_SESSION["user"]))&&!empty($_SESSION["user"])) $isLoggedIn = true;

if($isLoggedIn && $_GET["email"]==""){
    $email = $_SESSION["user"]->email;
} elseif($_GET["email"]==""){
    $email = 'anonymous';
}
else{

    $email=$_GET["email"];
    $reEmail = "/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/";
    if(!preg_match($reEmail, $email)) array_push($errors, "Email format is not valid");
}

$reMessage = "/^[\w .,!?:;]{2,200}$/";
if(!preg_match($reMessage, $message)) array_push($errors, "Your message is too short or too long, or you have used forbidden characters.");

if(count($errors)==0){

   if(!insertContactMessage($email, $message)){
    array_push($errors, "Could not insert into database. Contact support");
    exitWithError(422, $errors);
   }

}else{
    exitWithError(422, $errors);
}