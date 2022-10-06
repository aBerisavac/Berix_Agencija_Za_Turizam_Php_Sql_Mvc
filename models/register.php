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

if(!isset($_POST["phoneNumber"])||empty($_POST["phoneNumber"])){
    array_push($errors, "Please fill in all the fields.");
    exitWithError(422, $errors);
}

if(!isset($_POST["firstName"])||empty($_POST["firstName"])){
    array_push($errors, "Please fill in all the fields.");
    exitWithError(422, $errors);
}

if(!isset($_POST["lastName"])||empty($_POST["lastName"])){
    array_push($errors, "Please fill in all the fields.");
    exitWithError(422, $errors);
}

$email = $_POST["email"];
$password = $_POST["password"];
$lastName = $_POST["lastName"];
$firstName = $_POST["firstName"];
$phoneNumber = $_POST["phoneNumber"];

$reFirstName = "/^[a-z ,.'-]{2,30}$/";
$reLastName = "/^[a-z ,.'-]{2,30}$/";
$rePassword = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/";
$rePhoneNumber = "/(^\+[\d]{10,13})|(^\+[\d]{3,5}(\s\d{2,4}){1,4})/";
$reEmail = "/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/";

if(!preg_match($reFirstName, $firstName)) array_push($errors, "First name must be between 2 and 30 letters long.");
if(!preg_match($reLastName, $lastName)) array_push($errors, "Last name must be between 2 and 30 letters long.");
if(!preg_match($rePassword, $password)) array_push($errors, "Password must be at least 8 characters long, with at least 1 number, 1 upper, 1 lower letter and 1 special character.");
if(!preg_match($rePhoneNumber, $phoneNumber)) array_push($errors, "Number must be in +<country code> format.");
if(!preg_match($reEmail, $email)) array_push($errors, "Email format is not valid");

if(count($errors)>0){
    exitWithError(422, $errors);
}

if(userExists($email)){
    array_push($errors, "User with that email already exists.");
    exitWithError(422, $errors);
}

if(!insertUser($email, $password, $firstName, $lastName, $phoneNumber)){
    array_push($errors, "Could not insert into database. Contact support");
    exitWithError(422, $errors);
}