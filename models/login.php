<?php
session_start();

include("../config/connection.php");

$errors = [];

if(isset($_SESSION["user"])&&(!empty($_SESSION["user"]))){
    array_push($errors, "You are already logged in.");
    exitWithError(403, $errors);
}

if(!isset($_POST["email"])||empty($_POST["email"])){
    array_push($errors, "Please fill in all the fields.");
    exitWithError(422, $errors);
}

if(!isset($_POST["password"])||empty($_POST["password"])){
    array_push($errors, "Please fill in all the fields.");
    exitWithError(422, $errors);
}

$email = $_POST["email"];
$password = $_POST["password"];
$user = userExists($email);
if(!$user){
    array_push($errors, "User with that email does not exist.");
    exitWithError(422, $errors);
}

if($user->locked==1){
    array_push($errors, "This account is locked. Contact support.");
    exitWithError(422, $errors);
}

$reEmail = "/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/";
$rePassword = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/";

if(!preg_match($rePassword, $password)) array_push($errors, "Password must be at least 8 characters long, with at least 1 number, 1 upper, 1 lower letter and 1 special character.");
if(!preg_match($reEmail, $email)) array_push($errors, "Email format is not valid");

if(count($errors)>0){
    exitWithError(422, $errors);
}

if(md5($password)!=$user->password) {
    writeUnsuccessfullLoginAttempt($user->id, $_SERVER['REMOTE_ADDR']);
    $numberOfTimesToLockAccount = 3;
    $timeSpan = 300;
    $numberOfTries = checkIfTooManyLoginTries($user->id, $timeSpan, $numberOfTimesToLockAccount);

    if($numberOfTries==true){
        updateLockedStatus($user->id);
        mail($user->email, "Your account has been locked", "Contact support to recover your account.\r\n");
        array_push($errors, "This account is locked. Contact support.");
        exitWithError(422, $errors);
    }

    array_push($errors, "Password is not correct.");
}

if(count($errors)==0){
    writeSuccessfullLoginAttempt($user->id, $_SERVER['REMOTE_ADDR']);
    $_SESSION["user"]=$user;
} else{
    exitWithError(422, $errors);
}